import jsonPatch from 'json8-patch'
import defaults from 'lodash/defaultsDeep'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import set from 'lodash/set'
import pick from 'lodash/pick'
import omit from 'lodash/omit'

import {
  validate,
  getSchemas as _getSchemas
} from './validate'
import mapValidationErrors from './mapValidationErrors'

import * as pagination from './paginationStrategies'

function _wrapForSingleOrEvery(f) {
  return function(...args) {
    const data = args[0]
    if (Array.isArray(data)) {
      return data.map(data => f.apply(this, [data, ...args.slice(1)]))
    } else if (typeof data == 'object') {
      return f.apply(this, args)
    }
  }
}

function _wrapForManyOnly(f) {
  return function(...args) {
    const data = args[0]
    if (Array.isArray(data)) {
      return f.apply(this, [data, ...args.slice(1)])
    }

    return data
  }
}

const _cache = _wrapForSingleOrEvery((data, cache) => {
  const {
    id,
    type
  } = data.data

  if (!cache[type]) {
    cache[type] = {}
  }

  cache[type][id] = data
})

function assignAlias(data, alias, fullPath) {
  if (typeof alias == 'string') {
    return get(data, alias)
  } else {
    let obj
    if (Array.isArray(alias)) {
      obj = []
    } else if (typeof alias == 'object') {
      obj = Object.assign({}, data)
    } else {
      const error = new TypeError('Canot apply dictionary to document')
      error.doc = data
      error.alias = alias
      throw error
    }

    for (let key in alias) {
      const path = (fullPath || '') + key

      alias = alias[key]

      const aliased = assignAlias(data, alias, path)

      if (path != alias) {
        obj = omit(obj, [alias])
      }

      set(obj, key, aliased)
    }

    return obj
  }
}

function assignDefaults(data, options) {
  return defaults({}, data, options)
}

function _sortByNumberOrCharCodes(reverse, a, b) {
  if (a > b) {
    return reverse
  } else if (a < b) {
    return -1 * reverse
  }

  return 0
}

function _sortByKey(rule, a, b) {
  const [key, reverse] = rule
  return _sortByNumberOrCharCodes(reverse, get(a, key), get(b, key))
}

function _parseSortRules(string) {
  return string.split(',').map(key => {
    const rule = []
    if (key[0] == '-') {
      rule[0] = key.slice(1)
      rule[1] = -1
    } else {
      rule[0] = key
      rule[1] = 1
    }
    return rule
  })
}

function _applySort(data, options) {
  const rules = _parseSortRules(options)
  return data.sort((a, b) => {
    for (let rule of rules) {
      const res = _sortByKey(rule, a, b)

      if (res) {
        return res
      }
    }

    return 0
  })
}

function _applyAttributesFields(data, options) {
  options = options.split(',')
  data.attributes = pick(data.attributes, options)
  return data
}

const resourceMembers = ['id', 'type', 'attributes', 'relationships', 'links', 'meta']

const _preTransform = _wrapForSingleOrEvery((_data, options) => {
  let data = _data

  if ('alias' in options) {
    data = assignAlias(data, options.alias)
  }

  const attributes = omit(data, resourceMembers)

  if (Object.keys(attributes)) {
    defaults(data, {
      attributes
    })
  }

  data = pick(data, resourceMembers)

  if('id' in data) {
    data.id += ''
  }

  if ('defaults' in options) {
    data = assignDefaults(data, options.defaults)
  }

  if ('fields' in options) {
    data = _applyAttributesFields(data, options.fields)
  }

  Object.defineProperty(data, '_source', {
    get() {
      return _data
    }
  })

  return data
})

function _applyPagination(data, options, body) {
  const strategy = pagination[options.strategy]

  if (strategy) {
    const {
      offset,
      end
    } = strategy.bounds(data.length, options.offset, options.limit)

    ;['self', 'first', 'last', 'prev', 'next'].forEach(key => {
      if (typeof strategy[key] == 'function') {
        const query = strategy[key](data.length, offset, end, options.limit)

        // set(body, `links.${ key }`, query)
      }
    })

    data = data.slice(offset, end)
  } else {
    throw new ReferenceError('Cannot use pagination strategy:', options.strategy)
  }

  return data
}

const _postTransform = _wrapForManyOnly((data, options, report) => {
  if ('sort' in options) {
    data = _applySort(data, options.sort)
  }

  if('page' in options) {
    data = _applyPagination(data, options.page, report)
  }

  return data
})

class JsonApi {
  static async validate(...args) {
    let ref = '/',
      body = args[0]
    if (args.length > 1) {
      ref = args[0]
      body = args[1]
    }

    try {
      return await validate(ref, body)
    } catch (error) {
      throw {
        message: `Validation error`,
        reasons: error.errors.map(mapValidationErrors)
      }
    }
  }

  static get(doc, path) {
    return jsonPatch.get(doc, path)
  }

  static has(doc, path) {
    return jsonPatch.has(doc, path)
  }

  static link(hrefOrLink) {
    let link = {}
    if (typeof hrefOrLink == 'string') {
      link = hrefOrLink
    } else if (typeof hrefOrLink == 'object') {
      link = cloneDeep(hrefOrLink)
    } else {
      return null
    }

    return link
  }

  static async patch(body, ops, options = {}) {
    options = defaults({}, options, {
      reversible: false
    })

    let res

    try {
      try {
        res = jsonPatch.apply(body, ops, options)
      } catch (error) {
        error.detail = `Cannot apply JSON patch`

        throw error
      }

      if (options.validatePatch) {
        try {
          await JsonApi.validate(res.doc)
        } catch (error) {
          error.detail = `Document validation failed after patch has been applied`

          throw error
        }
      }
    } catch (error) {
      if (options.reversible) {
        const reverted = jsonPatch.revert(body, res.revert).doc

        error.doc = reverted
      }

      error.ops = ops

      throw error
    }

    return res
  }

  static async add(body, path, value, options) {
    const ops = [{
      op: 'add',
      path,
      value
    }]

    return await JsonApi.patch(body, ops, options)
  }

  static getSchemas() {
    const schemas = _getSchemas()

    if (options.id == 'index') {
      schema.id = index
    } else {
      schema.id = schemas[key][options.id]
    }

    schema.type = options.type

    schema.id = key
    schema.attributes = cloneDeep(schemas[key])

    array.push(schema)

    return array
  }

  constructor(options = {}) {
    this.options = {}
    this._connected = {}

    if ('body' in options) {
      if (typeof options.body != 'object') {
        throw new Error(`'options.body' should be a JSON object`)
      }
      this.body = options.body
    } else {
      this.body = {}
    }

    if ('validatePatch' in options) {
      if (typeof options.validatePatch != 'boolean') {
        throw new Error(`'options.validatePatch' should be 'true' or 'false'`)
      }
      this.options.validatePatch = options.validatePatch
    } else {
      this.options.validatePatch = false
    }
  }

  "get" (path) {
    return JsonApi.get(this.body, path)
  }

  has(path) {
    return JsonApi.has(this.body, path)
  }

  async validate() {
    return await JsonApi.validate(this.body)
  }

  async patch(ops) {
    return await JsonApi.patch(this.body, ops, this.options)
  }

  async add(path, value) {
    return await JsonApi.add(this.body, path, value, this.options)
  }



  connect(type, fetch) {
    const keys = ['create', 'read', 'update', 'delete']
    const _createTypeError = () => new TypeError('Invalid argument type for fetch')
    const _fetch = {}
    if (fetch instanceof Function) {
      keys.forEach(key => _fetch[key] = fetch)
    } else if (fetch instanceof Object) {
      keys.forEach(key => {
        if (!_fetch[key] instanceof Function) {
          throw _createTypeError()
        }
        _fetch[key] = fetch[key]
      })
    } else {
      throw _createTypeError()
    }

    this._connected[type] = _fetch
  }

  async fetchData(type, options) {
    const _fetch = this._connected[type]

    let {
      data,
      included
    } = await _fetch[options.action](options)

    const _sourceData = data

    // const cache = {
    //   data: {},
    //   included: {}
    // }

    data = _preTransform(data, options)
    included = _preTransform(included, options)

    // _cache(data, cache.data)
    // _cache(included, cache.included)

    data = _postTransform(data, options)
    included = _postTransform(included, options)

    // console.log(data)

    return {
      data,
      included
    }
  }

  async include(fetched, types) {
    const res = await Promise.all(Object.keys(types).map(type => this.fetchData(type, types[type])))

    const {
      data,
      included
    } = res.reduce((res, fetched) => {
      for(let key in fetched) {
        if(Array.isArray(fetched[key])) {
          if(!res[key]) {
            res[key] = fetched[key]
          } else if(Array.isArray(res[key])) {
            res[key] = [...res[key], ...fetched[key]]
          } else {
            res[key] = [res[key], ...fetched[key]]
          }
        } else {
          if(!res[key]) {
            res[key] = fetched[key]
          } else if(Array.isArray(res[key])) {
            res[key] = [...res[key], fetched[key]]
          } else {
            res[key] = [res[key], fetched[key]]
          }
        }

        return res
      }
    }, {})

    return {
      data,
      included
    }
  }

  async data(type) {

  }
}

/**
await jsonapi.fetch('collection', {
  action: 'read',
  sort: ['name', '-records'],
  filter: { ... },
  fields: ['name', 'records'],
  page: {
    limit: 1000
  },
  alias: {
    id: '_id'
  }
}) == {
  data, originalData
}

await jsonapi.include({
  owner: {
    alias: {
      id: '_id'
    },
    fields: ['name']
  }
})
*/

// function _cachePendingResources(data, cache) {
//   if (Array.isArray(data)) {
//     data.forEach(data => _cachePendingResources(data, cache))
//   } else if (typeof data == 'object') {
//     const {
//       id,
//       type
//     } = data
//
//     if (!cache[type]) {
//       cache[type] = []
//     }
//
//     cache[type].push(id)
//   }
// }

// function _extractPendingResourceTypeIds(type, cache) {
//   if (!cache[type]) {
//     return []
//   }
//
//   const _typeCache = cache[type]
//
//   delete cache[type]
//
//   return _typeCache
// }

// function _filterCachedIds(type, ids, cache) {
//   return ids.filter(id => {
//     const type = cache[type]
//
//     if (type && type[id]) {
//       return false
//     }
//
//     return true
//   })
// }

export default JsonApi

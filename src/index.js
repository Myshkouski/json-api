import jsonPatch from 'json8-patch'
import defaults from 'lodash/defaultsDeep'
import get from 'lodash/get'
// import cloneDeep from 'lodash/cloneDeep'
import {
  validate,
  getSchemas as _getSchemas
} from './validate'
import mapValidationErrors from './mapValidationErrors'

function _wrapForOneOrMany(f) {
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
      return data.map(data => f.apply(this, [data, ...args.slice(1)]))
    }

    return data
  }
}

const _cache = _wrapForOneOrMany((data, cache) => {
  const {
    id,
    type
  } = data.data

  if (!cache[type]) {
    cache[type] = {}
  }

  cache[type][id] = data
})

function assignAlias(data, alias) {
  if (typeof data == 'object') {
    if (typeof alias == 'string') {
      return get(data, alias)
    } else if (Array.isArray(alias)) {
      const array = []

      for (let index in alias) {
        array[key] = assignAlias(data, alias[index])
      }

      return array
    } else if (typeof alias == 'object') {
      const obj = Object.assign({}, data)

      for (let key in alias) {
        obj[key] = assignAlias(data, alias[key])
      }

      return obj
    } else {
      const error = new TypeError('Canot apply dictionary to document')
      error.doc = data
      error.alias = alias
      throw error
    }
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
      const res = _sortByKey(rule, a.data, b.data)

      if (res) {
        return res
      }
    }

    return 0
  })
}

function _jsonapifyData(data, options) {
  if ('alias' in options) {
    data = assignAlias(data, options.alias)
  }

  if ('defaults' in options) {
    data = assignDefaults(data, options.defaults)
  }

  return data
}

const _preTransform = _wrapForOneOrMany((data, options) => {
  return {
    originalData: data,
    data: _jsonapifyData(data, options)
  }
})

const _postTransform = _wrapForManyOnly((data, options) => {
  if ('sort' in options) {
    data = _applySort(data, options.sort)
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

  static getSchemas(options) {
    options = defaults({}, options, {
      type: 'schema',
      id: '$id'
    })

    const schemas = _getSchemas()
    return Object.keys(schemas).reduce((array, key, index) => {
      const schema = {}

      if (options.id == 'index') {
        schema.id = index
      } else {
        schema.id = schemas[key][options.id]
      }

      schema.type = options.type

      schema.attributes = schemas[key]

      array.push(schema)

      return array
    }, [])
  }

  constructor(options = {}) {
    this.options = {}
    this._connected = {}
    this._dataCache = {}
    this._includedCache = {}

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

    const {
      data,
      included
    } = await _fetch[options.action](options)

    const _cache = {
      data: {},
      included: {}
    }

    _cache(_preTransform(data, options), _cache.data)
    _cache(_preTransform(included, options), _cache.included)

    return {
      data,
      included,
      get cache() {
        return _cache
      }
    }
  }

  async include(types) {
    // const _fetch = this._connected[type]
    //
    // const {
    //   data,
    //   included
    // } = await this.fetchData(type, options)
    //
    // return {
    //   data,
    //   included
    // }
  }

  async data(type) {

  }
}

/**
await jsonapi.data('collection', {
  action: 'read',
  sort: ['name', '-records'],
  filter: [ any ],
  fields: ['name', 'records'],
  page: {
    limit: 1000
  },
  alias: {
    id: '_id'
  },
  limit: 100
})

await jsonapi.include({
  relationships: [{
    type: 'owner',
    alias: {
      id: '_id'
    },
    fields: ['name']
  }]
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

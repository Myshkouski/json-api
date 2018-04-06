import jsonPatch from 'json8-patch'
import defaults from 'lodash/defaultsDeep'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import set from 'lodash/set'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import merge from 'lodash/merge'

import {
  validate,
  getSchemas as _getSchemas
} from './validate'
import mapValidationErrors from './mapValidationErrors'

import * as pagination from './paginationStrategies'

class IndexedCache {
  constructor() {
    Object.defineProperty(this, '_cache', {
      enumerable: true,
      value: {}
    })
  }

  set(path, value) {
    set(this._cache, path, value)

    return this
  }

  get(path) {
    return get(this._cache, path)
  }
}

class LinkedIndexedCache extends IndexedCache {
  constructor(indexedCache) {
    super()

    if(!indexedCache instanceof IndexedCache) {
      throw TypeError('First arguments should be an instance of IndexedCache')
    }

    Object.defineProperty(this, '_linked', {
      // enumerable: true,
      value: indexedCache
    })
  }

  set(path, value) {
    const split = path.split('.')
    const prop = split.pop()
    let target

    if (split.length) {
      target = {}
      set(this._cache, split, target)
    } else {
      target = this._cache
    }

    Object.defineProperty(target, prop, {
      enumerable: true,
      set: value => {
        this._linked.set(path, value)
      },
      get: () => this._linked.get(path)
    })

    target[prop] = value
  }
}

function _transformTreePath(path) {
  const split = path.split('.')

  return split.slice(0, -1).reduce((split, key) => {
    split.push(key)
    split.push('then')
    return split
  }, []).concat(split.slice(-1))
}

function _createNode(run, then) {
  return {
    run,
    then
  }
}

function _createPromiseTree(paths) {
  const then = {}

  for (let path in paths) {
    set(then, _transformTreePath(path), _createNode(paths[path], null))
  }

  const rootNode = _createNode(result => result, then)

  return rootNode
}

async function _runPromiseTree(result, node, rootNode = node) {
  if(rootNode.rejected) {
    throw 'cancelled'
  }

  try {
    if (node) {
      await node.run(result)

      if (node.then) {
        const keys = Object.keys(node.then)

        await Promise.all(keys.map(key => _runPromiseTree(result, node.then[key], rootNode)))
      }

      return result
    }
  } catch(error) {
    node.rejected = true
    throw error
  }
}

class PromiseTree {
  constructor(paths) {
    const _tree = _createPromiseTree(paths)

    Object.defineProperty(this, '_tree', {
      value: _tree
    })
  }

  static async run(paths, data) {
    const promiseTree = new PromiseTree(paths)
    return await promiseTree.run(data)
  }

  async run(data) {
    return await _runPromiseTree(data, this._tree)
  }
}

function _concatenateData(...args) {
  const array = args.reduce((a, b) => {
    if (Array.isArray(b)) {
      return a.concat(b)
    } else {
      return a.concat([b])
    }
  }, [])

  return array.length ? array : null
}

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

const _forEvery = _wrapForSingleOrEvery((data, f) => f(data))

const _createIndex = _wrapForSingleOrEvery((data, _indexedCache = {}) => {
  for (let type in data._include) {
    defaults(_indexedCache, {
      [type]: {}
    })
    Object.keys(data._include[type]).forEach(id => set(_indexedCache, [type, id]))
  }
})

const _cacheIndex = _wrapForSingleOrEvery((data, _indexedCache = {}) => {
  set(_indexedCache, [data.type, data.id], data)
})

function _extractIndexedCache(_indexedCache) {
  const array = []
  for (let type in _indexedCache) {
    const _indexedCacheType = _indexedCache[type]
    for (let id in _indexedCacheType) {
      array.push(_indexedCacheType[id])
    }
  }
  return array
}

function assignAlias(data, alias, fullPath) {
  if (typeof alias == 'string') {
    return alias.length ? get(data, alias) : data
  } else {
    let obj
    if (Array.isArray(alias)) {
      obj = []
    } else {
      obj = Object.assign({}, data)
    }

    if (typeof alias == 'object') {
      for (let key in alias) {
        const path = (fullPath || '') + key

        let _alias = alias[key]

        const aliased = assignAlias(data, _alias, path)

        if (path != _alias) {
          obj = omit(obj, [_alias])
        }

        set(obj, key, aliased)
      }
    }

    return obj
  }
}

const _wrappedAssignAlias = _wrapForSingleOrEvery(assignAlias)
const _wrappedPick = _wrapForSingleOrEvery(pick)

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

const _applySort = _wrapForManyOnly((data, options) => {
  const rules = _parseSortRules(options)
  return data.sort((a, b) => {
    for (let rule of rules) {
      const res = _sortByKey(rule, a.attributes, b.attributes)

      if (res) {
        return res
      }
    }

    return 0
  })
})

function _applyAttributesFields(data, options) {
  options = options.split(',')
  data.attributes = pick(data.attributes, options)
  return data
}

const RESOURCE_IDENTIFIER_PROPS = ['id', 'type', 'meta']

function _applyIncluded(data, cache = {}, options) {
  if (data) {
    Object.defineProperty(data, '_include', {
      // enumerable: true,
      value: {}
    })

    for (let type in options) {
      let typeOptions = options[type]
      let resourceIdentifiers = data._source
      if ('key' in typeOptions && typeOptions.key.length) {
        resourceIdentifiers = get(data._source, typeOptions.key)
      }

      if ('alias' in typeOptions) {
        resourceIdentifiers = _wrappedAssignAlias(resourceIdentifiers, typeOptions.alias)
      }

      resourceIdentifiers = _wrappedPick(resourceIdentifiers, RESOURCE_IDENTIFIER_PROPS)

      data._include[type] = {}

      _forEvery(resourceIdentifiers, resourceId => {
        Object.defineProperty(data._include[type], resourceId.id, {
          enumerable: true,
          get() {
            return get(cache, [type, resourceId.id])
          }
        })
      })
    }
  }

  return data
}

const resourceMembers = ['id', 'type', 'attributes', 'relationships', 'links', 'meta']

const _preTransform = _wrapForSingleOrEvery((_data, cache, options) => {
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

  if ('id' in data) {
    data.id += ''
  }

  if ('merge' in options) {
    data = merge(data, options.merge)
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

  if ('include' in options) {
    _applyIncluded(data, cache, options.include)
  }

  return data
})

const _applyPagination = _wrapForManyOnly((data, options, body) => {
  const strategy = pagination[options.strategy]

  if (strategy) {
    const {
      offset,
      end
    } = strategy.bounds(data.length, options.offset, options.limit)

    ;
    ['self', 'first', 'last', 'prev', 'next'].forEach(key => {
      if (typeof strategy[key] == 'function') {
        const query = strategy[key](data.length, offset, end, options.limit)

        // set(body, `links.${ key }`, query)
      }
    })

    data = data.slice(offset, end)

    if (!data.length) {
      data = null
    }
  } else {
    throw new ReferenceError('Cannot use pagination strategy:', options.strategy)
  }

  return data
})

const _postTransform = (data, options, report) => {
  if ('sort' in options) {
    data = _applySort(data, options.sort)
  }

  if ('page' in options) {
    data = _applyPagination(data, options.page, report)
  }

  return data
}

function _mergeType(type, options) {
  return merge({}, options, {
    merge: {
      type
    }
  })
}

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

  async fetch(action, type, options, ...args) {
    let {
      data,
      included,
      _indexedCache
    } = await prefetch.call(this, action, type, options, ...args)

    const _fetchArgs = Object.keys(_indexedCache).map(type => {
      const typeOptions = _mergeType(type, options[type])

      set(typeOptions, 'filter', {
        id: Object.keys(_indexedCache[type])
      })

      return [type, defaults({
        [type]: typeOptions
      }, options)]
    })

    const res = await Promise.all(_fetchArgs.map(fetchArgs => prefetch.call(this, action, ...fetchArgs, ...args)))

    res.forEach(fetched => {
      _cacheIndex(fetched.data, _indexedCache)
      // _cacheIndex(fetched.included, _indexedCache)
    })

    data = _postTransform(data, options)
    included = _postTransform(_extractIndexedCache(_indexedCache), options)

    return {
      data,
      included
    }
  }
}

async function prefetch(action, type, options, ...args) {
  const _prefetch = get(this._connected, [type, action])

  const typeOptions = _mergeType(type, options[type])

  let included

  let {
    data,
    // included
  } = await _prefetch(typeOptions, ...args)

  const _indexedCache = {}

  data = _preTransform(data, _indexedCache, typeOptions)
  // included = _preTransform(included, _indexedCache, options)

  _createIndex(data, _indexedCache)
  // _cacheIndex(included, _indexedCache)

  return {
    data,
    // included,
    _indexedCache
  }
}

async function include(action, type, options, ...args) {
  const _include = get(this._connected, [type, action])

  const typeOptions = _mergeType(type, options[type])

  let included

  let {
    data,
    // included
  } = await _prefetch(typeOptions, ...args)

  const _indexedCache = {}

  data = _preTransform(data, _indexedCache, typeOptions)
  // included = _preTransform(included, _indexedCache, options)

  _createIndex(data, _indexedCache)
  // _cacheIndex(included, _indexedCache)

  return {
    data,
    // included,
    _indexedCache
  }
}

export default JsonApi

import merge from 'lodash/merge'

import {
  IndexedCache,
  LinkedIndexedCache
} from './cache'
import prefetch from './prefetch'
import include from './include'
import posttransform from './transform/post'
import PromiseTree from './promiseTree'

import {
  cache,
  extract
} from './helpers/cache'

export default async function fetch(queries, action, type, options, ...args) {
  const resourceCache = new IndexedCache()

  async function _fetch(type, typeOptions) {
    const dataCache = new LinkedIndexedCache(resourceCache)

    const prefetched = await prefetch(queries[type][action], typeOptions, ...args)

    // add primary resources to indexed resource cache
    const result = {}
    cache(prefetched.data, dataCache)
    result.dataCache = dataCache

    if ('include' in typeOptions) {
      // assign primary data links to included resources

      const linkageCache = new LinkedIndexedCache(resourceCache)
      include(prefetched.data, typeOptions.include, typeOptions.relationships, linkageCache)

      result.linkageCache = linkageCache

      if ('included' in prefetched) {
        // add included resources to indexed resource cache

        const includedCache = new LinkedIndexedCache(resourceCache)
        cache(prefetched.included, includedCache)
        result.includedCache = includedCache
      }
    }

    return result
  }

  const typeOptions = options[type]

  async function _primaryFetch(type, typeOptions) {
    const prefetched = await _fetch(type, typeOptions)

    const result = {}
    cache(prefetched.data, dataCache)
    result.dataCache = dataCache

    if ('include' in typeOptions) {
      // assign primary data links to included resources

      const linkageCache = new LinkedIndexedCache(resourceCache)
      include(prefetched.data, typeOptions.include, typeOptions.relationships, linkageCache)

      result.linkageCache = linkageCache

      if ('included' in prefetched) {
        // add included resources to indexed resource cache

        const includedCache = new LinkedIndexedCache(resourceCache)
        cache(prefetched.included, includedCache)
        result.includedCache = includedCache
      }
    }

    return result
  }

  async function _includedFetch(type, typeOptions) {
    const result = await _fetch(type, typeOptions)

    if ('included' in prefetched) {
      // add included resources to indexed resource cache

      const includedCache = new LinkedIndexedCache(resourceCache)
      cache(prefetched.included, includedCache)
      result.includedCache = includedCache
    }

    return result
  }

  const flow = [type, ...(typeOptions.include || []).map(path => type + '.' + path)].reduce((flow, path) => {
    const type = path.split('.').pop()
    let typeOptions = options[type]

    flow[path] = async (result = {}, fetchIncluded) => {
      console.log(type, result)
      if (result.includedCache) {
        return result
      }

      if (result.linkageCache) {
        const cachedType = result.linkageCache.get(type)

        if(!cachedType) {
          return result
        }

        const ids = Object.keys(cachedType)
        typeOptions = Object.assign({}, typeOptions)
        typeOptions.filter = merge({}, typeOptions.filter, {
          id: ids
        })
      }

      result = await _fetch(type, typeOptions)

      await fetchIncluded(result)

      return result
    }

    return flow
  }, {})

  const entries = await new PromiseTree(flow)

  const {
    dataCache,
    includedCache,
    linkageCache
  } = entries[type]

  let data = extract(dataCache)
  let included = extract(linkageCache)
  data = posttransform(data, typeOptions)

  data = data.map(data => {
    if(data._include) {
      const relationships = {}
      const entries = data._include.entries()
      if(entries.length) {
        entries.map(([type, cachedTypeIds]) => {
          let data = Object.values(cachedTypeIds)

          data = posttransform(data, typeOptions).filter(data => data)

          relationships[type] = data.map(data => {
            return {
              id: data.id,
              type: data.type
            }
          })
        })

        data.relationships = relationships
      }
    }

    return data
  })

  console.dir(data, {
    depth: Infinity
  })

  // console.dir(included, {
  //   depth: Infinity
  // })

  return {
    data,
    included
  }
}

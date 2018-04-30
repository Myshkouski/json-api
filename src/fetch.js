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

  async function _fetch(type, typeOptions, resourceCache) {
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

  const flow = [type, ...(typeOptions.include || []).map(path => type + '.' + path)].reduce((flow, path) => {
    const type = path.split('.').pop()
    let typeOptions = options[type]

    flow[path] = async (result = {}, fetchIncluded) => {
      if (result.includedCache) {
        return result
      }

      if (result.linkageCache) {
        const ids = result.linkageCache.get(type).keys()
        typeOptions = Object.assign({}, typeOptions)
        typeOptions.filter = merge({}, typeOptions.filter, {
          id: ids
        })
      }

      result = await _fetch(type, typeOptions, result.linkageCache || resourceCache)

      await fetchIncluded()

      return result
    }

    return flow
  }, {})

  const result = await new PromiseTree(flow)

  const {
    dataCache,
    includedCache,
    linkageCache
  } = result[type]

  let data = extract(dataCache)
  let included = extract(linkageCache)
  data = posttransform(data, typeOptions)

  console.dir(data, {
    depth: Infinity
  })

  console.dir(included, {
    depth: Infinity
  })

  return {
    data,
    included
  }
}

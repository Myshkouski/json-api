import {
  IndexedCache,
  LinkedIndexedCache
} from './cache'
import preFetch from './prefetch'
import include from './include'

import {
  cache,
  extract
} from './helpers/cache'

export default async function fetch(queries, action, type, options, ...args) {
  const resourceCache = new IndexedCache()
  const dataCache = new LinkedIndexedCache(resourceCache)
  const includedCache = new LinkedIndexedCache(resourceCache)

  const typeOptions = options[type]

  let {
    data,
    included
  } = await preFetch(queries[type][action], typeOptions, ...args)

  cache(data, dataCache)
  cache(included, includedCache)

  if (typeOptions.include) {
    await include(data, includedCache, queries, action, type, options, ...args)
  }

  included = extract(includedCache)

  return {
    data,
    included
  }
}

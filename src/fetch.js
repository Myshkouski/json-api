import parallel from 'async/parallel'

import {
  IndexedCache,
  LinkedIndexedCache
} from './cache'
import prefetch from './prefetch'
// import include from './include'

import {
  cache,
  extract
} from './helpers/cache'

async function query(q, type, typeOptions, dataCache, includedCache) {
  let {
    data,
    included
  } = await prefetch(q, typeOptions, ...args)

  cache(data, dataCache)
  cache(included, includedCache)

  return {
    data,
    included
  }
}

function createThreadIteratee() {
  return async promise => {
    const res = await promise()
    return (res && included in res)
  }
}

function createFetchingFlowTable(q, type, options, dataCache, includedCache) {
  const flow = []

  const typeOptions = options[type]

  const queryPrimaryData = createThreadIteratee(() => query(q, type, typeOptions, dataCache, includedCache))

  flow.push([
    queryPrimaryData
  ])

  if (typeOptions.include) {
    const includeTypeOptions = Object.keys(typeOptions.include).map(path => path.split('.'))

    for (let thread of includeTypeOptions) {
      flow.push([
        queryPrimaryData,
        ...thread.map(type => createThreadIteratee(() => query(q, type, options[type], dataCache, includedCache)))
      ])
    }
  }

  return flow
}

export default async function fetch(queries, action, type, options, ...args) {
  const resourceCache = new IndexedCache()
  const dataCache = new LinkedIndexedCache(resourceCache)
  const includedCache = new LinkedIndexedCache(resourceCache)

  // included = extract(includedCache)

  const flow = createFetchingFlowTable(queries[type][action], type, options, dataCache, includedCache)

  console.log(flow)

  return await Promise.all(flow.map(thread => parallel(thread)))
}

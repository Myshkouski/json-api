import {
  IndexedCache,
  LinkedIndexedCache
} from './cache'
import PromiseTree from './promiseTree'
import preFetch from './prefetch'

import {
  forSingleOrMany
} from './helpers/wrapFor'
const _cache = forSingleOrMany((data, indexedCache) => {
  indexedCache.set([data.type, data.id], data)
})
const _extractCache = indexedCache => {
  return indexedCache.keys.reduce((array, type) => {
    const values = Object.values(indexedCache.get(type))
    return array.concat(values)
  }, [])
}

export default async function fetch(queries, action, type, options, ...args) {
  const resourceCache = new IndexedCache()
  const dataCache = new LinkedIndexedCache(resourceCache)
  const includedCache = new LinkedIndexedCache(resourceCache)

  let {
    data,
    included
  } = await preFetch(queries[type][action], options[type], ...args)

  _cache(data, dataCache)
  _cache(included, includedCache)

  if (options[type].include) {
    function createIncludeDict(include) {
      return include.reduce((dict, path) => {
        const type = path.split('.').pop()

        dict[path] = async () => {
          // const typeOptions = Object.assign({}, options[type], {
          //   filter: {
          //     id: Object.keys(includedCache.get(type))
          //   }
          // })

          const {
            data,
            included
          } = await preFetch(queries[type][action], typeOptions, ...args)

          _cache(data, includedCache)
          _cache(included, includedCache)


          console.log(includedCache)

          return includedCache
        }

        return dict
      }, {})
    }

    const dict = createIncludeDict(options[type].include)

    const includePromiseTree = new PromiseTree(dict)

    await includePromiseTree.run()
  }

  included = _extractCache(includedCache)

  return {
    data,
    included
  }
}

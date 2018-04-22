import get from 'lodash/get'

import preTransform from '../transform/pre'
import preFetch from '../prefetch'
import PromiseTree from '../promiseTree'

import {
  IndexedCache,
  LinkedIndexedCache
} from '../cache'

import {
  cache,
  extract
} from '../helpers/cache'
import {
  forSingleOrMany
} from '../helpers/wrapFor'

const forEach = forSingleOrMany((data, f) => f(data))

const extractIncluded = (data, options) => {

}

const assignIncluded = forSingleOrMany((data, options, cache) => {
  if (data) {
    Object.defineProperty(data, '_include', {
      // enumerable: true,
      value: new LinkedIndexedCache(cache)
    })

    for (let type in options) {
      let typeOptions = options[type]

      let resourceIds = get(data._source, typeOptions.from)

      forEach(resourceIds, id => {
        data._include.link([type, id])
      })
    }
  }
})

export default async function include(data, includedCache, queries, action, type, options, ...args) {
  const typeOptions = options[type]

  assignIncluded(data, typeOptions.include, includedCache)

  function createIncludeDict(include) {
    return Object.keys(include).reduce((dict, path) => {
      const type = path.split('.').pop()

      dict[path] = async () => {
        const typeOptions = Object.assign({}, options[type], {
          filter: {
            id: Object.keys(includedCache.get(type))
          }
        })

        const {
          data,
          included
        } = await preFetch(queries[type][action], typeOptions, ...args)

        cache(data, includedCache)
        cache(included, includedCache)

        return includedCache
      }

      return dict
    }, {})
  }

  const dict = createIncludeDict(typeOptions.include)

  const includePromiseTree = new PromiseTree(dict)

  await includePromiseTree.run()
}

import get from 'lodash/get'

import alias from './alias'
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

const transformIds = forSingleOrMany((data, options) => {
  if ('alias' in options) {
    data = alias(data, options.alias)
  }

  return data
})

const extractIncluded = (data, options) => {
  if ('from' in options) {
    data = get(data, options.from)
  }

  data = transformIds(data, options)

  return data
}

const assignIncluded = forSingleOrMany((data, options, cache) => {
  if (data) {
    Object.defineProperty(data, '_include', {
      // enumerable: true,
      value: new LinkedIndexedCache(cache)
    })

    for (let type in options) {
      let typeOptions = options[type]

      let resourceIds = extractIncluded(data._source, typeOptions)

      forEach(resourceIds, resourceId => {
        data._include.link([type, resourceId.id])
      })
    }
  }
})

export default assignIncluded

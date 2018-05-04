import get from 'lodash/get'

import alias from '../transform/pre/alias'

import {
  IndexedCache,
  LinkedIndexedCache
} from '../cache'

import {
  forSingleOrMany
} from '../helpers/wrapFor'

const forEachResourceIdentifier = forSingleOrMany((data, f) => {
  if(data && !(data.id === undefined || data.id === null)) {
    f(data)
  }
})

const transformIds = forSingleOrMany((data, options) => {
  if('alias' in options) {
    data = alias(data, options.alias)
  }

  return data
})

const extractIncluded = (data, options) => {
  if('from' in options) {
    data = get(data, options.from)
  }

  data = transformIds(data, options)

  return data
}

const assignIncluded = forSingleOrMany((data, includeOptions, relationshipsOptions, cache) => {
  if (data) {
    Object.defineProperty(data, '_include', {
      // enumerable: true,
      value: new LinkedIndexedCache(cache)
    })

    for (let type of includeOptions) {
      const typeOptions = relationshipsOptions[type]

      let resourceIds = extractIncluded(data._source, typeOptions)

      forEachResourceIdentifier(resourceIds, resourceId => {
        data._include.link([type, resourceId.id])
      })
    }
  }
})

export default async function include(data, includeOptions, relationshipsOptions, linksCache) {
  assignIncluded(data, includeOptions, relationshipsOptions, linksCache)
}

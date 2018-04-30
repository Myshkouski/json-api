import {
  forSingleOrMany
} from './wrapFor'

import { IndexedCache } from '../cache'

export const cache = forSingleOrMany((data, indexedCache) => {
  if(data) {
    indexedCache.set([data.type, data.id], data)
  }
})

export const extract = indexedCache => {
  if(!(indexedCache instanceof IndexedCache)) {
    return null
  }

  return indexedCache.keys().reduce((array, type) => {
    const typeCache = indexedCache.get(type)
    const values = Object.values(typeCache)
    return array.concat(values)
  }, [])
}

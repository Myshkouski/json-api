import {
  forSingleOrMany
} from './wrapFor'

export const cache = forSingleOrMany((data, indexedCache) => {
  indexedCache.set([data.type, data.id], data)
})

export const extract = indexedCache => {
  return indexedCache.keys.reduce((array, type) => {
    const values = Object.values(indexedCache.get(type))
    return array.concat(values)
  }, [])
}

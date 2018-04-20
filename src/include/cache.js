import get from 'lodash/get'
import set from 'lodash/set'

export class IndexedCache {
  constructor() {
    Object.defineProperty(this, '_cache', {
      enumerable: true,
      value: {}
    })
  }

  set(path, value) {
    set(this._cache, path, value)

    return this
  }

  get(path) {
    return get(this._cache, path)
  }
}

export class LinkedIndexedCache extends IndexedCache {
  constructor(indexedCache) {
    super()

    if(!indexedCache instanceof IndexedCache) {
      throw TypeError('First arguments should be an instance of IndexedCache')
    }

    Object.defineProperty(this, '_linked', {
      // enumerable: true,
      value: indexedCache
    })
  }

  set(path, value) {
    const split = path.split('.')
    const prop = split.pop()
    let target

    if (split.length) {
      target = {}
      set(this._cache, split, target)
    } else {
      target = this._cache
    }

    Object.defineProperty(target, prop, {
      enumerable: true,
      set: value => {
        this._linked.set(path, value)
      },
      get: () => this._linked.get(path)
    })

    target[prop] = value
  }
}

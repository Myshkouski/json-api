import get from 'lodash/get'
import set from 'lodash/setWith'

export class IndexedCache {
  constructor() {
    Object.defineProperty(this, '_cache', {
      enumerable: true,
      value: {}
    })
  }

  get keys() {
    return Object.keys(this._cache)
  }

  set(path, value) {
    set(this._cache, path, value, Object)

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
    this.link(path)

    return IndexedCache.prototype.set.call(this, path, value)
  }

  link(path) {
    if(typeof path === 'string') {
      path = path.split('.')
    }

    const base = path.slice(0, -1)

    const prop = path[path.length - 1]
    let target

    if (base.length) {
      target = LinkedIndexedCache.prototype.get.call(this, base)

      if(target === undefined) {
        target = {}
        IndexedCache.prototype.set.call(this, base, target)
      }
    } else {
      target = this._cache
    }

    Object.defineProperty(target, prop, {
      enumerable: true,
      configurable: true,
      set: value => {
        this._linked.set(path, value)
      },
      get: () => this._linked.get(path)
    })

    if(!target[prop]) {
      target[prop] = undefined
    }

    return this
  }
}

import get from 'lodash/get'
import set from 'lodash/setWith'

export class IndexedCache {
  constructor() {
    Object.defineProperty(this, '_c', {
      enumerable: true,
      value: {}
    })
  }

  entries() {
    return Object.entries(this._c)
  }

  keys() {
    return Object.keys(this._c)
  }

  set(path, value) {
    set(this._c, path, value, Object)

    return this
  }

  get(path) {
    return get(this._c, path)
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
      path = path.replace('.', )
    }

    const base = path.slice(0, -1)

    let target

    if (base.length) {
      target = LinkedIndexedCache.prototype.get.call(this, base)

      if(target === undefined) {
        target = {}
        IndexedCache.prototype.set.call(this, base, target)
      }
    } else {
      target = this._c
    }

    const prop = path[path.length - 1]

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

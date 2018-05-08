export class IndexedCache {
  constructor() {
    this._c = {}
  }

  serialize(key) {
    return key
  }

  deserialize(key) {
    return key
  }

  get length() {
    return this.keys().length
  }

  set(path, value) {
    const key = this.serialize(path)

    this._c[key] = value

    return this
  }

  get(path) {
    const key = this.serialize(path)

    return this._c[key]
  }

  remove(path) {
    const key = this.serialize(path)
    const value = this._c[key]
    delete this._c[key]
    return value
  }
}

;
['entries', 'keys', 'values'].forEach(prop => {
  IndexedCache.prototype[prop] = function() {
    return Object[prop].call(Object, this._c)
  }
})

// export class LinkedIndexedCache extends IndexedCache {
//   constructor(indexedCache) {
//     super()
//
//     if(!indexedCache instanceof IndexedCache) {
//       throw TypeError('First arguments should be an instance of IndexedCache')
//     }
//
//     Object.defineProperty(this, '_linked', {
//       // enumerable: true,
//       value: indexedCache
//     })
//   }
//
//   set(path, value) {
//     this.link(path)
//
//     return IndexedCache.prototype.set.call(this, path, value)
//   }
//
//   link(path) {
//     if(typeof path === 'string') {
//       path = path.replace('.', )
//     }
//
//     const base = path.slice(0, -1)
//
//     let target
//
//     if (base.length) {
//       target = LinkedIndexedCache.prototype.get.call(this, base)
//
//       if(target === undefined) {
//         target = {}
//         IndexedCache.prototype.set.call(this, base, target)
//       }
//     } else {
//       target = this._c
//     }
//
//     const prop = path[path.length - 1]
//
//     Object.defineProperty(target, prop, {
//       enumerable: true,
//       configurable: true,
//       set: value => {
//         this._linked.set(path, value)
//       },
//       get: () => this._linked.get(path)
//     })
//
//     if(!target[prop]) {
//       target[prop] = undefined
//     }
//
//     return this
//   }
// }

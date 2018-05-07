import get from 'lodash/get'
import set from 'lodash/setWith'
import unset from 'lodash/unset'

export class IndexedCache {
  constructor() {
    this.empty()

    this.serialize = key => key.toString()
    this.deserialize = key => key
  }

  entries() {
    return Object.entries(this._c)
  }

  keys() {
    return Object.keys(this._c)
  }

  values() {
    return Object.values(this._c)
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
    delete this._c[key]
    return this
  }

  empty() {
    this._c = {}
  }
}

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

import {
  IndexedCache
} from './cache'

import get from 'lodash/get'
import posttransform from './transform/post'

class ResourceCollection extends IndexedCache {
  static from(ResourceConstructor, source, options) {
    const collection = new ResourceCollection()

    source.forEach(source => {
      const resource = new ResourceConstructor(source, options)
      if (!collection.has(resource)) {
        collection.add(resource)
      }
    })

    return collection
  }

  compare(a, b) {
    for (let key of ['type', 'id']) {
      if (a[key] < b[key]) {
        return -1
      }

      if (a[key] > b[key]) {
        return 1
      }
    }

    return 0
  }

  get id() {
    return this.keys().map(key => key.id)
  }

  add(resource) {
    if (typeof resource !== 'object') {
      throw new TypeError()
    }

    const { type, id } = resource

    return this.set({ type, id }, resource)
  }

  toJSON(options) {
    const toJSONed = this.values().map(resource => resource.toJSON(options))
    return posttransform(toJSONed)
  }
}

// ;
// ['map', 'filter'].forEach(prop => {
//   ResourceCollection.prototype[prop] = function(iteratee) {
//     this._c = this.entries()[prop](function _iteratee(entry, index, entries) {
//       return iteratee.call(this, entry[1], index, entries)
//     }).reduce((_c, [key, value]) => {
//       _c[key] = value
//       return _c
//     }, {})
//
//     return this
//   }
// })

export default ResourceCollection

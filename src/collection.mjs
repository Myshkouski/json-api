import {
  IndexedCache
} from './cache'

class ResourceCollection extends IndexedCache {
  constructor() {
    super()

    if ('0' in arguments) {
      const array = arguments[0]
      array.forEach(value => this.set(value, value))
    }
  }

  serialize(resource) {
    const key = ['type', 'id'].reduce((key, prop) => {
      if (!(prop in resource)) {
        throw new ReferenceError(`Property '${ prop }' is not defined on resource object`)
      }

      let value = resource[prop]

      if (value === undefined || value === null) {
        throw new TypeError(`Property '${ prop }' should not be equal to ${ undefined } or ${ null }`)
      }

      value += ''
      value = value.replace('\\', '\\\\').replace(':', '\\:')

      return key ? key + '::' + value : value
    }, '')

    return key
  }

  add(resource) {
    if (typeof resource !== 'object') {
      throw new TypeError()
    }

    return this.set(resource, resource)
  }
}

;
['map', 'filter'].forEach(prop => {
  ResourceCollection.prototype[prop] = function(iteratee) {
    this._c = this.entries()[prop](function _iteratee(entry, index, entries) {
      return iteratee.call(this, entry[1], index, entries)
    }).reduce((_c, [key, value]) => {
      _c[key] = value
      return _c
    }, {})

    return this
  }
})

export default ResourceCollection

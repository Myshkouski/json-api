import ResourceCollection from './collection'
import get from 'lodash/get'

class TypeStore {
  constructor(ResourceConstructor, source, options) {
    if ('from' in options) {
      source = get(source, options.from)
    }

    let single = false

    if (Array.isArray(source)) {
      this._s = ResourceCollection.from(ResourceConstructor, source, options)
    } else {
      single = true
      this._s = new ResourceConstructor(source, options)
    }

    Object.defineProperty(this, 'single', {
      value: single
    })
  }

  toJSON(options) {
    return this._s.toJSON(options)
  }
}

export default TypeStore

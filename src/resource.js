import set from 'lodash/set'
import get from 'lodash/get'
import pick from 'lodash/pick'

import pretransform from './transform/pre/extractMembers'

import ResourceCollection from './collection'

class ResourceObject {
  constructor(source, options) {
    this._r = pretransform(source, options)
    this._i = include(source, options)
  }

  // common instance methods

  set(...args) {
    return set(this._r, ...args)
  }

  get(...args) {
    return get(this._r, ...args)
  }

  // internal representation methods

  get source() {
    return this._s
  }

  get relationships() {
    return this._i
  }

  // jsonapi related

  get identifier() {
    return pick(this._r, ['id', 'type', 'meta'])
  }

  get id() {
    return this._r.id
  }

  get type() {
    return this._r.type
  }
}

function include(source, options) {
  if('relationships' in options && (typeof options.relationships === 'object')) {
    const relationshipsOptions = options.relationships
    const collection = new ResourceCollection()

    for (let type of relationshipsOptions) {
      const relationshipTypeOptions = relationshipsOptions[type]

      const resource = new ResourceObject(source, relationshipTypeOptions)

      collection.add(resource)
    }

    return collection
  }

  return null
}

export default ResourceObject

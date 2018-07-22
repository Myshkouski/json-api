import ResourceIDCollection from './id'
import ResourceObject from '../resource/object'
import posttransform from './transform'

function _include(resource) {
  const included = resource.included()

  if (included) {
    if (!this._included) {
      this._included = {}
    }

    for (let type in included) {
      if (!(type in this._included)) {
        this._included[type] = ResourceIDCollection()
      }

      included.values().forEach(resource => this._included[type].add(resource))
    }
  }

  return included
}

class ResourceCollection extends ResourceIDCollection {
  constructor() {
    super()

    this._included = null
  }

  get ResourceConstructor() {
    return ResourceObject
  }

  add(resource) {
    const count = ResourceIDCollection.prototype.apply(this, arguments)

    _include.call(this, resource)

    return count
  }

  toJSON() {
    const toJSONed = this.values().map(resource => resource.toJSON())
    return posttransform(toJSONed)
  }
}

export default ResourceCollection

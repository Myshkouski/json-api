import ResourceIDCollection from './id'
import ResourceObject from '../resource/object'
import transform from './transform'

function _include(resource) {
  const included = resource.included()

  if (included) {
    if (!this._included) {
      this._included = {}
    }

    for (let type in included) {
      if (!(type in this._included)) {
        this._included[type] = new ResourceIDCollection()
      }

      included[type].values().forEach(resource => {
        this._included[type].add(resource)
      })
    }
  }

  return included
}

class ResourceCollection extends ResourceIDCollection {
  static merge(a, ...collections) {
    const source = [a, ...collections].reduce((source, collection) => source.concat(collection.values()), [])
    return new ResourceCollection(source, {})
  }

  get ResourceConstructor() {
    return ResourceObject
  }

  add(resource) {
    const count = ResourceIDCollection.prototype.add.call(this, resource)

    _include.call(this, resource)

    return count
  }

  included() {
    if (arguments.length) {
      return this._included[arguments[0]]
    }
    return this._included
  }

  toJSON(options, globalScopeCollection = this) {
    return transform(this.values(), options, globalScopeCollection).map(resource => resource.toJSON(options))
  }
}

export default ResourceCollection

import ResourceID from './id'
import transformObject from '../transform/object'
import ResourceIDCollection from '../collection/id'

function include(source, options) {
  if (typeof options === 'object') {
    const included = {}

    for (let type in options) {
      included[type] = ResourceIDCollection.from(source, options[type])
    }

    return included
  }

  return null
}

class ResourceObject extends ResourceID {
  static get transform() {
    return transformObject
  }

  constructor(source, options = {}) {
    super(source, options)

    Object.assign(this._value, transformObject(source, options))

    this._included = include(source, options.relationships)
  }

  set(...args) {
    return set(this._attrs, ...args)
  }

  get(...args) {
    return get(this._attrs, ...args)
  }

  included() {
    return this._included
  }

  toJSON() {
    const resource = this._value

    if (this._included) {
      resource.relationships = this._included.toJSON()
    }

    return resource
  }
}

const source = {
  id: 0,
  test: true,
  someAttr: 'someValue'
}

const options = {
  // fields: [
  //   'test'
  // ],
  defaults: {
    type: '#test'
  },
  merge: {
    attributes: {
      someOtherAttr: 'someOtherValue'
    }
  }
}

const rID = new ResourceID(source, options)
const r = new ResourceObject(source, options)

console.log(rID.toJSON())
console.log(r.toJSON())

export default ResourceObject

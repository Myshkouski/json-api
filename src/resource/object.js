import ResourceID from './id'
import ResourceIDCollection from '../collection/id'

import preTransformID from '../transform/id/pre'

import preTransformObject from '../transform/object/pre'
import postTransformObject from '../transform/object/post'

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
  static transform(source, options) {
    return preTransformObject(preTransformID(source, options))
  }

  constructor(source, options = {}) {
    super(source, options)

    this._value = preTransformObject(this._value, options)

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

  toJSON(options) {
    return postTransformObject(this._value, options)
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

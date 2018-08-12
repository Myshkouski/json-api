import get from 'lodash/get'

import ResourceID from './id'
import ResourceIDCollection from '../collection/id'

import preTransformID from '../transform/id/pre'

import preTransformObject from '../transform/object/pre'
import postTransformObject from '../transform/object/post'

function include(source, options) {
  if (typeof options === 'object') {
    const included = {}

    for (let type in options) {
      const typeOptions = options[type]
      let _source = source

      if ('from' in typeOptions) {
        _source = get(source, typeOptions.from)
      }

      included[type] = new ResourceIDCollection(_source, typeOptions)
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

  get attr() {
    return this.attribute
  }

  attribute(path) {
    return get(this.attributes(), path)
  }

  attributes() {
    if (this._value) {
      return this._value.attributes
    }
  }

  included(options = {}) {
    if (arguments.length) {
      return this._included[arguments[0]]
    }
    return this._included
  }

  toJSON(options) {
    const data = postTransformObject(this._value, this._options)

    if(options) {
      if('include' in options) {
        data.relationships = {}
        for(let type in options.include) {
          if(type in this._included) {
            data.relationships[type] = this._included[type].map(resourceID => resourceID.toJSON())
          } else {
            data.relationships[type] = null
          }
        }
      }
    }

    return data
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

// const rID = new ResourceID(source, options)
// const r = new ResourceObject(source, options)

// console.log(rID.toJSON())
// console.log(r.toJSON())

export default ResourceObject

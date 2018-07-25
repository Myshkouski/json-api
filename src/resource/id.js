import pick from 'lodash/pick'
import {
  RESOURCE_IDENTIFIER_PROPS
} from './props'

import preTransformID from '../transform/id/pre'
import postTransformID from '../transform/id/post'

export default class ResourceID {
  static transform(source, options) {
    return preTransformID(source, options)
  }

  constructor(source, options) {
    this._source = source
    // console.log('source', this._source)
    // console.log('options', options)
    this._value = preTransformID(source, options)
    // console.log('value', this._value)
  }

  get id() {
    return this._value && this._value.id
  }

  get type() {
    return this._value && this._value.type
  }

  toJSON(options) {
    return postTransformID(this._value)
  }
}

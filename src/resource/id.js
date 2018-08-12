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
    this._value = preTransformID(source, options)
    this._source = source
    this._options = options
  }

  get id() {
    return this._value && this._value.id
  }

  get type() {
    return this._value && this._value.type
  }

  copy() {
    return new this.constructor(this._source, this._options)
  }

  toJSON() {
    return postTransformID(this._value, this._options)
  }
}

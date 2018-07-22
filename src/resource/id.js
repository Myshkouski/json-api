import pick from 'lodash/pick'
import {
  RESOURCE_IDENTIFIER_PROPS
} from './props'
import transformID from '../transform/id'

export default class ResourceID {
  static get transform() {
    return transformID
  }

  constructor(source, options) {
    this._source = source
    this._value = ResourceID.transform(source, options)
  }

  get id() {
    return this._value && this._value.id
  }

  get type() {
    return this._value && this._value.type
  }

  toJSON(options) {
    if (isNil(this._value)) {
      return null
    }

    data = pick(data, RESOURCE_PROPS)

    return data
  }
}

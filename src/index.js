import get from 'lodash/get'
import set from 'lodash/set'

import fetch from './fetch'

import {
  ResourceObject,
  ResourceID
} from './resource'

import {
  ResourceIDCollection,
  ResourceObjectCollection
} from './collection'

class JsonApi {
  static get ResourceObject() {
    return ResourceObject
  }

  static get ResourceID() {
    return ResourceID
  }

  static get ResourceObjectCollection() {
    return ResourceObjectCollection
  }

  static get ResourceIDCollection() {
    return ResourceIDCollection
  }

  constructor(options = {}) {
    this.options = {}
    this._connected = {}
  }

  connect(type, fetch) {
    const keys = [
      'create',
      'read',
      'update',
      'delete'
    ]
    const _createTypeError = () => new TypeError('Invalid argument type for fetch')
    const _fetch = {}
    if (fetch instanceof Function) {
      keys.forEach(key => _fetch[key] = fetch)
    } else if (fetch instanceof Object) {
      keys.forEach(key => {
        if (!_fetch[key] instanceof Function) {
          throw _createTypeError()
        }
        _fetch[key] = fetch[key]
      })
    } else {
      throw _createTypeError()
    }

    this._connected[type] = _fetch
  }

  fetch(action, type, options, ...args) {
    return fetch(this._connected, action, type, options, ...args)
  }
}

export default JsonApi

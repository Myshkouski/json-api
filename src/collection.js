import equal from 'lodash/isEqual'

import {
  IndexedCache
} from './cache'

function serialize(resource) {
  if(typeof resource !== 'object') {
    throw new TypeError()
  }

  let key = ''

  for(let prop of ['type','id']) {
    let value = resource[prop]

    if(typeof value !== 'string') {
      value = value.toString()
    }

    value = value.replace('\\', '\\\\')
    value = value.replace('.', '\\.')

    key += value
  }

  return key
}

class ResourceCollection {
  constructor() {
    this.serialize = serialize

    if('0' in arguments) {
      const array = arguments[0]
      array.forEach(value => this.set(value, value))
    }
  }

  // reindex(entries) {
  //   if(!(entries instanceof Array)) {
  //     throw new TypeError('First argument should be an array')
  //   }
  //
  //   this._c.empty()
  //
  //   entries.forEach(([path, value]) => this.add(path, value))
  // }
}

export default ResourceCollection

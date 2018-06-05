import set from 'lodash/set'
import get from 'lodash/get'
import pick from 'lodash/pick'
import isEmpty from 'lodash/isEmpty'

import {
  RESOURCE_PROPS
} from './transform/resourceProps'
import pretransform from './transform/pre'
import fields from './transform/fields'
import TypeStore from './typeStore'

class ResourceIdentifier {
  constructor(source, options) {
    Object.defineProperties(this, {
      source: {
        value: source
      },
      _r: {
        value: pretransform(source, options)
      }
    })
  }

  get id() {
    return this._r && this._r.id
  }

  get type() {
    return this._r && this._r.type
  }

  toJSON(options) {
    return pick(this._r, ['type', 'id', 'meta'])
  }
}

class ResourceObject extends ResourceIdentifier {
  constructor(source, options) {
    super(source, options)

    this._a = fields(this._r, options.fields)
    this._i = include(this.source, options.relationships)
  }

  set(...args) {
    return set(this._r, ...args)
  }

  get(...args) {
    return get(this._r, ...args)
  }

  toJSON(options) {
    const resource = pick(this._r, RESOURCE_PROPS)

    if (this._i) {
      resource.relationships = Object.entries(this._i).reduce((relationships, entry) => {
        const [type, store] = entry

        const relationship = store.toJSON(options && options[type])

        relationships[type] = isEmpty(relationship) ? null : relationship

        return relationships
      }, {})
    }

    if (this._a) {
      resource.attributes = this._a
    }

    return resource
  }
}

function include(source, options) {
  if (typeof options === 'object') {
    const included = {}

    for (let type in options) {
      included[type] = new TypeStore(ResourceIdentifier, source, options[type])
    }

    return included
  }

  return null
}

// const source = {
//   '_id': 1,
//   'author': 1
// }
//
// const options = {
//   alias: {
//     'id': '_id',
//     'meta.source': ''
//   },
//   defaults: {
//     'type': 'articles'
//   },
//   relationships: {
//     'author': {
//       from: 'author',
//       alias: {
//         'id': ''
//       },
//       defaults: {
//         'type': 'people'
//       }
//     }
//   }
// }
//
// const i = new ResourceObject(source, options)
// console.dir(i.toJSON(), {
//   depth: Infinity
// })

export {
  ResourceObject,
  ResourceIdentifier
}

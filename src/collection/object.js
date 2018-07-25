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
    return this._included
  }

  toJSON(options, globalScopeCollection = this) {
    return transform(this.values(), options, globalScopeCollection).map(resource => resource.toJSON(options))
  }
}

// const sourceA = [
//   {
//     id: 1,
//     test: true,
//     name: 'one',
//     rel: 1
//   },
//   {
//     id: 2,
//     test: true,
//     name: 'two',
//     rel: 1
//   },
//   {
//     id: 3,
//     test: true,
//     name: 'three',
//     rel: 1
//   }
// ]
//
// const sourceB = [
//   {
//     id: 1,
//     type: 'types#rel'
//   }
// ]
//
// const options = {
//   defaults: {
//     type: 'types#test'
//   },
//   relationships: {
//     'rel': {
//       alias: {
//         id: 'rel'
//       },
//       defaults: {
//         type: 'types#test->rel'
//       },
//       // fallback: null,
//       fallback: src => null
//     }
//   },
//   sort: [
//     ['name', -1]
//   ],
//   page: {
//     strategy: 'offset',
//     offset: 0,
//     limit: 1
//     // next: '/next/2',
//     // prev() {
//     //   return '/prev/1'
//     // },
//     // bounds() {
//     //   return {
//     //     offset: 1,
//     //     end: 2
//     //   }
//     // }
//   }
// }
//
// const cA = new ResourceCollection(sourceA, options)
// const cB = new ResourceCollection(sourceB, options)
// const cAB = ResourceCollection.merge(cA, cB)
//
// console.log(cA.toJSON(options, cAB))

export default ResourceCollection

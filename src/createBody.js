import {
  ResourceObject
} from './resource'
import Collection from './collection'

export default function createBody(type, options, includeTypeOptions, avl) {
  const {
    data
  } = avl.find(type).data

  const included = data._s._i

  const includedAvl = new Collection()

  for(let includedType in included) {
    const typeStore = included[includedType]

    console.log(typeStore.single, typeStore)

    if(typeStore.single) {
      const resource = avl.find(type + '.' + includedType).data.data._s

      includedAvl.add(resource)
    } else {
      const resources = avl.find(type + '.' + includedType).data.data._s

      resources._avl.forEach(node => {
        includedAvl.add(node.data)
      })
    }
  }

  return {
    data: data.toJSON(),
    included: includedAvl.toJSON()
  }
}

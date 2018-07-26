import {
  ResourceObject
} from './resource'
import {
  ResourceObjectCollection
} from './collection'

export default function createBody(type, options, includeTypeOptions, globalScopeCollection) {
  const included = new ResourceObjectCollection()

  for(let includedType in included) {
    const typeStore = included[includedType]

    if(!typeStore.isArray()) {
      const resource = avl.find(type + '.' + includedType).data.data._s

      includedAvl.add(resource)
    } else {
      const resources = avl.find(type + '.' + includedType).data.data._s

      resources._avl.forEach(node => {
        includedAvl.add(node.data)
      })
    }
  }
  //
  // return {
  //   data: data.toJSON(),
  //   included: includedAvl.toJSON()
  // }
}

import {
  ResourceObject
} from './resource'
import {
  ResourceObjectCollection
} from './collection'

export default function createBody(type, options, includeTypeOptions, fetched) {
  const included = new ResourceObjectCollection()

  const {
    data
  } = fetched.find(type).data
  console.log(data.toJSON(options))
  
  return {
    data: data.toJSON(),
    // included: includedAvl.toJSON()
  }
}

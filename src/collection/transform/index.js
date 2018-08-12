import pre from './pre'
import include from './include'

const postTransform = (data, options, globalScopeCollection) => {
  if (!options) {
    return data
  }

  data = pre(data, options, globalScopeCollection)

  if('include' in options) {
    data = include(data, options.include, globalScopeCollection)
  }

  return data
}

export default postTransform

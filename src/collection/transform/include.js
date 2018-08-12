import isNil from 'lodash/isNil'

export default (data, options, globalScopeCollection) => {
  return data.map(resourceObject => {
    const included = resourceObject.included()

    if(isNil(included)) {
      return null
    }

    const _resource = resourceObject.copy()

    for(let type in options) {
      if(type in included) {
        _resource._included[type] = included[type].toArray(options[type])
      } else {
        _resource._included[type] = null
      }
    }

    return _resource
  })
}

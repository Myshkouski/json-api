import merge from 'lodash/merge'
import defaults from 'lodash/defaults'
import pick from 'lodash/pick'
import isObject from 'lodash/isObject'
import isNil from 'lodash/isNil'

import assignAlias from './alias'
import {
  RESOURCE_IDENTIFIER_ESSENTIAL_PROPS
} from '../resourceProps'

function pretransform(data, options) {
  if (isNil(data)) {
    return data
  }

  const isOptionsPassed = isObject(options)

  if (isOptionsPassed) {
    if ('alias' in options) {
      data = assignAlias(data, options.alias)
    }

    if ('defaults' in options) {
      data = defaults({}, data, options.defaults)
    }

    if ('merge' in options) {
      data = merge({}, data, options.merge)
    }
  }

  if (isObject(data)) {
    data = RESOURCE_IDENTIFIER_ESSENTIAL_PROPS.reduce((data, key) => {
      if (isNil(data[key])) {
        const error = new TypeError(`Cannot transform '${ key }' prop to string`)
        error.data = data
        error.key = key
        throw error
      }

      data[key] += ''

      return data
    }, Object.assign({}, data))
  }

  if (isOptionsPassed) {
    if ('links' in options) {
      data.links = options.links(data.type, data.id)
    }
  }

  return data
}

export default pretransform

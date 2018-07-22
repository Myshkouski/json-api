import pick from 'lodash/pick'
import isObject from 'lodash/isObject'
import isNil from 'lodash/isNil'

import coreTransformID from './core'

import {
  RESOURCE_IDENTIFIER_PROPS
} from '../../resource/props'

function transform(data, options) {
  if (isNil(data)) {
    return null
  }

  data = coreTransformID(data, options)

  if (isObject(data)) {
    data = pick(data, RESOURCE_IDENTIFIER_PROPS)
  }

  return data
}

export default transform

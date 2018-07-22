import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'

import coreTransformObject from './core'

import {
  RESOURCE_PROPS
} from '../../resource/props'

function transformObject(data, options) {
  if (isNil(data)) {
    return null
  }

  data = coreTransformObject(data, options)

  data = pick(data, RESOURCE_PROPS)

  return data
}

export default transformObject

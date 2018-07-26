import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'
import isObject from 'lodash/isObject'
import isFunction from 'lodash/isFunction'

import {
  RESOURCE_PROPS
} from '../../resource/props'

function postTransformObject(data, options) {
  if (isNil(data)) {
    return null
  }

  if (isObject(options)) {
    if ('fields' in options) {
      const attributes = pick(data.attributes, options.fields)

      if (!isEmpty(attributes)) {
        data.attributes = attributes
      }
    }
  }

  data = pick(data, RESOURCE_PROPS)

  return data
}

export default postTransformObject

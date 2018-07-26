import pick from 'lodash/pick'
import omit from 'lodash/omit'
import defaults from 'lodash/defaults'
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import isFunction from 'lodash/isFunction'

import {
  RESOURCE_PROPS
} from '../../resource/props'

function preTransformObject(data, options) {
  const alienMembers = omit(data, RESOURCE_PROPS)

  if (!isEmpty(alienMembers)) {
    data.attributes = defaults(data.attributes, alienMembers)
  }

  if (isObject(options)) {
    if ('links' in options) {
      if (isFunction(options.links)) {
        data.links = options.links(data.type, data.id)
      } else {
        data.links = Object.assign({}, options.links)
      }
    }
  }

  return data
}

export default preTransformObject

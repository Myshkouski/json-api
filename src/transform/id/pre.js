import merge from 'lodash/merge'
import defaults from 'lodash/defaults'
import pick from 'lodash/pick'
import isObject from 'lodash/isObject'
import isNil from 'lodash/isNil'
import isFunction from 'lodash/isFunction'

import assignAlias from './alias'
import {
  RESOURCE_IDENTIFIER_ESSENTIAL_PROPS
} from '../../resource/props'

function transform(data, options) {
  if (isObject(options)) {
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
    data = Object.assign({}, data)

    for (let prop of RESOURCE_IDENTIFIER_ESSENTIAL_PROPS) {
      if (isNil(data[prop])) {
        if('fallback' in options) {
          if(isFunction(options.fallback)) {
            data = options.fallback(data)
          } else {
            data = options.fallback
          }

          break
        }

        const error = new TypeError(`Cannot transform '${ prop }' prop to string`)
        Object.assign(error, {
          data,
          prop
        })

        throw error
      }

      data[prop] += ''
    }
  }

  return data
}

export default transform

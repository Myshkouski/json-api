import merge from 'lodash/merge'
import pick from 'lodash/pick'
import defaults from 'lodash/defaults'

import assignAlias from './alias'
import rootMembers from './rootMembers'

const preTransform = (data, options) => {
  if ('alias' in options) {
    data = assignAlias(data, options.alias)
  }

  data = rootMembers(data)

  if ('merge' in options) {
    data = merge(data, options.merge)
  }

  if ('defaults' in options) {
    defaults(data, options.defaults)
  }

  if ('fields' in options) {
    data.attributes = omit(data.attributes, options.fields)
  }

  return data
}

export default preTransform

import merge from 'lodash/merge'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import defaults from 'lodash/defaults'

import assignAlias from './alias'
import rootMembers from './rootMembers'
import assignSource from './defineSourceProp'

const preTransform = (data, options) => {
  let source = data

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

  assignSource(data, source)

  return data
}

export default preTransform

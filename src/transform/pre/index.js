import merge from 'lodash/merge'
import defaults from 'lodash/defaults'
import pick from 'lodash/pick'
import get from 'lodash/get'

import assignAlias from './alias'
import rootMembers from './rootMembers'
import defineSourceProp from './defineSourceProp'

const preTransform = (data, options) => {
  let source = data

  if('from' in options) {
    data = get(data, options.from)
  }

  if ('alias' in options) {
    data = assignAlias(data, options.alias)
  }

  data = rootMembers(data)

  defineSourceProp(data, source)

  if ('defaults' in options) {
    defaults(data, options.defaults)
  }

  if ('merge' in options) {
    merge(data, options.merge)
  }

  if ('fields' in options) {
    data.attributes = pick(data.attributes, options.fields)
  }

  return data
}

export default preTransform

import {
  forSingleOrMany,
  forEvery
} from '../wrapFor'

import assignAlias from './alias'
import assignDefaults from './defaults'
import pickProps from './pickProps'
import omitProps from './omitProps'

const _wrappedAssignAlias = forSingleOrMany(assignAlias)
const _wrappedPick = forEvery(pick)

function _applyAttributesFields(data, options) {
  options = options.split(',')
  data.attributes = pick(data.attributes, options)
  return data
}

const _preTransform = _wrapFor((_data, cache, options) => {
  let _source = data

  if ('alias' in options) {
    data = assignAlias(data, options.alias)
  }

  const attributes = omitProps(data, RESOURCE_PROPS)

  if (Object.keys(attributes)) {
    defaults(data, {
      attributes
    })
  }

  data = pick(data, RESOURCE_PROPS)

  if ('id' in data) {
    data.id += ''
  }

  if ('merge' in options) {
    data = merge(data, options.merge)
  }

  if ('defaults' in options) {
    data = assignDefaults(data, options.defaults)
  }

  if ('fields' in options) {
    data = _applyAttributesFields(data, options.fields)
  }

  Object.defineProperty(data, '_source', {
    value: _source
  })

  // if ('include' in options) {
  //   _applyIncluded(data, cache, options.include)
  // }

  return data
})

const _include = _wrapFor((data, cache, options) => {
  if ('include' in options) {
    _applyIncluded(data, cache, options.include)
  }

  return data
})

export default _wrapFor((_data, cache, options) => {
  let data = _data

  if ('alias' in options) {
    data = assignAlias(data, options.alias)
  }

  const attributes = omit(data, RESOURCE_PROPS)

  if (Object.keys(attributes)) {
    defaults(data, {
      attributes
    })
  }

  data = pick(data, RESOURCE_PROPS)

  if ('id' in data) {
    data.id += ''
  }

  if ('merge' in options) {
    data = merge(data, options.merge)
  }

  if ('defaults' in options) {
    data = assignDefaults(data, options.defaults)
  }

  if ('fields' in options) {
    data = _applyAttributesFields(data, options.fields)
  }

  Object.defineProperty(data, '_source', {
    value: _data
  })

  // if ('include' in options) {
  //   _applyIncluded(data, cache, options.include)
  // }

  return data
})

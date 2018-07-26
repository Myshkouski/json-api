import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'

import {
  ResourceObject,
  ResourceID
} from './resource'
import {
  ResourceIDCollection,
  ResourceObjectCollection
} from './collection'

import PromiseTree from './promiseTree'

import createBody from './createBody'

function createQueryIds(type, data) {
  if (data instanceof ResourceID) {
    let included = data.included(type)

    if (included) {
      return included.id
    }
  } else if (data instanceof ResourceObjectCollection) {
    let ids = new Set()

    const values = data.values()

    values.forEach(resource => {
      let included = resource.included(type)
      if (included) {
        if (included.isArray()) {
          included.values().forEach(resource => {
            ids.add(resource.id)
          })
        } else {
          ids.add(included.values()[0].id)
        }
      }
    })

    ids = Array.from(ids.values())

    if (isEmpty(ids)) {
      return null
    }

    return ids
  }
}

export default async function fetch(queries, action, type, options, ...args) {
  const globalScopeCollection = new ResourceObjectCollection()

  async function _fetch(type, typeOptions) {
    const query = queries[type][action]
    const prefetched = await query(typeOptions)

    const result = {
      data: new ResourceObjectCollection(prefetched.data, typeOptions)
    }

    return result
  }

  const typeOptions = options[type]

  const tree = new PromiseTree()

  const includedTree = tree.set([type], async (opts, next) => {
    const result = await _fetch(type, typeOptions)

    if ('include' in typeOptions) {
      if (!('included' in result)) {
        await next(result.data)
      }
    }

    return result
  })

  const includeTypeOptions = typeOptions.include.map(path => {
    return includedTree.parse(path)
  })

  includeTypeOptions.forEach(path => {
    path.forEach((type, index, path) => {
      includedTree.set(path.slice(0, index + 1), async (data, next) => {
        if (data) {
          const ids = createQueryIds(type, data)

          if (isNil(ids) || isEmpty(ids)) {
            return null
          }

          let typeOptions = Object.assign({}, options[type])

          typeOptions.filter = merge({}, typeOptions.filter, {
            id: ids
          })

          const result = await _fetch(type, typeOptions)

          if (!('included' in result)) {
            await next(result.data)
          }

          return result
        }
      })
    })
  })

  return await tree.resolve(null)

  // const body = createBody(type, options, includeTypeOptions, await tree.resolve(null))
  //
  // return body
}

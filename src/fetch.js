import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'

import {
  ResourceObject,
  ResourceIdentifier
} from './resource'
import ResourceCollection from './collection'

import PromiseTree from './promiseTree'
import TypeStore from './typeStore'

function createQueryIds(type, data) {
  if (data._s instanceof ResourceIdentifier) {
    const resource = data._s

    if (resource._i && resource._i[type]) {
      return resource._i[type]._s.id
    }
  } else if (data._s instanceof ResourceCollection) {
    let ids = new Set()

    const values = data._s.values()

    values.forEach(resource => {
      if (resource._i && resource._i[type]) {
        const _ids = resource._i[type]._s.id

        if (_ids) {
          if (Array.isArray(_ids)) {
            _ids.forEach(id => ids.add(id))
          } else {
            ids.add(_ids)
          }
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
  const typeStore = new TypeStore(ResourceObject, [], {})

  async function _fetch(type, typeOptions) {
    const query = queries[type][action]
    const prefetched = await query(typeOptions)

    const result = {
      data: new TypeStore(ResourceObject, prefetched.data, typeOptions)
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

  typeOptions.include.map(path => {
    return includedTree.parse(path)
  }).forEach(path => {
    path.forEach((type, index, path) => {
      return includedTree.set(path.slice(0, index + 1), async (data, next) => {
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

  const r = await tree.resolve(null)

  console.dir(r.map(([path, r]) => {
    if (r) {
      const {
        data
      } = r
      return [path, data ? data.toJSON() : data]
    } else {
      return [path, r]
    }
  }), {
    depth: Infinity
  })

  return r
}

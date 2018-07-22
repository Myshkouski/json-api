import Avl from 'avl'
import get from 'lodash/get'

import ResourceID from '../resource/id'
import compareResourceIDs from '../helpers/compareResourceIDs'

class ResourceIDCollection {
  constructor(source, options) {
    Object.defineProperties(this, {
      '_avl': {
        value: new Avl(compareResourceIDs, true)
      },
      '_array': {
        writable: true,
        value: false
      },
      '_empty': {
        writable: true,
        value: true
      }
    })

    const ResourceConstructor = this.ResourceConstructor

    if(arguments.length) {
      if (Array.isArray(source)) {
        source.forEach(source => {
          const resource = new ResourceConstructor(source, options)

          if (!collection.has(resource)) {
            this.add(resource)
          }
        })

        if (collection.count()) {
          this._empty = false
        }
        this._array = true
      } else {
        const resource = new ResourceConstructor(source, options)
        this.add(resource)
        this._array = false
        this._empty = false
      }
    }
  }

  get ResourceConstructor() {
    return ResourceIDCollection
  }

  isArray() {
    return this._array
  }

  isEmpty() {
    return this._nullable
  }

  has(resource) {
    return this._avl.has(resource)
  }

  keys() {
    return this._avl.keys()
  }

  values() {
    return this._avl.values()
  }

  entries() {
    const entries = []

    this._avl.forEach(node => {
      entries.push([
        node.key,
        node.data
      ])
    })

    return entries
  }

  count() {
    return this.keys().length
  }

  add(id, value = id) {
    this._avl.insert(id, value)

    return this.count()
  }

  update(resource) {
    if(this.has(resource)) {
      this.add(resource)
      return true
    }

    return false
  }
}

export default ResourceIDCollection

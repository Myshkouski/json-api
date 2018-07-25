import Avl from 'avl'
import get from 'lodash/get'

import ResourceID from '../resource/id'
import compareResourceIDs from '../helpers/compareResourceIDs'

class ResourceIDCollection {
  constructor(source, options) {
    Object.assign(this, {
      _avl: new Avl(compareResourceIDs, true),
      _isArray: false,
      _isEmpty: true
    })

    const ResourceConstructor = this.ResourceConstructor

    if(arguments.length) {
      if (Array.isArray(source)) {
        source.forEach(source => {
          const resource = source instanceof ResourceID ? source : new ResourceConstructor(source, options)

          if (!this.has(resource)) {
            this.add(resource)
          }
        })

        if (this.count()) {
          this._isEmpty = false
        }
        this._isArray = true
      } else {
        const resource = source instanceof ResourceID ? source : new ResourceConstructor(source, options)
        this.add(resource)
        this._isArray = false
        this._isEmpty = false
      }
    }
  }

  get ResourceConstructor() {
    return ResourceID
  }

  isArray() {
    return this._isArray
  }

  isEmpty() {
    return this._isEmpty
  }

  toJSON(options, globalScopeCollection = this) {
    if(this.isArray()) {
      return this.values().map(resourceID => resourceID.toJSON(options))
    } else if(this.isEmpty()) {
      return null
    } else {
      const resourceID = this.values()[0]
      return resourceID.toJSON(options)
    }
  }

  has(resourceID) {
    return this._avl.contains(resourceID)
  }

  get(resourceID) {
    const node = this._avl.find(resourceID)
    if(node) {
      return node.data
    }
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

  add(resource) {
    this._avl.insert(resource, resource)

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

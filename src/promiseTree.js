import Node from './tree'
import once from 'lodash/once'
import Avl from 'avl'

import comparePaths from './helpers/comparePaths'
import parsePath from './helpers/parsePath'

function _resolveChildren(data, node, rootNode) {
  node.children.forEach(child => {
    child.data.path = [...node.path, child.key]
  })
  return Promise.all(node.children.values().map(node => _resolve(data, node, rootNode)))
}

function _resolve(data, node, rootNode = node) {
  if (rootNode.rejected) {
    throw rootNode.rejected
  }

  if (node === rootNode) {
    return _resolveChildren(data, node, rootNode).then(() => rootNode.value)
  }

  return Promise.resolve(data)
    .then(data => {
      const next = once(data => _resolveChildren(data, node, rootNode))
      return node.value.call(null, data, next)
    })
    .then(data => {
      node.resolved = data
      rootNode.value.push([node.path, data])
      return data
    })
    .catch(error => {
      node.rejected = rootNode.rejected = error
      throw error
    })
}

class PromiseTree extends Node {
  constructor(options = {}) {
    super(options)

    this.set(new Avl(comparePaths, true))
    this.path = parsePath([])
  }

  resolve(data) {
    return _resolve(data, this)
  }
}

export default PromiseTree

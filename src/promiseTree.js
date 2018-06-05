import Node from '@alexeimyshkouski/node-tree'
import once from 'lodash/once'

function _resolveChildren(data, node, rootNode) {
  node.forEach(child => {
    child.data.path = [...node.path, child.key]
  })
  return Promise.all(node.children().map(node => _resolve(data, node, rootNode)))
}

function _resolve(data, node, rootNode = node) {
  if (rootNode.rejected) {
    throw rootNode.rejected
  }

  if (node === rootNode) {
    return _resolveChildren(data, node, rootNode).then(() => rootNode.value())
  }

  return Promise.resolve(data)
    .then(data => {
      const next = once(data => _resolveChildren(data, node, rootNode))
      return node.value().call(null, data, next)
    })
    .then(data => {
      node.resolved = data
      rootNode.value().push([node.path, data])
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

    this.set([])
    this.path = []
  }

  resolve(data) {
    return _resolve(data, this)
  }
}

export default PromiseTree

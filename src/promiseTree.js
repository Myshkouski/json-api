function once(f) {
  let called = false

  return function() {
    if (!called) {
      called = true
      return f.apply(this, arguments)
    }
  }
}

function _createPromiseTree(paths) {
  if (typeof paths !== 'object') {
    throw new TypeError(`First argument should be object`)
  }

  const tree = Object.entries(paths)
    .reduce((tree, [path, value]) => {
      const _path = path
      if (typeof path === 'string') {
        path = path.split('.')
      }

      const length = path.length

      const targetNode = path.reduce((node, key) => {
        if (!('resolve' in node)) {
          node.resolve = null
        }

        if (!node.then) {
          node.then = {}
        }

        if (!(key in node.then)) {
          node.then[key] = {}
        }

        return node.then[key]
      }, tree)

      Object.defineProperties(targetNode, {
        path: {
          value: path
        },
        resolved: {
          get() {
            return tree._resolvedTree[_path]
          },
          set(value) {
            tree._resolvedTree[_path] = value
          }
        }
      })
      targetNode.resolve = value
      if (!targetNode.then) {
        targetNode.then = null
      }

      return tree
    }, {})

  Object.defineProperty(tree, '_resolvedTree', {
    value: {}
  })

  return tree
}

function _resolvePromiseTree(result, node, rootNode = node) {
  if (rootNode.rejected) {
    return rootNode.rejected
  }

  return Promise.resolve(result)
    .then(result => {
      const resolveSubnodes = once(() => {
        if (node.then) {
          return Promise.all(
            Object.keys(node.then)
            .map(key => {
              return _resolvePromiseTree(result, node.then[key], rootNode)
            })
          ).then(() => result)
        }

        return result
      })

      if (node.resolve) {
        return node.resolve(result, resolveSubnodes)
      } else {
        return resolveSubnodes()
      }
    })
    .then(result => {
      node.resolved = result
      return rootNode._resolvedTree
    })
    .catch(error => {
      node.rejected = error
      throw error
    })
}

export default function PromiseTree(paths, result) {
  const tree = _createPromiseTree(paths)

  let rejected, set = false

  Object.defineProperty(tree, 'rejected', {
    get() {
      return rejected
    },
    set(value) {
      if (!set) {
        set = true
        rejected = value
      }
    }
  })

  return _resolvePromiseTree(result, tree)
}

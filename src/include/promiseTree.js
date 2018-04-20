import set from 'lodash/set'

function _transformTreePath(path) {
  let split

  if(Array.isArray(path)) {
    split = path
  } else if(typeof path == 'string') {
    split = path.split('.')
  } else {
    throw TypeError('Path should be a string or array')
  }

  return split.slice(0, -1).reduce((split, key) => {
    split.push(key)
    split.push('then')
    return split
  }, []).concat(split.slice(-1))
}

function _createNode(run, then) {
  return {
    run,
    then
  }
}

function _createPromiseTree(paths) {
  const then = {}

  for (let path in paths) {
    set(then, _transformTreePath(path), _createNode(paths[path], null))
  }

  const rootNode = _createNode(result => result, then)

  return rootNode
}

async function _runPromiseTree(result, node, rootNode = node) {
  if(rootNode.rejected) {
    throw 'cancelled'
  }

  try {
    if (node) {
      await node.run(result)

      if (node.then) {
        const keys = Object.keys(node.then)

        await Promise.all(keys.map(key => _runPromiseTree(result, node.then[key], rootNode)))
      }

      return result
    }
  } catch(error) {
    node.rejected = true
    throw error
  }
}

export default class PromiseTree {
  constructor(paths) {
    const tree = _createPromiseTree(paths)

    Object.defineProperty(this, '_tree', {
      value: tree
    })
  }

  static run(paths, data) {
    const promiseTree = new PromiseTree(paths)
    return promiseTree.run(data)
  }

  run(data) {
    return _runPromiseTree(data, this._tree)
  }
}

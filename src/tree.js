import Avl from 'avl'
import isString from 'lodash/isString'

const createParseError = () => new TypeError(`Argument "path" should be non-empty string or array of strings`)

class Node {
  constructor(options = {}) {
    this.children = new Avl(this.compare.bind(this), true)
  }

  parse(path) {
    if (Array.isArray(path)) {
      for (let index in path) {
        if (!isString(path[index])) {
          throw createParseError()
        }
      }

      return path
    } else if (isString(path)) {
      return path.split('.')
    } else {
      throw createParseError()
    }
  }

  compare(a, b) {
    a = this.parse(a)
    b = this.parse(b)

    if (a.length > b.length) {
      return 1
    } else if (a.length < b.length) {
      return -1
    } else {
      for (let index in a) {
        if (a[index] > b[index]) {
          return 1
        } else if (a[index] < b[index]) {
          return -1
        }
      }
    }

    return 0
  }

  set() {
    let path = []
    let value = arguments[0]
    let node = this
    if (1 in arguments) {
      path = arguments[0]
      value = arguments[1]
      node = node.sub(path, true)
    }
    node.value = value
    return node
  }

  sub(path, create = false) {
    path = this.parse(path)
    let node = this

    for (let index = 0; index < path.length; index++) {
      const key = path[index]
      let child = node.children.find(key)

      if (child) {
        node = child.data
      } else if (create) {
        child = new this.constructor()

        node.children.insert(key, child)

        node = child
      } else {
        node = null
        break
      }
    }

    return node
  }

  get(path) {
    const node = this.sub(path)

    if (node) {
      return node.value
    }
  }

  append(path, value) {
    const node = this.sub(path, true)

    node.set(value)

    return node
  }
}

export default Node

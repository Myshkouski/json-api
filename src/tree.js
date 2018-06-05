import avl from 'avl'
// import isString from 'lodash/isString'

function isString(value) {
  return (typeof value)[0] = 's'
}

const createParseError = () => new TypeError(`Argument "path" should be non-empty string or array of strings`)

class Node {
  constructor(options = {}) {
    this.compare = options.compare || compare

    this.children = new Avl(this.compare, true)
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
    a = parse(a)
    b = parse(b)

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
    if (1 in arguments) {

    }
    this.value = value
  }

  sub(path, create = false) {
    path = this.parse(path)
    let node = this

    for (index = 0; index < path.length; index++) {
      let child = node.children.find(key)

      if (child) {
        node = child
      } else if (create) {
        child = new Node({
          parse,
          compare
        } = this)

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

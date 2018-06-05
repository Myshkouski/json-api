import Avl from 'avl'

export class IndexedCache {
  constructor() {
    this._avl = new Avl((...args) => this.compare(...args), true)
  }

  keys() {
    return this._avl.keys()
  }

  values() {
    return this._avl.values()
  }

  has(key) {
    return this._avl.contains(key)
  }

  compare(a, b) {
    if (a < b) {
      return -1
    }

    if (a > b) {
      return 1
    }

    return 0
  }

  set(key, value) {
    this._avl.insert(key, value)

    return this
  }

  get(key) {
    return this._avl.find(key)
  }

  remove(key) {
    this._avl.remove(key)
  }
}

export function forSingleOrMany(f) {
  return function(data, ...args) {
    if (Array.isArray(data)) {
      return data.map(data => f.call(this, data, ...args))
    } else if (typeof data == 'object') {
      return f.apply(this, arguments)
    }
    return data
  }
}

export function forMany(f) {
  return function(...args) {
    const data = args[0]
    if (Array.isArray(data)) {
      return f.apply(this, args)
    }
    return data
  }
}

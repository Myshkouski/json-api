export function forMany(f) {
  return function() {
    const data = arguments[0]
    if (Array.isArray(data)) {
      return f.apply(this, args)
    }
    return data
  }
}

export function forSingleOrMany(f) {
  return function(data, ...args) {
    if (Array.isArray(data)) {
      return data.map(data => f.apply(this, [data, ...args])).filter(data => !(data === undefined || data === null))
    } else {
      return f.apply(this, arguments)
    }
    return data
  }
}

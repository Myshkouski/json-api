export function forSingleOrMany(f) {
  return function(...args) {
    const data = args[0]
    if (Array.isArray(data)) {
      return data.map(data => f.apply(this, args))
    } else if (typeof data == 'object') {
      return f.apply(this, args)
    }
    return data
  }
}

function forMany(f) {
  return function(...args) {
    const data = args[0]
    if (Array.isArray(data)) {
      return f.apply(this, args)
    }
    return data
  }
}

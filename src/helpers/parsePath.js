function isString(value) {
  return (typeof value)[0] === 's'
}

function createParseError() {
  return new TypeError(`Argument "path" should be non-empty string or array of strings`)
}

export default path => {
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

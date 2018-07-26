import parsePath from './parsePath'

export default (a, b) => {
  a = parsePath(a)
  b = parsePath(b)

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

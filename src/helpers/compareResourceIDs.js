export default function compare(a, b) {
  if (!a) {
    if (!b) {
      return 0
    }

    return -1
  } else if (!b) {
    return 1
  }

  for (let key of ['type', 'id']) {
    if (a[key] < b[key]) {
      return -1
    }

    if (a[key] > b[key]) {
      return 1
    }
  }

  return 0
}

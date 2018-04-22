function _sortByNumberOrCharCodes(vector, a, b) {
  if (a > b) {
    return vector
  } else if (a < b) {
    return -1 * vector
  }

  return 0
}

function _sortByKey(rule, a, b) {
  const [key, vector] = rule
  return _sortByNumberOrCharCodes(vector, get(a, key), get(b, key))
}

function _parseSortRules(string) {
  return string.split(',').map(key => key[0] == '-' ? [key.slice(1), -1] : [key, 1])
}

const _applySort = _wrapForManyOnly((data, options) => {
  const rules = _parseSortRules(options)
  return data.sort((a, b) => {
    for (let rule of rules) {
      const res = _sortByKey(rule, a.attributes, b.attributes)

      if (res) {
        return res
      }
    }

    return 0
  })
})

export default _applySort

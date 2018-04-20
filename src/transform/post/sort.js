function _sortByNumberOrCharCodes(reverse, a, b) {
  if (a > b) {
    return reverse
  } else if (a < b) {
    return -1 * reverse
  }

  return 0
}

function _sortByKey(rule, a, b) {
  const [key, reverse] = rule
  return _sortByNumberOrCharCodes(reverse, get(a, key), get(b, key))
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

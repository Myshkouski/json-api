import get from 'lodash/get'

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

function _parseSortRules(options) {

  return string.split(',')
}

const applySort = (data, options) => {
  if(typeof options === 'string') {
    options = options.split(',')
  }

  if(!Array.isArray(options)) {
    throw new TypeError('Sort options should be an array or string')
  }

  options = options.map(rule => {
    if(typeof rule === 'string') {
      rule = (rule[0] == '-') ? [rule.slice(1), -1] : [rule, 1]
    }

    if(!Array.isArray(rule)) {
      throw new TypeError('Sort rules should be an array or string')
    }

    if(typeof rule[1] !== 'number') {
      throw new TypeError('Sort order should be a number')
    }

    return rule
  })

  return data.sort((a, b) => {
    if('attributes' in a && 'attributes' in b) {
      for (let rule of options) {
        const res = _sortByKey(rule, a.attributes, b.attributes)

        if (res) {
          return res
        }
      }
    }

    return 0
  })
}

export default applySort

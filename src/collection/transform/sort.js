import get from 'lodash/get'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'

function _sortByNumberOrCharCodes(vector, a, b) {
  if (a > b) {
    return vector
  } else if (a < b) {
    return -1 * vector
  }

  return 0
}

function _sortByKey(rule, a, b) {
  const [prop, vector] = rule
  return _sortByNumberOrCharCodes(vector, a.attr(prop), b.attr(prop))
}

function _parseSortRules(options) {
  return string.split(',')
}

function sort(data, options, globalScopeCollection) {
  if (isString(options)) {
    options = options.split(',')
  }

  if (!Array.isArray(options)) {
    throw new TypeError('Sort options should be an array or string')
  }

  options = options.map(rule => {
    if (isString(rule)) {
      rule = (rule[0] == '-') ? [rule.slice(1), -1] : [rule, 1]
    }

    if (!Array.isArray(rule)) {
      throw new TypeError('Sort rules should be an array or string')
    }

    if (!isNumber(rule[1])) {
      throw new TypeError('Sort order should be a number')
    }

    return rule
  })

  return data.sort((a, b) => {
    for (let rule of options) {
      const res = _sortByKey(rule, globalScopeCollection.get(a), globalScopeCollection.get(b))

      if (res) {
        return res
      }
    }

    return 0
  })
}

export default sort

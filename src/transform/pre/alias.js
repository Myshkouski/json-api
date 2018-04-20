import omit from 'lodash/omit'
import set from 'lodash/set'

export default function assignAlias(data, alias, fullPath) {
  if (typeof alias == 'string') {
    return alias.length ? get(data, alias) : data
  } else {
    let obj = Array.isArray(alias) ? [] : Object.assign({}, data)

    if (typeof alias == 'object') {
      const _omitProps = []

      for (let key in alias) {
        const path = (fullPath || '') + key

        let _alias = alias[key]

        const aliased = assignAlias(data, _alias, path)

        if (path != _alias) {
          _omitProps.push(_alias)
        }

        set(obj, key, aliased)
      }

      if(_omitProps.length) {
        obj = omit(obj, _omitProps)
      }
    }

    return obj
  }
}

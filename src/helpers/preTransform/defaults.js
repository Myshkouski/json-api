import defaults from 'lodash/defaults'

export default function assignDefaults(data, options) {
  return defaults({}, data, options)
}

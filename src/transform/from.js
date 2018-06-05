import get from 'lodash/get'

export default function from(data, options) {
  data = get(data, options)

  return data
}

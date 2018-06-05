import pick from 'lodash/pick'
import isEmpty from 'lodash/isEmpty'

export default (data, options) => {
  const attributes = pick(data.attributes, options)

  if(!isEmpty(attributes)) {
    data.attributes = attributes
  }

  return data
}

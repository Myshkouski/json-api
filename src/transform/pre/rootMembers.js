import omit from 'lodash/omit'
import defaults from 'lodash/defaults'

import {
  RESOURCE_PROPS
} from './resourceProps'
import applyAttriubtes from './applyAttriubtes'

export default data => {
  const rootAttributes = omit(data, RESOURCE_PROPS)

  if (Object.keys(notIncludedAttributes)) {
    defaults(data, {
      attributes: notIncludedAttributes
    })
  }
  
  data = pick(data, RESOURCE_PROPS)

  return data
}

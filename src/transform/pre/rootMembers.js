import omit from 'lodash/omit'
import pick from 'lodash/pick'
import defaults from 'lodash/defaults'

import {
  RESOURCE_PROPS
} from '../resourceProps'

export default data => {
  const rootAttributes = omit(data, RESOURCE_PROPS)

  if (Object.keys(rootAttributes)) {
    defaults(data, {
      attributes: rootAttributes
    })
  }

  data = pick(data, RESOURCE_PROPS)

  return data
}

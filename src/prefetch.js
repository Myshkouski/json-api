import preTransform from './transform/pre'

import { forSingleOrMany } from './helpers/wrapFor'

const _wrappedPreTransform = forSingleOrMany(preTransform)

export default async function prefetch(query, options, ...args) {
  let {
    data,
    included
  } = await query(options, ...args)

  data = _wrappedPreTransform(data, options)

  return {
    data,
    included
  }
}

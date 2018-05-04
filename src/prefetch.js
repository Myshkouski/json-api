import preTransform from './transform/pre'

import { forSingleOrMany } from './helpers/wrapFor'

const _wrappedPreTransform = forSingleOrMany(preTransform)

export default async function prefetch(query, options, ...args) {
  let res = await query(options, ...args)

  res = Object.assign({}, {
    data: _wrappedPreTransform(res.data, options)
  })

  return res
}

const applyPagination = (data, options, body) => {
  const strategy = pagination[options.strategy]

  if (strategy) {
    const {
      offset,
      end
    } = strategy.bounds(data.length, options.offset, options.limit)

    ;
    ['self', 'first', 'last', 'prev', 'next'].forEach(key => {
      if (typeof strategy[key] == 'function') {
        const query = strategy[key](data.length, offset, end, options.limit)

        // set(body, `links.${ key }`, query)
      }
    })

    data = data.slice(offset, end)

    if (!data.length) {
      data = null
    }

    return data
  }

  throw new ReferenceError('Cannot use pagination strategy:', options.strategy)
}

export default applyPagination

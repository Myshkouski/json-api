import isFunction from 'lodash/isFunction'

import * as paginationStrategies from './paginationStrategies'

const PAGINATION_LINKS_PROPS = ['self', 'first', 'last', 'prev', 'next']

const applyPagination = (dataArray, options) => {
  let strategy = options

  if ('strategy' in options) {
    strategy = paginationStrategies[options.strategy]

    if (!strategy) {
      throw new ReferenceError('Cannot use pagination strategy:', options.strategy)
    }
  }

  const {
    offset,
    end
  } = strategy.bounds(dataArray.length, options.offset, options.limit)

  for (let prop of PAGINATION_LINKS_PROPS) {
    const createQuery = strategy[prop]
    if (createQuery) {
      let query
      if (isFunction(createQuery)) {
        query = createQuery(dataArray.length, offset, end, options.limit)
      } else {
        query = createQuery
      }
      // console.log('!', query)
      /**
       * TODO add links to collection body
       */
    }
  }

  dataArray = dataArray.slice(offset, end)

  // if (!dataArray.length) {
  //   dataArray = null
  // }

  return dataArray
}

export default applyPagination

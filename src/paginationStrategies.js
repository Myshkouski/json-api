const parsePaginationQueryParam = param => {
  param = parseInt(param)

  if (isNaN(param)) {
    param = 0
  } else {
    param = Math.floor(param)
  }

  return param
}

const tranformPaginationQuery = (length, offset, limit) => {
  offset = parsePaginationQueryParam(offset)
  limit = parsePaginationQueryParam(limit)

  if (offset < 0) {
    offset += length
  }

  if (offset < 0) {
    offset = 0
  } else if (offset >= length) {
    offset = length
  }

  if (limit < 0) {
    limit = 0
  } else if (offset + limit > length) {
    limit = length - offset
  }

  return {
    offset,
    limit
  }
}

export const offset = {
  limit(clientLimit, serverLimit) {
    let limit = parsePaginationQueryParam(clientLimit)

    if (limit >= 1 && limit < serverLimit) {
      limit = Math.floor(limit)
    } else if (serverLimit) {
      limit = serverLimit
    } else {
      limit = Infinity
    }

    return limit
  },

  bounds(length, _offset, _limit) {
    const {
      offset,
      limit
    } = tranformPaginationQuery(length, _offset, _limit)

    return {
      offset,
      end: offset + limit
    }
  },
  self(length, _offset, _end, _limit) {
    const {
      offset,
      limit
    } = tranformPaginationQuery(length, _offset, _limit)

    return {
      page: {
        offset,
        limit
      }
    }
  },
  next(length, _offset, _end, _limit) {
    const {
      offset,
      limit
    } = tranformPaginationQuery(length, _end, _limit)

    if (!limit) {
      return null
    }

    return {
      offset,
      limit
    }
  },
  prev: (length, _offset, _end, _limit) => {
    const {
      offset,
      limit
    } = tranformPaginationQuery(_offset, _offset - _limit, _limit)

    if (!limit) {
      return null
    }

    return {
      offset,
      limit
    }
  },
  first: (length, _offset, _end, _limit) => {
    const {
      offset,
      limit
    } = tranformPaginationQuery(length, 0, _limit > length ? length : (_limit > _offset && _offset > 0 ? _offset : _limit))

    return {
      offset,
      limit: _limit
    }
  },
  last: (length, _offset, _end, _limit) => {
    const {
      offset,
      limit
    } = tranformPaginationQuery(length, 2 * _limit < length ? length - _limit : (_limit < length ? (_end + _limit < length ? _end : length - _limit) : 0), _limit)

    return {
      offset,
      limit
    }
  }
}

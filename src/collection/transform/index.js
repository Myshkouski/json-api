import sort from './sort'
import paginate from './paginate'

const postTransform = (data, options, globalScopeCollection) => {
  if (!options) {
    return data
  }

  if ('sort' in options) {
    data = sort(data, options.sort, globalScopeCollection)
  }

  if ('page' in options) {
    data = paginate(data, options.page)
  }

  return data
}

export default postTransform

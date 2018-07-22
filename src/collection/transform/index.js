import sort from './sort'

const posttransform = (data, options) => {
  if(!options) {
    return data
  }

  if('sort' in options) {
    data = sort(data, options.sort)
  }

  // if('page' in options) {
  //   data = paginate(data, options.page)
  // }

  return data
}

export default posttransform

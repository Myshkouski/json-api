import {
  forMany
} from '../../helpers/wrapFor'

// import paginate from './paginate'
import sort from './sort'

const posttransform = (data, typeOptions) => {
  if('sort' in typeOptions) {
    data = sort(data, typeOptions.sort)
  }

  // if('page' in typeOptions) {
  //   data = paginate(data, typeOptions.page)
  // }

  return data
}

export default posttransform

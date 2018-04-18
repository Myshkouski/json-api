import omit from 'lodash/omit'

export default omitProps = (data, props) => {
  return omit(data, props)
}

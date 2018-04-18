import pick from 'lodash/pick'

export default omitProps = (data, props) => {
  return pick(data, props)
}

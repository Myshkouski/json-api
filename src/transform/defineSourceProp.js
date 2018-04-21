export default (data, source) => Object.defineProperty(data, '_source', {
  value: source
})

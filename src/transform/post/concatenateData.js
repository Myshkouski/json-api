export default (...args) => {
  const array = args.reduce((a, b) => {
    if (Array.isArray(b)) {
      return a.concat(b)
    } else {
      return a.concat([b])
    }
  }, [])

  return array.length ? array : null
}

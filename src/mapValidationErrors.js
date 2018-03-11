export default error => {
  const {
    message,
    params,
    dataPath
  } = error

  return {
    detail: message,
    meta: {
      dataPath
    }
  }
}

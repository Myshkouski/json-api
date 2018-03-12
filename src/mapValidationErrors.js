export default error => ({
  message: error.message,
  path: error.dataPath,
  schema: error.parentSchema.$id
})

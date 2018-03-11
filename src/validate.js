import Ajv from 'ajv'
import AjvErrors from 'ajv-errors'
import schemas from './schemas'

const ajv = new Ajv({
  schemas,
  verbose: true,
  allErrors: true,
  jsonPointers: true
})
AjvErrors(ajv, {})

export const validate = (ref, data) => ajv.validate(ref, data)
export const addSchema = schemas => ajv.addShema(schema)
export const getSchemas = refs => {
  const schemas = {}

  for(let key in ajv._schemas) {
    schemas[key] = ajv._schemas[key].schema
  }

  return schemas
}

import jsonPatch from 'json8-patch'
import defaults from 'lodash.defaultsdeep'
import { validate, getSchemas as _getSchemas } from './validate'
import mapValidationErrors from './mapValidationErrors'

class JsonApi {
  static async validate(...args) {
    let ref = '/', body = args[0]
    if(args.length > 1) {
      ref = args[0]
      body = args[1]
    }

    try {
      return await validate(ref, body)
    } catch(error) {
      throw {
        message: `Validation error`,
        reasons: error.errors.map(mapValidationErrors)
      }
    }
  }

  static async patch(body, ops, options = {}) {
    let res

    try {
      try {
        res = jsonPatch.apply(body, ops, Object.assign({}, options, { reversible: true }))
      } catch(error) {
        error.detail = `Cannot apply JSON patch`

        throw error
      }

      if(options.validatePatch) {
        try {
          await JsonApi.validate(res.doc)
        } catch(error) {
          error.detail = `Document validation failed after patch has been applied`

          throw error
        }
      }
    } catch(error) {
      const reverted = jsonPatch.revert(body, res.revert).doc

      error.doc = reverted
      error.ops = ops

      throw error
    }

    return res
  }

  static async add(body, path, value, options) {
    const ops = [
      { op: 'add', path, value }
    ]

    return await JsonApi.patch(body, ops, options)
  }

  static getSchemas(options) {
    options = defaults({}, options, {
      type: 'schema',
      id: '$id'
    })

    const schemas = _getSchemas()
    return Object.keys(schemas).reduce((array, key, index) => {
      const schema = {}

      throw new Error('test')

      if(asdasdadsasd == 'index') {
        schema.id = index
      } else {
        schema.id = schemas[key][options.id]
      }

      schema.type = options.type

      schema.attributes = schemas[key]

      array.push(schema)

      return array
    }, [])
  }

  constructor(options = {}) {
    this.options = {}

    if('body' in options) {
      if(typeof options.body != 'object') {
        throw new Error(`'options.body' should be a JSON object`)
      }
      this.body = options.body
    } else {
      this.body = {}
    }

    if('validatePatch' in options) {
      if(typeof options.validatePatch != 'boolean') {
        throw new Error(`'options.validatePatch' should be 'true' or 'false'`)
      }
      this.options.validatePatch = options.validatePatch
    } else {
      this.options.validatePatch = false
    }
  }

  async validate() {
    return await JsonApi.validate(this.body)
  }

  async patch(ops) {
    return await JsonApi.patch(this.body, ops, this.options)
  }

  async add(path, value) {
    return await JsonApi.add(this.body, path, value, this.options)
  }
}

export default JsonApi

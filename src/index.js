import jsonPatch from 'json8-patch'
import { validate, getSchemas } from './validate'
import mapValidationErrors from './mapValidationErrors'

class JsonApi {
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

    if('validate' in options) {
      if(typeof options.validate != 'boolean') {
        throw new Error(`'options.validate' should be 'true' or 'false'`)
      }
      this.options.validate = options.validate
    } else {
      this.options.validate = false
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

  static async validate(...args) {
    let ref = '/', body = args[0]
    if(args.length > 1) {
      ref = args[0]
      body = args[1]
    }

    try {
      return await validate(ref, body)
    } catch(error) {
      throw error.errors.map(mapValidationErrors)
    }
  }

  static async patch(body, ops, options = {}) {
    let res

    try {
      res = jsonPatch.apply(body, ops, Object.assign({}, options, { reversible: true }))

    } catch(error) {
      throw {
        message: `JSONPatchError: cannot apply patch`,
        meta: {
          doc: jsonPatch.revert(body, res.revert).doc,
          ops
        }
      }
    }

    if(options.validate) {
      try {
        await JsonApi.validate(res.doc)
      } catch(errors) {
        throw {
          message: `ValidationError: document validation failed after patch has been applied`,
          meta: {
            errors
            // doc: jsonPatch.revert(body, res.revert).doc,
            // ops
          }
        }
      }
    }

    return res
  }

  static async add(body, path, value, options) {
    const ops = [
      { op: 'add', path, value }
    ]

    return await JsonApi.patch(body, ops, options)
  }
}

export default JsonApi

import jsonPatch from 'json8-patch'
import defaults from 'lodash/defaultsDeep'
import cloneDeep from 'lodash/cloneDeep'
import {
  validate,
  getSchemas as _getSchemas
} from './validate'
import mapValidationErrors from './mapValidationErrors'

class JsonApi {
  static async validate(...args) {
    let ref = '/',
      body = args[0]
    if (args.length > 1) {
      ref = args[0]
      body = args[1]
    }

    try {
      return await validate(ref, body)
    } catch (error) {
      throw {
        message: `Validation error`,
        reasons: error.errors.map(mapValidationErrors)
      }
    }
  }

  static get(doc, path) {
    return jsonPatch.get(doc, path)
  }

  static has(doc, path) {
    return jsonPatch.has(doc, path)
  }

  static link(hrefOrLink) {
    let link = {}
    if (typeof hrefOrLink == 'string') {
      link = hrefOrLink
    } else if (typeof hrefOrLink == 'object') {
      link = cloneDeep(hrefOrLink)
    } else {
      return null
    }

    return link
  }

  static async patch(body, ops, options = {}) {
    options = defaults({}, options, {
      reversible: false
    })

    let res

    try {
      try {
        res = jsonPatch.apply(body, ops, options)
      } catch (error) {
        error.detail = `Cannot apply JSON patch`

        throw error
      }

      if (options.validatePatch) {
        try {
          await JsonApi.validate(res.doc)
        } catch (error) {
          error.detail = `Document validation failed after patch has been applied`

          throw error
        }
      }
    } catch (error) {
      if (options.reversible) {
        const reverted = jsonPatch.revert(body, res.revert).doc

        error.doc = reverted
      }

      error.ops = ops

      throw error
    }

    return res
  }

  static async add(body, path, value, options) {
    const ops = [{
      op: 'add',
      path,
      value
    }]

    return await JsonApi.patch(body, ops, options)
  }

  static getSchemas() {
    const schemas = _getSchemas()

    return Object.keys(schemas).reduce((array, key) => {
      const schema = {}

      schema.id = key
      schema.attributes = cloneDeep(schemas[key])

      array.push(schema)

      return array
    }, [])
  }

  constructor(options = {}) {
    this.options = {}
    this._cache = {
      data: null,
      included: null
    }

    if ('body' in options) {
      if (typeof options.body != 'object') {
        throw new Error(`'options.body' should be a JSON object`)
      }
      this.body = options.body
    } else {
      this.body = {}
    }

    if ('validatePatch' in options) {
      if (typeof options.validatePatch != 'boolean') {
        throw new Error(`'options.validatePatch' should be 'true' or 'false'`)
      }
      this.options.validatePatch = options.validatePatch
    } else {
      this.options.validatePatch = false
    }
  }

  "get" (path) {
    return JsonApi.get(this.body, path)
  }

  has(path) {
    return JsonApi.has(this.body, path)
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

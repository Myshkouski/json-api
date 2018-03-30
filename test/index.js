const assert = require('assert')

const JsonApi = require('../')

describe('Module', () => {
  it('should be a class/constructor', () => {
    new JsonApi()
  })

  it('creates an instance of JsonApi class', () => {
    const jsonapi = new JsonApi()

    assert.ok(jsonapi instanceof JsonApi)
  })
})

describe('Static Methods', () => {
  let validDocument, invalidDocumentStructure
  beforeEach(() => {
    validDocument = {
      data: {
        id: '0',
        type: 'test'
      }
    }

    invalidDocumentStructure = {
      data: null,
      errors: []
    }
  })

  describe('#validate', () => {
    it('should return promise', async () => {
      const p = JsonApi.validate(validDocument)

      assert.ok(p instanceof Promise)

      try {
        await p
      } catch (error) {}
    })

    it('should return resolved promise for valid document', async () => {
      await JsonApi.validate(validDocument)
    })

    it('should return rejected promise for invalid document', async () => {
      try {
        await JsonApi.validate(invalidDocumentStructure)
      } catch (error) {
        return
      }

      throw 1
    })
  })

  describe('#add()', () => {
    it('should set value to path of any depth', async () => {

    })
  })
})

describe('Instance Methods', () => {
  let jsonapi, resourceName, connectFunction

  beforeEach(() => {
    jsonapi = new JsonApi()
    resourceName = 'resource'
    connectFunction = options => {
      const data = [{
        _id: 2,
        name: 'two'
      }, {
        _id: 1,
        name: 'one'
      }]
      return {
        data
      }
    }
  })

  describe('#connect', () => {
    it('should assign type key to internals', () => {
      jsonapi.connect(resourceName, connectFunction)

      assert.ok(resourceName in jsonapi._connected)
    })
  })

  describe('#fetchData', () => {
    it('should return internal data representation', async () => {
      jsonapi.connect(resourceName, connectFunction)

      await jsonapi.fetchData(resourceName, {
        action: 'read',
        alias: {
          id: '_id'
        },
        defaults: {
          type: 'test/data'
        },

        attributes: ['name'],
        sort: 'name',
        page: {
          limit: 20
        }
      })

      await jsonapi.include({
        ops: {
          alias: {
            id: '_id'
          },
          defaults: {
            type: 'test/include'
          },
          attributes: ['method', 'timestamp', 'hash']
        }
      })

      console.dir(jsonapi._dataCache, { depth: 5 })
    })
  })
})

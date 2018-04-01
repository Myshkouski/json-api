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
  let jsonapi, resourceName, fetchCollection, fetchOps

  beforeEach(() => {
    jsonapi = new JsonApi()
    resourceName = 'resource'
    fetchCollection = options => {
      const data = [{
        _id: 2,
        name: 'two',
        ops: [3]
      }, {
        _id: 1,
        name: 'one',
        ops: [1, 2]
      }]
      return {
        data
      }
    }
    fetchOps = options => {
      const data = [
        {
          _id: 1,
          action: 'create',
          timestamp: Date.now()
        },
        {
          _id: 2,
          action: 'read',
          timestamp: Date.now()
        },
        {
          _id: 3,
          action: 'update',
          timestamp: Date.now()
        }
      ]
      return {
        data
      }
    }
  })

  // describe('#connect', () => {
  //   it('should assign type key to internals', () => {
  //     jsonapi.connect(resourceName, fetchCollection)
  //
  //     assert.ok(resourceName in jsonapi._connected)
  //   })
  // })

  describe('#fetchData', () => {
    it('should return internal data representation', async () => {
      jsonapi.connect(resourceName, fetchCollection)
      jsonapi.connect('ops', fetchOps)

      const res = await jsonapi.fetchData(resourceName, {
        action: 'read',
        alias: {
          'id': '_id'
        },
        defaults: {
          type: 'test/data'
        },

        fields: 'name',
        sort: 'id',
        page: {
          strategy: 'offset',
          limit: 20
        }
      })

      console.dir(res)

      const r = await jsonapi.include(res.data, {
        ops: {
          action: 'read',
          alias: {
            id: '_id'
          },
          defaults: {
            type: 'test/include'
          },
          fields: 'action'
        }
      })

      console.dir(r)
    })
  })
})

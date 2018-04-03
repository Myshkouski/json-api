const assert = require('assert')
const lodash = require('lodash')
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
    resourceName = 'collections'
    const _wrap = f => function(options) {
      let { data, included } = f.apply(this, arguments)

      if('filter' in options && 'id' in options.filter) {
        if(Array.isArray(options.filter.id)) {
          data = data.filter(resource => options.filter.id.some(id => id === resource._id))
        } else {
          data = data.find(resource => options.filter.id === resource._id)
        }
      }

      return { data, included }
    }

    fetchCollection = _wrap(options => {
      let data = [{
        _id: 2,
        name: 'two',
        ops: [3]
      }, {
        _id: 1,
        name: 'one',
        ops: [1, 2]
      }]

      return {
        data,
        _report: {
          filter: true
        }
      }
    })

    fetchOps = _wrap(options => {
      const data = [{
          _id: 1,
          action: 'create',
          timestamp: Date.now()
        },
        {
          _id: 2,
          action: 'read',
          timestamp: Date.now() + 1 * 1000
        },
        {
          _id: 3,
          action: 'update',
          timestamp: Date.now() + 2 * 1000
        }
      ]

      return {
        data
      }
    })
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

      const { data } = await jsonapi.fetchData(resourceName, {
        action: 'read',
        [resourceName]: {
          alias: {
            'id': '_id'
          },
          defaults: {
            type: 'test/data'
          },
          filter: {
            id: 1
          },
          fields: 'name',
          sort: 'id',
          page: {
            strategy: 'offset',
            // offset: 1,
            limit: 10
          },
          include: {
            ops: {
              key: 'ops',
              alias: {
                'id': ''
              }
            }
          }
        },
        ops: {
          action: 'read',
          alias: {
            'id': '_id'
          },
          fields: 'timestamp',
          defaults: {
            type: 'test/include/ops'
          },
          sort: '-timestamp'
        }
      })

      console.dir(data, { depth: Infinity })

      // const { included } = await jsonapi.include(data, {
      //   ops: {
      //     action: 'read',
      //     alias: {
      //       'id': '_id'
      //     },
      //     fields: 'timestamp',
      //     defaults: {
      //       type: 'test/include/ops'
      //     },
      //     sort: '-timestamp'
      //   }
      // })
      //
      // console.dir(included, { depth: Infinity })
    })
  })
})

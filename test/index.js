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
    validBody = {
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
    it('should return resolved promise', async () => {
      const p = JsonApi.validate(validDocument)

      assert.ok(p instanceof Promise)
    })

    it('should return resolved promise', async () => {
      await JsonApi.validate(validDocument)
    })
  })

  describe('#add()', () => {
    it('should set value to path of any depth', async () => {

    })
  })
})

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
      } catch(error) {}
    })

    it('should return resolved promise for valid document', async () => {
      await JsonApi.validate(validDocument)
    })

    it('should return rejected promise for invalid document', async () => {
      try {
        await JsonApi.validate(invalidDocumentStructure)
      } catch(error) {
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

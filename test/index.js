const assert = require('assert')

const JsonApi = require('../')

describe('Module', () => {
  it('should be a class/constructor', () => {
    new JsonApi()
  })
})

describe('Static Methods', () => {
  let validBody, invalidBody
  beforeEach(() => {
    validBody = {
      data: {
        id: '0',
        type: 'test'
      }
    }

    invalidBody = {
      data: null,
      errors: []
    }
  })
  describe('#validate', () => {
    it('should return resolved promise', async () => {
      const p = JsonApi.validate(validBody)

      assert.ok(p instanceof Promise)
    })
  })
})

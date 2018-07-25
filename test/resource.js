const assert = require('assert')
const lodash = require('lodash')
const {
  ResourceObject
} = require('../')

describe('ResourceID', () => {
  it('should be a class/constructor', () => {
    new ResourceObject()
  })

  it('creates an instance of ResourceObject class', () => {
    const r = new ResourceObject()
    assert.ok(r instanceof ResourceObject)
  })
})

describe('Instance Methods', () => {
  const source = {
    id: 1234567890,
    test: true
  }

  const options = {
    defaults: {
      type: 'test-type'
    }
  }

  const jsonRepresentation = {
    id: '1234567890',
    type: 'test-type',
    attributes: {
      test: true
    }
  }

  describe('#toJSON', () => {
    it('should ', async () => {
      const resourceID = new ResourceObject(source, options)
      assert.deepEqual(resourceID.toJSON(), jsonRepresentation)
    })
  })
})

const assert = require('assert')
const lodash = require('lodash')
const {
  ResourceID
} = require('../')

describe('ResourceID', () => {
  it('should be a class/constructor', () => {
    new ResourceID()
  })

  it('creates an instance of JsonApi class', () => {
    const resourceID = new ResourceID()

    assert.ok(resourceID instanceof ResourceID)
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
    type: 'test-type'
  }

  describe('#toJSON', () => {
    it('should ', async () => {
      const resourceID = new ResourceID(source, options)
      assert.deepEqual(resourceID.toJSON(), jsonRepresentation)
    })
  })
})

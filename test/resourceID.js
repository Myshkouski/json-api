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
    const ID = new ResourceID()

    assert.ok(ID instanceof ResourceID)
  })
})

describe('Instance Methods', () => {
  const source = {
    id: 0123456789,
    test: true
  }

  const options = {
    defaults: {
      type: 'test-type'
    }
  }

  describe('#toJSON', () => {
    it('should ', async () => {
      const resourceID = new ResourceID(source, options)
      console.log(resourceID.toJSON())
    })
  })
})

const assert = require('assert')
const lodash = require('lodash')
const {
  Resource
} = require('../')

describe('ResourceID', () => {
  it('should be a class/constructor', () => {
    new Resource()
  })

  it('creates an instance of JsonApi class', () => {
    const r = new Resource()

    assert.ok(r instanceof Resource)
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
      const resourceID = new Resource(source, options)
      console.log(resourceID.toJSON())
    })
  })
})

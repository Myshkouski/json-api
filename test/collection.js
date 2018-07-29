const assert = require('assert')
const lodash = require('lodash')
const {
  ResourceObjectCollection
} = require('../')

function createSources() {
  return [
    [{
        id: 1,
        test: true,
        name: 'one'
      },
      {
        defaults: {
          type: 'test-type'
        }
      },
      {
        id: '1',
        type: 'test-type',
        attributes: {
          name: 'one',
          test: true
        }
      }
    ],
    [{
        id: 2,
        test: true,
        attributes: {
          name: 'two'
        }
      },
      {
        defaults: {
          type: 'test-type'
        }
      },
      {
        id: '2',
        type: 'test-type',
        attributes: {
          name: 'two',
          test: true
        }
      }
    ]
  ]
}

describe('ResourceObjectCollection', () => {
  it('should be a class/constructor', () => {
    new ResourceObjectCollection()
  })

  it('creates an instance of ResourceObjectCollection class', () => {
    const r = new ResourceObjectCollection()
    assert.ok(r instanceof ResourceObjectCollection)
  })
})

describe('Static Methods', () => {
  describe('#merge()', () => {
    const sources = createSources()
    const collections = sources.map(([source, options]) => new ResourceObjectCollection(source, options))

    it('should properly merge from sources', () => {
      const merged = ResourceObjectCollection.merge(...collections)
      const expected = new ResourceObjectCollection(sources.map(entry => entry[2]))

      assert.deepEqual(merged.toJSON(), expected.toJSON())
    })
  })
})

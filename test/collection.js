const assert = require('assert')
const lodash = require('lodash')
const {
  ResourceObject,
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
    ],
    [{
        id: 3,
        test: true,
        name: 'three',
        others: [1, 2]
      },
      {
        defaults: {
          type: 'test-type'
        },
        relationships: {
          'related-test-type': {
            from: 'others',
            alias: {
              id: ''
            },
            defaults: {
              type: 'test-type'
            }
          }
        }
      },
      {
        id: '3',
        type: 'test-type',
        attributes: {
          name: 'three',
          test: true,
          others: [1, 2]
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

describe('Instance Methods', () => {
  describe('#toArray()', () => {
    const source = createSources().map(([source, options]) => new ResourceObject(source, options))
    const collection = new ResourceObjectCollection(source)

    it('should properly apply pagination', () => {
      const options = {
        include: {
          'related-test-type': {
            page: {
              strategy: 'offset',
              limit: 1
            }
          }
        },
        page: {
          strategy: 'offset',
          offset: 2,
          limit: 1
        }
      }

      console.log(collection.included())
      console.log(collection.toArray(options))
      console.dir(collection.toJSON(options), {
        depth: Infinity
      })
    })
  })
})

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

// describe('Static Methods', () => {
//   let validDocument, invalidDocumentStructure
//   beforeEach(() => {
//     validDocument = {
//       data: {
//         id: '0',
//         type: 'test'
//       }
//     }
//
//     invalidDocumentStructure = {
//       data: null,
//       errors: []
//     }
//   })
//
//   describe('#validate', () => {
//     it('should return promise', async () => {
//       const p = JsonApi.validate(validDocument)
//
//       assert.ok(p instanceof Promise)
//
//       try {
//         await p
//       } catch (error) {}
//     })
//
//     it('should return resolved promise for valid document', async () => {
//       await JsonApi.validate(validDocument)
//     })
//
//     it('should return rejected promise for invalid document', async () => {
//       try {
//         await JsonApi.validate(invalidDocumentStructure)
//       } catch (error) {
//         return
//       }
//
//       throw 1
//     })
//   })
//
//   describe('#add()', () => {
//     it('should set value to path of any depth', async () => {
//
//     })
//   })
// })

describe('Instance Methods', () => {
  let jsonapi, resourceName, fetchArticles, fetchComments, fetchPeople

  beforeEach(() => {
    jsonapi = new JsonApi()
    const _wrap = f => async function(options) {
      return new Promise(resolve => {
        setTimeout(() => {
          let {
            data,
            included
          } = f.apply(this, arguments)

          if (Array.isArray(data) && ('filter' in options) && ('id' in options.filter)) {
            if (Array.isArray(options.filter.id)) {
              data = data.filter(resource => options.filter.id.some(id => id == resource._id))
            } else {
              data = data.find(resource => options.filter.id == resource._id)
            }
          }

          resolve({
            data,
            included
          })
        }, 50)
      })
    }

    fetchArticles = _wrap(options => {
      const data = [{
        _id: 2,
        name: 'Rails is Omakase',
        comments: null,
        author: 9
      }, {
        _id: 1,
        name: 'JSON API paints my bikeshed!',
        comments: [5, 12],
        author: 9
      }]

      return {
        data
      }
    })

    fetchComments = _wrap(options => {
      const data = [{
          _id: 5,
          text: 'First!',
          author: 2
        },
        {
          _id: 12,
          text: 'I like XML better',
          author: 9
        }
      ]

      return {
        data
      }
    })

    fetchPeople = _wrap(options => {
      const data = [{
        _id: 9,
        name: {
          first: 'Dan',
          last: 'Gebhardt',
        },
        social: {
          twitter: 'dgeb'
        }
      }]

      return {
        data
      }
    })
  })

  // describe('#connect', () => {
  //   it('should assign type key to internals', () => {
  //     jsonapi.connect(resourceName, fetchArticles)
  //
  //     assert.ok(resourceName in jsonapi._connected)
  //   })
  // })

  describe('#fetchData', () => {
    it('should return internal data representation', async () => {
      jsonapi.connect('articles', fetchArticles)
      jsonapi.connect('comments', fetchComments)
      jsonapi.connect('people', fetchPeople)
      jsonapi.connect('author', fetchPeople)

      const {
        data,
        included
      } = await jsonapi.fetch('read', 'articles', {
        'articles': {
          alias: {
            'id': '_id',
            'title': 'name'
          },
          defaults: {
            type: 'articles'
          },
          filter: {
            'id': 1
          },
          fields: [
            'title'
          ],
          sort: '-title',
          page: {
            strategy: 'offset',
            limit: 10
          },
          include: [
            // 'comments',
            'comments.author',
            'author'
          ],
          relationships: {
            'comments': {
              from: 'comments',
              alias: {
                'id': ''
              },
              defaults: {
                'type': 'comments'
              },
              links: (type, id) => ({
                self: `/articles/${ id }/relationships/comments`
              })
            },
            'author': {
              from: 'author',
              alias: {
                'id': ''
              },
              defaults: {
                'type': 'people'
              },
              links: (type, id) => ({
                self: `/articles/${ id }/relationships/comments`
              })
            }
          }
        },
        'comments': {
          alias: {
            'id': '_id',
            'body': 'text'
          },
          defaults: {
            type: 'comments'
          },
          relationships: {
            'author': {
              from: 'author',
              alias: {
                'id': ''
              },
              defaults: {
                'type': 'people'
              }
            }
          },
          links: () => ({
            all: `/comments`
          })
        },
        'author': {
          alias: {
            'id': '_id',
            'first-name': 'name.first',
            'last-name': 'name.last',
            'twitter': 'social.twitter'
          },
          defaults: {
            type: 'author'
          }
        }
      })
    })
  })
})

function _createPromiseTree( paths ) {
  if ( typeof paths !== 'object' ) {
    throw new TypeError( `First argument should be object` )
  }

  const tree = Object.entries( paths )
    .reduce( ( tree, [ path, value ] ) => {
      if ( typeof path === 'string' ) {
        path = path.split( '.' )
      }

      const length = path.length

      const targetNode = path.reduce( ( node, key ) => {
        if ( !( 'resolve' in node ) ) {
          node.resolve = null
        }

        if ( !node.then ) {
          node.then = {}
        }

        if ( !( key in node.then ) ) {
          node.then[ key ] = {}
        }

        return node.then[ key ]
      }, tree )

      targetNode.resolve = value
      if ( !targetNode.then ) {
        targetNode.then = null
      }

      return tree
    }, {} )

  return tree
}

function _runPromiseTree( result, node, rootNode = node ) {
  if ( rootNode.rejected ) {
    return rootNode.rejected
  }

  return Promise.resolve( result )
    .then( result => {
      if ( node.resolve ) {
        return node.resolve( result )
      }

      return result
    } )
    .then( result => {
      if ( node.then ) {
        return Promise.all(
          Object.keys( node.then )
          .map( key => {
            return _runPromiseTree( result, node.then[ key ], rootNode )
          } )
        )
      }

      return result
    } )
    .catch( error => {
      node.rejected = error
      throw error
    } )
}

export default function PromiseTree( paths, result ) {
  const tree = _createPromiseTree( paths )

  let rejected, set = false

  Object.defineProperty( tree, 'rejected', {
    get() {
      return rejected
    },
    set( value ) {
      if ( !set ) {
        set = true
        rejected = value
      }
    }
  } )

  return _runPromiseTree( result, tree )
}

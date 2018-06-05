module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/@alexeimyshkouski/node-tree/index.js":
/*!************************************************************!*\
  !*** ../node_modules/@alexeimyshkouski/node-tree/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Avl = __webpack_require__(/*! avl */ "avl")
// import isString from 'lodash/isString'

function isString(value) {
  return (typeof value)[0] === 's'
}

function createParseError() {
  return new TypeError(`Argument "path" should be non-empty string or array of strings`)
}

function _sub(path, Node) {
  path = this.parse(path)
  let node = this

  for (let index = 0; index < path.length; index++) {
    let key = path[index]
    let child = node._children.find(key)

    if (child) {
      node = child.data
    } else if (Node) {
      child = new Node({
        parse,
        compare
      } = node)

      node._children.insert(key, child)

      node = child
    } else {
      node = null
      break
    }
  }

  return node
}

const methods = {
  parse(path) {
    if (Array.isArray(path)) {
      for (let index in path) {
        if (!isString(path[index])) {
          throw createParseError()
        }
      }

      return path
    } else if (isString(path)) {
      return path.split('.')
    } else {
      throw createParseError()
    }
  },

  compare(a, b) {
    a = methods.parse(a)
    b = methods.parse(b)

    if (a.length > b.length) {
      return 1
    } else if (a.length < b.length) {
      return -1
    } else {
      for (let index in a) {
        if (a[index] > b[index]) {
          return 1
        } else if (a[index] < b[index]) {
          return -1
        }
      }
    }

    return 0
  }
}

class Node {
  constructor(options = {}) {
    for (let key in methods) {
      this[key] = options[key] || methods[key]
    }

    Object.defineProperties(this, {
      '_value': {
        writable: true
      },
      '_children': {
        value: new Avl(this.compare, true)
      }
    })
  }

  set() {
    let path = []
    let value = arguments[0]
    if (1 in arguments) {
      path = arguments[0]
      value = arguments[1]
    }

    const node = _sub.call(this, path, Object.getPrototypeOf(this).constructor)

    node._value = value

    return node
  }

  sub(path) {
    return _sub.call(this, path)
  }

  children() {
    return this._children.values()
  }

  keys() {
    return this._children.keys()
  }

  value() {
    let node = this
    if (0 in arguments) {
      const sub = this.sub(arguments[0])

      if (sub) {
        node = sub
      }
    }

    return node._value
  }

  forEach(f) {
    this._children.forEach(node => {
      f(node)
    })
    return this
  }
}

module.exports = Node


/***/ }),

/***/ "./src/cache/index.js":
/*!****************************!*\
  !*** ./src/cache/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexedCache = undefined;

var _avl = __webpack_require__(/*! avl */ "avl");

var _avl2 = _interopRequireDefault(_avl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IndexedCache {
  constructor() {
    this._avl = new _avl2.default((...args) => this.compare(...args), true);
  }

  keys() {
    return this._avl.keys();
  }

  values() {
    return this._avl.values();
  }

  has(key) {
    return this._avl.contains(key);
  }

  compare(a, b) {
    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  }

  set(key, value) {
    this._avl.insert(key, value);

    return this;
  }

  get(key) {
    return this._avl.find(key);
  }

  remove(key) {
    this._avl.remove(key);
  }
}
exports.IndexedCache = IndexedCache;

/***/ }),

/***/ "./src/collection.js":
/*!***************************!*\
  !*** ./src/collection.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cache = __webpack_require__(/*! ./cache */ "./src/cache/index.js");

var _get = __webpack_require__(/*! lodash/get */ "lodash/get");

var _get2 = _interopRequireDefault(_get);

var _post = __webpack_require__(/*! ./transform/post */ "./src/transform/post/index.js");

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResourceCollection extends _cache.IndexedCache {
  static from(ResourceConstructor, source, options) {
    const collection = new ResourceCollection();

    source.forEach(source => {
      const resource = new ResourceConstructor(source, options);
      if (!collection.has(resource)) {
        collection.add(resource);
      }
    });

    return collection;
  }

  compare(a, b) {
    for (let key of ['type', 'id']) {
      if (a[key] < b[key]) {
        return -1;
      }

      if (a[key] > b[key]) {
        return 1;
      }
    }

    return 0;
  }

  get id() {
    return this.keys().map(key => key.id);
  }

  add(resource) {
    if (typeof resource !== 'object') {
      throw new TypeError();
    }

    const { type, id } = resource;

    return this.set({ type, id }, resource);
  }

  toJSON(options) {
    const toJSONed = this.values().map(resource => resource.toJSON(options));
    return (0, _post2.default)(toJSONed);
  }
}

// ;
// ['map', 'filter'].forEach(prop => {
//   ResourceCollection.prototype[prop] = function(iteratee) {
//     this._c = this.entries()[prop](function _iteratee(entry, index, entries) {
//       return iteratee.call(this, entry[1], index, entries)
//     }).reduce((_c, [key, value]) => {
//       _c[key] = value
//       return _c
//     }, {})
//
//     return this
//   }
// })

exports.default = ResourceCollection;
module.exports = exports['default'];

/***/ }),

/***/ "./src/fetch.js":
/*!**********************!*\
  !*** ./src/fetch.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _from = __webpack_require__(/*! babel-runtime/core-js/array/from */ "babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _set = __webpack_require__(/*! babel-runtime/core-js/set */ "babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _merge = __webpack_require__(/*! lodash/merge */ "lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _isEmpty = __webpack_require__(/*! lodash/isEmpty */ "lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isNil = __webpack_require__(/*! lodash/isNil */ "lodash/isNil");

var _isNil2 = _interopRequireDefault(_isNil);

var _resource = __webpack_require__(/*! ./resource */ "./src/resource.js");

var _collection = __webpack_require__(/*! ./collection */ "./src/collection.js");

var _collection2 = _interopRequireDefault(_collection);

var _promiseTree = __webpack_require__(/*! ./promiseTree */ "./src/promiseTree.js");

var _promiseTree2 = _interopRequireDefault(_promiseTree);

var _typeStore = __webpack_require__(/*! ./typeStore */ "./src/typeStore.js");

var _typeStore2 = _interopRequireDefault(_typeStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createQueryIds(type, data) {
  if (data._s instanceof _resource.ResourceIdentifier) {
    const resource = data._s;

    if (resource._i && resource._i[type]) {
      return resource._i[type]._s.id;
    }
  } else if (data._s instanceof _collection2.default) {
    let ids = new _set2.default();

    const values = data._s.values();

    values.forEach(resource => {
      if (resource._i && resource._i[type]) {
        const _ids = resource._i[type]._s.id;

        if (_ids) {
          if (Array.isArray(_ids)) {
            _ids.forEach(id => ids.add(id));
          } else {
            ids.add(_ids);
          }
        }
      }
    });

    ids = (0, _from2.default)(ids.values());

    if ((0, _isEmpty2.default)(ids)) {
      return null;
    }

    return ids;
  }
}

exports.default = async function fetch(queries, action, type, options, ...args) {
  const typeStore = new _typeStore2.default(_resource.ResourceObject, [], {});

  async function _fetch(type, typeOptions) {
    const query = queries[type][action];
    const prefetched = await query(typeOptions);

    const result = {
      data: new _typeStore2.default(_resource.ResourceObject, prefetched.data, typeOptions)
    };

    return result;
  }

  const typeOptions = options[type];

  const tree = new _promiseTree2.default();

  const includedTree = tree.set([type], async (opts, next) => {
    const result = await _fetch(type, typeOptions);

    if ('include' in typeOptions) {
      if (!('included' in result)) {
        await next(result.data);
      }
    }

    return result;
  });

  typeOptions.include.map(path => {
    return includedTree.parse(path);
  }).forEach(path => {
    path.forEach((type, index, path) => {
      return includedTree.set(path.slice(0, index + 1), async (data, next) => {
        if (data) {
          const ids = createQueryIds(type, data);

          if ((0, _isNil2.default)(ids) || (0, _isEmpty2.default)(ids)) {
            return null;
          }

          let typeOptions = (0, _assign2.default)({}, options[type]);

          typeOptions.filter = (0, _merge2.default)({}, typeOptions.filter, {
            id: ids
          });

          const result = await _fetch(type, typeOptions);

          if (!('included' in result)) {
            await next(result.data);
          }

          return result;
        }
      });
    });
  });

  const r = await tree.resolve(null);

  console.dir(r.map(([path, r]) => {
    if (r) {
      const {
        data
      } = r;
      return [path, data ? data.toJSON() : data];
    } else {
      return [path, r];
    }
  }), {
    depth: Infinity
  });

  return r;
};

module.exports = exports['default'];

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = __webpack_require__(/*! lodash/get */ "lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = __webpack_require__(/*! lodash/set */ "lodash/set");

var _set2 = _interopRequireDefault(_set);

var _fetch2 = __webpack_require__(/*! ./fetch */ "./src/fetch.js");

var _fetch3 = _interopRequireDefault(_fetch2);

var _resource = __webpack_require__(/*! ./resource */ "./src/resource.js");

var Resource = _interopRequireWildcard(_resource);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class JsonApi {
  constructor(options = {}) {
    this.options = {};
    this._connected = {};
  }

  connect(type, fetch) {
    const keys = ['create', 'read', 'update', 'delete'];
    const _createTypeError = () => new TypeError('Invalid argument type for fetch');
    const _fetch = {};
    if (fetch instanceof Function) {
      keys.forEach(key => _fetch[key] = fetch);
    } else if (fetch instanceof Object) {
      keys.forEach(key => {
        if (!_fetch[key] instanceof Function) {
          throw _createTypeError();
        }
        _fetch[key] = fetch[key];
      });
    } else {
      throw _createTypeError();
    }

    this._connected[type] = _fetch;
  }

  fetch(action, type, options, ...args) {
    return (0, _fetch3.default)(this._connected, action, type, options, ...args);
  }
}

exports.default = JsonApi;
module.exports = exports['default'];

/***/ }),

/***/ "./src/promiseTree.js":
/*!****************************!*\
  !*** ./src/promiseTree.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _nodeTree = __webpack_require__(/*! @alexeimyshkouski/node-tree */ "../node_modules/@alexeimyshkouski/node-tree/index.js");

var _nodeTree2 = _interopRequireDefault(_nodeTree);

var _once = __webpack_require__(/*! lodash/once */ "lodash/once");

var _once2 = _interopRequireDefault(_once);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _resolveChildren(data, node, rootNode) {
  node.forEach(child => {
    child.data.path = [...node.path, child.key];
  });
  return _promise2.default.all(node.children().map(node => _resolve(data, node, rootNode)));
}

function _resolve(data, node, rootNode = node) {
  if (rootNode.rejected) {
    throw rootNode.rejected;
  }

  if (node === rootNode) {
    return _resolveChildren(data, node, rootNode).then(() => rootNode.value());
  }

  return _promise2.default.resolve(data).then(data => {
    const next = (0, _once2.default)(data => _resolveChildren(data, node, rootNode));
    return node.value().call(null, data, next);
  }).then(data => {
    node.resolved = data;
    rootNode.value().push([node.path, data]);
    return data;
  }).catch(error => {
    node.rejected = rootNode.rejected = error;
    throw error;
  });
}

class PromiseTree extends _nodeTree2.default {
  constructor(options = {}) {
    super(options);

    this.set([]);
    this.path = [];
  }

  resolve(data) {
    return _resolve(data, this);
  }
}

exports.default = PromiseTree;
module.exports = exports['default'];

/***/ }),

/***/ "./src/resource.js":
/*!*************************!*\
  !*** ./src/resource.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceIdentifier = exports.ResourceObject = undefined;

var _entries = __webpack_require__(/*! babel-runtime/core-js/object/entries */ "babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

var _defineProperties = __webpack_require__(/*! babel-runtime/core-js/object/define-properties */ "babel-runtime/core-js/object/define-properties");

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _set = __webpack_require__(/*! lodash/set */ "lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = __webpack_require__(/*! lodash/get */ "lodash/get");

var _get2 = _interopRequireDefault(_get);

var _pick = __webpack_require__(/*! lodash/pick */ "lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _isEmpty = __webpack_require__(/*! lodash/isEmpty */ "lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _resourceProps = __webpack_require__(/*! ./transform/resourceProps */ "./src/transform/resourceProps.js");

var _pre = __webpack_require__(/*! ./transform/pre */ "./src/transform/pre/index.js");

var _pre2 = _interopRequireDefault(_pre);

var _fields = __webpack_require__(/*! ./transform/fields */ "./src/transform/fields.js");

var _fields2 = _interopRequireDefault(_fields);

var _typeStore = __webpack_require__(/*! ./typeStore */ "./src/typeStore.js");

var _typeStore2 = _interopRequireDefault(_typeStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResourceIdentifier {
  constructor(source, options) {
    (0, _defineProperties2.default)(this, {
      source: {
        value: source
      },
      _r: {
        value: (0, _pre2.default)(source, options)
      }
    });
  }

  get id() {
    return this._r && this._r.id;
  }

  get type() {
    return this._r && this._r.type;
  }

  toJSON(options) {
    return (0, _pick2.default)(this._r, ['type', 'id', 'meta']);
  }
}

class ResourceObject extends ResourceIdentifier {
  constructor(source, options) {
    super(source, options);

    this._a = (0, _fields2.default)(this._r, options.fields);
    this._i = include(this.source, options.relationships);
  }

  set(...args) {
    return (0, _set2.default)(this._r, ...args);
  }

  get(...args) {
    return (0, _get2.default)(this._r, ...args);
  }

  toJSON(options) {
    const resource = (0, _pick2.default)(this._r, _resourceProps.RESOURCE_PROPS);

    if (this._i) {
      resource.relationships = (0, _entries2.default)(this._i).reduce((relationships, entry) => {
        const [type, store] = entry;

        const relationship = store.toJSON(options && options[type]);

        relationships[type] = (0, _isEmpty2.default)(relationship) ? null : relationship;

        return relationships;
      }, {});
    }

    if (this._a) {
      resource.attributes = this._a;
    }

    return resource;
  }
}

function include(source, options) {
  if (typeof options === 'object') {
    const included = {};

    for (let type in options) {
      included[type] = new _typeStore2.default(ResourceIdentifier, source, options[type]);
    }

    return included;
  }

  return null;
}

// const source = {
//   '_id': 1,
//   'author': 1
// }
//
// const options = {
//   alias: {
//     'id': '_id',
//     'meta.source': ''
//   },
//   defaults: {
//     'type': 'articles'
//   },
//   relationships: {
//     'author': {
//       from: 'author',
//       alias: {
//         'id': ''
//       },
//       defaults: {
//         'type': 'people'
//       }
//     }
//   }
// }
//
// const i = new ResourceObject(source, options)
// console.dir(i.toJSON(), {
//   depth: Infinity
// })

exports.ResourceObject = ResourceObject;
exports.ResourceIdentifier = ResourceIdentifier;

/***/ }),

/***/ "./src/transform/fields.js":
/*!*********************************!*\
  !*** ./src/transform/fields.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pick = __webpack_require__(/*! lodash/pick */ "lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _isEmpty = __webpack_require__(/*! lodash/isEmpty */ "lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (data, options) => {
  const attributes = (0, _pick2.default)(data.attributes, options);

  if (!(0, _isEmpty2.default)(attributes)) {
    data.attributes = attributes;
  }

  return data;
};

module.exports = exports['default'];

/***/ }),

/***/ "./src/transform/post/index.js":
/*!*************************************!*\
  !*** ./src/transform/post/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sort = __webpack_require__(/*! ./sort */ "./src/transform/post/sort.js");

var _sort2 = _interopRequireDefault(_sort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const posttransform = (data, options) => {
  if (!options) {
    return data;
  }

  if ('sort' in options) {
    data = (0, _sort2.default)(data, options.sort);
  }

  // if('page' in options) {
  //   data = paginate(data, options.page)
  // }

  return data;
};

exports.default = posttransform;
module.exports = exports['default'];

/***/ }),

/***/ "./src/transform/post/sort.js":
/*!************************************!*\
  !*** ./src/transform/post/sort.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = __webpack_require__(/*! lodash/get */ "lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _sortByNumberOrCharCodes(vector, a, b) {
  if (a > b) {
    return vector;
  } else if (a < b) {
    return -1 * vector;
  }

  return 0;
}

function _sortByKey(rule, a, b) {
  const [key, vector] = rule;
  return _sortByNumberOrCharCodes(vector, (0, _get2.default)(a, key), (0, _get2.default)(b, key));
}

function _parseSortRules(options) {

  return string.split(',');
}

const applySort = (data, options) => {
  if (typeof options === 'string') {
    options = options.split(',');
  }

  if (!Array.isArray(options)) {
    throw new TypeError('Sort options should be an array or string');
  }

  options = options.map(rule => {
    if (typeof rule === 'string') {
      rule = rule[0] == '-' ? [rule.slice(1), -1] : [rule, 1];
    }

    if (!Array.isArray(rule)) {
      throw new TypeError('Sort rules should be an array or string');
    }

    if (typeof rule[1] !== 'number') {
      throw new TypeError('Sort order should be a number');
    }

    return rule;
  });

  return data.sort((a, b) => {
    if ('attributes' in a && 'attributes' in b) {
      for (let rule of options) {
        const res = _sortByKey(rule, a.attributes, b.attributes);

        if (res) {
          return res;
        }
      }
    }

    return 0;
  });
};

exports.default = applySort;
module.exports = exports['default'];

/***/ }),

/***/ "./src/transform/pre/alias.js":
/*!************************************!*\
  !*** ./src/transform/pre/alias.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

exports.default = function (data, options) {
  return assignAlias(data, options, '');
};

var _omit = __webpack_require__(/*! lodash/omit */ "lodash/omit");

var _omit2 = _interopRequireDefault(_omit);

var _set = __webpack_require__(/*! lodash/set */ "lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = __webpack_require__(/*! lodash/get */ "lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assignAlias(data, alias, fullPath) {
  if (typeof alias == 'string') {
    return alias.length ? (0, _get2.default)(data, alias) : data;
  } else {
    let obj = Array.isArray(alias) ? [] : (0, _assign2.default)({}, data);

    if (typeof alias == 'object') {
      const _omitProps = [];

      for (let key in alias) {
        const path = fullPath + key;

        let _alias = alias[key];

        const aliased = assignAlias(data, _alias, path);

        if (path != _alias) {
          _omitProps.push(_alias);
        }

        (0, _set2.default)(obj, key, aliased);
      }

      if (_omitProps.length) {
        obj = (0, _omit2.default)(obj, _omitProps);
      }
    }

    return obj;
  }
}

module.exports = exports['default'];

/***/ }),

/***/ "./src/transform/pre/index.js":
/*!************************************!*\
  !*** ./src/transform/pre/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _merge = __webpack_require__(/*! lodash/merge */ "lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _defaults = __webpack_require__(/*! lodash/defaults */ "lodash/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _pick = __webpack_require__(/*! lodash/pick */ "lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _isObject = __webpack_require__(/*! lodash/isObject */ "lodash/isObject");

var _isObject2 = _interopRequireDefault(_isObject);

var _isNil = __webpack_require__(/*! lodash/isNil */ "lodash/isNil");

var _isNil2 = _interopRequireDefault(_isNil);

var _alias = __webpack_require__(/*! ./alias */ "./src/transform/pre/alias.js");

var _alias2 = _interopRequireDefault(_alias);

var _resourceProps = __webpack_require__(/*! ../resourceProps */ "./src/transform/resourceProps.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pretransform(data, options) {
  if ((0, _isNil2.default)(data)) {
    return data;
  }

  if ((0, _isObject2.default)(options)) {
    if ('alias' in options) {
      data = (0, _alias2.default)(data, options.alias);
    }

    if ('defaults' in options) {
      data = (0, _defaults2.default)({}, data, options.defaults);
    }

    if ('merge' in options) {
      data = (0, _merge2.default)({}, data, options.merge);
    }
  }

  if ((0, _isObject2.default)(data)) {
    data = _resourceProps.RESOURCE_IDENTIFIER_ESSENTIAL_PROPS.reduce((data, key) => {
      if ((0, _isNil2.default)(data[key])) {
        const error = new TypeError(`Cannot transform '${key}' prop to string`);
        error.data = data;
        error.key = key;
        throw error;
      }

      data[key] += '';

      return data;
    }, (0, _assign2.default)({}, data));
  }

  return data;
}

exports.default = pretransform;
module.exports = exports['default'];

/***/ }),

/***/ "./src/transform/resourceProps.js":
/*!****************************************!*\
  !*** ./src/transform/resourceProps.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// resource identifier & object members
const RESOURCE_OPTIONAL_PROPS = exports.RESOURCE_OPTIONAL_PROPS = ['meta'];

// resource identifier members
const RESOURCE_IDENTIFIER_ESSENTIAL_PROPS = exports.RESOURCE_IDENTIFIER_ESSENTIAL_PROPS = ['type', 'id'];
const RESOURCE_IDENTIFIER_PROPS = exports.RESOURCE_IDENTIFIER_PROPS = [...RESOURCE_IDENTIFIER_ESSENTIAL_PROPS, ...RESOURCE_OPTIONAL_PROPS];

// resource object members
const RESOURCE_OBJECT_OPTIONAL_PROPS = exports.RESOURCE_OBJECT_OPTIONAL_PROPS = ['attributes', 'relationships', 'links', ...RESOURCE_OPTIONAL_PROPS];
const RESOURCE_PROPS = exports.RESOURCE_PROPS = [...RESOURCE_IDENTIFIER_ESSENTIAL_PROPS, ...RESOURCE_OBJECT_OPTIONAL_PROPS];

/***/ }),

/***/ "./src/typeStore.js":
/*!**************************!*\
  !*** ./src/typeStore.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collection = __webpack_require__(/*! ./collection */ "./src/collection.js");

var _collection2 = _interopRequireDefault(_collection);

var _get = __webpack_require__(/*! lodash/get */ "lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TypeStore {
  constructor(ResourceConstructor, source, options) {
    if ('from' in options) {
      source = (0, _get2.default)(source, options.from);
    }

    let single = false;

    if (Array.isArray(source)) {
      this._s = _collection2.default.from(ResourceConstructor, source, options);
    } else {
      single = true;
      this._s = new ResourceConstructor(source, options);
    }

    Object.defineProperty(this, 'single', {
      value: single
    });
  }

  toJSON(options) {
    return this._s.toJSON(options);
  }
}

exports.default = TypeStore;
module.exports = exports['default'];

/***/ }),

/***/ "avl":
/*!**********************!*\
  !*** external "avl" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("avl");

/***/ }),

/***/ "babel-runtime/core-js/array/from":
/*!***************************************************!*\
  !*** external "babel-runtime/core-js/array/from" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/array/from");

/***/ }),

/***/ "babel-runtime/core-js/object/assign":
/*!******************************************************!*\
  !*** external "babel-runtime/core-js/object/assign" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),

/***/ "babel-runtime/core-js/object/define-properties":
/*!*****************************************************************!*\
  !*** external "babel-runtime/core-js/object/define-properties" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/define-properties");

/***/ }),

/***/ "babel-runtime/core-js/object/entries":
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/object/entries" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/entries");

/***/ }),

/***/ "babel-runtime/core-js/promise":
/*!************************************************!*\
  !*** external "babel-runtime/core-js/promise" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),

/***/ "babel-runtime/core-js/set":
/*!********************************************!*\
  !*** external "babel-runtime/core-js/set" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/set");

/***/ }),

/***/ "lodash/defaults":
/*!**********************************!*\
  !*** external "lodash/defaults" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/defaults");

/***/ }),

/***/ "lodash/get":
/*!*****************************!*\
  !*** external "lodash/get" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/get");

/***/ }),

/***/ "lodash/isEmpty":
/*!*********************************!*\
  !*** external "lodash/isEmpty" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/isEmpty");

/***/ }),

/***/ "lodash/isNil":
/*!*******************************!*\
  !*** external "lodash/isNil" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/isNil");

/***/ }),

/***/ "lodash/isObject":
/*!**********************************!*\
  !*** external "lodash/isObject" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/isObject");

/***/ }),

/***/ "lodash/merge":
/*!*******************************!*\
  !*** external "lodash/merge" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/merge");

/***/ }),

/***/ "lodash/omit":
/*!******************************!*\
  !*** external "lodash/omit" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/omit");

/***/ }),

/***/ "lodash/once":
/*!******************************!*\
  !*** external "lodash/once" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/once");

/***/ }),

/***/ "lodash/pick":
/*!******************************!*\
  !*** external "lodash/pick" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/pick");

/***/ }),

/***/ "lodash/set":
/*!*****************************!*\
  !*** external "lodash/set" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/set");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map
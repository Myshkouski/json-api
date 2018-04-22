module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
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
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cache.js":
/*!**********************!*\
  !*** ./src/cache.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkedIndexedCache = exports.IndexedCache = undefined;

var _defineProperty = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ "babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _get = __webpack_require__(/*! lodash/get */ "lodash/get");

var _get2 = _interopRequireDefault(_get);

var _setWith = __webpack_require__(/*! lodash/setWith */ "lodash/setWith");

var _setWith2 = _interopRequireDefault(_setWith);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IndexedCache {
  constructor() {
    Object.defineProperty(this, '_cache', {
      enumerable: true,
      value: {}
    });
  }

  get keys() {
    return (0, _keys2.default)(this._cache);
  }

  set(path, value) {
    (0, _setWith2.default)(this._cache, path, value, Object);

    return this;
  }

  get(path) {
    return (0, _get2.default)(this._cache, path);
  }
}

exports.IndexedCache = IndexedCache;
class LinkedIndexedCache extends IndexedCache {
  constructor(indexedCache) {
    super();

    if (!indexedCache instanceof IndexedCache) {
      throw TypeError('First arguments should be an instance of IndexedCache');
    }

    Object.defineProperty(this, '_linked', {
      // enumerable: true,
      value: indexedCache
    });
  }

  set(path, value) {
    if (typeof path === 'string') {
      path = path.split('.');
    }

    const base = path.slice(0, -1);

    const prop = path[path.length - 1];
    let target;

    if (base.length) {
      target = (0, _get2.default)(this._cache, base);

      if (!target) {
        target = {};
        (0, _setWith2.default)(this._cache, base, target, Object);
      }
    } else {
      target = this._cache;
    }

    (0, _defineProperty2.default)(target, prop, {
      enumerable: true,
      configurable: true,
      set: value => {
        this._linked.set(path, value);
      },
      get: () => this._linked.get(path)
    });

    target[prop] = value;
  }
}
exports.LinkedIndexedCache = LinkedIndexedCache;

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

var _values = __webpack_require__(/*! babel-runtime/core-js/object/values */ "babel-runtime/core-js/object/values");

var _values2 = _interopRequireDefault(_values);

var _cache2 = __webpack_require__(/*! ./cache */ "./src/cache.js");

var _promiseTree = __webpack_require__(/*! ./promiseTree */ "./src/promiseTree.js");

var _promiseTree2 = _interopRequireDefault(_promiseTree);

var _prefetch = __webpack_require__(/*! ./prefetch */ "./src/prefetch.js");

var _prefetch2 = _interopRequireDefault(_prefetch);

var _wrapFor = __webpack_require__(/*! ./helpers/wrapFor */ "./src/helpers/wrapFor.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _cache = (0, _wrapFor.forSingleOrMany)((data, indexedCache) => {
  indexedCache.set([data.type, data.id], data);
});
const _extractCache = indexedCache => {
  return indexedCache.keys.reduce((array, type) => {
    const values = (0, _values2.default)(indexedCache.get(type));
    return array.concat(values);
  }, []);
};

exports.default = async function fetch(queries, action, type, options, ...args) {
  const resourceCache = new _cache2.IndexedCache();
  const dataCache = new _cache2.LinkedIndexedCache(resourceCache);
  const includedCache = new _cache2.LinkedIndexedCache(resourceCache);

  let {
    data,
    included
  } = await (0, _prefetch2.default)(queries[type][action], options[type], ...args);

  _cache(data, dataCache);
  _cache(included, includedCache);

  if (options[type].include) {
    function createIncludeDict(include) {
      return include.reduce((dict, path) => {
        const type = path.split('.').pop();

        dict[path] = async () => {
          const {
            data,
            included
          } = await (0, _prefetch2.default)(queries[type][action], options[type], ...args);

          console.log(0);
          console.dir(resourceCache, { depth: 10 });
          _cache(data, includedCache);
          console.log(1, resourceCache);
          _cache(included, includedCache);
          console.log(2, resourceCache);

          console.log(includedCache);

          return includedCache;
        };

        return dict;
      }, {});
    }

    const dict = createIncludeDict(options[type].include);

    const includePromiseTree = new _promiseTree2.default(dict);

    await includePromiseTree.run();
  }

  included = _extractCache(includedCache);

  return {
    data,
    included
  };
};

module.exports = exports['default'];

/***/ }),

/***/ "./src/helpers/wrapFor.js":
/*!********************************!*\
  !*** ./src/helpers/wrapFor.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forSingleOrMany = forSingleOrMany;
exports.forMany = forMany;
function forSingleOrMany(f) {
  return function (data, ...args) {
    if (Array.isArray(data)) {
      return data.map(data => f.call(this, data, ...args));
    } else if (typeof data == 'object') {
      return f.apply(this, arguments);
    }
    return data;
  };
}

function forMany(f) {
  return function (...args) {
    const data = args[0];
    if (Array.isArray(data)) {
      return f.apply(this, args);
    }
    return data;
  };
}

/***/ }),

/***/ "./src/include/index.js":
/*!******************************!*\
  !*** ./src/include/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pick = __webpack_require__(/*! lodash/pick */ "lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _alias = __webpack_require__(/*! ../transform/pre/alias */ "./src/transform/pre/alias.js");

var _alias2 = _interopRequireDefault(_alias);

var _prefetch = __webpack_require__(/*! ../prefetch */ "./src/prefetch.js");

var _prefetch2 = _interopRequireDefault(_prefetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const include = (query, type, options) => {};

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

var _prefetch = __webpack_require__(/*! ./prefetch */ "./src/prefetch.js");

var _prefetch2 = _interopRequireDefault(_prefetch);

var _include = __webpack_require__(/*! ./include */ "./src/include/index.js");

var _include2 = _interopRequireDefault(_include);

var _fetch2 = __webpack_require__(/*! ./fetch */ "./src/fetch.js");

var _fetch3 = _interopRequireDefault(_fetch2);

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

/***/ "./src/prefetch.js":
/*!*************************!*\
  !*** ./src/prefetch.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pre = __webpack_require__(/*! ./transform/pre */ "./src/transform/pre/index.js");

var _pre2 = _interopRequireDefault(_pre);

var _wrapFor = __webpack_require__(/*! ./helpers/wrapFor */ "./src/helpers/wrapFor.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _wrappedPreTransform = (0, _wrapFor.forSingleOrMany)(_pre2.default);

exports.default = async function prefetch(query, options, ...args) {
  let {
    data,
    included
  } = await query(options, ...args);

  data = _wrappedPreTransform(data, options);

  return {
    data,
    included
  };
};

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

var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ "babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _set = __webpack_require__(/*! lodash/set */ "lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _transformTreePath(path) {
  let split;

  if (Array.isArray(path)) {
    split = path;
  } else if (typeof path == 'string') {
    split = path.split('.');
  } else {
    throw TypeError('Path should be a string or array');
  }

  return split.slice(0, -1).reduce((split, key) => {
    split.push(key);
    split.push('then');
    return split;
  }, []).concat(split.slice(-1));
}

function _createNode(run, then) {
  return {
    run,
    then
  };
}

function _createPromiseTree(paths) {
  const then = {};

  for (let path in paths) {
    (0, _set2.default)(then, _transformTreePath(path), _createNode(paths[path], null));
  }

  const rootNode = _createNode(result => result, then);

  return rootNode;
}

async function _runPromiseTree(result, node, rootNode = node) {
  if (rootNode.rejected) {
    throw 'cancelled';
  }

  try {
    if (node) {
      result = await node.run((await result));

      if (node.then) {
        const keys = (0, _keys2.default)(node.then);

        await _promise2.default.all(keys.map(key => _runPromiseTree(result, node.then[key], rootNode)));
      }

      return result;
    }
  } catch (error) {
    node.rejected = true;
    throw error;
  }
}

class PromiseTree {
  constructor(paths) {
    const tree = _createPromiseTree(paths);

    Object.defineProperty(this, '_tree', {
      value: tree
    });
  }

  static run(paths, data) {
    const promiseTree = new PromiseTree(paths);
    return promiseTree.run(data);
  }

  run(data) {
    return _runPromiseTree(data, this._tree);
  }
}
exports.default = PromiseTree;
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

exports.default = (data, options) => assignAlias(data, options, '');

module.exports = exports['default'];

/***/ }),

/***/ "./src/transform/pre/defineSourceProp.js":
/*!***********************************************!*\
  !*** ./src/transform/pre/defineSourceProp.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (data, source) => {
  Object.defineProperty(data, '_source', {
    value: source
  });
};

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

var _merge = __webpack_require__(/*! lodash/merge */ "lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _pick = __webpack_require__(/*! lodash/pick */ "lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _omit = __webpack_require__(/*! lodash/omit */ "lodash/omit");

var _omit2 = _interopRequireDefault(_omit);

var _defaults = __webpack_require__(/*! lodash/defaults */ "lodash/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _alias = __webpack_require__(/*! ./alias */ "./src/transform/pre/alias.js");

var _alias2 = _interopRequireDefault(_alias);

var _rootMembers = __webpack_require__(/*! ./rootMembers */ "./src/transform/pre/rootMembers.js");

var _rootMembers2 = _interopRequireDefault(_rootMembers);

var _defineSourceProp = __webpack_require__(/*! ./defineSourceProp */ "./src/transform/pre/defineSourceProp.js");

var _defineSourceProp2 = _interopRequireDefault(_defineSourceProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const preTransform = (data, options) => {
  let source = data;

  if ('alias' in options) {
    data = (0, _alias2.default)(data, options.alias);
  }

  data = (0, _rootMembers2.default)(data);

  if ('merge' in options) {
    data = (0, _merge2.default)(data, options.merge);
  }

  if ('defaults' in options) {
    (0, _defaults2.default)(data, options.defaults);
  }

  if ('fields' in options) {
    data.attributes = (0, _omit2.default)(data.attributes, options.fields);
  }

  (0, _defineSourceProp2.default)(data, source);

  return data;
};

exports.default = preTransform;
module.exports = exports['default'];

/***/ }),

/***/ "./src/transform/pre/rootMembers.js":
/*!******************************************!*\
  !*** ./src/transform/pre/rootMembers.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ "babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _omit = __webpack_require__(/*! lodash/omit */ "lodash/omit");

var _omit2 = _interopRequireDefault(_omit);

var _pick = __webpack_require__(/*! lodash/pick */ "lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _defaults = __webpack_require__(/*! lodash/defaults */ "lodash/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _resourceProps = __webpack_require__(/*! ../resourceProps */ "./src/transform/resourceProps.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = data => {
  const rootAttributes = (0, _omit2.default)(data, _resourceProps.RESOURCE_PROPS);

  if ((0, _keys2.default)(rootAttributes)) {
    (0, _defaults2.default)(data, {
      attributes: rootAttributes
    });
  }

  data = (0, _pick2.default)(data, _resourceProps.RESOURCE_PROPS);

  return data;
};

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
const RESOURCE_IDENTIFIER_PROPS = exports.RESOURCE_IDENTIFIER_PROPS = ['id', 'type', 'meta'];
const ADDITIONAL_RESOURCE_PROPS = exports.ADDITIONAL_RESOURCE_PROPS = ['attributes', 'relationships', 'links'];
const RESOURCE_PROPS = exports.RESOURCE_PROPS = [...RESOURCE_IDENTIFIER_PROPS, ...ADDITIONAL_RESOURCE_PROPS];

/***/ }),

/***/ "babel-runtime/core-js/object/assign":
/*!******************************************************!*\
  !*** external "babel-runtime/core-js/object/assign" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),

/***/ "babel-runtime/core-js/object/define-property":
/*!***************************************************************!*\
  !*** external "babel-runtime/core-js/object/define-property" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/define-property");

/***/ }),

/***/ "babel-runtime/core-js/object/keys":
/*!****************************************************!*\
  !*** external "babel-runtime/core-js/object/keys" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),

/***/ "babel-runtime/core-js/object/values":
/*!******************************************************!*\
  !*** external "babel-runtime/core-js/object/values" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/values");

/***/ }),

/***/ "babel-runtime/core-js/promise":
/*!************************************************!*\
  !*** external "babel-runtime/core-js/promise" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

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

/***/ }),

/***/ "lodash/setWith":
/*!*********************************!*\
  !*** external "lodash/setWith" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/setWith");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map
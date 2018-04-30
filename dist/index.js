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

  keys() {
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
    this.link(path);

    return IndexedCache.prototype.set.call(this, path, value);
  }

  link(path) {
    if (typeof path === 'string') {
      path = path.replace('.');
    }

    const base = path.slice(0, -1);

    let target;

    if (base.length) {
      target = LinkedIndexedCache.prototype.get.call(this, base);

      if (target === undefined) {
        target = {};
        IndexedCache.prototype.set.call(this, base, target);
      }
    } else {
      target = this._cache;
    }

    const prop = path[path.length - 1];

    (0, _defineProperty2.default)(target, prop, {
      enumerable: true,
      configurable: true,
      set: value => {
        this._linked.set(path, value);
      },
      get: () => this._linked.get(path)
    });

    if (!target[prop]) {
      target[prop] = undefined;
    }

    return this;
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

var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _merge = __webpack_require__(/*! lodash/merge */ "lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _cache = __webpack_require__(/*! ./cache */ "./src/cache/index.js");

var _prefetch = __webpack_require__(/*! ./prefetch */ "./src/prefetch.js");

var _prefetch2 = _interopRequireDefault(_prefetch);

var _include = __webpack_require__(/*! ./include */ "./src/include/index.js");

var _include2 = _interopRequireDefault(_include);

var _post = __webpack_require__(/*! ./transform/post */ "./src/transform/post/index.js");

var _post2 = _interopRequireDefault(_post);

var _promiseTree = __webpack_require__(/*! ./promiseTree */ "./src/promiseTree.js");

var _promiseTree2 = _interopRequireDefault(_promiseTree);

var _cache2 = __webpack_require__(/*! ./helpers/cache */ "./src/helpers/cache.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function fetch(queries, action, type, options, ...args) {
  const resourceCache = new _cache.IndexedCache();

  async function _fetch(type, typeOptions, resourceCache) {
    const dataCache = new _cache.LinkedIndexedCache(resourceCache);

    const prefetched = await (0, _prefetch2.default)(queries[type][action], typeOptions, ...args);

    // add primary resources to indexed resource cache
    const result = {};
    (0, _cache2.cache)(prefetched.data, dataCache);
    result.dataCache = dataCache;

    if ('include' in typeOptions) {
      // assign primary data links to included resources

      const linkageCache = new _cache.LinkedIndexedCache(resourceCache);
      (0, _include2.default)(prefetched.data, typeOptions.include, typeOptions.relationships, linkageCache);

      result.linkageCache = linkageCache;

      if ('included' in prefetched) {
        // add included resources to indexed resource cache

        const includedCache = new _cache.LinkedIndexedCache(resourceCache);
        (0, _cache2.cache)(prefetched.included, includedCache);
        result.includedCache = includedCache;
      }
    }

    return result;
  }

  const typeOptions = options[type];

  const flow = [type, ...(typeOptions.include || []).map(path => type + '.' + path)].reduce((flow, path) => {
    const type = path.split('.').pop();
    let typeOptions = options[type];

    flow[path] = async (result = {}, fetchIncluded) => {
      if (result.includedCache) {
        return result;
      }

      if (result.linkageCache) {
        const ids = result.linkageCache.get(type).keys();
        typeOptions = (0, _assign2.default)({}, typeOptions);
        typeOptions.filter = (0, _merge2.default)({}, typeOptions.filter, {
          id: ids
        });
      }

      result = await _fetch(type, typeOptions, result.linkageCache || resourceCache);

      await fetchIncluded();

      return result;
    };

    return flow;
  }, {});

  const result = await new _promiseTree2.default(flow);

  const {
    dataCache,
    includedCache,
    linkageCache
  } = result[type];

  let data = (0, _cache2.extract)(dataCache);
  let included = (0, _cache2.extract)(linkageCache);
  data = (0, _post2.default)(data, typeOptions);

  console.dir(data, {
    depth: Infinity
  });

  console.dir(included, {
    depth: Infinity
  });

  return {
    data,
    included
  };
};

module.exports = exports['default'];

/***/ }),

/***/ "./src/helpers/cache.js":
/*!******************************!*\
  !*** ./src/helpers/cache.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extract = exports.cache = undefined;

var _values = __webpack_require__(/*! babel-runtime/core-js/object/values */ "babel-runtime/core-js/object/values");

var _values2 = _interopRequireDefault(_values);

var _wrapFor = __webpack_require__(/*! ./wrapFor */ "./src/helpers/wrapFor.js");

var _cache = __webpack_require__(/*! ../cache */ "./src/cache/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cache = exports.cache = (0, _wrapFor.forSingleOrMany)((data, indexedCache) => {
  if (data) {
    indexedCache.set([data.type, data.id], data);
  }
});

const extract = exports.extract = indexedCache => {
  if (!(indexedCache instanceof _cache.IndexedCache)) {
    return null;
  }

  return indexedCache.keys().reduce((array, type) => {
    const typeCache = indexedCache.get(type);
    const values = (0, _values2.default)(typeCache);
    return array.concat(values);
  }, []);
};

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
exports.forMany = forMany;
exports.forSingleOrMany = forSingleOrMany;
function forMany(f) {
  return function () {
    const data = arguments[0];
    if (Array.isArray(data)) {
      return f.apply(this, args);
    }
    return data;
  };
}

function forSingleOrMany(f) {
  return function (data, ...args) {
    if (Array.isArray(data)) {
      return data.map(data => f.apply(this, [data, ...args])).filter(data => !(data === undefined || data === null));
    } else {
      return f.apply(this, arguments);
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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = __webpack_require__(/*! lodash/get */ "lodash/get");

var _get2 = _interopRequireDefault(_get);

var _alias = __webpack_require__(/*! ../transform/pre/alias */ "./src/transform/pre/alias.js");

var _alias2 = _interopRequireDefault(_alias);

var _cache = __webpack_require__(/*! ../cache */ "./src/cache/index.js");

var _wrapFor = __webpack_require__(/*! ../helpers/wrapFor */ "./src/helpers/wrapFor.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const forEachResourceIdentifier = (0, _wrapFor.forSingleOrMany)((data, f) => {
  if (data && !(data.id === undefined || data.id === null)) {
    f(data);
  }
});

const transformIds = (0, _wrapFor.forSingleOrMany)((data, options) => {
  if ('alias' in options) {
    data = (0, _alias2.default)(data, options.alias);
  }

  return data;
});

const extractIncluded = (data, options) => {
  if ('from' in options) {
    data = (0, _get2.default)(data, options.from);
  }

  data = transformIds(data, options);

  return data;
};

const assignIncluded = (0, _wrapFor.forSingleOrMany)((data, includeOptions, relationshipsOptions, cache) => {
  if (data) {
    Object.defineProperty(data, '_include', {
      enumerable: true,
      value: new _cache.LinkedIndexedCache(cache)
    });

    for (let type of includeOptions) {
      const typeOptions = relationshipsOptions[type];

      let resourceIds = extractIncluded(data._source, typeOptions);

      forEachResourceIdentifier(resourceIds, resourceId => {
        data._include.link([type, resourceId.id]);
      });
    }
  }
});

exports.default = async function include(data, includeOptions, relationshipsOptions, linksCache) {
  assignIncluded(data, includeOptions, relationshipsOptions, linksCache);
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

var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ "babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _defineProperties = __webpack_require__(/*! babel-runtime/core-js/object/define-properties */ "babel-runtime/core-js/object/define-properties");

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _entries = __webpack_require__(/*! babel-runtime/core-js/object/entries */ "babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

exports.default = PromiseTree;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function once(f) {
  let called = false;

  return function () {
    if (!called) {
      called = true;
      return f.apply(this, arguments);
    }
  };
}

function _createPromiseTree(paths) {
  if (typeof paths !== 'object') {
    throw new TypeError(`First argument should be object`);
  }

  const tree = (0, _entries2.default)(paths).reduce((tree, [path, value]) => {
    const _path = path;
    if (typeof path === 'string') {
      path = path.split('.');
    }

    const length = path.length;

    const targetNode = path.reduce((node, key) => {
      if (!('resolve' in node)) {
        node.resolve = null;
      }

      if (!node.then) {
        node.then = {};
      }

      if (!(key in node.then)) {
        node.then[key] = {};
      }

      return node.then[key];
    }, tree);

    (0, _defineProperties2.default)(targetNode, {
      path: {
        value: path
      },
      resolved: {
        get() {
          return tree._resolvedTree[_path];
        },
        set(value) {
          tree._resolvedTree[_path] = value;
        }
      }
    });
    targetNode.resolve = value;
    if (!targetNode.then) {
      targetNode.then = null;
    }

    return tree;
  }, {});

  Object.defineProperty(tree, '_resolvedTree', {
    value: {}
  });

  return tree;
}

function _resolvePromiseTree(result, node, rootNode = node) {
  if (rootNode.rejected) {
    return rootNode.rejected;
  }

  return _promise2.default.resolve(result).then(result => {
    const resolveSubnodes = once(() => {
      if (node.then) {
        return _promise2.default.all((0, _keys2.default)(node.then).map(key => {
          return _resolvePromiseTree(result, node.then[key], rootNode);
        })).then(() => result);
      }

      return result;
    });

    if (node.resolve) {
      return node.resolve(result, resolveSubnodes);
    } else {
      return resolveSubnodes();
    }
  }).then(result => {
    node.resolved = result;
    return rootNode._resolvedTree;
  }).catch(error => {
    node.rejected = error;
    throw error;
  });
}

function PromiseTree(paths, result) {
  const tree = _createPromiseTree(paths);

  let rejected,
      set = false;

  Object.defineProperty(tree, 'rejected', {
    get() {
      return rejected;
    },
    set(value) {
      if (!set) {
        set = true;
        rejected = value;
      }
    }
  });

  return _resolvePromiseTree(result, tree);
}
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

var _wrapFor = __webpack_require__(/*! ../../helpers/wrapFor */ "./src/helpers/wrapFor.js");

var _sort = __webpack_require__(/*! ./sort */ "./src/transform/post/sort.js");

var _sort2 = _interopRequireDefault(_sort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const posttransform = (data, typeOptions) => {
  if ('sort' in typeOptions) {
    data = (0, _sort2.default)(data, typeOptions.sort);
  }

  // if('page' in typeOptions) {
  //   data = paginate(data, typeOptions.page)
  // }

  return data;
};

// import paginate from './paginate'
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

var _defaults = __webpack_require__(/*! lodash/defaults */ "lodash/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _pick = __webpack_require__(/*! lodash/pick */ "lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _get = __webpack_require__(/*! lodash/get */ "lodash/get");

var _get2 = _interopRequireDefault(_get);

var _alias = __webpack_require__(/*! ./alias */ "./src/transform/pre/alias.js");

var _alias2 = _interopRequireDefault(_alias);

var _rootMembers = __webpack_require__(/*! ./rootMembers */ "./src/transform/pre/rootMembers.js");

var _rootMembers2 = _interopRequireDefault(_rootMembers);

var _defineSourceProp = __webpack_require__(/*! ./defineSourceProp */ "./src/transform/pre/defineSourceProp.js");

var _defineSourceProp2 = _interopRequireDefault(_defineSourceProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const preTransform = (data, options) => {
  let source = data;

  if ('from' in options) {
    data = (0, _get2.default)(data, options.from);
  }

  if ('alias' in options) {
    data = (0, _alias2.default)(data, options.alias);
  }

  data = (0, _rootMembers2.default)(data);

  (0, _defineSourceProp2.default)(data, source);

  if ('defaults' in options) {
    (0, _defaults2.default)(data, options.defaults);
  }

  if ('merge' in options) {
    (0, _merge2.default)(data, options.merge);
  }

  if ('fields' in options) {
    data.attributes = (0, _pick2.default)(data.attributes, options.fields);
  }

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

/***/ "babel-runtime/core-js/object/define-properties":
/*!*****************************************************************!*\
  !*** external "babel-runtime/core-js/object/define-properties" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/define-properties");

/***/ }),

/***/ "babel-runtime/core-js/object/define-property":
/*!***************************************************************!*\
  !*** external "babel-runtime/core-js/object/define-property" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/define-property");

/***/ }),

/***/ "babel-runtime/core-js/object/entries":
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/object/entries" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/entries");

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
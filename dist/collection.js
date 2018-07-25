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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/collection/object.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/collection/id.js":
/*!******************************!*\
  !*** ./src/collection/id.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _avl = __webpack_require__(/*! avl */ "avl");

var _avl2 = _interopRequireDefault(_avl);

var _get = __webpack_require__(/*! lodash/get */ "lodash/get");

var _get2 = _interopRequireDefault(_get);

var _id = __webpack_require__(/*! ../resource/id */ "./src/resource/id.js");

var _id2 = _interopRequireDefault(_id);

var _compareResourceIDs = __webpack_require__(/*! ../helpers/compareResourceIDs */ "./src/helpers/compareResourceIDs.js");

var _compareResourceIDs2 = _interopRequireDefault(_compareResourceIDs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResourceIDCollection {
  constructor(source, options) {
    (0, _assign2.default)(this, {
      _avl: new _avl2.default(_compareResourceIDs2.default, true),
      _isArray: false,
      _isEmpty: true
    });

    const ResourceConstructor = this.ResourceConstructor;

    if (arguments.length) {
      if (Array.isArray(source)) {
        source.forEach(source => {
          const resource = source instanceof _id2.default ? source : new ResourceConstructor(source, options);

          if (!this.has(resource)) {
            this.add(resource);
          }
        });

        if (this.count()) {
          this._isEmpty = false;
        }
        this._isArray = true;
      } else {
        const resource = source instanceof _id2.default ? source : new ResourceConstructor(source, options);
        this.add(resource);
        this._isArray = false;
        this._isEmpty = false;
      }
    }
  }

  get ResourceConstructor() {
    return _id2.default;
  }

  isArray() {
    return this._isArray;
  }

  isEmpty() {
    return this._isEmpty;
  }

  toJSON(options, globalScopeCollection = this) {
    if (this.isArray()) {
      return this.values().map(resourceID => resourceID.toJSON(options));
    } else if (this.isEmpty()) {
      return null;
    } else {
      const resourceID = this.values()[0];
      return resourceID.toJSON(options);
    }
  }

  has(resourceID) {
    return this._avl.contains(resourceID);
  }

  get(resourceID) {
    const node = this._avl.find(resourceID);
    if (node) {
      return node.data;
    }
  }

  keys() {
    return this._avl.keys();
  }

  values() {
    return this._avl.values();
  }

  entries() {
    const entries = [];

    this._avl.forEach(node => {
      entries.push([node.key, node.data]);
    });

    return entries;
  }

  count() {
    return this.keys().length;
  }

  add(resource) {
    this._avl.insert(resource, resource);

    return this.count();
  }

  update(resource) {
    if (this.has(resource)) {
      this.add(resource);
      return true;
    }

    return false;
  }
}

exports.default = ResourceIDCollection;
module.exports = exports['default'];

/***/ }),

/***/ "./src/collection/object.js":
/*!**********************************!*\
  !*** ./src/collection/object.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _id = __webpack_require__(/*! ./id */ "./src/collection/id.js");

var _id2 = _interopRequireDefault(_id);

var _object = __webpack_require__(/*! ../resource/object */ "./src/resource/object.js");

var _object2 = _interopRequireDefault(_object);

var _transform = __webpack_require__(/*! ./transform */ "./src/collection/transform/index.js");

var _transform2 = _interopRequireDefault(_transform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _include(resource) {
  const included = resource.included();

  if (included) {
    if (!this._included) {
      this._included = {};
    }

    for (let type in included) {
      if (!(type in this._included)) {
        this._included[type] = new _id2.default();
      }

      included[type].values().forEach(resource => {
        this._included[type].add(resource);
      });
    }
  }

  return included;
}

class ResourceCollection extends _id2.default {
  static merge(a, ...collections) {
    const source = [a, ...collections].reduce((source, collection) => source.concat(collection.values()), []);
    return new ResourceCollection(source, {});
  }

  get ResourceConstructor() {
    return _object2.default;
  }

  add(resource) {
    const count = _id2.default.prototype.add.call(this, resource);

    _include.call(this, resource);

    return count;
  }

  included() {
    if (arguments.length) {
      return this._included[arguments[0]];
    }
    return this._included;
  }

  toJSON(options, globalScopeCollection = this) {
    return (0, _transform2.default)(this.values(), options, globalScopeCollection).map(resource => resource.toJSON(options));
  }
}

exports.default = ResourceCollection;
module.exports = exports['default'];

/***/ }),

/***/ "./src/collection/transform/index.js":
/*!*******************************************!*\
  !*** ./src/collection/transform/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sort = __webpack_require__(/*! ./sort */ "./src/collection/transform/sort.js");

var _sort2 = _interopRequireDefault(_sort);

var _paginate = __webpack_require__(/*! ./paginate */ "./src/collection/transform/paginate.js");

var _paginate2 = _interopRequireDefault(_paginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postTransform = (data, options, globalScopeCollection) => {
  if (!options) {
    return data;
  }

  if ('sort' in options) {
    data = (0, _sort2.default)(data, options.sort, globalScopeCollection);
  }

  if ('page' in options) {
    data = (0, _paginate2.default)(data, options.page);
  }

  return data;
};

exports.default = postTransform;
module.exports = exports['default'];

/***/ }),

/***/ "./src/collection/transform/paginate.js":
/*!**********************************************!*\
  !*** ./src/collection/transform/paginate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFunction = __webpack_require__(/*! lodash/isFunction */ "lodash/isFunction");

var _isFunction2 = _interopRequireDefault(_isFunction);

var _paginationStrategies = __webpack_require__(/*! ./paginationStrategies */ "./src/collection/transform/paginationStrategies.js");

var paginationStrategies = _interopRequireWildcard(_paginationStrategies);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PAGINATION_LINKS_PROPS = ['self', 'first', 'last', 'prev', 'next'];

const applyPagination = (dataArray, options) => {
  let strategy = options;

  if ('strategy' in options) {
    strategy = paginationStrategies[options.strategy];

    if (!strategy) {
      throw new ReferenceError('Cannot use pagination strategy:', options.strategy);
    }
  }

  const {
    offset,
    end
  } = strategy.bounds(dataArray.length, options.offset, options.limit);

  for (let prop of PAGINATION_LINKS_PROPS) {
    const createQuery = strategy[prop];
    if (createQuery) {
      let query;
      if ((0, _isFunction2.default)(createQuery)) {
        query = createQuery(dataArray.length, offset, end, options.limit);
      } else {
        query = createQuery;
      }
      // console.log('!', query)
      /**
        * TODO add links to collection body
      */
    }
  }

  dataArray = dataArray.slice(offset, end);

  // if (!dataArray.length) {
  //   dataArray = null
  // }

  return dataArray;
};

exports.default = applyPagination;
module.exports = exports['default'];

/***/ }),

/***/ "./src/collection/transform/paginationStrategies.js":
/*!**********************************************************!*\
  !*** ./src/collection/transform/paginationStrategies.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function parsePaginationQueryParam(param, fallback = 0) {
  param = parseInt(param);

  if (isNaN(param)) {
    param = fallback;
  } else {
    param = Math.floor(param);
  }

  return param;
}

function tranformPaginationQuery(length, offset, limit) {
  offset = parsePaginationQueryParam(offset, 0);
  limit = parsePaginationQueryParam(limit, length);

  if (offset < 0) {
    offset += length;
  }

  if (offset < 0) {
    offset = 0;
  } else if (offset >= length) {
    offset = length;
  }

  if (limit < 0) {
    limit = 0;
  } else if (offset + limit > length) {
    limit = length - offset;
  }

  return {
    offset,
    limit
  };
}

const offset = exports.offset = {
  limit(clientLimit, serverLimit) {
    let limit = parsePaginationQueryParam(clientLimit);

    if (limit >= 1 && limit < serverLimit) {
      limit = Math.floor(limit);
    } else if (serverLimit) {
      limit = serverLimit;
    } else {
      limit = Infinity;
    }

    return limit;
  },

  bounds(length, _offset, _limit) {
    const {
      offset,
      limit
    } = tranformPaginationQuery(length, _offset, _limit);

    return {
      offset,
      end: offset + limit
    };
  },
  self(length, _offset, _end, _limit) {
    const {
      offset,
      limit
    } = tranformPaginationQuery(length, _offset, _limit);

    return {
      offset,
      limit
    };
  },
  next(length, _offset, _end, _limit) {
    const {
      offset,
      limit
    } = tranformPaginationQuery(length, _end, _limit);

    if (!limit) {
      return null;
    }

    return {
      offset,
      limit
    };
  },
  prev: (length, _offset, _end, _limit) => {
    const {
      offset,
      limit
    } = tranformPaginationQuery(_offset, _offset - _limit, _limit);

    if (!limit) {
      return null;
    }

    return {
      offset,
      limit
    };
  },
  first: (length, _offset, _end, _limit) => {
    const {
      offset,
      limit
    } = tranformPaginationQuery(length, 0, _limit > length ? length : _limit > _offset && _offset > 0 ? _offset : _limit);

    return {
      offset,
      limit: _limit
    };
  },
  last: (length, _offset, _end, _limit) => {
    const {
      offset,
      limit
    } = tranformPaginationQuery(length, 2 * _limit < length ? length - _limit : _limit < length ? _end + _limit < length ? _end : length - _limit : 0, _limit);

    return {
      offset,
      limit
    };
  }
};

/***/ }),

/***/ "./src/collection/transform/sort.js":
/*!******************************************!*\
  !*** ./src/collection/transform/sort.js ***!
  \******************************************/
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
  const [prop, vector] = rule;
  return _sortByNumberOrCharCodes(vector, a.attr(prop), b.attr(prop));
}

function _parseSortRules(options) {
  return string.split(',');
}

function sort(data, options, globalScopeCollection) {
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
    for (let rule of options) {
      const res = _sortByKey(rule, globalScopeCollection.get(a), globalScopeCollection.get(b));

      if (res) {
        return res;
      }
    }

    return 0;
  });
}

exports.default = sort;
module.exports = exports['default'];

/***/ }),

/***/ "./src/helpers/compareResourceIDs.js":
/*!*******************************************!*\
  !*** ./src/helpers/compareResourceIDs.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compare;
function compare(a, b) {
  if (!a) {
    if (!b) {
      return 0;
    }

    return -1;
  } else if (!b) {
    return 1;
  }

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
module.exports = exports['default'];

/***/ }),

/***/ "./src/resource/id.js":
/*!****************************!*\
  !*** ./src/resource/id.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pick = __webpack_require__(/*! lodash/pick */ "lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _props = __webpack_require__(/*! ./props */ "./src/resource/props.js");

var _pre = __webpack_require__(/*! ../transform/id/pre */ "./src/transform/id/pre.js");

var _pre2 = _interopRequireDefault(_pre);

var _post = __webpack_require__(/*! ../transform/id/post */ "./src/transform/id/post.js");

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResourceID {
  static transform(source, options) {
    return (0, _pre2.default)(source, options);
  }

  constructor(source, options) {
    this._source = source;
    // console.log('source', this._source)
    // console.log('options', options)
    this._value = (0, _pre2.default)(source, options);
    // console.log('value', this._value)
  }

  get id() {
    return this._value && this._value.id;
  }

  get type() {
    return this._value && this._value.type;
  }

  toJSON(options) {
    return (0, _post2.default)(this._value);
  }
}
exports.default = ResourceID;
module.exports = exports['default'];

/***/ }),

/***/ "./src/resource/object.js":
/*!********************************!*\
  !*** ./src/resource/object.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = __webpack_require__(/*! lodash/get */ "lodash/get");

var _get2 = _interopRequireDefault(_get);

var _id = __webpack_require__(/*! ./id */ "./src/resource/id.js");

var _id2 = _interopRequireDefault(_id);

var _id3 = __webpack_require__(/*! ../collection/id */ "./src/collection/id.js");

var _id4 = _interopRequireDefault(_id3);

var _pre = __webpack_require__(/*! ../transform/id/pre */ "./src/transform/id/pre.js");

var _pre2 = _interopRequireDefault(_pre);

var _pre3 = __webpack_require__(/*! ../transform/object/pre */ "./src/transform/object/pre.js");

var _pre4 = _interopRequireDefault(_pre3);

var _post = __webpack_require__(/*! ../transform/object/post */ "./src/transform/object/post.js");

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function include(source, options) {
  if (typeof options === 'object') {
    const included = {};

    for (let type in options) {
      const typeOptions = options[type];
      let _source = source;

      if ('from' in typeOptions) {
        _source = (0, _get2.default)(source, typeOptions.from);
      }

      included[type] = new _id4.default(_source, typeOptions);
    }

    return included;
  }

  return null;
}

class ResourceObject extends _id2.default {
  static transform(source, options) {
    return (0, _pre4.default)((0, _pre2.default)(source, options));
  }

  constructor(source, options = {}) {
    super(source, options);

    this._value = (0, _pre4.default)(this._value, options);

    this._included = include(source, options.relationships);
  }

  get attr() {
    return this.attribute;
  }

  attribute(path) {
    return (0, _get2.default)(this.attributes(), path);
  }

  attributes() {
    if (this._value) {
      return this._value.attributes;
    }
  }

  included() {
    if (arguments.length) {
      return this._included[arguments[0]];
    }
    return this._included;
  }

  toJSON(options) {
    return (0, _post2.default)(this._value, options);
  }
}

const source = {
  id: 0,
  test: true,
  someAttr: 'someValue'
};

const options = {
  // fields: [
  //   'test'
  // ],
  defaults: {
    type: '#test'
  },
  merge: {
    attributes: {
      someOtherAttr: 'someOtherValue'
    }
  }

  // const rID = new ResourceID(source, options)
  // const r = new ResourceObject(source, options)
  //
  // console.log(rID.toJSON())
  // console.log(r.toJSON())

};exports.default = ResourceObject;
module.exports = exports['default'];

/***/ }),

/***/ "./src/resource/props.js":
/*!*******************************!*\
  !*** ./src/resource/props.js ***!
  \*******************************/
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

/***/ "./src/transform/id/alias.js":
/*!***********************************!*\
  !*** ./src/transform/id/alias.js ***!
  \***********************************/
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

/***/ "./src/transform/id/post.js":
/*!**********************************!*\
  !*** ./src/transform/id/post.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pick = __webpack_require__(/*! lodash/pick */ "lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _isObject = __webpack_require__(/*! lodash/isObject */ "lodash/isObject");

var _isObject2 = _interopRequireDefault(_isObject);

var _isNil = __webpack_require__(/*! lodash/isNil */ "lodash/isNil");

var _isNil2 = _interopRequireDefault(_isNil);

var _props = __webpack_require__(/*! ../../resource/props */ "./src/resource/props.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transform(data, options) {
  if ((0, _isNil2.default)(data)) {
    return null;
  }

  if ((0, _isObject2.default)(data)) {
    data = (0, _pick2.default)(data, _props.RESOURCE_IDENTIFIER_PROPS);
  }

  return data;
}

exports.default = transform;
module.exports = exports['default'];

/***/ }),

/***/ "./src/transform/id/pre.js":
/*!*********************************!*\
  !*** ./src/transform/id/pre.js ***!
  \*********************************/
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

var _isFunction = __webpack_require__(/*! lodash/isFunction */ "lodash/isFunction");

var _isFunction2 = _interopRequireDefault(_isFunction);

var _alias = __webpack_require__(/*! ./alias */ "./src/transform/id/alias.js");

var _alias2 = _interopRequireDefault(_alias);

var _props = __webpack_require__(/*! ../../resource/props */ "./src/resource/props.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transform(data, options) {
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
    data = (0, _assign2.default)({}, data);

    for (let prop of _props.RESOURCE_IDENTIFIER_ESSENTIAL_PROPS) {
      if ((0, _isNil2.default)(data[prop])) {
        if ('fallback' in options) {
          if ((0, _isFunction2.default)(options.fallback)) {
            data = options.fallback(data);
          } else {
            data = options.fallback;
          }

          break;
        }

        const error = new TypeError(`Cannot transform '${prop}' prop to string`);
        (0, _assign2.default)(error, {
          data,
          prop
        });

        throw error;
      }

      data[prop] += '';
    }
  }

  return data;
}

exports.default = transform;
module.exports = exports['default'];

/***/ }),

/***/ "./src/transform/object/post.js":
/*!**************************************!*\
  !*** ./src/transform/object/post.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isNil = __webpack_require__(/*! lodash/isNil */ "lodash/isNil");

var _isNil2 = _interopRequireDefault(_isNil);

var _isEmpty = __webpack_require__(/*! lodash/isEmpty */ "lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _pick = __webpack_require__(/*! lodash/pick */ "lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _isObject = __webpack_require__(/*! lodash/isObject */ "lodash/isObject");

var _isObject2 = _interopRequireDefault(_isObject);

var _isFunction = __webpack_require__(/*! lodash/isFunction */ "lodash/isFunction");

var _isFunction2 = _interopRequireDefault(_isFunction);

var _props = __webpack_require__(/*! ../../resource/props */ "./src/resource/props.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformObject(data, options) {
  if ((0, _isNil2.default)(data)) {
    return null;
  }

  if ((0, _isObject2.default)(options)) {
    if ('fields' in options) {
      const attributes = (0, _pick2.default)(data.attributes, options.fields);

      if (!(0, _isEmpty2.default)(attributes)) {
        data.attributes = attributes;
      }
    }
  }

  data = (0, _pick2.default)(data, _props.RESOURCE_PROPS);

  return data;
}

exports.default = transformObject;
module.exports = exports['default'];

/***/ }),

/***/ "./src/transform/object/pre.js":
/*!*************************************!*\
  !*** ./src/transform/object/pre.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _pick = __webpack_require__(/*! lodash/pick */ "lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _omit = __webpack_require__(/*! lodash/omit */ "lodash/omit");

var _omit2 = _interopRequireDefault(_omit);

var _defaults = __webpack_require__(/*! lodash/defaults */ "lodash/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _isEmpty = __webpack_require__(/*! lodash/isEmpty */ "lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isObject = __webpack_require__(/*! lodash/isObject */ "lodash/isObject");

var _isObject2 = _interopRequireDefault(_isObject);

var _isFunction = __webpack_require__(/*! lodash/isFunction */ "lodash/isFunction");

var _isFunction2 = _interopRequireDefault(_isFunction);

var _props = __webpack_require__(/*! ../../resource/props */ "./src/resource/props.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function coreTransformObject(data, options) {
  const alienMembers = (0, _omit2.default)(data, _props.RESOURCE_PROPS);

  if (!(0, _isEmpty2.default)(alienMembers)) {
    data.attributes = (0, _defaults2.default)(data.attributes, alienMembers);
  }

  if ((0, _isObject2.default)(options)) {
    if ('links' in options) {
      if ((0, _isFunction2.default)(options.links)) {
        data.links = options.links(data.type, data.id);
      } else {
        data.links = (0, _assign2.default)({}, options.links);
      }
    }
  }

  return data;
}

exports.default = coreTransformObject;
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

/***/ "babel-runtime/core-js/object/assign":
/*!******************************************************!*\
  !*** external "babel-runtime/core-js/object/assign" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

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

/***/ "lodash/isFunction":
/*!************************************!*\
  !*** external "lodash/isFunction" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/isFunction");

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
//# sourceMappingURL=collection.js.map
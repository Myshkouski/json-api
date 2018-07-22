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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/resource/object.js");
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

var _defineProperties = __webpack_require__(/*! babel-runtime/core-js/object/define-properties */ "babel-runtime/core-js/object/define-properties");

var _defineProperties2 = _interopRequireDefault(_defineProperties);

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
    (0, _defineProperties2.default)(this, {
      '_avl': {
        value: new _avl2.default(_compareResourceIDs2.default, true)
      },
      '_array': {
        writable: true,
        value: false
      },
      '_empty': {
        writable: true,
        value: true
      }
    });

    const ResourceConstructor = this.ResourceConstructor;

    if (arguments.length) {
      if (Array.isArray(source)) {
        source.forEach(source => {
          const resource = new ResourceConstructor(source, options);

          if (!collection.has(resource)) {
            this.add(resource);
          }
        });

        if (collection.count()) {
          this._empty = false;
        }
        this._array = true;
      } else {
        const resource = new ResourceConstructor(source, options);
        this.add(resource);
        this._array = false;
        this._empty = false;
      }
    }
  }

  get ResourceConstructor() {
    return ResourceIDCollection;
  }

  isArray() {
    return this._array;
  }

  isEmpty() {
    return this._nullable;
  }

  has(resource) {
    return this._avl.has(resource);
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

  add(id, value = id) {
    this._avl.insert(id, value);

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

var _id = __webpack_require__(/*! ../transform/id */ "./src/transform/id/index.js");

var _id2 = _interopRequireDefault(_id);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResourceID {
  static get transform() {
    return _id2.default;
  }

  constructor(source, options) {
    this._source = source;
    this._value = ResourceID.transform(source, options);
  }

  get id() {
    return this._value && this._value.id;
  }

  get type() {
    return this._value && this._value.type;
  }

  toJSON(options) {
    if (isNil(this._value)) {
      return null;
    }

    data = (0, _pick2.default)(data, RESOURCE_PROPS);

    return data;
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

var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _id = __webpack_require__(/*! ./id */ "./src/resource/id.js");

var _id2 = _interopRequireDefault(_id);

var _object = __webpack_require__(/*! ../transform/object */ "./src/transform/object/index.js");

var _object2 = _interopRequireDefault(_object);

var _id3 = __webpack_require__(/*! ../collection/id */ "./src/collection/id.js");

var _id4 = _interopRequireDefault(_id3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function include(source, options) {
  if (typeof options === 'object') {
    const included = {};

    for (let type in options) {
      included[type] = _id4.default.from(source, options[type]);
    }

    return included;
  }

  return null;
}

class ResourceObject extends _id2.default {
  static get transform() {
    return _object2.default;
  }

  constructor(source, options = {}) {
    super(source, options);

    (0, _assign2.default)(this._value, (0, _object2.default)(source, options));

    this._included = include(source, options.relationships);
  }

  set(...args) {
    return set(this._attrs, ...args);
  }

  get(...args) {
    return get(this._attrs, ...args);
  }

  included() {
    return this._included;
  }

  toJSON() {
    const resource = this._value;

    if (this._included) {
      resource.relationships = this._included.toJSON();
    }

    return resource;
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
};

const rID = new _id2.default(source, options);
const r = new ResourceObject(source, options);

console.log(rID.toJSON());
console.log(r.toJSON());

exports.default = ResourceObject;
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

/***/ "./src/transform/id/core.js":
/*!**********************************!*\
  !*** ./src/transform/id/core.js ***!
  \**********************************/
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
    data = _props.RESOURCE_IDENTIFIER_ESSENTIAL_PROPS.reduce((data, key) => {
      if ((0, _isNil2.default)(data[key])) {
        const error = new TypeError(`Cannot transform '${key}' prop to string`);
        (0, _assign2.default)(error, {
          key,
          data
        });

        throw error;
      }

      data[key] += '';

      return data;
    }, (0, _assign2.default)({}, data));
  }

  return data;
}

exports.default = transform;
module.exports = exports['default'];

/***/ }),

/***/ "./src/transform/id/index.js":
/*!***********************************!*\
  !*** ./src/transform/id/index.js ***!
  \***********************************/
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

var _core = __webpack_require__(/*! ./core */ "./src/transform/id/core.js");

var _core2 = _interopRequireDefault(_core);

var _props = __webpack_require__(/*! ../../resource/props */ "./src/resource/props.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transform(data, options) {
  if ((0, _isNil2.default)(data)) {
    return null;
  }

  data = (0, _core2.default)(data, options);

  if ((0, _isObject2.default)(data)) {
    data = (0, _pick2.default)(data, _props.RESOURCE_IDENTIFIER_PROPS);
  }

  return data;
}

exports.default = transform;
module.exports = exports['default'];

/***/ }),

/***/ "./src/transform/object/core.js":
/*!**************************************!*\
  !*** ./src/transform/object/core.js ***!
  \**************************************/
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

var _core = __webpack_require__(/*! ../id/core */ "./src/transform/id/core.js");

var _core2 = _interopRequireDefault(_core);

var _props = __webpack_require__(/*! ../../resource/props */ "./src/resource/props.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function coreTransformObject(data, options) {
  data = (0, _core2.default)(data, options);

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

    if ('fields' in options) {
      const attributes = (0, _pick2.default)(data.attributes, options.fields);

      if (!(0, _isEmpty2.default)(attributes)) {
        data.attributes = attributes;
      }
    }
  }

  return data;
}

exports.default = coreTransformObject;
module.exports = exports['default'];

/***/ }),

/***/ "./src/transform/object/index.js":
/*!***************************************!*\
  !*** ./src/transform/object/index.js ***!
  \***************************************/
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

var _core = __webpack_require__(/*! ./core */ "./src/transform/object/core.js");

var _core2 = _interopRequireDefault(_core);

var _props = __webpack_require__(/*! ../../resource/props */ "./src/resource/props.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformObject(data, options) {
  if ((0, _isNil2.default)(data)) {
    return null;
  }

  data = (0, _core2.default)(data, options);

  data = (0, _pick2.default)(data, _props.RESOURCE_PROPS);

  return data;
}

exports.default = transformObject;
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

/***/ "babel-runtime/core-js/object/define-properties":
/*!*****************************************************************!*\
  !*** external "babel-runtime/core-js/object/define-properties" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/define-properties");

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
//# sourceMappingURL=resource.js.map
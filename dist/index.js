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

var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ "babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ "babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _json8Patch = __webpack_require__(/*! json8-patch */ "json8-patch");

var _json8Patch2 = _interopRequireDefault(_json8Patch);

var _defaultsDeep = __webpack_require__(/*! lodash/defaultsDeep */ "lodash/defaultsDeep");

var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

var _cloneDeep = __webpack_require__(/*! lodash/cloneDeep */ "lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _get = __webpack_require__(/*! lodash/get */ "lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = __webpack_require__(/*! lodash/set */ "lodash/set");

var _set2 = _interopRequireDefault(_set);

var _pick = __webpack_require__(/*! lodash/pick */ "lodash/pick");

var _pick2 = _interopRequireDefault(_pick);

var _omit = __webpack_require__(/*! lodash/omit */ "lodash/omit");

var _omit2 = _interopRequireDefault(_omit);

var _merge = __webpack_require__(/*! lodash/merge */ "lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _validate = __webpack_require__(/*! ./validate */ "./src/validate.js");

var _mapValidationErrors = __webpack_require__(/*! ./mapValidationErrors */ "./src/mapValidationErrors.js");

var _mapValidationErrors2 = _interopRequireDefault(_mapValidationErrors);

var _paginationStrategies = __webpack_require__(/*! ./paginationStrategies */ "./src/paginationStrategies.js");

var pagination = _interopRequireWildcard(_paginationStrategies);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _concatenateData(...args) {
  const array = args.reduce((a, b) => {
    if (Array.isArray(b)) {
      return a.concat(b);
    } else {
      return a.concat([b]);
    }
  }, []);

  return array.length ? array : null;
}

function _wrapForSingleOrEvery(f) {
  return function (...args) {
    const data = args[0];
    if (Array.isArray(data)) {
      return data.map(data => f.apply(this, [data, ...args.slice(1)]));
    } else if (typeof data == 'object') {
      return f.apply(this, args);
    }
  };
}

function _wrapForManyOnly(f) {
  return function (...args) {
    const data = args[0];
    if (Array.isArray(data)) {
      return f.apply(this, [data, ...args.slice(1)]);
    }

    return data;
  };
}

const _forEvery = _wrapForSingleOrEvery((data, f) => f(data));

const _createIndex = _wrapForSingleOrEvery((data, _indexedCache = {}) => {
  for (let type in data._include) {
    (0, _defaultsDeep2.default)(_indexedCache, {
      [type]: {}
    });
    (0, _keys2.default)(data._include[type]).forEach(id => (0, _set2.default)(_indexedCache, [type, id]));
  }
});

const _cacheIndex = _wrapForSingleOrEvery((data, _indexedCache = {}) => {
  (0, _set2.default)(_indexedCache, [data.type, data.id], data);
});

function _extractIndexedCache(_indexedCache) {
  const array = [];
  for (let type in _indexedCache) {
    const _indexedCacheType = _indexedCache[type];
    for (let id in _indexedCacheType) {
      array.push(_indexedCacheType[id]);
    }
  }
  return array;
}

function assignAlias(data, alias, fullPath) {
  if (typeof alias == 'string') {
    return alias.length ? (0, _get2.default)(data, alias) : data;
  } else {
    let obj;
    if (Array.isArray(alias)) {
      obj = [];
    } else {
      obj = (0, _assign2.default)({}, data);
    }

    if (typeof alias == 'object') {
      for (let key in alias) {
        const path = (fullPath || '') + key;

        let _alias = alias[key];

        const aliased = assignAlias(data, _alias, path);

        if (path != _alias) {
          obj = (0, _omit2.default)(obj, [_alias]);
        }

        (0, _set2.default)(obj, key, aliased);
      }
    }

    return obj;
  }
}

const _wrappedAssignAlias = _wrapForSingleOrEvery(assignAlias);
const _wrappedPick = _wrapForSingleOrEvery(_pick2.default);

function assignDefaults(data, options) {
  return (0, _defaultsDeep2.default)({}, data, options);
}

function _sortByNumberOrCharCodes(reverse, a, b) {
  if (a > b) {
    return reverse;
  } else if (a < b) {
    return -1 * reverse;
  }

  return 0;
}

function _sortByKey(rule, a, b) {
  const [key, reverse] = rule;
  return _sortByNumberOrCharCodes(reverse, (0, _get2.default)(a, key), (0, _get2.default)(b, key));
}

function _parseSortRules(string) {
  return string.split(',').map(key => {
    const rule = [];
    if (key[0] == '-') {
      rule[0] = key.slice(1);
      rule[1] = -1;
    } else {
      rule[0] = key;
      rule[1] = 1;
    }

    return rule;
  });
}

const _applySort = _wrapForManyOnly((data, options) => {
  const rules = _parseSortRules(options);
  return data.sort((a, b) => {
    for (let rule of rules) {
      const res = _sortByKey(rule, a.attributes, b.attributes);

      if (res) {
        return res;
      }
    }

    return 0;
  });
});

function _applyAttributesFields(data, options) {
  options = options.split(',');
  data.attributes = (0, _pick2.default)(data.attributes, options);
  return data;
}

const RESOURCE_IDENTIFIER_PROPS = ['id', 'type', 'meta'];

function _applyIncluded(data, cache = {}, options) {
  if (data) {
    Object.defineProperty(data, '_include', {
      enumerable: true,
      value: {}
    });

    for (let type in options) {
      let typeOptions = options[type];
      let resourceIdentifiers = data._source;
      if ('key' in typeOptions && typeOptions.key.length) {
        resourceIdentifiers = (0, _get2.default)(data._source, typeOptions.key);
      }

      if ('alias' in typeOptions) {
        resourceIdentifiers = _wrappedAssignAlias(resourceIdentifiers, typeOptions.alias);
      }

      resourceIdentifiers = _wrappedPick(resourceIdentifiers, RESOURCE_IDENTIFIER_PROPS);

      data._include[type] = {};

      _forEvery(resourceIdentifiers, resourceId => {
        (0, _defineProperty2.default)(data._include[type], resourceId.id, {
          enumerable: true,
          get() {
            return (0, _get2.default)(cache, [type, resourceId.id]);
          }
        });
      });
    }
  }

  return data;
}

const resourceMembers = ['id', 'type', 'attributes', 'relationships', 'links', 'meta'];

const _preTransform = _wrapForSingleOrEvery((_data, cache, options) => {
  let data = _data;

  if ('alias' in options) {
    data = assignAlias(data, options.alias);
  }

  const attributes = (0, _omit2.default)(data, resourceMembers);

  if ((0, _keys2.default)(attributes)) {
    (0, _defaultsDeep2.default)(data, {
      attributes
    });
  }

  data = (0, _pick2.default)(data, resourceMembers);

  if ('id' in data) {
    data.id += '';
  }

  if ('merge' in options) {
    data = (0, _merge2.default)(data, options.merge);
  }

  if ('defaults' in options) {
    data = assignDefaults(data, options.defaults);
  }

  if ('fields' in options) {
    data = _applyAttributesFields(data, options.fields);
  }

  Object.defineProperty(data, '_source', {
    get() {
      return _data;
    }
  });

  if ('include' in options) {
    _applyIncluded(data, cache, options.include);
  }

  return data;
});

const _applyPagination = _wrapForManyOnly((data, options, body) => {
  const strategy = pagination[options.strategy];

  if (strategy) {
    const {
      offset,
      end
    } = strategy.bounds(data.length, options.offset, options.limit);
    ['self', 'first', 'last', 'prev', 'next'].forEach(key => {
      if (typeof strategy[key] == 'function') {
        const query = strategy[key](data.length, offset, end, options.limit);

        // set(body, `links.${ key }`, query)
      }
    });

    data = data.slice(offset, end);

    if (!data.length) {
      data = null;
    }
  } else {
    throw new ReferenceError('Cannot use pagination strategy:', options.strategy);
  }

  return data;
});

const _postTransform = (data, options, report) => {
  if ('sort' in options) {
    data = _applySort(data, options.sort);
  }

  if ('page' in options) {
    data = _applyPagination(data, options.page, report);
  }

  return data;
};

class JsonApi {
  static validate(...args) {
    return (0, _asyncToGenerator3.default)(function* () {
      let ref = '/',
          body = args[0];
      if (args.length > 1) {
        ref = args[0];
        body = args[1];
      }

      try {
        return yield (0, _validate.validate)(ref, body);
      } catch (error) {
        throw {
          message: `Validation error`,
          reasons: error.errors.map(_mapValidationErrors2.default)
        };
      }
    })();
  }

  static get(doc, path) {
    return _json8Patch2.default.get(doc, path);
  }

  static has(doc, path) {
    return _json8Patch2.default.has(doc, path);
  }

  static link(hrefOrLink) {
    let link = {};
    if (typeof hrefOrLink == 'string') {
      link = hrefOrLink;
    } else if (typeof hrefOrLink == 'object') {
      link = (0, _cloneDeep2.default)(hrefOrLink);
    } else {
      return null;
    }

    return link;
  }

  static patch(body, ops, options = {}) {
    return (0, _asyncToGenerator3.default)(function* () {
      options = (0, _defaultsDeep2.default)({}, options, {
        reversible: false
      });

      let res;

      try {
        try {
          res = _json8Patch2.default.apply(body, ops, options);
        } catch (error) {
          error.detail = `Cannot apply JSON patch`;

          throw error;
        }

        if (options.validatePatch) {
          try {
            yield JsonApi.validate(res.doc);
          } catch (error) {
            error.detail = `Document validation failed after patch has been applied`;

            throw error;
          }
        }
      } catch (error) {
        if (options.reversible) {
          const reverted = _json8Patch2.default.revert(body, res.revert).doc;

          error.doc = reverted;
        }

        error.ops = ops;

        throw error;
      }

      return res;
    })();
  }

  static add(body, path, value, options) {
    return (0, _asyncToGenerator3.default)(function* () {
      const ops = [{
        op: 'add',
        path,
        value
      }];

      return yield JsonApi.patch(body, ops, options);
    })();
  }

  static getSchemas() {
    const schemas = (0, _validate.getSchemas)();

    if (options.id == 'index') {
      schema.id = index;
    } else {
      schema.id = schemas[key][options.id];
    }

    schema.type = options.type;

    schema.id = key;
    schema.attributes = (0, _cloneDeep2.default)(schemas[key]);

    array.push(schema);

    return array;
  }

  constructor(options = {}) {
    this.options = {};
    this._connected = {};

    if ('body' in options) {
      if (typeof options.body != 'object') {
        throw new Error(`'options.body' should be a JSON object`);
      }
      this.body = options.body;
    } else {
      this.body = {};
    }

    if ('validatePatch' in options) {
      if (typeof options.validatePatch != 'boolean') {
        throw new Error(`'options.validatePatch' should be 'true' or 'false'`);
      }
      this.options.validatePatch = options.validatePatch;
    } else {
      this.options.validatePatch = false;
    }
  }

  "get"(path) {
    return JsonApi.get(this.body, path);
  }

  has(path) {
    return JsonApi.has(this.body, path);
  }

  validate() {
    var _this = this;

    return (0, _asyncToGenerator3.default)(function* () {
      return yield JsonApi.validate(_this.body);
    })();
  }

  patch(ops) {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      return yield JsonApi.patch(_this2.body, ops, _this2.options);
    })();
  }

  add(path, value) {
    var _this3 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      return yield JsonApi.add(_this3.body, path, value, _this3.options);
    })();
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
    var _this4 = this;

    return (0, _asyncToGenerator3.default)(function* () {
      const _prefetch = _this4._connected[type];

      let {
        data,
        included
      } = yield _prefetch[action](options[type], ...args);

      const _indexedCache = {};

      data = _preTransform(data, _indexedCache, options[type]);
      included = _preTransform(included, _indexedCache, options);

      _createIndex(data, _indexedCache);
      _cacheIndex(included, _indexedCache);

      const _fetchArgs = (0, _keys2.default)(_indexedCache).map(function (type) {
        const typeOptions = (0, _cloneDeep2.default)(options[type]);

        (0, _set2.default)(typeOptions, 'filter', {
          id: (0, _keys2.default)(_indexedCache[type])
        });

        (0, _merge2.default)(typeOptions, {
          merge: {
            type
          }
        });

        return [type, (0, _defaultsDeep2.default)({
          [type]: typeOptions
        }, options)];
      });

      let res = yield _promise2.default.all(_fetchArgs.map(function (fetchArgs) {
        return _this4.fetch(action, ...fetchArgs, ...args);
      }));

      res.forEach(function (fetched) {
        _cacheIndex(fetched.data, _indexedCache);
        _cacheIndex(fetched.included, _indexedCache);
      });

      data = _postTransform(data, options);
      included = _postTransform(_extractIndexedCache(_indexedCache), options);

      return {
        data,
        included
      };
    })();
  }

  data(type) {
    return (0, _asyncToGenerator3.default)(function* () {})();
  }
}

// function _createIndexPendingResources(data, cache) {
//   if (Array.isArray(data)) {
//     data.forEach(data => _createIndexPendingResources(data, cache))
//   } else if (typeof data == 'object') {
//     const {
//       id,
//       type
//     } = data
//
//     if (!cache[type]) {
//       cache[type] = []
//     }
//
//     cache[type].push(id)
//   }
// }

// function _extractPendingResourceTypeIds(type, cache) {
//   if (!cache[type]) {
//     return []
//   }
//
//   const _typeCache = cache[type]
//
//   delete cache[type]
//
//   return _typeCache
// }

// function _filterCachedIds(type, ids, cache) {
//   return ids.filter(id => {
//     const type = cache[type]
//
//     if (type && type[id]) {
//       return false
//     }
//
//     return true
//   })
// }

exports.default = JsonApi;
module.exports = exports['default'];

/***/ }),

/***/ "./src/mapValidationErrors.js":
/*!************************************!*\
  !*** ./src/mapValidationErrors.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = error => ({
  message: error.message,
  path: error.dataPath,
  schema: error.parentSchema.$id
});

module.exports = exports["default"];

/***/ }),

/***/ "./src/paginationStrategies.js":
/*!*************************************!*\
  !*** ./src/paginationStrategies.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const parsePaginationQueryParam = param => {
  param = parseInt(param);

  if (isNaN(param)) {
    param = 0;
  } else {
    param = Math.floor(param);
  }

  return param;
};

const tranformPaginationQuery = (length, offset, limit) => {
  offset = parsePaginationQueryParam(offset);
  limit = parsePaginationQueryParam(limit);

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
};

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
      page: {
        offset,
        limit
      }
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

/***/ "./src/schemas.yaml":
/*!**************************!*\
  !*** ./src/schemas.yaml ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [
	{
		"$id": "/patch/document",
		"properties": {
			"testPropsDefault": {
				"default": "test"
			},
			"decoded": {
				"type": "array"
			}
		},
		"required": [
			"decoded",
			"doc"
		],
		"oneOf": [
			{
				"properties": {
					"testOneOfDefault": {
						"default": "test"
					},
					"decoded": {
						"items": [
							{
								"const": "data"
							},
							{
								"pattern": "^((-)|([0-9])|([1-9][0-9]+))$"
							}
						]
					},
					"doc": {
						"properties": {
							"data": {
								"default": []
							}
						}
					}
				}
			}
		]
	},
	{
		"$id": "/",
		"$async": true,
		"allOf": [
			{
				"anyOf": [
					{
						"required": [
							"data"
						]
					},
					{
						"required": [
							"errors"
						]
					},
					{
						"required": [
							"meta"
						]
					}
				],
				"errorMessage": "A document MUST contain at least one of the following top-level members: 'data', 'errors', 'meta'"
			},
			{
				"not": {
					"required": [
						"errors",
						"data"
					]
				},
				"errorMessage": "The members data and errors MUST NOT coexist in the same document"
			},
			{
				"not": {
					"allOf": [
						{
							"not": {
								"required": [
									"data"
								]
							}
						},
						{
							"required": [
								"included"
							]
						}
					]
				},
				"errorMessage": "If a document does not contain a top-level 'data' key, the 'included' member MUST NOT be present either"
			},
			{
				"type": "object",
				"properties": {
					"data": {
						"$ref": "/data"
					},
					"errors": {
						"$ref": "/errors"
					},
					"meta": {
						"$ref": "/meta"
					},
					"links": {
						"$ref": "/links"
					},
					"included": {
						"$ref": "/included"
					},
					"jsonapi": {
						"type": "object"
					}
				},
				"additionalProperties": false,
				"errorMessage": {
					"type": "A JSON object MUST be at the root of every JSON API request and response containing data",
					"additionalProperties": "Unless otherwise noted, objects defined by this specification MUST NOT contain any additional members"
				}
			}
		]
	},
	{
		"$id": "/data",
		"oneOf": [
			{
				"$ref": "/resource"
			},
			{
				"$ref": "/included"
			},
			{
				"type": "null"
			}
		],
		"errorMessage": "Primary data MUST be either a single resource object, or a single resource identifier object, or null, for requests that target single resources, or an array of resource objects, or an array of resource identifier objects, or an empty array for requests that target resource collections"
	},
	{
		"$id": "/errors",
		"type": "array",
		"items": {
			"$ref": "/error"
		},
		"errorMessage": {
			"type": "Error objects MUST be returned as an array keyed by errors in the top level of a JSON API document"
		}
	},
	{
		"$id": "/links",
		"type": "object",
		"patternProperties": {
			"^.*": {
				"$ref": "/link"
			}
		},
		"additionalProperties": false,
		"errorMessage": {
			"type": "The value of each 'links' member MUST be an object"
		}
	},
	{
		"$id": "/included",
		"type": "array",
		"items": {
			"$ref": "/resource"
		}
	},
	{
		"$id": "/resource",
		"type": "object",
		"properties": {
			"id": {
				"type": "string",
				"errorMessage": "The values of the 'id' member MUST be strings"
			},
			"type": {
				"type": "string",
				"errorMessage": "The values of the 'type' member MUST be strings"
			},
			"meta": {
				"$ref": "/meta"
			},
			"attributes": {
				"type": "object"
			},
			"relationships": {
				"type": "array",
				"items": {
					"$ref": "/resource"
				}
			},
			"links": {
				"$ref": "/links"
			}
		},
		"required": [
			"id",
			"type"
		],
		"additionalProperties": false,
		"errorMessage": {
			"required": "Every resource object MUST contain an 'id' member and a 'type' member"
		}
	},
	{
		"$id": "/error",
		"type": "object"
	},
	{
		"$id": "/meta",
		"type": "object"
	},
	{
		"$id": "/link",
		"oneOf": [
			{
				"type": [
					"string"
				]
			},
			{
				"type": [
					"object"
				],
				"properties": {
					"href": {
						"type": "string",
						"errorMessage": "Member 'href' should be a string containing the link’s URL."
					},
					"meta": {
						"$ref": "/meta"
					}
				},
				"additionalProperties": false
			}
		],
		"errorMessage": "A 'link' MUST be represented either a string containing the link’s URL, or an object which can contain the 'href' and 'meta' members"
	}
];

/***/ }),

/***/ "./src/validate.js":
/*!*************************!*\
  !*** ./src/validate.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSchemas = exports.addSchema = exports.validate = undefined;

var _ajv = __webpack_require__(/*! ajv */ "ajv");

var _ajv2 = _interopRequireDefault(_ajv);

var _ajvErrors = __webpack_require__(/*! ajv-errors */ "ajv-errors");

var _ajvErrors2 = _interopRequireDefault(_ajvErrors);

var _schemas = __webpack_require__(/*! ./schemas */ "./src/schemas.yaml");

var _schemas2 = _interopRequireDefault(_schemas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ajv = new _ajv2.default({
  schemas: _schemas2.default,
  verbose: true,
  allErrors: true,
  jsonPointers: true
});
(0, _ajvErrors2.default)(ajv, {});

const validate = exports.validate = (ref, data) => ajv.validate(ref, data);
const addSchema = exports.addSchema = schemas => ajv.addShema(schema);
const getSchemas = exports.getSchemas = refs => {
  const schemas = {};

  for (let key in ajv._schemas) {
    schemas[key] = ajv._schemas[key].schema;
  }

  return schemas;
};

/***/ }),

/***/ "ajv":
/*!**********************!*\
  !*** external "ajv" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ajv");

/***/ }),

/***/ "ajv-errors":
/*!*****************************!*\
  !*** external "ajv-errors" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ajv-errors");

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

/***/ "babel-runtime/core-js/promise":
/*!************************************************!*\
  !*** external "babel-runtime/core-js/promise" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),

/***/ "babel-runtime/helpers/asyncToGenerator":
/*!*********************************************************!*\
  !*** external "babel-runtime/helpers/asyncToGenerator" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "json8-patch":
/*!******************************!*\
  !*** external "json8-patch" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("json8-patch");

/***/ }),

/***/ "lodash/cloneDeep":
/*!***********************************!*\
  !*** external "lodash/cloneDeep" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/cloneDeep");

/***/ }),

/***/ "lodash/defaultsDeep":
/*!**************************************!*\
  !*** external "lodash/defaultsDeep" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/defaultsDeep");

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

/***/ })

/******/ });
//# sourceMappingURL=index.js.map
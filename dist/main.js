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

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _getIterator2 = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ "babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ "babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = __webpack_require__(/*! babel-runtime/helpers/typeof */ "babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _json8Patch = __webpack_require__(/*! json8-patch */ "json8-patch");

var _json8Patch2 = _interopRequireDefault(_json8Patch);

var _defaultsDeep = __webpack_require__(/*! lodash/defaultsDeep */ "lodash/defaultsDeep");

var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

var _cloneDeep = __webpack_require__(/*! lodash/cloneDeep */ "lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _get = __webpack_require__(/*! lodash/get */ "lodash/get");

var _get2 = _interopRequireDefault(_get);

var _validate2 = __webpack_require__(/*! ./validate */ "./src/validate.js");

var _mapValidationErrors = __webpack_require__(/*! ./mapValidationErrors */ "./src/mapValidationErrors.js");

var _mapValidationErrors2 = _interopRequireDefault(_mapValidationErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _wrapForOneOrMany(f) {
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var data = args[0];
    if (Array.isArray(data)) {
      return data.map(function (data) {
        return f.apply(_this, [data].concat((0, _toConsumableArray3.default)(args.slice(1))));
      });
    } else if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) == 'object') {
      return f.apply(this, args);
    }
  };
}

function _wrapForManyOnly(f) {
  return function () {
    var _this2 = this;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var data = args[0];
    if (Array.isArray(data)) {
      return data.map(function (data) {
        return f.apply(_this2, [data].concat((0, _toConsumableArray3.default)(args.slice(1))));
      });
    }

    return data;
  };
}

var _cache = _wrapForOneOrMany(function (data, cache) {
  var _data$data = data.data,
      id = _data$data.id,
      type = _data$data.type;


  if (!cache[type]) {
    cache[type] = {};
  }

  cache[type][id] = data;
});

function assignAlias(data, alias) {
  if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) == 'object') {
    if (typeof alias == 'string') {
      return (0, _get2.default)(data, alias);
    } else if (Array.isArray(alias)) {
      var _array = [];

      for (var _index in alias) {
        _array[key] = assignAlias(data, alias[_index]);
      }

      return _array;
    } else if ((typeof alias === 'undefined' ? 'undefined' : (0, _typeof3.default)(alias)) == 'object') {
      var obj = (0, _assign2.default)({}, data);

      for (var _key3 in alias) {
        obj[_key3] = assignAlias(data, alias[_key3]);
      }

      return obj;
    } else {
      var error = new TypeError('Canot apply dictionary to document');
      error.doc = data;
      error.alias = alias;
      throw error;
    }
  }
}

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
  var _rule = (0, _slicedToArray3.default)(rule, 2),
      key = _rule[0],
      reverse = _rule[1];

  return _sortByNumberOrCharCodes(reverse, (0, _get2.default)(a, key), (0, _get2.default)(b, key));
}

function _parseSortRules(string) {
  return string.split(',').map(function (key) {
    var rule = [];
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

function _applySort(data, options) {
  var rules = _parseSortRules(options);
  return data.sort(function (a, b) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(rules), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var rule = _step.value;

        var res = _sortByKey(rule, a.data, b.data);

        if (res) {
          return res;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return 0;
  });
}

function _jsonapifyData(data, options) {
  if ('alias' in options) {
    data = assignAlias(data, options.alias);
  }

  if ('defaults' in options) {
    data = assignDefaults(data, options.defaults);
  }

  return data;
}

var _preTransform = _wrapForOneOrMany(function (data, options) {
  return {
    originalData: data,
    data: _jsonapifyData(data, options)
  };
});

var _postTransform = _wrapForManyOnly(function (data, options) {
  if ('sort' in options) {
    data = _applySort(data, options.sort);
  }

  return data;
});

var JsonApi = function () {
  (0, _createClass3.default)(JsonApi, null, [{
    key: 'validate',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var ref,
            body,
            _args = arguments;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ref = '/', body = _args.length <= 0 ? undefined : _args[0];

                if (_args.length > 1) {
                  ref = _args.length <= 0 ? undefined : _args[0];
                  body = _args.length <= 1 ? undefined : _args[1];
                }

                _context.prev = 2;
                _context.next = 5;
                return (0, _validate2.validate)(ref, body);

              case 5:
                return _context.abrupt('return', _context.sent);

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](2);
                throw {
                  message: 'Validation error',
                  reasons: _context.t0.errors.map(_mapValidationErrors2.default)
                };

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 8]]);
      }));

      function validate() {
        return _ref.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: 'get',
    value: function get(doc, path) {
      return _json8Patch2.default.get(doc, path);
    }
  }, {
    key: 'has',
    value: function has(doc, path) {
      return _json8Patch2.default.has(doc, path);
    }
  }, {
    key: 'link',
    value: function link(hrefOrLink) {
      var link = {};
      if (typeof hrefOrLink == 'string') {
        link = hrefOrLink;
      } else if ((typeof hrefOrLink === 'undefined' ? 'undefined' : (0, _typeof3.default)(hrefOrLink)) == 'object') {
        link = (0, _cloneDeep2.default)(hrefOrLink);
      } else {
        return null;
      }

      return link;
    }
  }, {
    key: 'patch',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(body, ops) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var res, reverted;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = (0, _defaultsDeep2.default)({}, options, {
                  reversible: false
                });

                res = void 0;
                _context2.prev = 2;
                _context2.prev = 3;

                res = _json8Patch2.default.apply(body, ops, options);
                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](3);

                _context2.t0.detail = 'Cannot apply JSON patch';

                throw _context2.t0;

              case 11:
                if (!options.validatePatch) {
                  _context2.next = 21;
                  break;
                }

                _context2.prev = 12;
                _context2.next = 15;
                return JsonApi.validate(res.doc);

              case 15:
                _context2.next = 21;
                break;

              case 17:
                _context2.prev = 17;
                _context2.t1 = _context2['catch'](12);

                _context2.t1.detail = 'Document validation failed after patch has been applied';

                throw _context2.t1;

              case 21:
                _context2.next = 28;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t2 = _context2['catch'](2);

                if (options.reversible) {
                  reverted = _json8Patch2.default.revert(body, res.revert).doc;


                  _context2.t2.doc = reverted;
                }

                _context2.t2.ops = ops;

                throw _context2.t2;

              case 28:
                return _context2.abrupt('return', res);

              case 29:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 23], [3, 7], [12, 17]]);
      }));

      function patch(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return patch;
    }()
  }, {
    key: 'add',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(body, path, value, options) {
        var ops;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                ops = [{
                  op: 'add',
                  path: path,
                  value: value
                }];
                _context3.next = 3;
                return JsonApi.patch(body, ops, options);

              case 3:
                return _context3.abrupt('return', _context3.sent);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function add(_x4, _x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: 'getSchemas',
    value: function getSchemas() {
      var schemas = (0, _validate2.getSchemas)();

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
  }]);

  function JsonApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, JsonApi);

    this.options = {};
    this._cache = {
      data: null,
      included: null
    };

    if ('body' in options) {
      if ((0, _typeof3.default)(options.body) != 'object') {
        throw new Error('\'options.body\' should be a JSON object');
      }
      this.body = options.body;
    } else {
      this.body = {};
    }

    if ('validatePatch' in options) {
      if (typeof options.validatePatch != 'boolean') {
        throw new Error('\'options.validatePatch\' should be \'true\' or \'false\'');
      }
      this.options.validatePatch = options.validatePatch;
    } else {
      this.options.validatePatch = false;
    }
  }

  (0, _createClass3.default)(JsonApi, [{
    key: "get",
    value: function get(path) {
      return JsonApi.get(this.body, path);
    }
  }, {
    key: 'has',
    value: function has(path) {
      return JsonApi.has(this.body, path);
    }
  }, {
    key: 'validate',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return JsonApi.validate(this.body);

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function validate() {
        return _ref4.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: 'patch',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ops) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return JsonApi.patch(this.body, ops, this.options);

              case 2:
                return _context5.abrupt('return', _context5.sent);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function patch(_x9) {
        return _ref5.apply(this, arguments);
      }

      return patch;
    }()
  }, {
    key: 'add',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(path, value) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return JsonApi.add(this.body, path, value, this.options);

              case 2:
                return _context6.abrupt('return', _context6.sent);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function add(_x10, _x11) {
        return _ref6.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: 'connect',
    value: function connect(type, fetch) {
      var keys = ['create', 'read', 'update', 'delete'];
      var _createTypeError = function _createTypeError() {
        return new TypeError('Invalid argument type for fetch');
      };
      var _fetch = {};
      if (fetch instanceof Function) {
        keys.forEach(function (key) {
          return _fetch[key] = fetch;
        });
      } else if (fetch instanceof Object) {
        keys.forEach(function (key) {
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
  }, {
    key: 'fetchData',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(type, options) {
        var _fetch, _ref8, data, included, _cache;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _fetch = this._connected[type];
                _context7.next = 3;
                return _fetch[options.action](options);

              case 3:
                _ref8 = _context7.sent;
                data = _ref8.data;
                included = _ref8.included;
                _cache = {
                  data: {},
                  included: {}
                };


                _cache(_preTransform(data, options), _cache.data);
                _cache(_preTransform(included, options), _cache.included);

                _context7.t0 = data;
                _context7.t1 = included;
                return _context7.abrupt('return', {
                  data: _context7.t0,
                  included: _context7.t1,

                  get cache() {
                    return _cache;
                  }
                });

              case 12:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function fetchData(_x12, _x13) {
        return _ref7.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: 'include',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(types) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function include(_x14) {
        return _ref9.apply(this, arguments);
      }

      return include;
    }()
  }, {
    key: 'data',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(type) {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function data(_x15) {
        return _ref10.apply(this, arguments);
      }

      return data;
    }()
  }]);
  return JsonApi;
}();

/**
await jsonapi.data('collection', {
  action: 'read',
  sort: ['name', '-records'],
  filter: [ any ],
  fields: ['name', 'records'],
  page: {
    limit: 1000
  },
  alias: {
    id: '_id'
  },
  limit: 100
})

await jsonapi.include({
  relationships: [{
    type: 'owner',
    alias: {
      id: '_id'
    },
    fields: ['name']
  }]
})
*/

// function _cachePendingResources(data, cache) {
//   if (Array.isArray(data)) {
//     data.forEach(data => _cachePendingResources(data, cache))
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

exports.default = function (error) {
  return {
    message: error.message,
    path: error.dataPath,
    schema: error.parentSchema.$id
  };
};

module.exports = exports["default"];

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

var ajv = new _ajv2.default({
  schemas: _schemas2.default,
  verbose: true,
  allErrors: true,
  jsonPointers: true
});
(0, _ajvErrors2.default)(ajv, {});

var validate = exports.validate = function validate(ref, data) {
  return ajv.validate(ref, data);
};
var addSchema = exports.addSchema = function addSchema(schemas) {
  return ajv.addShema(schema);
};
var getSchemas = exports.getSchemas = function getSchemas(refs) {
  var schemas = {};

  for (var key in ajv._schemas) {
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

/***/ "babel-runtime/core-js/get-iterator":
/*!*****************************************************!*\
  !*** external "babel-runtime/core-js/get-iterator" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),

/***/ "babel-runtime/core-js/object/assign":
/*!******************************************************!*\
  !*** external "babel-runtime/core-js/object/assign" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),

/***/ "babel-runtime/helpers/asyncToGenerator":
/*!*********************************************************!*\
  !*** external "babel-runtime/helpers/asyncToGenerator" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "babel-runtime/helpers/classCallCheck":
/*!*******************************************************!*\
  !*** external "babel-runtime/helpers/classCallCheck" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),

/***/ "babel-runtime/helpers/createClass":
/*!****************************************************!*\
  !*** external "babel-runtime/helpers/createClass" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),

/***/ "babel-runtime/helpers/slicedToArray":
/*!******************************************************!*\
  !*** external "babel-runtime/helpers/slicedToArray" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),

/***/ "babel-runtime/helpers/toConsumableArray":
/*!**********************************************************!*\
  !*** external "babel-runtime/helpers/toConsumableArray" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),

/***/ "babel-runtime/helpers/typeof":
/*!***********************************************!*\
  !*** external "babel-runtime/helpers/typeof" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/typeof");

/***/ }),

/***/ "babel-runtime/regenerator":
/*!********************************************!*\
  !*** external "babel-runtime/regenerator" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

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

/***/ })

/******/ });
//# sourceMappingURL=main.js.map
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

var _typeof2 = __webpack_require__(/*! babel-runtime/helpers/typeof */ "babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ "babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _json8Patch = __webpack_require__(/*! json8-patch */ "json8-patch");

var _json8Patch2 = _interopRequireDefault(_json8Patch);

var _lodash = __webpack_require__(/*! lodash.defaultsdeep */ "lodash.defaultsdeep");

var _lodash2 = _interopRequireDefault(_lodash);

var _validate2 = __webpack_require__(/*! ./validate */ "./src/validate.js");

var _mapValidationErrors = __webpack_require__(/*! ./mapValidationErrors */ "./src/mapValidationErrors.js");

var _mapValidationErrors2 = _interopRequireDefault(_mapValidationErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    key: 'patch',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(body, ops) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var res, reverted;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                res = void 0;
                _context2.prev = 1;
                _context2.prev = 2;

                res = _json8Patch2.default.apply(body, ops, (0, _assign2.default)({}, options, { reversible: true }));
                _context2.next = 10;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](2);

                _context2.t0.detail = 'Cannot apply JSON patch';

                throw _context2.t0;

              case 10:
                if (!options.validatePatch) {
                  _context2.next = 20;
                  break;
                }

                _context2.prev = 11;
                _context2.next = 14;
                return JsonApi.validate(res.doc);

              case 14:
                _context2.next = 20;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t1 = _context2['catch'](11);

                _context2.t1.detail = 'Document validation failed after patch has been applied';

                throw _context2.t1;

              case 20:
                _context2.next = 28;
                break;

              case 22:
                _context2.prev = 22;
                _context2.t2 = _context2['catch'](1);
                reverted = _json8Patch2.default.revert(body, res.revert).doc;


                _context2.t2.doc = reverted;
                _context2.t2.ops = ops;

                throw _context2.t2;

              case 28:
                return _context2.abrupt('return', res);

              case 29:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 22], [2, 6], [11, 16]]);
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
                ops = [{ op: 'add', path: path, value: value }];
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
    value: function getSchemas(options) {
      options = (0, _lodash2.default)({}, options, {
        type: 'schema',
        id: '$id'
      });

      var schemas = (0, _validate2.getSchemas)();
      return (0, _keys2.default)(schemas).reduce(function (array, key, index) {
        var schema = {};

        if (options.id == 'index') {
          schema.id = index;
        } else {
          schema.id = schemas[key][options.id];
        }

        schema.type = options.type;

        schema.attributes = schemas[key];

        array.push(schema);

        return array;
      }, []);
    }
  }]);

  function JsonApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, JsonApi);

    this.options = {};

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
  }]);
  return JsonApi;
}();

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

/***/ "babel-runtime/core-js/object/assign":
/*!******************************************************!*\
  !*** external "babel-runtime/core-js/object/assign" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),

/***/ "babel-runtime/core-js/object/keys":
/*!****************************************************!*\
  !*** external "babel-runtime/core-js/object/keys" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

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

/***/ "lodash.defaultsdeep":
/*!**************************************!*\
  !*** external "lodash.defaultsdeep" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash.defaultsdeep");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map
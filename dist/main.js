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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fast_json_patch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-json-patch */ "fast-json-patch");
/* harmony import */ var fast_json_patch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_json_patch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var json_pointer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! json-pointer */ "json-pointer");
/* harmony import */ var json_pointer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(json_pointer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ajv */ "ajv");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./schemas */ "./src/schemas.yaml");
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_schemas__WEBPACK_IMPORTED_MODULE_3__);





// import ops from './ops'

const ajv = new ajv__WEBPACK_IMPORTED_MODULE_2___default.a({ schemas: (_schemas__WEBPACK_IMPORTED_MODULE_3___default()) });

const assertError = doc => {
  if (json_pointer__WEBPACK_IMPORTED_MODULE_1___default.a.has(doc, '/errors')) {
    throw new Error(`'/errors' has been already set`);
  }
};

class JsonApi {
  static patch(doc, ops) {
    return fast_json_patch__WEBPACK_IMPORTED_MODULE_0___default.a.applyPatch(doc, ops).newDocument;
  }

  static data(doc, value) {
    assertError(doc);

    const path = '/data';

    const ops = [{ op: 'replace', path, value }];

    return JsonApi.patch(doc, ops);
  }

  static error(doc, value) {
    const path = '/errors';

    const ops = [{ op: 'add', path: `${path}/-`, value }];

    if (!json_pointer__WEBPACK_IMPORTED_MODULE_1___default.a.has(doc, path)) {
      ops.unshift({ op: 'add', path, value: [] });
    }

    if (json_pointer__WEBPACK_IMPORTED_MODULE_1___default.a.has('/data')) {
      ops.unshift({ op: 'remove', path: '/included' });
      ops.unshift({ op: 'remove', path: '/data' });
    }

    return JsonApi.patch(doc, ops);
  }

  static meta(doc, value) {
    assertError(doc);

    const path = '/meta';

    const ops = [{ op: 'add', path, value }];

    return JsonApi.patch(doc, ops);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (JsonApi);

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
				"errorMessage": "A document MUST contain at least one of the following top-level members"
			},
			{
				"not": {
					"anyOf": [
						{
							"required": [
								"errors",
								"data"
							],
							"errorMessage": "The members data and errors MUST NOT coexist in the same document"
						},
						{
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
							],
							"errorMessage": "If a document does not contain a top-level 'data' key, the 'included' member MUST NOT be present either"
						}
					]
				}
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
		]
	},
	{
		"$id": "/errors",
		"type": "array",
		"items": {
			"$ref": "/error"
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
		"type": "object"
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
		"$id": "/links",
		"type": "object"
	}
];

/***/ }),

/***/ "ajv":
/*!**********************!*\
  !*** external "ajv" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ajv");

/***/ }),

/***/ "fast-json-patch":
/*!**********************************!*\
  !*** external "fast-json-patch" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fast-json-patch");

/***/ }),

/***/ "json-pointer":
/*!*******************************!*\
  !*** external "json-pointer" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("json-pointer");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map
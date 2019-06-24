/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./js/app.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(velocity) {/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ \"./node_modules/core-js/modules/es.symbol.description.js\");\n/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ \"./node_modules/core-js/modules/es.symbol.iterator.js\");\n/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.from */ \"./node_modules/core-js/modules/es.array.from.js\");\n/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ \"./node_modules/core-js/modules/es.date.to-string.js\");\n/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.parse-int */ \"./node_modules/core-js/modules/es.parse-int.js\");\n/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ \"./node_modules/core-js/modules/es.regexp.to-string.js\");\n/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_12__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar App =\n/*#__PURE__*/\nfunction () {\n  function App() {\n    _classCallCheck(this, App);\n\n    // DOM\n    this.$slider = document.querySelector('.slider');\n    this.$inner = this.$slider.querySelector('.slider__inner');\n    this.$slides = this.$inner.querySelectorAll('.slider__item');\n    this.$nextButton = this.$slider.querySelector('.slider__controller--next');\n    this.$prevButton = this.$slider.querySelector('.slider__controller--prev');\n    this.$dots = document.querySelectorAll('.dot');\n    this.$activeDot = document.querySelector('.dot.is-active'); // 数値\n\n    this.sliderWidth = Math.ceil(window.innerWidth * 0.8);\n    this.lastPosition = -this.sliderWidth;\n    this.lastWidth = this.$slides[0].clientWidth;\n    this.defaultSlideLength = this.$slides.length;\n    this.currentIndex = 1;\n    this.acceleration = 0;\n    this.firstTouchPoint = null;\n    this.lastTouchPoint = null;\n    this.bind();\n    this.initialize();\n  }\n  /**\n   * イベント設定\n   */\n\n\n  _createClass(App, [{\n    key: \"bind\",\n    value: function bind() {\n      var _this = this;\n\n      // リサイズ時にスタイルとかを更新\n      window.addEventListener('resize', function () {\n        return _this.update();\n      }); // 次のスライドへ\n\n      this.$nextButton.addEventListener('click', function () {\n        return _this.toNext();\n      }); // 前のスライドへ\n\n      this.$prevButton.addEventListener('click', function () {\n        return _this.toPrev();\n      }); // 指定のスライドへ\n\n      _toConsumableArray(this.$dots).forEach(function ($dot) {\n        $dot.addEventListener('click', function () {\n          _this.currentIndex = parseInt($dot.dataset.index);\n\n          _this.move();\n\n          _this.updateActiveDot();\n        });\n      });\n\n      this.$slider.addEventListener('touchstart', function (event) {\n        var PAGE_X = Math.ceil(event.changedTouches[0].pageX);\n        _this.firstTouchPoint = PAGE_X;\n        _this.lastTouchPoint = PAGE_X;\n      });\n      this.$slider.addEventListener('touchmove', function (event) {\n        var PAGE_X = Math.ceil(event.changedTouches[0].pageX);\n        var POSITION = _this.lastPosition + (PAGE_X - _this.lastTouchPoint);\n\n        _this.updateSlidePosition(POSITION);\n\n        _this.acceleration = _this.lastTouchPoint - PAGE_X;\n        _this.lastTouchPoint = PAGE_X;\n      });\n      this.$slider.addEventListener('touchend', function (event) {\n        var PAGE_X = Math.ceil(event.changedTouches[0].pageX);\n        var MOVEMENT = PAGE_X - _this.firstTouchPoint; // 加速度と移動量を元にスライドを動かすか判定（当てはまらなければ元の位置に戻す）\n\n        _this.acceleration >= 10 || MOVEMENT <= -(_this.sliderWidth / 5) ? _this.toNext(MOVEMENT) : _this.acceleration <= -10 || MOVEMENT >= _this.sliderWidth / 5 ? _this.toPrev(MOVEMENT) : _this.move(); // 値をリセット\n\n        _this.acceleration = 0;\n      });\n    }\n    /**\n     * 初期化処理\n     */\n\n  }, {\n    key: \"initialize\",\n    value: function initialize() {\n      // 1枚目のスライドを最後尾に複製\n      var $FIRST_SLIDE = this.$slides[0].cloneNode(true);\n      this.$inner.appendChild($FIRST_SLIDE); // 最後のスライドを先頭に複製\n\n      var $LAST_SLIDE = this.$slides[this.$slides.length - 1].cloneNode(true);\n      this.$inner.insertBefore($LAST_SLIDE, this.$inner.firstChild); // 要素追加された状態で取得し直し\n\n      this.$slides = this.$inner.querySelectorAll('.slider__item'); // スライドの数に応じてスタイル調整\n\n      var SLIDE_LENGTH = this.$slides.length;\n      this.$inner.style.width = \"\".concat(SLIDE_LENGTH, \"00%\");\n      this.updateSlidePosition(-this.sliderWidth);\n    }\n    /**\n     * 更新処理\n     */\n\n  }, {\n    key: \"update\",\n    value: function update() {\n      // スライドのサイズがどれだけ変わったか算出\n      var DIFFERENCE = this.lastWidth - this.$slides[0].clientWidth;\n      this.lastWidth = this.$slides[0].clientWidth; // 幅の取得\n\n      this.sliderWidth = Math.ceil(window.innerWidth * 0.8); // スライドの位置更新\n\n      var POSITION = Math.ceil(this.lastPosition + DIFFERENCE * this.currentIndex);\n      this.updateSlidePosition(POSITION);\n    }\n    /**\n     * スライダーの位置を指定の位置に更新する\n     * @param {Number} value - スライダーの位置\n     */\n\n  }, {\n    key: \"updateSlidePosition\",\n    value: function updateSlidePosition(value) {\n      // 実行中のアニメーションを終了させる\n      velocity(this.$inner, 'stop'); // 現在位置の情報を更新\n\n      this.lastPosition = value; // 0秒で指定の位置へ\n\n      velocity(this.$inner, {\n        translateX: value\n      }, {\n        duration: 0\n      });\n    }\n    /**\n     * 次のスライドへ\n     * @param {Number} touchMovedValue - 指操作でスライダーが動いている量\n     */\n\n  }, {\n    key: \"toNext\",\n    value: function toNext() {\n      var touchMovedValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n\n      // 最後のスライドから次のスライドへ行こうとした時\n      if (this.currentIndex === this.defaultSlideLength) {\n        // 先頭に複製されたスライドの位置へ移動\n        this.updateSlidePosition(touchMovedValue);\n        this.currentIndex = 1;\n      } else {\n        // 現在のスライド番号を更新\n        this.currentIndex += 1;\n      }\n\n      this.move();\n    }\n    /**\n     * 前のスライドへ\n     * @param {Number} touchMovedValue - 指操作でスライダーが動いている量\n     */\n\n  }, {\n    key: \"toPrev\",\n    value: function toPrev() {\n      var touchMovedValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n\n      // 1枚目のスライドの状態で前のスライドへ行こうとした時\n      if (this.currentIndex === 1) {\n        // 最後尾に複製されたスライドの位置へ移動\n        var POSITION = -this.sliderWidth * (this.defaultSlideLength + 1);\n        this.updateSlidePosition(POSITION + touchMovedValue);\n        this.currentIndex = this.defaultSlideLength;\n      } else {\n        // 現在のスライド番号を更新\n        this.currentIndex -= 1;\n      }\n\n      this.move();\n    }\n    /**\n     * スライダーを動かす\n     */\n\n  }, {\n    key: \"move\",\n    value: function move() {\n      var _this2 = this;\n\n      // 実行中のアニメーションを終了させる\n      velocity(this.$inner, 'finish'); // 移動先\n\n      var POSITION = -this.sliderWidth * this.currentIndex; // 前回の位置情報を更新\n\n      this.lastPosition = POSITION; // アニメーション実行\n\n      velocity(this.$inner, {\n        translateX: POSITION\n      }, {\n        duration: 500,\n        easing: [250, 30],\n        begin: function begin() {\n          _this2.updateActiveDot();\n        }\n      });\n    }\n    /**\n     * アクティブ状態のドットを更新\n     */\n\n  }, {\n    key: \"updateActiveDot\",\n    value: function updateActiveDot() {\n      this.$activeDot.classList.remove('is-active');\n      var $TARGET = this.$dots[this.currentIndex - 1];\n      $TARGET.classList.add('is-active');\n      this.$activeDot = $TARGET;\n    }\n  }]);\n\n  return App;\n}();\n\nnew App();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! velocity-animate */ \"./node_modules/velocity-animate/velocity.js\")))\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ })

/******/ });
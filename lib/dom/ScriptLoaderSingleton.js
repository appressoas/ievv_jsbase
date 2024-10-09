"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Script = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _instance = null;

/**
 * A script that is loaded or being loaded by {@link ScriptLoaderSingleton}.
 */
var Script = exports.Script = /*#__PURE__*/function () {
  function Script(src) {
    _classCallCheck(this, Script);
    this.state = 'new';
    this.src = src;
    this.scriptTag = null;
    this._loadedCallbacks = [];
    this._onLoad = this._onLoad.bind(this);
  }
  return _createClass(Script, [{
    key: "_onLoad",
    value: function _onLoad() {
      this.state = 'loaded';
      var _iterator = _createForOfIteratorHelper(this._loadedCallbacks),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var callbackObject = _step.value;
          callbackObject.resolve(this);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this._loadedCallbacks = [];
    }
  }, {
    key: "_loadScript",
    value: function _loadScript() {
      var _this = this;
      this.state = 'loading';
      this.scriptTag = document.createElement('script');
      this.scriptTag.src = this.src;
      if (this.scriptTag.readyState) {
        //IE
        this.scriptTag.onreadystatechange = function () {
          if (_this.scriptTag.readyState == "loaded" || _this.scriptTag.readyState == "complete") {
            _this.scriptTag.onreadystatechange = null;
            _this._onLoad();
          }
        };
      } else {
        //Others
        this.scriptTag.onload = this._onLoad;
      }
      this.scriptTag.onload = this._onLoad;
      this.scriptTag.onreadystatechange = this._onLoad;
      document.body.appendChild(this.scriptTag);
    }
  }, {
    key: "_load",
    value: function _load() {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        if (_this2.state == 'loaded') {
          resolve(_this2);
        } else {
          _this2._loadedCallbacks.push({
            resolve: resolve,
            reject: reject
          });
          if (_this2.state == 'new') {
            _this2._loadScript();
          }
        }
      });
    }
  }]);
}();
/**
 * Asyncronous script loader.
 *
 * @example
 * const scriptLoader = new ScriptLoaderSingleton();
 * scriptLoader.load('//example.com/myscript.js').then((script) => {
 *   console.log(`The ${script.src} script was loaded`);
 * });
 */
var ScriptLoaderSingleton = exports.default = /*#__PURE__*/function () {
  /**
   * Get an instance of the singleton.
   *
   * The first time this is called, we create a new instance.
   * For all subsequent calls, we return the instance that was
   * created on the first call.
   */
  function ScriptLoaderSingleton() {
    _classCallCheck(this, ScriptLoaderSingleton);
    if (!_instance) {
      _instance = this;
    }
    this._scriptsMap = new Map(); // Maps src to Script objects
    return _instance;
  }

  /**
   * Load a script.
   *
   * @param {string} src The source URL of the script.
   * @returns {Promise} A Promise that resolves when the script is loaded.
   *    We do not handle errors (not possible with the insert script tag approach),
   *    so this promise will never be rejected.
   */
  return _createClass(ScriptLoaderSingleton, [{
    key: "load",
    value: function load(src) {
      var script;
      if (this._scriptsMap.has(src)) {
        script = this._scriptsMap.get(src);
      } else {
        script = new Script(src);
        this._scriptsMap.set(src, script);
      }
      return script._load();
    }
  }]);
}();
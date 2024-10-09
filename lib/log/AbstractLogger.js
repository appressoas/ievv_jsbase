"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _loglevel = _interopRequireDefault(require("./loglevel"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 */
var AbstractLogger = exports.default = /*#__PURE__*/function () {
  function AbstractLogger() {
    _classCallCheck(this, AbstractLogger);
  }
  return _createClass(AbstractLogger, [{
    key: "getLogLevel",
    value: function getLogLevel() {
      throw new Error('Must be overridden in subclasses.');
    }

    /**
     * Returns ``true`` if loglevel is higher
     * than or equal to {@link LogLevels#DEBUG}.
     */
  }, {
    key: "isDebug",
    get: function get() {
      return this.getLogLevel() >= _loglevel.default.DEBUG;
    }

    /**
     * Returns ``true`` if loglevel is higher
     * than or equal to {@link LogLevels#INFO}.
     */
  }, {
    key: "isInfo",
    get: function get() {
      return this.getLogLevel() >= _loglevel.default.INFO;
    }

    /**
     * Returns ``true`` if loglevel is higher
     * than or equal to {@link LogLevels#WARNING}.
     */
  }, {
    key: "isWarning",
    get: function get() {
      return this.getLogLevel() >= _loglevel.default.WARNING;
    }

    /**
     * Returns ``true`` if loglevel is higher
     * than or equal to {@link LogLevels#ERROR}.
     */
  }, {
    key: "isError",
    get: function get() {
      return this.getLogLevel() >= _loglevel.default.ERROR;
    }
  }, {
    key: "_noOutput",
    value: function _noOutput() {}

    /**
     * Exposes console.log. Will only print if current level is
     * higher than or equal to {@link LogLevels#DEBUG}.
     * @returns {Function} console.log
     */
  }, {
    key: "debug",
    get: function get() {
      if (this.getLogLevel() >= _loglevel.default.DEBUG) {
        return console.log.bind(console);
      }
      return this._noOutput;
    }

    /**
     * Exposes console.log. Will only print if current level is
     * higher than or equal to {@link LogLevels#INFO}.
     * @returns {Function} console.log
     */
  }, {
    key: "info",
    get: function get() {
      if (this.getLogLevel() >= _loglevel.default.INFO) {
        return console.log.bind(console);
      }
      return this._noOutput;
    }

    /**
     * Exposes console.warn. Will only print if current level is
     * higher than or equal to {@link LogLevels#WARNING}.
     * @returns {Function} console.warn
     */
  }, {
    key: "warning",
    get: function get() {
      if (this.getLogLevel() >= _loglevel.default.WARNING) {
        return console.warn.bind(console);
      }
      return this._noOutput;
    }

    /**
     * Exposes console.error. Will only print if current level is
     * higher than or equal to {@link LogLevels#ERROR}.
     * @returns {Function} console.error
     */
  }, {
    key: "error",
    get: function get() {
      if (this.getLogLevel() >= _loglevel.default.ERROR) {
        return console.error.bind(console);
      }
      return this._noOutput;
    }
  }]);
}();
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AbstractLogger2 = _interopRequireDefault(require("./AbstractLogger"));
var _loglevel = _interopRequireDefault(require("./loglevel"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var Logger = exports.default = /*#__PURE__*/function (_AbstractLogger) {
  /**
   *
   * @param {string} name The name of the logger.
   * @param {LoggerSingleton} loggerSingleton The logger singleton
   *      this logger belongs to.
   */
  function Logger(name, loggerSingleton) {
    var _this;
    _classCallCheck(this, Logger);
    _this = _callSuper(this, Logger);
    _this._name = name;
    _this._logLevel = null;
    _this._loggerSingleton = loggerSingleton;
    return _this;
  }

  /**
   * Get the name of this logger.
   * @returns {string}
   */
  _inherits(Logger, _AbstractLogger);
  return _createClass(Logger, [{
    key: "name",
    get: function get() {
      return this._name;
    }

    /**
     * Set the loglevel for this logger.
     *
     * @param {int} logLevel The log level. Must be one of the loglevels
     *      defined in {@link LogLevels}.
     * @throws {RangeError} if {@link LogLevels#validateLogLevel} fails.
     */
  }, {
    key: "setLogLevel",
    value: function setLogLevel(logLevel) {
      _loglevel.default.validateLogLevel(logLevel);
      this._logLevel = logLevel;
    }

    /**
     * Get the log level.
     *
     * If no log level has been set with {@link Logger#setLogLevel},
     * this returns {@link LoggerSingleton#getDefaultLogLevel}.
     *
     * @returns {int}
     */
  }, {
    key: "getLogLevel",
    value: function getLogLevel() {
      if (this._logLevel == null) {
        return this._loggerSingleton.getDefaultLogLevel();
      }
      return this._logLevel;
    }

    /**
     * Get textual name for the log level. If the logger
     * does not have a logLevel (if it inherits it from the LoggerSingleton)
     * a string with information about this and the default logLevel for the
     * LoggerSingleton is returned.
     *
     * Intended for debugging. The format of the string may change.
     *
     * @returns {string}
     */
  }, {
    key: "getTextualNameForLogLevel",
    value: function getTextualNameForLogLevel() {
      if (this._logLevel == null) {
        return '[default for LoggerSingleton - ' + "".concat(this._loggerSingleton.getTextualNameForDefaultLogLevel(), "]");
      }
      return _loglevel.default.getTextualNameForLogLevel(this.getLogLevel());
    }
  }, {
    key: "getDebugInfoString",
    value: function getDebugInfoString() {
      return "".concat(this.name, ": ").concat(this.getTextualNameForLogLevel());
    }
  }]);
}(_AbstractLogger2.default);
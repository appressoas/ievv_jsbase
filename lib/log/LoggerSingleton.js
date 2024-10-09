"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Logger = _interopRequireDefault(require("./Logger"));
var _loglevel = _interopRequireDefault(require("./loglevel"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
 * A logging system.
 *
 * @example <caption>Create and use a logger</caption>
 * import LoggerSingleton from 'ievv_jsbase/lib/log/LoggerSingleton';
 * let mylogger = new LoggerSingleton().loggerSingleton.getLogger('myproject.MyClass');
 * mylogger.debug('Hello debug world');
 * mylogger.info('Hello info world');
 * mylogger.warning('Hello warning world');
 * mylogger.error('Hello error world');
 *
 * @example <caption>Set a default loglevel for all loggers</caption>
 * import LOGLEVEL from 'ievv_jsbase/lib/log/loglevel';
 * new LoggerSingleton().setDefaultLogLevel(LOGLEVEL.DEBUG);
 *
 * @example <caption>Set a custom loglevel for a single logger</caption>
 * import LOGLEVEL from 'ievv_jsbase/lib/log/loglevel';
 * new LoggerSingleton().getLogger('mylogger').setLogLevel(LOGLEVEL.DEBUG);
 */
var LoggerSingleton = exports.default = /*#__PURE__*/function () {
  /**
   * Get an instance of the singleton.
   *
   * The first time this is called, we create a new instance.
   * For all subsequent calls, we return the instance that was
   * created on the first call.
   */
  function LoggerSingleton() {
    _classCallCheck(this, LoggerSingleton);
    if (!_instance) {
      _instance = this;
    }
    this._loggerMap = new Map();
    this.reset();
    return _instance;
  }

  /**
   * Get the number of loggers registered using
   * {@link getLogger}.
   *
   * @returns {number} The number of loggers.
   */
  return _createClass(LoggerSingleton, [{
    key: "getLoggerCount",
    value: function getLoggerCount() {
      return this._loggerMap.size;
    }

    /**
     * Reset to default log level, and clear all
     * custom loggers.
     */
  }, {
    key: "reset",
    value: function reset() {
      this._logLevel = _loglevel.default.WARNING;
      this._loggerMap.clear();
    }

    /**
     * Get the default log level.
     *
     * Defaults to {@link LogLevels#WARNING} if not overridden
     * with {@LoggerSingleton#setDefaultLogLevel}.
     *
     * @returns {int} One of the loglevels defined in {@link LogLevels}
     */
  }, {
    key: "getDefaultLogLevel",
    value: function getDefaultLogLevel() {
      return this._logLevel;
    }

    /**
     * Set the default loglevel.
     *
     * All loggers use this by default unless
     * you override their loglevel.
     *
     * @example <caption>Override loglevel of a specific logger</caption>
     * import LoggerSingleton from 'ievv_jsbase/log/LoggerSingleton';
     * import LOGLEVEL from 'ievv_jsbase/log/loglevel';
     * let loggerSingleton = new LoggerSingleton();
     * loggerSingleton.getLogger('mylogger').setLogLevel(LOGLEVEL.DEBUG);
     *
     * @param logLevel The log level. Must be one of the loglevels
     *      defined in {@link LogLevels}.
     * @throws {RangeError} if {@link LogLevels#validateLogLevel} fails.
     */
  }, {
    key: "setDefaultLogLevel",
    value: function setDefaultLogLevel(logLevel) {
      _loglevel.default.validateLogLevel(logLevel);
      this._logLevel = logLevel;
    }

    /**
     * Get a logger.
     *
     * @param {string} name A name for the logger. Should be a unique name,
     *      so typically the full import path of the class/function using
     *      the logger.
     * @returns {Logger}
     */
  }, {
    key: "getLogger",
    value: function getLogger(name) {
      if (!this._loggerMap.has(name)) {
        this._loggerMap.set(name, new _Logger.default(name, this));
      }
      return this._loggerMap.get(name);
    }

    /**
     * Get the names of all the registered loggers.
     *
     * @returns {Array} Sorted array with the same of the loggers.
     */
  }, {
    key: "getLoggerNameArray",
    value: function getLoggerNameArray() {
      var loggerNames = Array.from(this._loggerMap.keys());
      loggerNames.sort();
      return loggerNames;
    }

    /**
     * Get textual name for the default log level.
     *
     * Intended for debugging. The format of the string may change.
     *
     * @returns {string}
     */
  }, {
    key: "getTextualNameForDefaultLogLevel",
    value: function getTextualNameForDefaultLogLevel() {
      return _loglevel.default.getTextualNameForLogLevel(this.getDefaultLogLevel());
    }

    /**
     * Get a string that summarize information about all the
     * loggers. The string has a list of loglevels with
     * their loglevel. Perfect for debugging.
     *
     * Intended for debugging. The format of the string may change.
     *
     * @returns {string}
     */
  }, {
    key: "getDebugInfoString",
    value: function getDebugInfoString() {
      var loggerInfoString = "Default logLevel: " + "".concat(this.getTextualNameForDefaultLogLevel(), "\n") + "Loggers:\n";
      if (this.getLoggerCount() === 0) {
        loggerInfoString += '(no loggers)\n';
      } else {
        var _iterator = _createForOfIteratorHelper(this.getLoggerNameArray()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var loggerName = _step.value;
            var logger = this.getLogger(loggerName);
            loggerInfoString += " - ".concat(logger.getDebugInfoString(), "\n");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      return loggerInfoString;
    }
  }]);
}();
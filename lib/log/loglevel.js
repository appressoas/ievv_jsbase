"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LogLevels = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Defines valid log levels.
 *
 * Not used directly, but instead via the LOGLEVEL
 * constant exported as default by this module.
 *
 * @example
 * import LOGLEVEL from 'ievv_jsbase/log/loglevel';
 * console.log('The debug loglevel is:', LOGLEVEL.DEBUG);
 * LOGLEVEL.validateLogLevel(10);
 */
var LogLevels = exports.LogLevels = /*#__PURE__*/function () {
  function LogLevels() {
    _classCallCheck(this, LogLevels);
    this._prettyLogLevelNames = {};
    this._prettyLogLevelNames[this.DEBUG] = 'DEBUG';
    this._prettyLogLevelNames[this.INFO] = 'INFO';
    this._prettyLogLevelNames[this.WARNING] = 'WARNING';
    this._prettyLogLevelNames[this.ERROR] = 'ERROR';
    this._prettyLogLevelNames[this.SILENT] = 'SILENT';
  }

  /**
   * Get the number for log level DEBUG.
   * @returns {number}
   */
  return _createClass(LogLevels, [{
    key: "DEBUG",
    get: function get() {
      return 4;
    }

    /**
     * Get the number for log level INFO.
     * @returns {number}
     */
  }, {
    key: "INFO",
    get: function get() {
      return 3;
    }

    /**
     * Get the number for log level WARNING.
     * @returns {number}
     */
  }, {
    key: "WARNING",
    get: function get() {
      return 2;
    }

    /**
     * Get the number for log level ERROR.
     * @returns {number}
     */
  }, {
    key: "ERROR",
    get: function get() {
      return 1;
    }

    /**
     * Get the number for log level SILENT.
     * @returns {number}
     */
  }, {
    key: "SILENT",
    get: function get() {
      return 0;
    }

    /**
     * Validate a log level.
     *
     * Should be used by all functions/methods that set a log level.
     *
     * @param logLevel The loglevel.
     * @throws {RangeError} If ``logLevel`` is not one
     *   of:
     *
     *   - {@link LogLevels#DEBUG}
     *   - {@link LogLevels#INFO}
     *   - {@link LogLevels#WARNING}
     *   - {@link LogLevels#ERROR}
     *   - {@link LogLevels#SILENT}
     */
  }, {
    key: "validateLogLevel",
    value: function validateLogLevel(logLevel) {
      if (logLevel > this.DEBUG || logLevel < this.SILENT) {
        throw new RangeError("Invalid log level: ".concat(logLevel, ", must be between ") + "".concat(this.SILENT, " (SILENT) and ").concat(this.DEBUG, " (DEBUG)"));
      }
    }

    /**
     * Get the textual name for a log level.
     *
     * @param {number} logLevel The log level to get a textual name for.
     * @returns {string}
     *
     * @example
     * const infoText = LOGLEVEL.getTextualNameForLogLevel(LOGLEVEL.INFO);
     * // infoText === 'INFO'
     */
  }, {
    key: "getTextualNameForLogLevel",
    value: function getTextualNameForLogLevel(logLevel) {
      return this._prettyLogLevelNames[logLevel];
    }
  }]);
}();
var LOGLEVEL = new LogLevels();
var _default = exports.default = LOGLEVEL;
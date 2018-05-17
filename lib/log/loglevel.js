"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LogLevels = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var LogLevels =
/*#__PURE__*/
function () {
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


  _createClass(LogLevels, [{
    key: "validateLogLevel",

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
  }, {
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
  }]);

  return LogLevels;
}();

exports.LogLevels = LogLevels;
var LOGLEVEL = new LogLevels();
var _default = LOGLEVEL;
exports.default = _default;
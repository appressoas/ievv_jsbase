"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Logger = _interopRequireDefault(require("./Logger"));

var _loglevel = _interopRequireDefault(require("./loglevel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var LoggerSingleton =
/*#__PURE__*/
function () {
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


  _createClass(LoggerSingleton, [{
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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.getLoggerNameArray()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var loggerName = _step.value;
            var logger = this.getLogger(loggerName);
            loggerInfoString += " - ".concat(logger.getDebugInfoString(), "\n");
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return loggerInfoString;
    }
  }]);

  return LoggerSingleton;
}();

exports.default = LoggerSingleton;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AbstractLogger2 = _interopRequireDefault(require("./AbstractLogger"));

var _loglevel = _interopRequireDefault(require("./loglevel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Logger =
/*#__PURE__*/
function (_AbstractLogger) {
  _inherits(Logger, _AbstractLogger);

  /**
   *
   * @param {string} name The name of the logger.
   * @param {LoggerSingleton} loggerSingleton The logger singleton
   *      this logger belongs to.
   */
  function Logger(name, loggerSingleton) {
    var _this;

    _classCallCheck(this, Logger);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Logger).call(this));
    _this._name = name;
    _this._logLevel = null;
    _this._loggerSingleton = loggerSingleton;
    return _this;
  }
  /**
   * Get the name of this logger.
   * @returns {string}
   */


  _createClass(Logger, [{
    key: "setLogLevel",

    /**
     * Set the loglevel for this logger.
     *
     * @param {int} logLevel The log level. Must be one of the loglevels
     *      defined in {@link LogLevels}.
     * @throws {RangeError} if {@link LogLevels#validateLogLevel} fails.
     */
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
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }]);

  return Logger;
}(_AbstractLogger2.default);

exports.default = Logger;
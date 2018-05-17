"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loglevel = _interopRequireDefault(require("./loglevel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 */
var AbstractLogger =
/*#__PURE__*/
function () {
  function AbstractLogger() {
    _classCallCheck(this, AbstractLogger);
  }

  _createClass(AbstractLogger, [{
    key: "getLogLevel",
    value: function getLogLevel() {
      throw new Error('Must be overridden in subclasses.');
    }
    /**
     * Returns ``true`` if loglevel is higher
     * than or equal to {@link LogLevels#DEBUG}.
     */

  }, {
    key: "_noOutput",
    value: function _noOutput() {}
    /**
     * Exposes console.log. Will only print if current level is
     * higher than or equal to {@link LogLevels#DEBUG}.
     * @returns {Function} console.log
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

  return AbstractLogger;
}();

exports.default = AbstractLogger;
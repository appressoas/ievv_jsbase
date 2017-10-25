"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractLogger2 = require("./AbstractLogger");

var _AbstractLogger3 = _interopRequireDefault(_AbstractLogger2);

var _loglevel = require("./loglevel");

var _loglevel2 = _interopRequireDefault(_loglevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Logger = function (_AbstractLogger) {
    _inherits(Logger, _AbstractLogger);

    /**
     *
     * @param {string} name The name of the logger.
     * @param {LoggerSingleton} loggerSingleton The logger singleton
     *      this logger belongs to.
     */
    function Logger(name, loggerSingleton) {
        _classCallCheck(this, Logger);

        var _this = _possibleConstructorReturn(this, (Logger.__proto__ || Object.getPrototypeOf(Logger)).call(this));

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
            _loglevel2.default.validateLogLevel(logLevel);
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
                return '[default for LoggerSingleton - ' + (this._loggerSingleton.getTextualNameForDefaultLogLevel() + "]");
            }
            return _loglevel2.default.getTextualNameForLogLevel(this.getLogLevel());
        }
    }, {
        key: "getDebugInfoString",
        value: function getDebugInfoString() {
            return this.name + ": " + this.getTextualNameForLogLevel();
        }
    }, {
        key: "name",
        get: function get() {
            return this._name;
        }
    }]);

    return Logger;
}(_AbstractLogger3.default);

exports.default = Logger;
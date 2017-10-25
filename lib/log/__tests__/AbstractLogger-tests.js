"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loglevel = require("../loglevel");

var _loglevel2 = _interopRequireDefault(_loglevel);

var _AbstractLogger2 = require("../AbstractLogger");

var _AbstractLogger3 = _interopRequireDefault(_AbstractLogger2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MockLogger = function (_AbstractLogger) {
    _inherits(MockLogger, _AbstractLogger);

    function MockLogger(logLevel) {
        _classCallCheck(this, MockLogger);

        var _this = _possibleConstructorReturn(this, (MockLogger.__proto__ || Object.getPrototypeOf(MockLogger)).call(this));

        _this.logLevel = logLevel;
        return _this;
    }

    _createClass(MockLogger, [{
        key: "getLogLevel",
        value: function getLogLevel() {
            return this.logLevel;
        }
    }]);

    return MockLogger;
}(_AbstractLogger3.default);

describe('AbstractLogger', function () {
    // debug()

    it('AbstractLogger() debug called with loglevel DEBUG', function () {
        var logger = new MockLogger(_loglevel2.default.DEBUG);
        console.log = jest.fn();
        logger.debug('test');
        expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() debug NOT called with loglevel INFO', function () {
        var logger = new MockLogger(_loglevel2.default.INFO);
        console.log = jest.fn();
        logger.debug('test');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    it('AbstractLogger() debug NOT called with loglevel WARNING', function () {
        var logger = new MockLogger(_loglevel2.default.WARNING);
        console.log = jest.fn();
        logger.debug('test');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    it('AbstractLogger() debug NOT called with loglevel ERROR', function () {
        var logger = new MockLogger(_loglevel2.default.ERROR);
        console.log = jest.fn();
        logger.debug('test');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    it('AbstractLogger() debug NOT called with loglevel SILENT', function () {
        var logger = new MockLogger(_loglevel2.default.SILENT);
        console.log = jest.fn();
        logger.debug('test');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    // info()

    it('AbstractLogger() info called with loglevel DEBUG', function () {
        var logger = new MockLogger(_loglevel2.default.DEBUG);
        console.log = jest.fn();
        logger.info('test');
        expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() info called with loglevel INFO', function () {
        var logger = new MockLogger(_loglevel2.default.INFO);
        console.log = jest.fn();
        logger.info('test');
        expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() info NOT called with loglevel WARNING', function () {
        var logger = new MockLogger(_loglevel2.default.WARNING);
        console.log = jest.fn();
        logger.info('test');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    it('AbstractLogger() info NOT called with loglevel ERROR', function () {
        var logger = new MockLogger(_loglevel2.default.ERROR);
        console.log = jest.fn();
        logger.info('test');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    it('AbstractLogger() info NOT called with loglevel SILENT', function () {
        var logger = new MockLogger(_loglevel2.default.SILENT);
        console.log = jest.fn();
        logger.info('test');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    // warning()

    it('AbstractLogger() warning called with loglevel DEBUG', function () {
        var logger = new MockLogger(_loglevel2.default.DEBUG);
        console.warn = jest.fn();
        logger.warning('test');
        expect(console.warn).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() warning called with loglevel INFO', function () {
        var logger = new MockLogger(_loglevel2.default.INFO);
        console.warn = jest.fn();
        logger.warning('test');
        expect(console.warn).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() warning called with loglevel WARNING', function () {
        var logger = new MockLogger(_loglevel2.default.WARNING);
        console.warn = jest.fn();
        logger.warning('test');
        expect(console.warn).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() warning NOT called with loglevel ERROR', function () {
        var logger = new MockLogger(_loglevel2.default.ERROR);
        console.warn = jest.fn();
        logger.warning('test');
        expect(console.warn).toHaveBeenCalledTimes(0);
    });

    it('AbstractLogger() warning NOT called with loglevel SILENT', function () {
        var logger = new MockLogger(_loglevel2.default.SILENT);
        console.warn = jest.fn();
        logger.warning('test');
        expect(console.warn).toHaveBeenCalledTimes(0);
    });

    // error()

    it('AbstractLogger() error called with loglevel DEBUG', function () {
        var logger = new MockLogger(_loglevel2.default.DEBUG);
        console.error = jest.fn();
        logger.error('test');
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() error called with loglevel INFO', function () {
        var logger = new MockLogger(_loglevel2.default.INFO);
        console.error = jest.fn();
        logger.error('test');
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() error called with loglevel WARNING', function () {
        var logger = new MockLogger(_loglevel2.default.WARNING);
        console.error = jest.fn();
        logger.error('test');
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() error called with loglevel ERROR', function () {
        var logger = new MockLogger(_loglevel2.default.ERROR);
        console.error = jest.fn();
        logger.error('test');
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() error NOT called with loglevel SILENT', function () {
        var logger = new MockLogger(_loglevel2.default.SILENT);
        console.error = jest.fn();
        logger.error('test');
        expect(console.error).toHaveBeenCalledTimes(0);
    });
});
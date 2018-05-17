"use strict";

var _loglevel = _interopRequireDefault(require("../loglevel"));

var _AbstractLogger2 = _interopRequireDefault(require("../AbstractLogger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

var MockLogger =
/*#__PURE__*/
function (_AbstractLogger) {
  function MockLogger(logLevel) {
    var _this;

    _classCallCheck(this, MockLogger);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MockLogger).call(this));
    _this.logLevel = logLevel;
    return _this;
  }

  _createClass(MockLogger, [{
    key: "getLogLevel",
    value: function getLogLevel() {
      return this.logLevel;
    }
  }]);

  _inherits(MockLogger, _AbstractLogger);

  return MockLogger;
}(_AbstractLogger2.default);

describe('AbstractLogger', function () {
  // debug()
  it('AbstractLogger() debug called with loglevel DEBUG', function () {
    var logger = new MockLogger(_loglevel.default.DEBUG);
    console.log = jest.fn();
    logger.debug('test');
    expect(console.log).toHaveBeenCalledTimes(1);
  });
  it('AbstractLogger() debug NOT called with loglevel INFO', function () {
    var logger = new MockLogger(_loglevel.default.INFO);
    console.log = jest.fn();
    logger.debug('test');
    expect(console.log).toHaveBeenCalledTimes(0);
  });
  it('AbstractLogger() debug NOT called with loglevel WARNING', function () {
    var logger = new MockLogger(_loglevel.default.WARNING);
    console.log = jest.fn();
    logger.debug('test');
    expect(console.log).toHaveBeenCalledTimes(0);
  });
  it('AbstractLogger() debug NOT called with loglevel ERROR', function () {
    var logger = new MockLogger(_loglevel.default.ERROR);
    console.log = jest.fn();
    logger.debug('test');
    expect(console.log).toHaveBeenCalledTimes(0);
  });
  it('AbstractLogger() debug NOT called with loglevel SILENT', function () {
    var logger = new MockLogger(_loglevel.default.SILENT);
    console.log = jest.fn();
    logger.debug('test');
    expect(console.log).toHaveBeenCalledTimes(0);
  }); // info()

  it('AbstractLogger() info called with loglevel DEBUG', function () {
    var logger = new MockLogger(_loglevel.default.DEBUG);
    console.log = jest.fn();
    logger.info('test');
    expect(console.log).toHaveBeenCalledTimes(1);
  });
  it('AbstractLogger() info called with loglevel INFO', function () {
    var logger = new MockLogger(_loglevel.default.INFO);
    console.log = jest.fn();
    logger.info('test');
    expect(console.log).toHaveBeenCalledTimes(1);
  });
  it('AbstractLogger() info NOT called with loglevel WARNING', function () {
    var logger = new MockLogger(_loglevel.default.WARNING);
    console.log = jest.fn();
    logger.info('test');
    expect(console.log).toHaveBeenCalledTimes(0);
  });
  it('AbstractLogger() info NOT called with loglevel ERROR', function () {
    var logger = new MockLogger(_loglevel.default.ERROR);
    console.log = jest.fn();
    logger.info('test');
    expect(console.log).toHaveBeenCalledTimes(0);
  });
  it('AbstractLogger() info NOT called with loglevel SILENT', function () {
    var logger = new MockLogger(_loglevel.default.SILENT);
    console.log = jest.fn();
    logger.info('test');
    expect(console.log).toHaveBeenCalledTimes(0);
  }); // warning()

  it('AbstractLogger() warning called with loglevel DEBUG', function () {
    var logger = new MockLogger(_loglevel.default.DEBUG);
    console.warn = jest.fn();
    logger.warning('test');
    expect(console.warn).toHaveBeenCalledTimes(1);
  });
  it('AbstractLogger() warning called with loglevel INFO', function () {
    var logger = new MockLogger(_loglevel.default.INFO);
    console.warn = jest.fn();
    logger.warning('test');
    expect(console.warn).toHaveBeenCalledTimes(1);
  });
  it('AbstractLogger() warning called with loglevel WARNING', function () {
    var logger = new MockLogger(_loglevel.default.WARNING);
    console.warn = jest.fn();
    logger.warning('test');
    expect(console.warn).toHaveBeenCalledTimes(1);
  });
  it('AbstractLogger() warning NOT called with loglevel ERROR', function () {
    var logger = new MockLogger(_loglevel.default.ERROR);
    console.warn = jest.fn();
    logger.warning('test');
    expect(console.warn).toHaveBeenCalledTimes(0);
  });
  it('AbstractLogger() warning NOT called with loglevel SILENT', function () {
    var logger = new MockLogger(_loglevel.default.SILENT);
    console.warn = jest.fn();
    logger.warning('test');
    expect(console.warn).toHaveBeenCalledTimes(0);
  }); // error()

  it('AbstractLogger() error called with loglevel DEBUG', function () {
    var logger = new MockLogger(_loglevel.default.DEBUG);
    console.error = jest.fn();
    logger.error('test');
    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it('AbstractLogger() error called with loglevel INFO', function () {
    var logger = new MockLogger(_loglevel.default.INFO);
    console.error = jest.fn();
    logger.error('test');
    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it('AbstractLogger() error called with loglevel WARNING', function () {
    var logger = new MockLogger(_loglevel.default.WARNING);
    console.error = jest.fn();
    logger.error('test');
    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it('AbstractLogger() error called with loglevel ERROR', function () {
    var logger = new MockLogger(_loglevel.default.ERROR);
    console.error = jest.fn();
    logger.error('test');
    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it('AbstractLogger() error NOT called with loglevel SILENT', function () {
    var logger = new MockLogger(_loglevel.default.SILENT);
    console.error = jest.fn();
    logger.error('test');
    expect(console.error).toHaveBeenCalledTimes(0);
  });
});
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _loglevel = _interopRequireDefault(require("../loglevel"));
var _AbstractLogger2 = _interopRequireDefault(require("../AbstractLogger"));
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
var MockLogger = /*#__PURE__*/function (_AbstractLogger) {
  function MockLogger(logLevel) {
    var _this;
    _classCallCheck(this, MockLogger);
    _this = _callSuper(this, MockLogger);
    _this.logLevel = logLevel;
    return _this;
  }
  _inherits(MockLogger, _AbstractLogger);
  return _createClass(MockLogger, [{
    key: "getLogLevel",
    value: function getLogLevel() {
      return this.logLevel;
    }
  }]);
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
  });

  // info()

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
  });

  // warning()

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
  });

  // error()

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
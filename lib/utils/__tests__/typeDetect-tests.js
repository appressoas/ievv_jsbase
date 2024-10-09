"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _typeDetect = _interopRequireDefault(require("../../utils/typeDetect"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
describe('typeDetect', function () {
  it('typeDetect() null', function () {
    expect((0, _typeDetect.default)(null)).toEqual('null');
  });
  it('typeDetect() undefined', function () {
    expect((0, _typeDetect.default)(undefined)).toEqual('undefined');
  });
  it('typeDetect() number', function () {
    expect((0, _typeDetect.default)(10)).toEqual('number');
  });
  it('typeDetect() boolean true', function () {
    expect((0, _typeDetect.default)(true)).toEqual('boolean');
  });
  it('typeDetect() boolean false', function () {
    expect((0, _typeDetect.default)(false)).toEqual('boolean');
  });
  it('typeDetect() string', function () {
    expect((0, _typeDetect.default)('test')).toEqual('string');
  });
  it('typeDetect() array', function () {
    expect((0, _typeDetect.default)(["a", "b"])).toEqual('array');
  });
  it('typeDetect() map', function () {
    var map = new Map();
    map.set('a', 10);
    map.set('b', 20);
    expect((0, _typeDetect.default)(map)).toEqual('map');
  });
  it('typeDetect() set', function () {
    var set = new Set();
    expect((0, _typeDetect.default)(set)).toEqual('set');
  });
  it('typeDetect() class is treated as function', function () {
    var TestClass = /*#__PURE__*/_createClass(function TestClass() {
      _classCallCheck(this, TestClass);
    });
    expect((0, _typeDetect.default)(TestClass)).toEqual('function');
  });
  it('typeDetect() function', function () {
    function testFunction() {}
    expect((0, _typeDetect.default)(testFunction)).toEqual('function');
  });
  it('typeDetect() object', function () {
    expect((0, _typeDetect.default)({
      'a': 10,
      'b': 20
    })).toEqual('object');
  });
});
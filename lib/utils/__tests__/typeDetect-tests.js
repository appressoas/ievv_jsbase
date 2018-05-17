"use strict";

var _typeDetect = _interopRequireDefault(require("../../utils/typeDetect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    var TestClass = function TestClass() {
      _classCallCheck(this, TestClass);
    };

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
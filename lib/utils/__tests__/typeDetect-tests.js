'use strict';

var _typeDetect = require('../../utils/typeDetect');

var _typeDetect2 = _interopRequireDefault(_typeDetect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

describe('typeDetect', function () {
    it('typeDetect() null', function () {
        expect((0, _typeDetect2.default)(null)).toEqual('null');
    });

    it('typeDetect() undefined', function () {
        expect((0, _typeDetect2.default)(undefined)).toEqual('undefined');
    });

    it('typeDetect() number', function () {
        expect((0, _typeDetect2.default)(10)).toEqual('number');
    });

    it('typeDetect() boolean true', function () {
        expect((0, _typeDetect2.default)(true)).toEqual('boolean');
    });

    it('typeDetect() boolean false', function () {
        expect((0, _typeDetect2.default)(false)).toEqual('boolean');
    });

    it('typeDetect() string', function () {
        expect((0, _typeDetect2.default)('test')).toEqual('string');
    });

    it('typeDetect() array', function () {
        expect((0, _typeDetect2.default)(["a", "b"])).toEqual('array');
    });

    it('typeDetect() map', function () {
        var map = new Map();
        map.set('a', 10);
        map.set('b', 20);
        expect((0, _typeDetect2.default)(map)).toEqual('map');
    });

    it('typeDetect() set', function () {
        var set = new Set();
        expect((0, _typeDetect2.default)(set)).toEqual('set');
    });

    it('typeDetect() class is treated as function', function () {
        var TestClass = function TestClass() {
            _classCallCheck(this, TestClass);
        };

        expect((0, _typeDetect2.default)(TestClass)).toEqual('function');
    });

    it('typeDetect() function', function () {
        function testFunction() {}
        expect((0, _typeDetect2.default)(testFunction)).toEqual('function');
    });

    it('typeDetect() object', function () {
        expect((0, _typeDetect2.default)({ 'a': 10, 'b': 20 })).toEqual('object');
    });
});
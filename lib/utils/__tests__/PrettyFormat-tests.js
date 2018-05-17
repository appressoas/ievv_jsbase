"use strict";

var _PrettyFormat = _interopRequireDefault(require("../../utils/PrettyFormat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PrettyFormat', function () {
  it('PrettyFormat() string', function () {
    expect(new _PrettyFormat.default('test').toString()).toEqual('"test"');
  });
  it('PrettyFormat() number', function () {
    expect(new _PrettyFormat.default(10).toString()).toEqual('10');
  });
  it('PrettyFormat() null', function () {
    expect(new _PrettyFormat.default(null).toString()).toEqual('null');
  });
  it('PrettyFormat() undefined', function () {
    expect(new _PrettyFormat.default(undefined).toString()).toEqual('undefined');
  });
  it('PrettyFormat() boolean true', function () {
    expect(new _PrettyFormat.default(true).toString()).toEqual('true');
  });
  it('PrettyFormat() boolean false', function () {
    expect(new _PrettyFormat.default(false).toString()).toEqual('false');
  });
  it('PrettyFormat() function', function () {
    function testfunction() {}

    expect(new _PrettyFormat.default(testfunction).toString()).toEqual('[Function: testfunction]');
  });
  it('PrettyFormat() array', function () {
    expect(new _PrettyFormat.default(["a", "b"]).toString()).toEqual('["a", "b"]');
  });
  it('PrettyFormat() array indented', function () {
    expect(new _PrettyFormat.default(["a", "b"]).toString(2)).toEqual('[\n  "a",\n  "b"\n]');
  });
  it('PrettyFormat() set', function () {
    expect(new _PrettyFormat.default(new Set(["a", "b"])).toString()).toEqual('Set("a", "b")');
  });
  it('PrettyFormat() set indented', function () {
    expect(new _PrettyFormat.default(new Set(["a", "b"])).toString(2)).toEqual('Set(\n  "a",\n  "b"\n)');
  });
  it('PrettyFormat() map', function () {
    var map = new Map();
    map.set('a', 10);
    map.set('b', 20);
    expect(new _PrettyFormat.default(map).toString()).toEqual('Map("a" => 10, "b" => 20)');
  });
  it('PrettyFormat() map indented', function () {
    var map = new Map();
    map.set('a', 10);
    map.set('b', 20);
    expect(new _PrettyFormat.default(map).toString(2)).toEqual('Map(\n  "a" => 10,\n  "b" => 20\n)');
  });
  it('PrettyFormat() object', function () {
    expect(new _PrettyFormat.default({
      'a': 10,
      'b': 20
    }).toString()).toEqual('{"a": 10, "b": 20}');
  });
  it('PrettyFormat() object indented', function () {
    expect(new _PrettyFormat.default({
      'a': 10,
      'b': 20
    }).toString(2)).toEqual('{\n  "a": 10,\n  "b": 20\n}');
  });
  it('PrettyFormat() map of arrays', function () {
    var map = new Map();
    map.set('a', [10, 20]);
    map.set('b', [30, 40, 50]);
    expect(new _PrettyFormat.default(map).toString()).toEqual('Map("a" => [10, 20], "b" => [30, 40, 50])');
  });
  it('PrettyFormat() map of arrays indented', function () {
    var map = new Map();
    map.set('a', [10, 20]);
    map.set('b', [30, 40, 50]);
    expect(new _PrettyFormat.default(map).toString(2)).toEqual("Map(\n  \"a\" => [\n    10,\n    20\n  ],\n  \"b\" => [\n    30,\n    40,\n    50\n  ]\n)");
  });
  it('PrettyFormat() complex', function () {
    var map = new Map();
    map.set('a', [10, 20]);
    map.set('b', [30, 40, 50]);

    function testFunction() {}

    var obj = {
      theMap: map,
      aSet: new Set(['one', 'two']),
      theFunction: testFunction
    };
    expect(new _PrettyFormat.default(obj).toString(2)).toEqual("{\n  \"aSet\": Set(\n    \"one\",\n    \"two\"\n  ),\n  \"theFunction\": [Function: testFunction],\n  \"theMap\": Map(\n    \"a\" => [\n      10,\n      20\n    ],\n    \"b\" => [\n      30,\n      40,\n      50\n    ]\n  )\n}");
  });
});
"use strict";

var _QueryString = _interopRequireDefault(require("../QueryString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('QueryString', function () {
  it('isEmpty()', function () {
    var querystring = new _QueryString.default();
    expect(querystring.isEmpty()).toBe(true);

    querystring._queryStringMap.set('a', ['value']);

    expect(querystring.isEmpty()).toBe(false);
  });
  it('clear()', function () {
    var querystring = new _QueryString.default();

    querystring._queryStringMap.set('a', ['value']);

    expect(querystring._queryStringMap.size).toBe(1);
    querystring.clear();
    expect(querystring._queryStringMap.size).toBe(0);
  });
  it('set key not string coerced to string', function () {
    var querystring = new _QueryString.default();
    querystring.set(10, 'a');
    expect(querystring._queryStringMap.get(10)).toEqual(['a']);
  });
  it('set value not string', function () {
    var querystring = new _QueryString.default();
    querystring.set('a', 10);
    expect(querystring._queryStringMap.get('a')).toEqual([10]);
  });
  it('set sanity', function () {
    var querystring = new _QueryString.default();
    querystring.set('a', '10');
    expect(querystring._queryStringMap.get('a')).toEqual(['10']);
  });
  it('set replaces existing', function () {
    var querystring = new _QueryString.default();

    querystring._queryStringMap.set('a', ['10']);

    querystring.set('a', 'replaced');
    expect(querystring._queryStringMap.get('a')).toEqual(['replaced']);
  });
  it('setIterable sanity', function () {
    var querystring = new _QueryString.default();
    querystring.setIterable('a', ['10', '20']);
    expect(querystring._queryStringMap.get('a')).toEqual(['10', '20']);
  });
  it('setIterable value not string', function () {
    var querystring = new _QueryString.default();
    querystring.setIterable('a', ['10', 20]);
    expect(querystring._queryStringMap.get('a')).toEqual(['10', 20]);
  });
  it('setIterable replaces existing', function () {
    var querystring = new _QueryString.default();

    querystring._queryStringMap.set('a', ['10', '20']);

    querystring.setIterable('a', ['replaced']);
    expect(querystring._queryStringMap.get('a')).toEqual(['replaced']);
  });
  it('setIterable empty removes key', function () {
    var querystring = new _QueryString.default();

    querystring._queryStringMap.set('a', ['10']);

    querystring.setIterable('a', []);
    expect(querystring._queryStringMap.has('a')).toBe(false);
  });
  it('append new key', function () {
    var querystring = new _QueryString.default();
    querystring.append('a', 'value');
    expect(querystring._queryStringMap.get('a')).toEqual(['value']);
  });
  it('append existing key', function () {
    var querystring = new _QueryString.default();

    querystring._queryStringMap.set('a', ['value1', 'value2']);

    querystring.append('a', 'value3');
    expect(querystring._queryStringMap.get('a')).toEqual(['value1', 'value2', 'value3']);
  });
  it('get no matching key', function () {
    var querystring = new _QueryString.default();
    expect(querystring.get('a')).toBeUndefined();
  });
  it('get no matching key fallback', function () {
    var querystring = new _QueryString.default();
    expect(querystring.get('a', 'thefallback')).toEqual('thefallback');
  });
  it('get', function () {
    var querystring = new _QueryString.default();

    querystring._queryStringMap.set('a', ['value']);

    expect(querystring.get('a')).toEqual('value');
  });
  it('remove key not in QueryString', function () {
    var querystring = new _QueryString.default();
    querystring.remove('a'); // No Error
  });
  it('remove key in QueryString', function () {
    var querystring = new _QueryString.default();

    querystring._queryStringMap.set('a', ['value']);

    expect(querystring.has('a')).toBe(true);
    querystring.remove('a');
    expect(querystring.has('a')).toBe(false);
  });
  it('has key not in QueryString', function () {
    var querystring = new _QueryString.default();
    expect(querystring.has('a')).toBe(false);
  });
  it('has key in QueryString', function () {
    var querystring = new _QueryString.default();

    querystring._queryStringMap.set('a', ['value']);

    expect(querystring.has('a')).toBe(true);
  });
  it('_encodeKeyValue sanity', function () {
    var querystring = new _QueryString.default();
    expect(querystring._encodeKeyValue('name', 'Jane')).toEqual('name=Jane');
  });
  it('_encodeKeyValue escapes value', function () {
    var querystring = new _QueryString.default();
    expect(querystring._encodeKeyValue('next', '/a&b/')).toEqual('next=%2Fa%26b%2F');
  });
  it('urlencode', function () {
    var querystring = new _QueryString.default();
    querystring.set('name', 'Jane');
    expect(querystring.urlencode()).toEqual('name=Jane');
  });
  it('urlencode not strings', function () {
    var querystring = new _QueryString.default();
    querystring.set(10, 20);
    expect(querystring.urlencode()).toEqual('10=20');
  });
  it('urlencode empty', function () {
    var querystring = new _QueryString.default();
    expect(querystring.urlencode()).toEqual('');
  });
  it('urlencode multiple', function () {
    var querystring = new _QueryString.default();
    querystring.set('name', 'Jane');
    querystring.set('next', '/a&b/');
    var urlencodedSet = new Set(querystring.urlencode().split('&'));
    expect(urlencodedSet.size).toBe(2);
    expect(urlencodedSet).toEqual(new Set(['name=Jane', 'next=%2Fa%26b%2F']));
  });
  it('urlencode iterable not strings', function () {
    var querystring = new _QueryString.default();
    querystring.setIterable(10, [20, 30]);
    var urlencodedSet = new Set(querystring.urlencode().split('&'));
    expect(urlencodedSet.size).toBe(2);
    expect(urlencodedSet).toEqual(new Set(['10=20', '10=30']));
  });
  it('urlencode skipEmptyValues', function () {
    var querystring = new _QueryString.default();
    querystring.set('name', '');
    querystring.set('age', '33');
    expect(querystring.urlencode({
      skipEmptyValues: true
    })).toEqual('age=33');
  });
  it('urlencode sortKeys', function () {
    var querystring = new _QueryString.default();
    querystring.set('name', 'Jane');
    querystring.set('age', '33');
    expect(querystring.urlencode({
      sortKeys: true
    })).toEqual('age=33&name=Jane');
  });
  it('urlencode sortValues', function () {
    var querystring = new _QueryString.default();
    querystring.setIterable('name', ['Jane', 'Amy', 'Xian']);
    expect(querystring.urlencode({
      sortValues: true
    })).toEqual('name=Amy&name=Jane&name=Xian');
  });
  it('urlencode sortKeys and sortValues', function () {
    var querystring = new _QueryString.default();
    querystring.setIterable('name', ['Jane', 'Amy', 'Xian']);
    querystring.setIterable('age', [33, 2, 66]);
    expect(querystring.urlencode({
      sortKeys: true,
      sortValues: true
    })).toEqual('age=2&age=33&age=66&name=Amy&name=Jane&name=Xian');
  });
  it('parse', function () {
    var querystring = new _QueryString.default('name=Jane');
    expect(querystring._queryStringMap.get('name')).toEqual(['Jane']);
  });
  it('parse ignores leading ?', function () {
    var querystring = new _QueryString.default('?name=Jane');
    expect(querystring._queryStringMap.get('name')).toEqual(['Jane']);
  });
  it('parse unescaped value', function () {
    var querystring = new _QueryString.default('next=%2Fa%26b%2F');
    expect(querystring._queryStringMap.get('next')).toEqual(['/a&b/']);
  });
  it('parse multiple keys', function () {
    var querystring = new _QueryString.default('name=Jane&age=33');
    expect(querystring._queryStringMap.get('name')).toEqual(['Jane']);
    expect(querystring._queryStringMap.get('age')).toEqual(['33']);
  });
  it('parse multiple values for same key', function () {
    var querystring = new _QueryString.default('names=Jane&names=John');
    expect(querystring._queryStringMap.get('names')).toEqual(['Jane', 'John']);
  });
  it('setValuesFromQueryString', function () {
    var querystring = new _QueryString.default();
    querystring.set('name', 'test');
    querystring.set('size', '10');
    querystring.setValuesFromQueryString('name=test2&age=33');
    expect(querystring._queryStringMap.get('name')).toEqual(['test2']);
    expect(querystring._queryStringMap.get('age')).toEqual(['33']);
    expect(querystring._queryStringMap.get('size')).toEqual(['10']);
  });
  it('setValuesFromObject', function () {
    var querystring = new _QueryString.default();
    querystring.set('name', 'test');
    querystring.set('size', '10');
    querystring.setValuesFromObject({
      name: 'test2',
      age: 33
    });
    expect(querystring._queryStringMap.get('name')).toEqual(['test2']);
    expect(querystring._queryStringMap.get('age')).toEqual([33]);
    expect(querystring._queryStringMap.get('size')).toEqual(['10']);
  });
  it('setValuesFromObject multiple values', function () {
    var querystring = new _QueryString.default();
    querystring.set('names', 'test');
    querystring.setValuesFromObject({
      names: ['test1', 'test2']
    });
    expect(querystring._queryStringMap.get('names')).toEqual(['test1', 'test2']);
  });
  it('setValuesFromMap', function () {
    var querystring = new _QueryString.default();
    querystring.set('name', 'test');
    querystring.set('size', '10');
    querystring.setValuesFromMap(new Map([['name', 'test2'], ['age', 33]]));
    expect(querystring._queryStringMap.get('name')).toEqual(['test2']);
    expect(querystring._queryStringMap.get('age')).toEqual([33]);
    expect(querystring._queryStringMap.get('size')).toEqual(['10']);
  });
  it('setValuesFromMap multiple values', function () {
    var querystring = new _QueryString.default();
    querystring.set('names', 'test');
    querystring.setValuesFromMap(new Map([['names', ['test1', 'test2']]]));
    expect(querystring._queryStringMap.get('names')).toEqual(['test1', 'test2']);
  });
  it('setSmart string', function () {
    var querystring = new _QueryString.default();
    querystring.setSmart('name', 'test');
    expect(querystring._queryStringMap.get('name')).toEqual(['test']);
  });
  it('setSmart number', function () {
    var querystring = new _QueryString.default();
    querystring.setSmart('age', 10);
    expect(querystring._queryStringMap.get('age')).toEqual([10]);
  });
  it('setSmart boolean', function () {
    var querystring = new _QueryString.default();
    querystring.setSmart('isActive', true);
    expect(querystring._queryStringMap.get('isActive')).toEqual([true]);
  });
  it('setSmart array', function () {
    var querystring = new _QueryString.default();
    querystring.setSmart('names', ['jane', 'peter']);
    expect(querystring._queryStringMap.get('names')).toEqual(['jane', 'peter']);
  });
  it('setSmart set', function () {
    var querystring = new _QueryString.default();
    querystring.setSmart('names', new Set(['jane', 'peter']));
    expect(querystring._queryStringMap.get('names').length).toEqual(2);
    expect(querystring._queryStringMap.get('names')).toEqual(expect.arrayContaining(['jane', 'peter']));
  });
});
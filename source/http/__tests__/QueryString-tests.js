import QueryString from '../QueryString';


describe('QueryString', () => {

  it('isEmpty()', () => {
    const querystring = new QueryString();
    expect(querystring.isEmpty()).toBe(true);
    querystring._queryStringMap.set('a', ['value']);
    expect(querystring.isEmpty()).toBe(false);
  });

  it('clear()', () => {
    const querystring = new QueryString();
    querystring._queryStringMap.set('a', ['value']);
    expect(querystring._queryStringMap.size).toBe(1);
    querystring.clear();
    expect(querystring._queryStringMap.size).toBe(0);
  });

  it('set key not string coerced to string', () => {
    const querystring = new QueryString();
    querystring.set(10, 'a');
    expect(querystring._queryStringMap.get(10)).toEqual(['a']);
  });

  it('set value not string', () => {
    const querystring = new QueryString();
    querystring.set('a', 10);
    expect(querystring._queryStringMap.get('a')).toEqual([10]);
  });

  it('set sanity', () => {
    const querystring = new QueryString();
    querystring.set('a', '10');
    expect(querystring._queryStringMap.get('a')).toEqual(['10']);
  });

  it('set replaces existing', () => {
    const querystring = new QueryString();
    querystring._queryStringMap.set('a', ['10']);
    querystring.set('a', 'replaced');
    expect(querystring._queryStringMap.get('a')).toEqual(['replaced']);
  });

  it('setIterable sanity', () => {
    const querystring = new QueryString();
    querystring.setIterable('a', ['10', '20']);
    expect(querystring._queryStringMap.get('a')).toEqual(['10', '20']);
  });

  it('setIterable value not string', () => {
    const querystring = new QueryString();
    querystring.setIterable('a', ['10', 20]);
    expect(querystring._queryStringMap.get('a')).toEqual(['10', 20]);
  });

  it('setIterable replaces existing', () => {
    const querystring = new QueryString();
    querystring._queryStringMap.set('a', ['10', '20']);
    querystring.setIterable('a', ['replaced']);
    expect(querystring._queryStringMap.get('a')).toEqual(['replaced']);
  });

  it('setIterable empty removes key', () => {
    const querystring = new QueryString();
    querystring._queryStringMap.set('a', ['10']);
    querystring.setIterable('a', []);
    expect(querystring._queryStringMap.has('a')).toBe(false);
  });

  it('append new key', () => {
    const querystring = new QueryString();
    querystring.append('a', 'value');
    expect(querystring._queryStringMap.get('a')).toEqual(['value']);
  });

  it('append existing key', () => {
    const querystring = new QueryString();
    querystring._queryStringMap.set('a', ['value1', 'value2']);
    querystring.append('a', 'value3');
    expect(querystring._queryStringMap.get('a')).toEqual(['value1', 'value2', 'value3']);
  });

  it('get no matching key', () => {
    const querystring = new QueryString();
    expect(querystring.get('a')).toBeUndefined();
  });

  it('get no matching key fallback', () => {
    const querystring = new QueryString();
    expect(querystring.get('a', 'thefallback')).toEqual('thefallback');
  });

  it('get', () => {
    const querystring = new QueryString();
    querystring._queryStringMap.set('a', ['value']);
    expect(querystring.get('a')).toEqual('value');
  });

  it('remove key not in QueryString', () => {
    const querystring = new QueryString();
    querystring.remove('a');  // No Error
  });

  it('remove key in QueryString', () => {
    const querystring = new QueryString();
    querystring._queryStringMap.set('a', ['value']);
    expect(querystring.has('a')).toBe(true);
    querystring.remove('a');
    expect(querystring.has('a')).toBe(false);
  });

  it('has key not in QueryString', () => {
    const querystring = new QueryString();
    expect(querystring.has('a')).toBe(false);
  });

  it('has key in QueryString', () => {
    const querystring = new QueryString();
    querystring._queryStringMap.set('a', ['value']);
    expect(querystring.has('a')).toBe(true);
  });

  it('_encodeKeyValue sanity', () => {
    const querystring = new QueryString();
    expect(querystring._encodeKeyValue('name', 'Jane')).toEqual('name=Jane');
  });

  it('_encodeKeyValue escapes value', () => {
    const querystring = new QueryString();
    expect(querystring._encodeKeyValue('next', '/a&b/')).toEqual('next=%2Fa%26b%2F');
  });

  it('urlencode', () => {
    const querystring = new QueryString();
    querystring.set('name', 'Jane');
    expect(querystring.urlencode()).toEqual('name=Jane');
  });

  it('urlencode not strings', () => {
    const querystring = new QueryString();
    querystring.set(10, 20);
    expect(querystring.urlencode()).toEqual('10=20');
  });

  it('urlencode empty', () => {
    const querystring = new QueryString();
    expect(querystring.urlencode()).toEqual('');
  });

  it('urlencode multiple', () => {
    const querystring = new QueryString();
    querystring.set('name', 'Jane');
    querystring.set('next', '/a&b/');
    const urlencodedSet = new Set(querystring.urlencode().split('&'));
    expect(urlencodedSet.size).toBe(2);
    expect(urlencodedSet).toEqual(new Set(['name=Jane', 'next=%2Fa%26b%2F']));
  });

  it('urlencode iterable not strings', () => {
    const querystring = new QueryString();
    querystring.setIterable(10, [20, 30]);
    const urlencodedSet = new Set(querystring.urlencode().split('&'));
    expect(urlencodedSet.size).toBe(2);
    expect(urlencodedSet).toEqual(new Set(['10=20', '10=30']));
  });

  it('urlencode skipEmptyValues', () => {
    const querystring = new QueryString();
    querystring.set('name', '');
    querystring.set('age', '33');
    expect(querystring.urlencode({skipEmptyValues: true})).toEqual('age=33');
  });

  it('urlencode sortKeys', () => {
    const querystring = new QueryString();
    querystring.set('name', 'Jane');
    querystring.set('age', '33');
    expect(querystring.urlencode({sortKeys: true})).toEqual('age=33&name=Jane');
  });

  it('urlencode sortValues', () => {
    const querystring = new QueryString();
    querystring.setIterable('name', ['Jane', 'Amy', 'Xian']);
    expect(querystring.urlencode({sortValues: true})).toEqual(
      'name=Amy&name=Jane&name=Xian');
  });

  it('urlencode sortKeys and sortValues', () => {
    const querystring = new QueryString();
    querystring.setIterable('name', ['Jane', 'Amy', 'Xian']);
    querystring.setIterable('age', [33, 2, 66]);
    expect(querystring.urlencode({sortKeys: true, sortValues: true})).toEqual(
      'age=2&age=33&age=66&name=Amy&name=Jane&name=Xian');
  });


  it('parse', () => {
    const querystring = new QueryString('name=Jane');
    expect(querystring._queryStringMap.get('name')).toEqual(['Jane']);
  });

  it('parse ignores leading ?', () => {
    const querystring = new QueryString('?name=Jane');
    expect(querystring._queryStringMap.get('name')).toEqual(['Jane']);
  });

  it('parse unescaped value', () => {
    const querystring = new QueryString('next=%2Fa%26b%2F');
    expect(querystring._queryStringMap.get('next')).toEqual(['/a&b/']);
  });

  it('parse multiple keys', () => {
    const querystring = new QueryString('name=Jane&age=33');
    expect(querystring._queryStringMap.get('name')).toEqual(['Jane']);
    expect(querystring._queryStringMap.get('age')).toEqual(['33']);
  });

  it('parse multiple values for same key', () => {
    const querystring = new QueryString('names=Jane&names=John');
    expect(querystring._queryStringMap.get('names')).toEqual(['Jane', 'John']);
  });

  it('setValuesFromQueryString', () => {
    const querystring = new QueryString();
    querystring.set('name', 'test');
    querystring.set('size', '10');
    querystring.setValuesFromQueryString('name=test2&age=33');
    expect(querystring._queryStringMap.get('name')).toEqual(['test2']);
    expect(querystring._queryStringMap.get('age')).toEqual(['33']);
    expect(querystring._queryStringMap.get('size')).toEqual(['10']);
  });

  it('setValuesFromObject', () => {
    const querystring = new QueryString();
    querystring.set('name', 'test');
    querystring.set('size', '10');
    querystring.setValuesFromObject({name: 'test2', age: 33});
    expect(querystring._queryStringMap.get('name')).toEqual(['test2']);
    expect(querystring._queryStringMap.get('age')).toEqual([33]);
    expect(querystring._queryStringMap.get('size')).toEqual(['10']);
  });

  it('setValuesFromObject multiple values', () => {
    const querystring = new QueryString();
    querystring.set('names', 'test');
    querystring.setValuesFromObject({names: ['test1', 'test2']});
    expect(querystring._queryStringMap.get('names')).toEqual(['test1', 'test2']);
  });

  it('setValuesFromMap', () => {
    const querystring = new QueryString();
    querystring.set('name', 'test');
    querystring.set('size', '10');
    querystring.setValuesFromMap(new Map([['name', 'test2'], ['age', 33]]));
    expect(querystring._queryStringMap.get('name')).toEqual(['test2']);
    expect(querystring._queryStringMap.get('age')).toEqual([33]);
    expect(querystring._queryStringMap.get('size')).toEqual(['10']);
  });

  it('setValuesFromMap multiple values', () => {
    const querystring = new QueryString();
    querystring.set('names', 'test');
    querystring.setValuesFromMap(new Map([['names', ['test1', 'test2']]]));
    expect(querystring._queryStringMap.get('names')).toEqual(['test1', 'test2']);
  });

  it('setSmart string', () => {
    const querystring = new QueryString();
    querystring.setSmart('name', 'test');
    expect(querystring._queryStringMap.get('name')).toEqual(['test']);
  });

  it('setSmart number', () => {
    const querystring = new QueryString();
    querystring.setSmart('age', 10);
    expect(querystring._queryStringMap.get('age')).toEqual([10]);
  });

  it('setSmart boolean', () => {
    const querystring = new QueryString();
    querystring.setSmart('isActive', true);
    expect(querystring._queryStringMap.get('isActive')).toEqual([true]);
  });

  it('setSmart array', () => {
    const querystring = new QueryString();
    querystring.setSmart('names', ['jane', 'peter']);
    expect(querystring._queryStringMap.get('names')).toEqual(['jane', 'peter']);
  });

  it('setSmart set', () => {
    const querystring = new QueryString();
    querystring.setSmart('names', new Set(['jane', 'peter']));
    expect(querystring._queryStringMap.get('names').length).toEqual(2);
    expect(querystring._queryStringMap.get('names')).toEqual(
      expect.arrayContaining(['jane', 'peter']));
  });
});

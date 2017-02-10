import QueryString from '../../http/QueryString';


describe('QueryString', () => {

    it('QueryString.isEmpty()', () => {
        const querystring = new QueryString();
        expect(querystring.isEmpty()).toBe(true);
        querystring._queryStringMap.set('a', ['value']);
        expect(querystring.isEmpty()).toBe(false);
    });

    it('QueryString.clear()', () => {
        const querystring = new QueryString();
        querystring._queryStringMap.set('a', ['value']);
        expect(querystring._queryStringMap.size).toBe(1);
        querystring.clear();
        expect(querystring._queryStringMap.size).toBe(0);
    });

    it('QueryString.set key not string', () => {
        const querystring = new QueryString();
        expect(() => querystring.set(10, 'a')).toThrowError(TypeError);
        expect(() => querystring.set(10, 'a')).toThrowError(
            'All keys added to a QueryString must be strings.');
    });

    it('QueryString.set value not string', () => {
        const querystring = new QueryString();
        expect(() => querystring.set('a', 10)).toThrowError(TypeError);
        expect(() => querystring.set('a', 10)).toThrowError(
            'All values added to a QueryString must be strings.');
    });

    it('QueryString.set sanity', () => {
        const querystring = new QueryString();
        querystring.set('a', '10');
        expect(querystring._queryStringMap.get('a')).toEqual(['10']);
    });

    it('QueryString.set replaces existing', () => {
        const querystring = new QueryString();
        querystring._queryStringMap.set('a', ['10']);
        querystring.set('a', 'replaced');
        expect(querystring._queryStringMap.get('a')).toEqual(['replaced']);
    });

    it('QueryString.setIterable value not string', () => {
        const querystring = new QueryString();
        expect(() => querystring.set('a', ['10', 20])).toThrowError(TypeError);
    });

    it('QueryString.setIterable sanity', () => {
        const querystring = new QueryString();
        querystring.setIterable('a', ['10', '20']);
        expect(querystring._queryStringMap.get('a')).toEqual(['10', '20']);
    });

    it('QueryString.setIterable replaces existing', () => {
        const querystring = new QueryString();
        querystring._queryStringMap.set('a', ['10', '20']);
        querystring.setIterable('a', ['replaced']);
        expect(querystring._queryStringMap.get('a')).toEqual(['replaced']);
    });

    it('QueryString.setIterable empty removes key', () => {
        const querystring = new QueryString();
        querystring._queryStringMap.set('a', ['10']);
        querystring.setIterable('a', []);
        expect(querystring._queryStringMap.has('a')).toBe(false);
    });

    it('QueryString.append new key', () => {
        const querystring = new QueryString();
        querystring.append('a', 'value');
        expect(querystring._queryStringMap.get('a')).toEqual(['value']);
    });

    it('QueryString.append existing key', () => {
        const querystring = new QueryString();
        querystring._queryStringMap.set('a', ['value1', 'value2']);
        querystring.append('a', 'value3');
        expect(querystring._queryStringMap.get('a')).toEqual(['value1', 'value2', 'value3']);
    });

    it('QueryString.get no matching key', () => {
        const querystring = new QueryString();
        expect(querystring.get('a')).toBeUndefined();
    });

    it('QueryString.get no matching key fallback', () => {
        const querystring = new QueryString();
        expect(querystring.get('a', 'thefallback')).toEqual('thefallback');
    });

    it('QueryString.get', () => {
        const querystring = new QueryString();
        querystring._queryStringMap.set('a', ['value']);
        expect(querystring.get('a')).toEqual('value');
    });

    it('QueryString.remove key not in QueryString', () => {
        const querystring = new QueryString();
        querystring.remove('a');  // No Error
    });

    it('QueryString.remove key in QueryString', () => {
        const querystring = new QueryString();
        querystring._queryStringMap.set('a', ['value']);
        expect(querystring.has('a')).toBe(true);
        querystring.remove('a');
        expect(querystring.has('a')).toBe(false);
    });

    it('QueryString.has key not in QueryString', () => {
        const querystring = new QueryString();
        expect(querystring.has('a')).toBe(false);
    });

    it('QueryString.has key in QueryString', () => {
        const querystring = new QueryString();
        querystring._queryStringMap.set('a', ['value']);
        expect(querystring.has('a')).toBe(true);
    });

    it('QueryString._encodeKeyValue sanity', () => {
        const querystring = new QueryString();
        expect(querystring._encodeKeyValue('name', 'Jane')).toEqual('name=Jane');
    });

    it('QueryString._encodeKeyValue escapes value', () => {
        const querystring = new QueryString();
        expect(querystring._encodeKeyValue('next', '/a&b/')).toEqual('next=%2Fa%26b%2F');
    });

    it('QueryString.urlencode', () => {
        const querystring = new QueryString();
        querystring.set('name', 'Jane');
        expect(querystring.urlencode()).toEqual('name=Jane');
    });

    it('QueryString.urlencode empty', () => {
        const querystring = new QueryString();
        expect(querystring.urlencode()).toEqual('');
    });

    it('QueryString.urlencode multiple', () => {
        const querystring = new QueryString();
        querystring.set('name', 'Jane');
        querystring.set('next', '/a&b/');
        const urlencodedSet = new Set(querystring.urlencode().split('&'));
        expect(urlencodedSet.size).toBe(2);
        expect(urlencodedSet).toEqual(new Set(['name=Jane', 'next=%2Fa%26b%2F']));
    });

    it('QueryString.parse', () => {
        const querystring = new QueryString('name=Jane');
        expect(querystring._queryStringMap.get('name')).toEqual(['Jane']);
    });

    it('QueryString.parse unescaped value', () => {
        const querystring = new QueryString('next=%2Fa%26b%2F');
        expect(querystring._queryStringMap.get('next')).toEqual(['/a&b/']);
    });

    it('QueryString.parse multiple keys', () => {
        const querystring = new QueryString('name=Jane&age=33');
        expect(querystring._queryStringMap.get('name')).toEqual(['Jane']);
        expect(querystring._queryStringMap.get('age')).toEqual(['33']);
    });

    it('QueryString.parse multiple values for same key', () => {
        const querystring = new QueryString('names=Jane&names=John');
        expect(querystring._queryStringMap.get('names')).toEqual(['Jane', 'John']);
    });
});

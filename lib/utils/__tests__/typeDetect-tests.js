import typeDetect from "../../utils/typeDetect";

describe('typeDetect', () => {
    it('typeDetect() null', () => {
        expect(typeDetect(null)).toEqual('null');
    });

    it('typeDetect() undefined', () => {
        expect(typeDetect(undefined)).toEqual('undefined');
    });

    it('typeDetect() number', () => {
        expect(typeDetect(10)).toEqual('number');
    });

    it('typeDetect() boolean true', () => {
        expect(typeDetect(true)).toEqual('boolean');
    });

    it('typeDetect() boolean false', () => {
        expect(typeDetect(false)).toEqual('boolean');
    });

    it('typeDetect() string', () => {
        expect(typeDetect('test')).toEqual('string');
    });

    it('typeDetect() array', () => {
        expect(typeDetect(["a", "b"])).toEqual('array');
    });

    it('typeDetect() map', () => {
        let map = new Map();
        map.set('a', 10);
        map.set('b', 20);
        expect(typeDetect(map)).toEqual('map');
    });

    it('typeDetect() set', () => {
        let set = new Set();
        expect(typeDetect(set)).toEqual('set');
    });

    it('typeDetect() class is treated as function', () => {
        class TestClass {}
        expect(typeDetect(TestClass)).toEqual('function');
    });

    it('typeDetect() function', () => {
        function testFunction() {}
        expect(typeDetect(testFunction)).toEqual('function');
    });

    it('typeDetect() object', () => {
        expect(typeDetect({'a': 10, 'b': 20})).toEqual('object');
    });
});

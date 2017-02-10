import PrettyFormat from "../../utils/PrettyFormat";

describe('PrettyFormat', () => {
    it('PrettyFormat() string', () => {
        expect(new PrettyFormat('test').toString()).toEqual('"test"');
    });

    it('PrettyFormat() number', () => {
        expect(new PrettyFormat(10).toString()).toEqual('10');
    });

    it('PrettyFormat() null', () => {
        expect(new PrettyFormat(null).toString()).toEqual('null');
    });

    it('PrettyFormat() undefined', () => {
        expect(new PrettyFormat(undefined).toString()).toEqual('undefined');
    });

    it('PrettyFormat() boolean true', () => {
        expect(new PrettyFormat(true).toString()).toEqual('true');
    });

    it('PrettyFormat() boolean false', () => {
        expect(new PrettyFormat(false).toString()).toEqual('false');
    });

    it('PrettyFormat() function', () => {
        function testfunction() {}
        expect(new PrettyFormat(testfunction).toString()).toEqual(
            '[Function: testfunction]');
    });

    it('PrettyFormat() array', () => {
        expect(new PrettyFormat(["a", "b"]).toString()).toEqual(
            '["a", "b"]');
    });

    it('PrettyFormat() array indented', () => {
        expect(new PrettyFormat(["a", "b"]).toString(2)).toEqual(
            '[\n  "a",\n  "b"\n]');
    });

    it('PrettyFormat() set', () => {
        expect(new PrettyFormat(new Set(["a", "b"])).toString()).toEqual(
            'Set("a", "b")');
    });

    it('PrettyFormat() set indented', () => {
        expect(new PrettyFormat(new Set(["a", "b"])).toString(2)).toEqual(
            'Set(\n  "a",\n  "b"\n)');
    });

    it('PrettyFormat() map', () => {
        let map = new Map();
        map.set('a', 10);
        map.set('b', 20);
        expect(new PrettyFormat(map).toString()).toEqual(
            'Map("a" => 10, "b" => 20)');
    });

    it('PrettyFormat() map indented', () => {
        let map = new Map();
        map.set('a', 10);
        map.set('b', 20);
        expect(new PrettyFormat(map).toString(2)).toEqual(
            'Map(\n  "a" => 10,\n  "b" => 20\n)');
    });

    it('PrettyFormat() object', () => {
        expect(new PrettyFormat({'a': 10, 'b': 20}).toString()).toEqual(
            '{"a": 10, "b": 20}');
    });

    it('PrettyFormat() object indented', () => {
        expect(new PrettyFormat({'a': 10, 'b': 20}).toString(2)).toEqual(
            '{\n  "a": 10,\n  "b": 20\n}');
    });

    it('PrettyFormat() map of arrays', () => {
        let map = new Map();
        map.set('a', [10, 20]);
        map.set('b', [30, 40, 50]);
        expect(new PrettyFormat(map).toString()).toEqual(
            'Map("a" => [10, 20], "b" => [30, 40, 50])');
    });

    it('PrettyFormat() map of arrays indented', () => {
        let map = new Map();
        map.set('a', [10, 20]);
        map.set('b', [30, 40, 50]);
        expect(new PrettyFormat(map).toString(2)).toEqual(
`Map(
  "a" => [
    10,
    20
  ],
  "b" => [
    30,
    40,
    50
  ]
)`);
    });

    it('PrettyFormat() complex', () => {
        let map = new Map();
        map.set('a', [10, 20]);
        map.set('b', [30, 40, 50]);
        function testFunction() {}
        let obj = {
            theMap: map,
            aSet: new Set(['one', 'two']),
            theFunction: testFunction
        };
        expect(new PrettyFormat(obj).toString(2)).toEqual(
`{
  "aSet": Set(
    "one",
    "two"
  ),
  "theFunction": [Function: testFunction],
  "theMap": Map(
    "a" => [
      10,
      20
    ],
    "b" => [
      30,
      40,
      50
    ]
  )
}`);
    });
});

"use strict";

var _makeCustomError = _interopRequireDefault(require("../makeCustomError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('makeCustomError', function () {
  it('name is set correctly', function () {
    var MyError = (0, _makeCustomError.default)('MyError');
    var error = new MyError();
    expect(error.name).toEqual('MyError');
  });
  it('instanceof works', function () {
    var MyErrorA = (0, _makeCustomError.default)('MyErrorA');
    var errora = new MyErrorA();
    var MyErrorB = (0, _makeCustomError.default)('MyErrorB');
    var errorb = new MyErrorB();
    expect(errora instanceof Error).toBe(true);
    expect(errora instanceof MyErrorA).toBe(true);
    expect(errora instanceof MyErrorB).toBe(false);
  });
  it('inheritance from builtins works', function () {
    var MyError = (0, _makeCustomError.default)('MyError', TypeError);
    var error = new MyError();
    expect(error instanceof MyError).toBe(true);
    expect(error instanceof TypeError).toBe(true);
    expect(error instanceof Error).toBe(true);
  });
  it('inheritance from custom works', function () {
    var MySuperError = (0, _makeCustomError.default)('MySuperError');
    var MySubError = (0, _makeCustomError.default)('MySubError', MySuperError);
    var error = new MySubError();
    expect(error instanceof MySubError).toBe(true);
    expect(error instanceof MySuperError).toBe(true);
    expect(error instanceof Error).toBe(true);
  });
  it('inheritance deep works', function () {
    var MySuperError = (0, _makeCustomError.default)('MySuperError', TypeError);
    var MySubError = (0, _makeCustomError.default)('MySubError', MySuperError);
    var error = new MySubError();
    expect(error instanceof MySubError).toBe(true);
    expect(error instanceof MySuperError).toBe(true);
    expect(error instanceof TypeError).toBe(true);
    expect(error instanceof Error).toBe(true);
  });
});
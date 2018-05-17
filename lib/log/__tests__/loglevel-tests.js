"use strict";

var _Logger = _interopRequireDefault(require("../Logger"));

var _loglevel = _interopRequireDefault(require("../loglevel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('LOGLEVEL', function () {
  it('LOGLEVEL.DEBUG', function () {
    expect(_loglevel.default.DEBUG).toBe(4);
  });
  it('LOGLEVEL.INFO', function () {
    expect(_loglevel.default.INFO).toBe(3);
  });
  it('LOGLEVEL.WARNING', function () {
    expect(_loglevel.default.WARNING).toBe(2);
  });
  it('LOGLEVEL.ERROR', function () {
    expect(_loglevel.default.ERROR).toBe(1);
  });
  it('LOGLEVEL.SILENT', function () {
    expect(_loglevel.default.SILENT).toBe(0);
  });
  it('LOGLEVEL.validateLogLevel no exception for the valid values', function () {
    _loglevel.default.validateLogLevel(_loglevel.default.DEBUG);

    _loglevel.default.validateLogLevel(_loglevel.default.INFO);

    _loglevel.default.validateLogLevel(_loglevel.default.WARNING);

    _loglevel.default.validateLogLevel(_loglevel.default.ERROR);

    _loglevel.default.validateLogLevel(_loglevel.default.SILENT);
  });
  it('LOGLEVEL.validateLogLevel RangeError for the invalid values', function () {
    expect(function () {
      return _loglevel.default.validateLogLevel(-1);
    }).toThrowError(RangeError);
    expect(function () {
      return _loglevel.default.validateLogLevel(5);
    }).toThrowError(RangeError);
  });
  it('LOGLEVEL.validateLogLevel message for the invalid values', function () {
    expect(function () {
      return _loglevel.default.validateLogLevel(5);
    }).toThrowError('Invalid log level: 5, must be between ' + '0 (SILENT) and 4 (DEBUG)');
  });
  it('LOGLEVEL.getTextualNameForLogLevel DEBUG', function () {
    expect(_loglevel.default.getTextualNameForLogLevel(_loglevel.default.DEBUG)).toEqual('DEBUG');
  });
  it('LOGLEVEL.getTextualNameForLogLevel INFO', function () {
    expect(_loglevel.default.getTextualNameForLogLevel(_loglevel.default.INFO)).toEqual('INFO');
  });
  it('LOGLEVEL.getTextualNameForLogLevel WARNING', function () {
    expect(_loglevel.default.getTextualNameForLogLevel(_loglevel.default.WARNING)).toEqual('WARNING');
  });
  it('LOGLEVEL.getTextualNameForLogLevel ERROR', function () {
    expect(_loglevel.default.getTextualNameForLogLevel(_loglevel.default.ERROR)).toEqual('ERROR');
  });
  it('LOGLEVEL.getTextualNameForLogLevel SILENT', function () {
    expect(_loglevel.default.getTextualNameForLogLevel(_loglevel.default.SILENT)).toEqual('SILENT');
  });
});
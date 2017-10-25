"use strict";

var _Logger = require("../Logger");

var _Logger2 = _interopRequireDefault(_Logger);

var _loglevel = require("../loglevel");

var _loglevel2 = _interopRequireDefault(_loglevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('LOGLEVEL', function () {
    it('LOGLEVEL.DEBUG', function () {
        expect(_loglevel2.default.DEBUG).toBe(4);
    });

    it('LOGLEVEL.INFO', function () {
        expect(_loglevel2.default.INFO).toBe(3);
    });

    it('LOGLEVEL.WARNING', function () {
        expect(_loglevel2.default.WARNING).toBe(2);
    });

    it('LOGLEVEL.ERROR', function () {
        expect(_loglevel2.default.ERROR).toBe(1);
    });

    it('LOGLEVEL.SILENT', function () {
        expect(_loglevel2.default.SILENT).toBe(0);
    });

    it('LOGLEVEL.validateLogLevel no exception for the valid values', function () {
        _loglevel2.default.validateLogLevel(_loglevel2.default.DEBUG);
        _loglevel2.default.validateLogLevel(_loglevel2.default.INFO);
        _loglevel2.default.validateLogLevel(_loglevel2.default.WARNING);
        _loglevel2.default.validateLogLevel(_loglevel2.default.ERROR);
        _loglevel2.default.validateLogLevel(_loglevel2.default.SILENT);
    });

    it('LOGLEVEL.validateLogLevel RangeError for the invalid values', function () {
        expect(function () {
            return _loglevel2.default.validateLogLevel(-1);
        }).toThrowError(RangeError);
        expect(function () {
            return _loglevel2.default.validateLogLevel(5);
        }).toThrowError(RangeError);
    });

    it('LOGLEVEL.validateLogLevel message for the invalid values', function () {
        expect(function () {
            return _loglevel2.default.validateLogLevel(5);
        }).toThrowError('Invalid log level: 5, must be between ' + '0 (SILENT) and 4 (DEBUG)');
    });

    it('LOGLEVEL.getTextualNameForLogLevel DEBUG', function () {
        expect(_loglevel2.default.getTextualNameForLogLevel(_loglevel2.default.DEBUG)).toEqual('DEBUG');
    });

    it('LOGLEVEL.getTextualNameForLogLevel INFO', function () {
        expect(_loglevel2.default.getTextualNameForLogLevel(_loglevel2.default.INFO)).toEqual('INFO');
    });

    it('LOGLEVEL.getTextualNameForLogLevel WARNING', function () {
        expect(_loglevel2.default.getTextualNameForLogLevel(_loglevel2.default.WARNING)).toEqual('WARNING');
    });

    it('LOGLEVEL.getTextualNameForLogLevel ERROR', function () {
        expect(_loglevel2.default.getTextualNameForLogLevel(_loglevel2.default.ERROR)).toEqual('ERROR');
    });

    it('LOGLEVEL.getTextualNameForLogLevel SILENT', function () {
        expect(_loglevel2.default.getTextualNameForLogLevel(_loglevel2.default.SILENT)).toEqual('SILENT');
    });
});
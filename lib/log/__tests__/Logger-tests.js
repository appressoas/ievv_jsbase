"use strict";

var _Logger = require("../Logger");

var _Logger2 = _interopRequireDefault(_Logger);

var _loglevel = require("../loglevel");

var _loglevel2 = _interopRequireDefault(_loglevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Logger', function () {
    it('Logger() constructor', function () {
        var loggerSingleton = jest.fn();
        var logger = new _Logger2.default('test', loggerSingleton);
        expect(logger._name).toBe('test');
        expect(logger._logLevel).toBe(null);
        expect(logger._loggerSingleton).toBe(loggerSingleton);
    });

    it('Logger() name', function () {
        var logger = new _Logger2.default('test');
        expect(logger.name).toBe('test');
    });

    it('Logger() getLogLevel - _logLevel is null - uses loggerSingleton.getDefaultLogLevel', function () {
        var loggerSingleton = jest.fn();
        loggerSingleton.getDefaultLogLevel = jest.fn(function () {
            return 'mocklevel';
        });
        var logger = new _Logger2.default('test', loggerSingleton);
        var logLevel = logger.getLogLevel();
        expect(loggerSingleton.getDefaultLogLevel).toHaveBeenCalledTimes(1);
        expect(logLevel).toBe('mocklevel');
    });

    it('Logger() getLogLevel - _logLevel is NOT null', function () {
        var logger = new _Logger2.default('test');
        logger._logLevel = 'mocklevel';
        expect(logger.getLogLevel()).toBe('mocklevel');
    });

    it('Logger() setLogLevel', function () {
        var logger = new _Logger2.default('test');
        logger.setLogLevel(_loglevel2.default.DEBUG);
        expect(logger._logLevel).toBe(_loglevel2.default.DEBUG);
    });

    it('Logger() setLogLevel invalid logLevel', function () {
        var logger = new _Logger2.default('test');
        expect(function () {
            return logger.setLogLevel(10);
        }).toThrowError(RangeError);
    });

    it('Logger().getTextualNameForLogLevel() no logLevel', function () {
        var loggerSingleton = jest.fn();
        loggerSingleton.getTextualNameForDefaultLogLevel = jest.fn(function () {
            return 'MOCK';
        });
        var logger = new _Logger2.default('test', loggerSingleton);
        expect(logger.getTextualNameForLogLevel()).toEqual('[default for LoggerSingleton - MOCK]');
    });

    it('Logger().getTextualNameForLogLevel() with logLevel', function () {
        var logger = new _Logger2.default('test');
        logger.setLogLevel(_loglevel2.default.DEBUG);
        expect(logger.getTextualNameForLogLevel()).toEqual('DEBUG');
    });

    it('Logger().getDebugInfoString() no logLevel', function () {
        var loggerSingleton = jest.fn();
        loggerSingleton.getTextualNameForDefaultLogLevel = jest.fn(function () {
            return 'MOCK';
        });
        var logger = new _Logger2.default('test', loggerSingleton);
        expect(logger.getDebugInfoString()).toEqual('test: [default for LoggerSingleton - MOCK]');
    });

    it('Logger().getDebugInfoString() with logLevel', function () {
        var logger = new _Logger2.default('test');
        logger.setLogLevel(_loglevel2.default.DEBUG);
        expect(logger.getDebugInfoString()).toEqual('test: DEBUG');
    });
});
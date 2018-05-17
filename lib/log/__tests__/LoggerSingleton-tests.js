"use strict";

var _LoggerSingleton = _interopRequireDefault(require("../LoggerSingleton"));

var _loglevel = _interopRequireDefault(require("../loglevel"));

var _Logger = _interopRequireDefault(require("../Logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('LoggerSingleton', function () {
  beforeEach(function () {
    new _LoggerSingleton.default().reset();
  });
  it('LoggerSingleton() constructor', function () {
    var loggerSingleton = new _LoggerSingleton.default();
    expect(loggerSingleton._logLevel).toBe(_loglevel.default.WARNING);
    expect(loggerSingleton._loggerMap.size).toBe(0);
  });
  it('LoggerSingleton().getDefaultLogLevel() default', function () {
    var loggerSingleton = new _LoggerSingleton.default();
    expect(loggerSingleton.getDefaultLogLevel()).toBe(_loglevel.default.WARNING);
  });
  it('LoggerSingleton().setDefaultLogLevel() updates _logLevel', function () {
    var loggerSingleton = new _LoggerSingleton.default();
    loggerSingleton.setDefaultLogLevel(_loglevel.default.DEBUG);
    expect(loggerSingleton._logLevel).toBe(_loglevel.default.DEBUG);
  });
  it('LoggerSingleton().setDefaultLogLevel() invalid logLevel', function () {
    var loggerSingleton = new _LoggerSingleton.default();
    expect(function () {
      return loggerSingleton.setDefaultLogLevel(10);
    }).toThrowError(RangeError);
  });
  it('LoggerSingleton().setDefaultLogLevel() updates changes getDefaultLogLevel() output', function () {
    var loggerSingleton = new _LoggerSingleton.default();
    loggerSingleton.setDefaultLogLevel(_loglevel.default.DEBUG);
    expect(loggerSingleton.getDefaultLogLevel()).toBe(_loglevel.default.DEBUG);
  });
  it('LoggerSingleton().getLogger() return type', function () {
    var loggerSingleton = new _LoggerSingleton.default();
    expect(loggerSingleton.getLogger('test')).toBeInstanceOf(_Logger.default);
  });
  it('LoggerSingleton().getLogger() AbstractLogger configured correctly', function () {
    var loggerSingleton = new _LoggerSingleton.default();
    var logger = loggerSingleton.getLogger('test');
    expect(logger.name).toBe('test');
    expect(logger._logLevel).toBe(null);
    expect(logger._loggerSingleton).toBe(loggerSingleton);
  });
  it('LoggerSingleton().getLogger() updates _loggerMap on first call', function () {
    var loggerSingleton = new _LoggerSingleton.default();
    expect(loggerSingleton._loggerMap.size).toBe(0);
    var logger = loggerSingleton.getLogger('test');
    expect(loggerSingleton._loggerMap.size).toBe(1);
    expect(loggerSingleton._loggerMap.get('test')).toBeInstanceOf(_Logger.default);
    expect(loggerSingleton._loggerMap.get('test')).toBe(logger);
  });
  it('LoggerSingleton().getLogger() get from _loggerMap on subsequent calls', function () {
    var loggerSingleton = new _LoggerSingleton.default();
    expect(loggerSingleton._loggerMap.size).toBe(0);
    var logger = loggerSingleton.getLogger('test');
    loggerSingleton.getLogger('test');
    loggerSingleton.getLogger('test');
    expect(loggerSingleton._loggerMap.size).toBe(1);
    expect(loggerSingleton._loggerMap.get('test')).toBe(logger);
  });
  it('LoggerSingleton().getLoggerNameArray()', function () {
    var loggerSingleton = new _LoggerSingleton.default();
    loggerSingleton.getLogger('test3');
    loggerSingleton.getLogger('test1');
    loggerSingleton.getLogger('test2');
    expect(loggerSingleton.getLoggerNameArray()).toEqual(['test1', 'test2', 'test3']);
  });
  it('LoggerSingleton().getLoggerCount() none', function () {
    var loggerSingleton = new _LoggerSingleton.default();
    expect(loggerSingleton.getLoggerCount()).toBe(0);
  });
  it('LoggerSingleton().getLoggerCount() multiple', function () {
    var loggerSingleton = new _LoggerSingleton.default();
    loggerSingleton.getLogger('test3');
    loggerSingleton.getLogger('test1');
    loggerSingleton.getLogger('test2');
    expect(loggerSingleton.getLoggerCount()).toBe(3);
  });
  it('LoggerSingleton().getDebugInfoString() default no loggers', function () {
    var loggerSingleton = new _LoggerSingleton.default(); // loggerSingleton.setDefaultLogLevel(LOGLEVEL.INFO);

    expect(loggerSingleton.getDebugInfoString()).toEqual('Default logLevel: WARNING\n' + 'Loggers:\n' + '(no loggers)\n');
  });
  it('LoggerSingleton().getDebugInfoString() change default logLevel', function () {
    var loggerSingleton = new _LoggerSingleton.default();
    loggerSingleton.setDefaultLogLevel(_loglevel.default.INFO);
    expect(loggerSingleton.getDebugInfoString()).toEqual('Default logLevel: INFO\n' + 'Loggers:\n' + '(no loggers)\n');
  });
  it('LoggerSingleton().getDebugInfoString() with loggers', function () {
    var loggerSingleton = new _LoggerSingleton.default();
    loggerSingleton.getLogger('test3');
    loggerSingleton.getLogger('test1').setLogLevel(_loglevel.default.WARNING);
    loggerSingleton.getLogger('test2').setLogLevel(_loglevel.default.SILENT);
    loggerSingleton.setDefaultLogLevel(_loglevel.default.DEBUG);
    expect(loggerSingleton.getDebugInfoString()).toEqual('Default logLevel: DEBUG\n' + 'Loggers:\n' + ' - test1: WARNING\n' + ' - test2: SILENT\n' + ' - test3: [default for LoggerSingleton - DEBUG]\n');
  });
});
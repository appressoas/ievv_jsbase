import LoggerSingleton from "../LoggerSingleton";
import LOGLEVEL from "../loglevel";
import Logger from "../Logger";


describe('LoggerSingleton', () => {
    beforeEach(() => {
        new LoggerSingleton().reset();
    });

    it('LoggerSingleton() constructor', () => {
        let loggerSingleton = new LoggerSingleton();
        expect(loggerSingleton._logLevel).toBe(LOGLEVEL.WARNING);
        expect(loggerSingleton._loggerMap.size).toBe(0);
    });

    it('LoggerSingleton().getDefaultLogLevel() default', () => {
        let loggerSingleton = new LoggerSingleton();
        expect(loggerSingleton.getDefaultLogLevel()).toBe(LOGLEVEL.WARNING);
    });

    it('LoggerSingleton().setDefaultLogLevel() updates _logLevel', () => {
        let loggerSingleton = new LoggerSingleton();
        loggerSingleton.setDefaultLogLevel(LOGLEVEL.DEBUG);
        expect(loggerSingleton._logLevel).toBe(LOGLEVEL.DEBUG);
    });

    it('LoggerSingleton().setDefaultLogLevel() invalid logLevel', () => {
        let loggerSingleton = new LoggerSingleton();
        expect(() => loggerSingleton.setDefaultLogLevel(10)).toThrowError(RangeError);
    });

    it('LoggerSingleton().setDefaultLogLevel() updates changes getDefaultLogLevel() output', () => {
        let loggerSingleton = new LoggerSingleton();
        loggerSingleton.setDefaultLogLevel(LOGLEVEL.DEBUG);
        expect(loggerSingleton.getDefaultLogLevel()).toBe(LOGLEVEL.DEBUG);
    });

    it('LoggerSingleton().getLogger() return type', () => {
        let loggerSingleton = new LoggerSingleton();
        expect(loggerSingleton.getLogger('test')).toBeInstanceOf(Logger);
    });

    it('LoggerSingleton().getLogger() AbstractLogger configured correctly', () => {
        let loggerSingleton = new LoggerSingleton();
        let logger = loggerSingleton.getLogger('test');
        expect(logger.name).toBe('test');
        expect(logger._logLevel).toBe(null);
        expect(logger._loggerSingleton).toBe(loggerSingleton);
    });

    it('LoggerSingleton().getLogger() updates _loggerMap on first call', () => {
        let loggerSingleton = new LoggerSingleton();
        expect(loggerSingleton._loggerMap.size).toBe(0);
        let logger = loggerSingleton.getLogger('test');
        expect(loggerSingleton._loggerMap.size).toBe(1);
        expect(loggerSingleton._loggerMap.get('test')).toBeInstanceOf(Logger);
        expect(loggerSingleton._loggerMap.get('test')).toBe(logger);
    });

    it('LoggerSingleton().getLogger() get from _loggerMap on subsequent calls', () => {
        let loggerSingleton = new LoggerSingleton();
        expect(loggerSingleton._loggerMap.size).toBe(0);
        let logger = loggerSingleton.getLogger('test');
        loggerSingleton.getLogger('test');
        loggerSingleton.getLogger('test');
        expect(loggerSingleton._loggerMap.size).toBe(1);
        expect(loggerSingleton._loggerMap.get('test')).toBe(logger);
    });

    it('LoggerSingleton().getLoggerNameArray()', () => {
        let loggerSingleton = new LoggerSingleton();
        loggerSingleton.getLogger('test3');
        loggerSingleton.getLogger('test1');
        loggerSingleton.getLogger('test2');
        expect(loggerSingleton.getLoggerNameArray()).toEqual(
            ['test1', 'test2', 'test3']);
    });

    it('LoggerSingleton().getLoggerCount() none', () => {
        let loggerSingleton = new LoggerSingleton();
        expect(loggerSingleton.getLoggerCount()).toBe(0);
    });

    it('LoggerSingleton().getLoggerCount() multiple', () => {
        let loggerSingleton = new LoggerSingleton();
        loggerSingleton.getLogger('test3');
        loggerSingleton.getLogger('test1');
        loggerSingleton.getLogger('test2');
        expect(loggerSingleton.getLoggerCount()).toBe(3);
    });

    it('LoggerSingleton().getDebugInfoString() default no loggers', () => {
        let loggerSingleton = new LoggerSingleton();
        // loggerSingleton.setDefaultLogLevel(LOGLEVEL.INFO);
        expect(loggerSingleton.getDebugInfoString()).toEqual(
            'Default logLevel: WARNING\n' +
            'Loggers:\n' +
            '(no loggers)\n');
    });

    it('LoggerSingleton().getDebugInfoString() change default logLevel', () => {
        let loggerSingleton = new LoggerSingleton();
        loggerSingleton.setDefaultLogLevel(LOGLEVEL.INFO);
        expect(loggerSingleton.getDebugInfoString()).toEqual(
            'Default logLevel: INFO\n' +
            'Loggers:\n' +
            '(no loggers)\n');
    });

    it('LoggerSingleton().getDebugInfoString() with loggers', () => {
        let loggerSingleton = new LoggerSingleton();
        loggerSingleton.getLogger('test3');
        loggerSingleton.getLogger('test1').setLogLevel(LOGLEVEL.WARNING);
        loggerSingleton.getLogger('test2').setLogLevel(LOGLEVEL.SILENT);
        loggerSingleton.setDefaultLogLevel(LOGLEVEL.DEBUG);
        expect(loggerSingleton.getDebugInfoString()).toEqual(
            'Default logLevel: DEBUG\n' +
            'Loggers:\n' +
            ' - test1: WARNING\n' +
            ' - test2: SILENT\n' +
            ' - test3: [default for LoggerSingleton - DEBUG]\n');
    });
});

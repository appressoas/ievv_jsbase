import Logger from "../Logger";
import LOGLEVEL from "../loglevel";


describe('Logger', () => {
    it('Logger() constructor', () => {
        let loggerSingleton = jest.fn();
        let logger = new Logger('test', loggerSingleton);
        expect(logger._name).toBe('test');
        expect(logger._logLevel).toBe(null);
        expect(logger._loggerSingleton).toBe(loggerSingleton);
    });

    it('Logger() name', () => {
        let logger = new Logger('test');
        expect(logger.name).toBe('test');
    });

    it('Logger() getLogLevel - _logLevel is null - uses loggerSingleton.getDefaultLogLevel', () => {
        let loggerSingleton = jest.fn();
        loggerSingleton.getDefaultLogLevel = jest.fn(() => 'mocklevel');
        let logger = new Logger('test', loggerSingleton);
        let logLevel = logger.getLogLevel();
        expect(loggerSingleton.getDefaultLogLevel).toHaveBeenCalledTimes(1);
        expect(logLevel).toBe('mocklevel');
    });

    it('Logger() getLogLevel - _logLevel is NOT null', () => {
        let logger = new Logger('test');
        logger._logLevel = 'mocklevel';
        expect(logger.getLogLevel()).toBe('mocklevel');
    });

    it('Logger() setLogLevel', () => {
        let logger = new Logger('test');
        logger.setLogLevel(LOGLEVEL.DEBUG);
        expect(logger._logLevel).toBe(LOGLEVEL.DEBUG);
    });

    it('Logger() setLogLevel invalid logLevel', () => {
        let logger = new Logger('test');
        expect(() => logger.setLogLevel(10)).toThrowError(RangeError);
    });

    it('Logger().getTextualNameForLogLevel() no logLevel', () => {
        let loggerSingleton = jest.fn();
        loggerSingleton.getTextualNameForDefaultLogLevel = jest.fn(() => {
            return 'MOCK';
        });
        let logger = new Logger('test', loggerSingleton);
        expect(logger.getTextualNameForLogLevel()).toEqual(
            '[default for LoggerSingleton - MOCK]');
    });

    it('Logger().getTextualNameForLogLevel() with logLevel', () => {
        let logger = new Logger('test');
        logger.setLogLevel(LOGLEVEL.DEBUG);
        expect(logger.getTextualNameForLogLevel()).toEqual('DEBUG');
    });

    it('Logger().getDebugInfoString() no logLevel', () => {
        let loggerSingleton = jest.fn();
        loggerSingleton.getTextualNameForDefaultLogLevel = jest.fn(() => {
            return 'MOCK';
        });
        let logger = new Logger('test', loggerSingleton);
        expect(logger.getDebugInfoString()).toEqual(
            'test: [default for LoggerSingleton - MOCK]');
    });

    it('Logger().getDebugInfoString() with logLevel', () => {
        let logger = new Logger('test');
        logger.setLogLevel(LOGLEVEL.DEBUG);
        expect(logger.getDebugInfoString()).toEqual('test: DEBUG');
    });
});

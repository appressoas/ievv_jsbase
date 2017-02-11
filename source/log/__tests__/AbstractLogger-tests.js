import LOGLEVEL from "../loglevel";
import AbstractLogger from "../AbstractLogger";


class MockLogger extends AbstractLogger {
    constructor(logLevel) {
        super();
        this.logLevel = logLevel;
    }

    getLogLevel() {
        return this.logLevel;
    }
}


describe('AbstractLogger', () => {
    // debug()

    it('AbstractLogger() debug called with loglevel DEBUG', () => {
        let logger = new MockLogger(LOGLEVEL.DEBUG);
        console.log = jest.fn();
        logger.debug('test');
        expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() debug NOT called with loglevel INFO', () => {
        let logger = new MockLogger(LOGLEVEL.INFO);
        console.log = jest.fn();
        logger.debug('test');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    it('AbstractLogger() debug NOT called with loglevel WARNING', () => {
        let logger = new MockLogger(LOGLEVEL.WARNING);
        console.log = jest.fn();
        logger.debug('test');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    it('AbstractLogger() debug NOT called with loglevel ERROR', () => {
        let logger = new MockLogger(LOGLEVEL.ERROR);
        console.log = jest.fn();
        logger.debug('test');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    it('AbstractLogger() debug NOT called with loglevel SILENT', () => {
        let logger = new MockLogger(LOGLEVEL.SILENT);
        console.log = jest.fn();
        logger.debug('test');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    // info()

    it('AbstractLogger() info called with loglevel DEBUG', () => {
        let logger = new MockLogger(LOGLEVEL.DEBUG);
        console.log = jest.fn();
        logger.info('test');
        expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() info called with loglevel INFO', () => {
        let logger = new MockLogger(LOGLEVEL.INFO);
        console.log = jest.fn();
        logger.info('test');
        expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() info NOT called with loglevel WARNING', () => {
        let logger = new MockLogger(LOGLEVEL.WARNING);
        console.log = jest.fn();
        logger.info('test');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    it('AbstractLogger() info NOT called with loglevel ERROR', () => {
        let logger = new MockLogger(LOGLEVEL.ERROR);
        console.log = jest.fn();
        logger.info('test');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    it('AbstractLogger() info NOT called with loglevel SILENT', () => {
        let logger = new MockLogger(LOGLEVEL.SILENT);
        console.log = jest.fn();
        logger.info('test');
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    // warning()

    it('AbstractLogger() warning called with loglevel DEBUG', () => {
        let logger = new MockLogger(LOGLEVEL.DEBUG);
        console.warn = jest.fn();
        logger.warning('test');
        expect(console.warn).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() warning called with loglevel INFO', () => {
        let logger = new MockLogger(LOGLEVEL.INFO);
        console.warn = jest.fn();
        logger.warning('test');
        expect(console.warn).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() warning called with loglevel WARNING', () => {
        let logger = new MockLogger(LOGLEVEL.WARNING);
        console.warn = jest.fn();
        logger.warning('test');
        expect(console.warn).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() warning NOT called with loglevel ERROR', () => {
        let logger = new MockLogger(LOGLEVEL.ERROR);
        console.warn = jest.fn();
        logger.warning('test');
        expect(console.warn).toHaveBeenCalledTimes(0);
    });

    it('AbstractLogger() warning NOT called with loglevel SILENT', () => {
        let logger = new MockLogger(LOGLEVEL.SILENT);
        console.warn = jest.fn();
        logger.warning('test');
        expect(console.warn).toHaveBeenCalledTimes(0);
    });

    // error()

    it('AbstractLogger() error called with loglevel DEBUG', () => {
        let logger = new MockLogger(LOGLEVEL.DEBUG);
        console.error = jest.fn();
        logger.error('test');
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() error called with loglevel INFO', () => {
        let logger = new MockLogger(LOGLEVEL.INFO);
        console.error = jest.fn();
        logger.error('test');
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() error called with loglevel WARNING', () => {
        let logger = new MockLogger(LOGLEVEL.WARNING);
        console.error = jest.fn();
        logger.error('test');
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() error called with loglevel ERROR', () => {
        let logger = new MockLogger(LOGLEVEL.ERROR);
        console.error = jest.fn();
        logger.error('test');
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('AbstractLogger() error NOT called with loglevel SILENT', () => {
        let logger = new MockLogger(LOGLEVEL.SILENT);
        console.error = jest.fn();
        logger.error('test');
        expect(console.error).toHaveBeenCalledTimes(0);
    });
});

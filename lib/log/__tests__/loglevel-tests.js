import Logger from "../Logger";
import LOGLEVEL from "../loglevel";


describe('LOGLEVEL', () => {
    it('LOGLEVEL.DEBUG', () => {
        expect(LOGLEVEL.DEBUG).toBe(4);
    });

    it('LOGLEVEL.INFO', () => {
        expect(LOGLEVEL.INFO).toBe(3);
    });

    it('LOGLEVEL.WARNING', () => {
        expect(LOGLEVEL.WARNING).toBe(2);
    });

    it('LOGLEVEL.ERROR', () => {
        expect(LOGLEVEL.ERROR).toBe(1);
    });

    it('LOGLEVEL.SILENT', () => {
        expect(LOGLEVEL.SILENT).toBe(0);
    });

    it('LOGLEVEL.validateLogLevel no exception for the valid values', () => {
        LOGLEVEL.validateLogLevel(LOGLEVEL.DEBUG);
        LOGLEVEL.validateLogLevel(LOGLEVEL.INFO);
        LOGLEVEL.validateLogLevel(LOGLEVEL.WARNING);
        LOGLEVEL.validateLogLevel(LOGLEVEL.ERROR);
        LOGLEVEL.validateLogLevel(LOGLEVEL.SILENT);
    });

    it('LOGLEVEL.validateLogLevel RangeError for the invalid values', () => {
        expect(() => LOGLEVEL.validateLogLevel(-1)).toThrowError(RangeError);
        expect(() => LOGLEVEL.validateLogLevel(5)).toThrowError(RangeError);
    });

    it('LOGLEVEL.validateLogLevel message for the invalid values', () => {
        expect(() => LOGLEVEL.validateLogLevel(5)).toThrowError(
            'Invalid log level: 5, must be between ' +
            '0 (SILENT) and 4 (DEBUG)');
    });

    it('LOGLEVEL.getTextualNameForLogLevel DEBUG', () => {
        expect(LOGLEVEL.getTextualNameForLogLevel(LOGLEVEL.DEBUG)).toEqual('DEBUG');
    });

    it('LOGLEVEL.getTextualNameForLogLevel INFO', () => {
        expect(LOGLEVEL.getTextualNameForLogLevel(LOGLEVEL.INFO)).toEqual('INFO');
    });

    it('LOGLEVEL.getTextualNameForLogLevel WARNING', () => {
        expect(LOGLEVEL.getTextualNameForLogLevel(LOGLEVEL.WARNING)).toEqual('WARNING');
    });

    it('LOGLEVEL.getTextualNameForLogLevel ERROR', () => {
        expect(LOGLEVEL.getTextualNameForLogLevel(LOGLEVEL.ERROR)).toEqual('ERROR');
    });

    it('LOGLEVEL.getTextualNameForLogLevel SILENT', () => {
        expect(LOGLEVEL.getTextualNameForLogLevel(LOGLEVEL.SILENT)).toEqual('SILENT');
    });

});

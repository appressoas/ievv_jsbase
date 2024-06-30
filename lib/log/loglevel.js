/**
 * Defines valid log levels.
 *
 * Not used directly, but instead via the LOGLEVEL
 * constant exported as default by this module.
 *
 * @example
 * import LOGLEVEL from 'ievv_jsbase/log/loglevel';
 * console.log('The debug loglevel is:', LOGLEVEL.DEBUG);
 * LOGLEVEL.validateLogLevel(10);
 */
export class LogLevels {
    constructor() {
        this._prettyLogLevelNames = {};
        this._prettyLogLevelNames[this.DEBUG] = 'DEBUG';
        this._prettyLogLevelNames[this.INFO] = 'INFO';
        this._prettyLogLevelNames[this.WARNING] = 'WARNING';
        this._prettyLogLevelNames[this.ERROR] = 'ERROR';
        this._prettyLogLevelNames[this.SILENT] = 'SILENT';
    }

    /**
     * Get the number for log level DEBUG.
     * @returns {number}
     */
    get DEBUG() {
        return 4;
    }

    /**
     * Get the number for log level INFO.
     * @returns {number}
     */
    get INFO() {
        return 3;
    }

    /**
     * Get the number for log level WARNING.
     * @returns {number}
     */
    get WARNING() {
        return 2;
    }

    /**
     * Get the number for log level ERROR.
     * @returns {number}
     */
    get ERROR() {
        return 1;
    }

    /**
     * Get the number for log level SILENT.
     * @returns {number}
     */
    get SILENT() {
        return 0;
    }

    /**
     * Validate a log level.
     *
     * Should be used by all functions/methods that set a log level.
     *
     * @param logLevel The loglevel.
     * @throws {RangeError} If ``logLevel`` is not one
     *   of:
     *
     *   - {@link LogLevels#DEBUG}
     *   - {@link LogLevels#INFO}
     *   - {@link LogLevels#WARNING}
     *   - {@link LogLevels#ERROR}
     *   - {@link LogLevels#SILENT}
     */
    validateLogLevel(logLevel) {
        if (logLevel > this.DEBUG || logLevel < this.SILENT) {
            throw new RangeError(
                `Invalid log level: ${logLevel}, must be between ` +
                `${this.SILENT} (SILENT) and ${this.DEBUG} (DEBUG)`);
        }
    }

    /**
     * Get the textual name for a log level.
     *
     * @param {number} logLevel The log level to get a textual name for.
     * @returns {string}
     *
     * @example
     * const infoText = LOGLEVEL.getTextualNameForLogLevel(LOGLEVEL.INFO);
     * // infoText === 'INFO'
     */
    getTextualNameForLogLevel(logLevel) {
        return this._prettyLogLevelNames[logLevel];
    }
}

const LOGLEVEL = new LogLevels();
export default LOGLEVEL;

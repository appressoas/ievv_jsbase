import AbstractLogger from "./AbstractLogger";
import LOGLEVEL from "./loglevel";


export default class Logger extends AbstractLogger {
    /**
     *
     * @param {string} name The name of the logger.
     * @param {LoggerSingleton} loggerSingleton The logger singleton
     *      this logger belongs to.
     */
    constructor(name, loggerSingleton) {
        super();
        this._name = name;
        this._logLevel = null;
        this._loggerSingleton = loggerSingleton;
    }

    /**
     * Get the name of this logger.
     * @returns {string}
     */
    get name() {
        return this._name;
    }

    /**
     * Set the loglevel for this logger.
     *
     * @param {int} logLevel The log level. Must be one of the loglevels
     *      defined in {@link LogLevels}.
     * @throws {RangeError} if {@link LogLevels#validateLogLevel} fails.
     */
    setLogLevel(logLevel) {
        LOGLEVEL.validateLogLevel(logLevel);
        this._logLevel = logLevel;
    }

    /**
     * Get the log level.
     *
     * If no log level has been set with {@link Logger#setLogLevel},
     * this returns {@link LoggerSingleton#getDefaultLogLevel}.
     *
     * @returns {int}
     */
    getLogLevel() {
        if(this._logLevel == null) {
            return this._loggerSingleton.getDefaultLogLevel();
        }
        return this._logLevel;
    }

    /**
     * Get textual name for the log level. If the logger
     * does not have a logLevel (if it inherits it from the LoggerSingleton)
     * a string with information about this and the default logLevel for the
     * LoggerSingleton is returned.
     *
     * Intended for debugging. The format of the string may change.
     *
     * @returns {string}
     */

    getTextualNameForLogLevel() {
        if(this._logLevel == null) {
            return '[default for LoggerSingleton - ' +
                `${this._loggerSingleton.getTextualNameForDefaultLogLevel()}]`;
        }
        return LOGLEVEL.getTextualNameForLogLevel(this.getLogLevel());
    }

    getDebugInfoString() {
        return `${this.name}: ${this.getTextualNameForLogLevel()}`;
    }
}

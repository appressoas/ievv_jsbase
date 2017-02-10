import LOGLEVEL from "./loglevel";


/**
 */
export default class AbstractLogger {
  getLogLevel() {
    throw new Error('Must be overridden in subclasses.');
  }

  /**
   * Returns ``true`` if loglevel is higher
   * than or equal to {@link LogLevels#DEBUG}.
   */
  get isDebug() {
    return this.getLogLevel() >= LOGLEVEL.DEBUG;
  }

  /**
   * Returns ``true`` if loglevel is higher
   * than or equal to {@link LogLevels#INFO}.
   */
  get isInfo() {
    return this.getLogLevel() >= LOGLEVEL.INFO;
  }

  /**
   * Returns ``true`` if loglevel is higher
   * than or equal to {@link LogLevels#WARNING}.
   */
  get isWarning() {
    return this.getLogLevel() >= LOGLEVEL.WARNING;
  }

  /**
   * Returns ``true`` if loglevel is higher
   * than or equal to {@link LogLevels#ERROR}.
   */
  get isError() {
    return this.getLogLevel() >= LOGLEVEL.ERROR;
  }

  _noOutput() {

  }

  /**
   * Exposes console.log. Will only print if current level is
   * higher than or equal to {@link LogLevels#DEBUG}.
   * @returns {Function} console.log
   */
  get debug() {
    if (this.getLogLevel() >= LOGLEVEL.DEBUG) {
      return console.log.bind(console);
    }
    return this._noOutput;
  }

  /**
   * Exposes console.log. Will only print if current level is
   * higher than or equal to {@link LogLevels#INFO}.
   * @returns {Function} console.log
   */
  get info() {
    if (this.getLogLevel() >= LOGLEVEL.INFO) {
      return console.log.bind(console);
    }
    return this._noOutput;
  }

  /**
   * Exposes console.warn. Will only print if current level is
   * higher than or equal to {@link LogLevels#WARNING}.
   * @returns {Function} console.warn
   */
  get warning() {
    if(this.getLogLevel() >= LOGLEVEL.WARNING) {
      return console.warn.bind(console);
    }
    return this._noOutput;
  }

  /**
   * Exposes console.error. Will only print if current level is
   * higher than or equal to {@link LogLevels#ERROR}.
   * @returns {Function} console.error
   */
  get error() {
    if (this.getLogLevel() >= LOGLEVEL.ERROR) {
      return console.error.bind(console);
    }
    return this._noOutput;
  }

}

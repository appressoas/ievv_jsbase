"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueError = exports.ValidationError = exports.NotImplementedError = exports.MultiFieldValidationError = exports.IllegalOperationError = exports.DoesNotExistError = void 0;
var _makeCustomError = _interopRequireDefault(require("./makeCustomError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Error class meant for use when validation failed.
 *
 * @type {Error}
 */
var ValidationError = exports.ValidationError = (0, _makeCustomError.default)('ValidationError');

/**
 * Error class meant for use when some variable has correct type, but invalid value.
 *
 * @type {Error}
 */
var ValueError = exports.ValueError = (0, _makeCustomError.default)('ValueError');

/**
 * Error meant for use when attempting to look something up, but it does not exist.
 * @type {Error}
 */
var DoesNotExistError = exports.DoesNotExistError = (0, _makeCustomError.default)('DoesNotExistError');

/**
 * Error meant for use when attempting to perform an operation when requirements are not met.
 *
 * @example <caption>Throwing the error</caption>
 *  someAdminOnlyFunction () {
 *    if (!this.isAdmin) {
 *      throw new IllegalOperationError('someAdminOnlyFunction cannot be called from a non-admin state!')
 *    }
 *    // do some admin-stuff here.
 *  }
 *
 * @type {Error}
 */
var IllegalOperationError = exports.IllegalOperationError = (0, _makeCustomError.default)('IllegalOperationError');

/**
 * Error class meant to be used for something that is not yet implemented, e.g. when something should be implemented
 * in subclasses.
 *
 * default to message 'Not implemented yet!'
 *
 * @type {Error}
 */
var NotImplementedError = exports.NotImplementedError = (0, _makeCustomError.default)('NotImplementedError');
NotImplementedError.prototype.message = 'Not implemented yet!';

/**
 * Error class meant for use when validation failed for multiple fields.
 *
 * We do not enforce the structure of the error-object, but a recommended pattern is shown in example below.
 *
 * @example <caption>Throwing the error - complete example</caption>
 * try {
 *   throw new MultiFieldValidationError('Multiple validation errors occurred', {
 *     'fields': {
 *       'fullname': ['this field cannot be blank.'],
 *       'age': ['age can not be a negative number.']
 *     },
 *     'global': ['Missing required fields name and age.']
 *   })
 * } catch (error) {
 *   if (error instanceof MultiFieldValidationError) {
 *     for (message of e.global) {
 *       console.error(`Global error: ${message}`)
 *     }
 *     for (fieldName in e.fields) {
 *       if (e.fields.hasOwnProperty(fieldName)) {
 *         for (message of e.fields[fieldName]) {
 *           console.error(`Validation error in field ${fieldName}: ${e.fields[fieldName]}`)
 *         }
 *       }
 *     }
 *   }
 * }
 *
 * @type {Error}
 */
var MultiFieldValidationError = exports.MultiFieldValidationError = (0, _makeCustomError.default)('MultiFieldValidationError', ValidationError);
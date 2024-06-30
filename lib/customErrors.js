import makeCustomError from './makeCustomError'

/**
 * Error class meant for use when validation failed.
 *
 * @type {Error}
 */
export const ValidationError = makeCustomError('ValidationError')

/**
 * Error class meant for use when some variable has correct type, but invalid value.
 *
 * @type {Error}
 */
export const ValueError = makeCustomError('ValueError')

/**
 * Error meant for use when attempting to look something up, but it does not exist.
 * @type {Error}
 */
export const DoesNotExistError = makeCustomError('DoesNotExistError')

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
export const IllegalOperationError = makeCustomError('IllegalOperationError')

/**
 * Error class meant to be used for something that is not yet implemented, e.g. when something should be implemented
 * in subclasses.
 *
 * default to message 'Not implemented yet!'
 *
 * @type {Error}
 */
export const NotImplementedError = makeCustomError('NotImplementedError')
NotImplementedError.prototype.message = 'Not implemented yet!'

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
export const MultiFieldValidationError = makeCustomError('MultiFieldValidationError', ValidationError)

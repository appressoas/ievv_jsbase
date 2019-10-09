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
 * @example <caption>Throwing the error - complete example</caption>
 * try {
 *   throw new MultiFieldValidationError('Multiple validation errors occurred', {
 *     'fields': {
   *     'fullname': 'this field cannot be blank',
   *     'age': 'age can not be a negative number'
 *     }
 *   })
 * } catch (error) {
 *   if (e instanceof MultiFieldValidationError) {
 *     for (fieldName in e.fields) {
 *       console.error(`Validation error in field ${fieldName}: ${e.fields[fieldName]}`)
 *     }
 *   }
 * }
 *
 * @type {Error}
 */
export const MultiFieldValidationError = makeCustomError('MultiFieldValidationError', ValidationError)

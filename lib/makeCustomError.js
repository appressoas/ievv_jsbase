"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = makeCustomError;
/**
 * Make a custom error "class".
 *
 * Makes an old style prototype based error class.
 *
 * @example <caption>Typical usage</caption>
 * // In myerrors.js
 * export let MyCustomError = makeCustomError('MyCustomError');
 *
 * // Using the error
 * import {MyCustomError} from './myerrors';
 * throw new MyCustomError('The message');
 *
 * @example <caption>Throwing the error - complete example</caption>
 * try {
 *     throw new MyCustomError('The message', {
 *          code: 'stuff_happened',
 *          details: {
 *              size: 10
 *          }
 *     });
 * } catch(e) {
 *     if(e instanceof MyCustomError) {
 *         console.error(`${e.toString()} -- Code: ${e.code}. Size: ${e.details.size}`);
 *     }
 * }
 *
 * @example <caption>Define an error that extends Error</caption>
 * let NotFoundError = makeCustomError('NotFoundError');
 * // error instanceof NotFoundError === true
 * // error instanceof Error === true
 *
 * @example <caption>Define an error that extends a built in error</caption>
 * let MyValueError = makeCustomError('MyValueError', TypeError);
 * let error = new MyValueError();
 * // error instanceof MyValueError === true
 * // error instanceof TypeError === true
 * // error instanceof Error === true
 *
 * @example <caption>Define an error that extends another custom error</caption>
 * let MySuperError = makeCustomError('MySuperError', TypeError);
 * let MySubError = makeCustomError('MySubError', MySuperError);
 * let error = new MySubError();
 * // error instanceof MySubError === true
 * // error instanceof MySuperError === true
 * // error instanceof TypeError === true
 * // error instanceof Error === true
 *
 * @param {string} name The name of the error class.
 * @param {Error} extendsError An optional Error to extend.
 *      Defaults to {@link Error}. Can be a built in error
 *      or a custom error created by this function.
 * @returns {Error} The created error class.
 */
function makeCustomError(name, extendsError) {
    extendsError = extendsError || Error;
    var CustomError = function CustomError(message, properties) {
        this.message = message;
        var last_part = new extendsError().stack.match(/[^\s]+$/);
        this.stack = this.name + " at " + last_part;
        if (typeof properties !== 'undefined') {
            Object.assign(this, properties);
        }
    };
    Object.setPrototypeOf(CustomError, extendsError);
    CustomError.prototype = Object.create(extendsError.prototype);
    CustomError.prototype.constructor = CustomError;
    CustomError.prototype.message = "";
    CustomError.prototype.name = name;
    return CustomError;
}
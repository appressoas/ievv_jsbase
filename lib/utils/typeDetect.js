/**
 * Detect the type of an object and return the
 * result as a string.
 *
 * Handles the following types:
 *
 * - null  (returned as ``"null"``).
 * - undefined  (returned as ``"undefined"``).
 * - Number  (returned as ``"number"``).
 * - Boolean  (returned as ``"boolean"``).
 * - String  (returned as ``"string"``).
 * - Array  (returned as ``"array"``).
 * - Map  (returned as ``"map"``).
 * - Set  (returned as ``"set"``).
 * - Function  (returned as ``"function"``).
 * - Object  (returned as ``"object"``).
 *
 * We do not handle classes - they are returned as ``"function"``.
 * We could handle classes, but for Babel classes that will require
 * a fairly expensive and error prone regex.
 *
 * @param obj An object to detect the type for.
 * @returns {string}
 */
export default function typeDetect(obj) {
    if(obj === null) {
        return 'null';
    }
    const typeOf = typeof obj;
    if(typeOf === 'undefined') {
        return 'undefined';
    }
    if(typeOf === 'number') {
        return 'number';
    }
    if(typeOf === 'boolean') {
        return 'boolean';
    }
    if(typeOf === 'string') {
        return 'string';
    }
    if(typeOf === 'function') {
        return 'function';
    }
    if(Array.isArray(obj)) {
        return 'array';
    }
    if(obj instanceof Map) {
        return 'map';
    }
    if(obj instanceof Set) {
        return 'set';
    }
    return 'object';
}

import typeDetect from "./typeDetect";

/**
 * Pretty format any javascript object.
 *
 * Handles the following types:
 *
 * - null
 * - undefined
 * - Number
 * - Boolean
 * - String
 * - Array
 * - Map
 * - Set
 * - Function
 * - Class (detected as a Function, so pretty formatted just like a function)
 * - Object
 *
 * @example <caption>Without indentation</caption>
 * new PrettyFormat([1, 2]).toString();
 *
 * @example <caption>With indentation (indent by 2 spaces)</caption>
 * new PrettyFormat([1, 2]).toString(2);
 *
 * @example <caption>Simple examples</caption>
 * new PrettyFormat(true).toString() === 'true';
 * new PrettyFormat(null).toString() === 'null';
 * new PrettyFormat([1, 2]).toString() === '[1, 2]';
 * new PrettyFormat({name: "John", age: 29}).toString() === '{"age": 29, "name": John}';
 *
 * @example <caption>Complex example</caption>
 * let map = new Map();
 * map.set('a', [10, 20]);
 * map.set('b', [30, 40, 50]);
 * function testFunction() {}
 * let obj = {
 *     theMap: map,
 *     aSet: new Set(['one', 'two']),
 *     theFunction: testFunction
 * };
 * const prettyFormatted = new PrettyFormat(obj).toString(2);
 */
export default class PrettyFormat {
    constructor(obj) {
        this._obj = obj;
    }

    _indentString(str, indent, indentLevel) {
        if(indent === 0) {
            return str;
        }
        return `${' '.repeat(indent * indentLevel)}${str}`;
    }

    _objectToMap(obj) {
        let map = new Map();
        let sortedKeys = Array.from(Object.keys(obj));
        sortedKeys.sort();
        for(let key of sortedKeys) {
            map.set(key, obj[key]);
        }
        return map;
    }

    _prettyFormatFlatIterable(flatIterable, size, indent, indentLevel, prefix, suffix) {
        let output = prefix;
        let itemSuffix = ', ';
        if(indent) {
            output = `${prefix}\n`;
            itemSuffix = ',';
        }
        let index = 1;
        for(let item of flatIterable) {
            let prettyItem = this._prettyFormat(item, indent, indentLevel + 1);
            if(index !== size) {
                prettyItem += itemSuffix;
            }
            output += this._indentString(prettyItem, indent, indentLevel + 1);
            if(indent) {
                output += '\n';
            }
            index ++;
        }
        output += this._indentString(`${suffix}`, indent, indentLevel);
        return output;
    }

    _prettyFormatMap(map, indent, indentLevel, prefix, suffix, keyValueSeparator) {
        let output = prefix;
        let itemSuffix = ', ';
        if(indent) {
            output = `${prefix}\n`;
            itemSuffix = ',';
        }
        let index = 1;
        for(let [key, value] of map) {
            let prettyKey = this._prettyFormat(key, indent, indentLevel + 1);
            let prettyValue = this._prettyFormat(value, indent, indentLevel + 1);
            let prettyItem = `${prettyKey}${keyValueSeparator}${prettyValue}`;
            if(index !== map.size) {
                prettyItem += itemSuffix;
            }
            output += this._indentString(prettyItem, indent, indentLevel + 1);
            if(indent) {
                output += '\n';
            }
            index ++;
        }
        output += this._indentString(`${suffix}`, indent, indentLevel);
        return output;
    }

    _prettyFormatFunction(fn) {
        return `[Function: ${fn.name}]`;
    }

    _prettyFormat(obj, indent, indentLevel) {
        const typeString = typeDetect(obj);
        let output = '';
        if(typeString === 'string') {
            output = `"${obj}"`;
        } else if(typeString === 'number' || typeString === 'boolean' ||
                typeString === 'undefined' || typeString === 'null') {
            output = `${obj}`;
        } else if(typeString === 'array') {
            output = this._prettyFormatFlatIterable(obj, obj.length, indent, indentLevel, '[', ']');
        } else if(typeString === 'set') {
            output = this._prettyFormatFlatIterable(obj, obj.size, indent, indentLevel, 'Set(', ')');
        } else if(typeString === 'map') {
            output = this._prettyFormatMap(obj, indent, indentLevel, 'Map(', ')', ' => ');
        } else if(typeString === 'function') {
            output = this._prettyFormatFunction(obj);
        } else {
            output = this._prettyFormatMap(this._objectToMap(obj), indent, indentLevel, '{', '}', ': ');
        }
        return output;
    }

    /**
     * Get the results as a string, optionally indented.
     *
     * @param {number} indent The number of spaces to indent by. Only
     *    child objects are indented, and they are indented recursively.
     * @returns {string}
     */
    toString(indent) {
        indent = indent || 0;
        return this._prettyFormat(this._obj, indent, 0);
    }
}

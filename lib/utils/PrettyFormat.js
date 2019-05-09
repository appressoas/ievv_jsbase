"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeDetect = _interopRequireDefault(require("./typeDetect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var PrettyFormat =
/*#__PURE__*/
function () {
  function PrettyFormat(obj) {
    _classCallCheck(this, PrettyFormat);

    this._obj = obj;
  }

  _createClass(PrettyFormat, [{
    key: "_indentString",
    value: function _indentString(str, indent, indentLevel) {
      if (indent === 0) {
        return str;
      }

      return "".concat(' '.repeat(indent * indentLevel)).concat(str);
    }
  }, {
    key: "_objectToMap",
    value: function _objectToMap(obj) {
      var map = new Map();
      var sortedKeys = Array.from(Object.keys(obj));
      sortedKeys.sort();

      for (var _i = 0, _sortedKeys = sortedKeys; _i < _sortedKeys.length; _i++) {
        var key = _sortedKeys[_i];
        map.set(key, obj[key]);
      }

      return map;
    }
  }, {
    key: "_prettyFormatFlatIterable",
    value: function _prettyFormatFlatIterable(flatIterable, size, indent, indentLevel, prefix, suffix) {
      var output = prefix;
      var itemSuffix = ', ';

      if (indent) {
        output = "".concat(prefix, "\n");
        itemSuffix = ',';
      }

      var index = 1;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = flatIterable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          var prettyItem = this._prettyFormat(item, indent, indentLevel + 1);

          if (index !== size) {
            prettyItem += itemSuffix;
          }

          output += this._indentString(prettyItem, indent, indentLevel + 1);

          if (indent) {
            output += '\n';
          }

          index++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      output += this._indentString("".concat(suffix), indent, indentLevel);
      return output;
    }
  }, {
    key: "_prettyFormatMap",
    value: function _prettyFormatMap(map, indent, indentLevel, prefix, suffix, keyValueSeparator) {
      var output = prefix;
      var itemSuffix = ', ';

      if (indent) {
        output = "".concat(prefix, "\n");
        itemSuffix = ',';
      }

      var index = 1;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = map[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              key = _step2$value[0],
              value = _step2$value[1];

          var prettyKey = this._prettyFormat(key, indent, indentLevel + 1);

          var prettyValue = this._prettyFormat(value, indent, indentLevel + 1);

          var prettyItem = "".concat(prettyKey).concat(keyValueSeparator).concat(prettyValue);

          if (index !== map.size) {
            prettyItem += itemSuffix;
          }

          output += this._indentString(prettyItem, indent, indentLevel + 1);

          if (indent) {
            output += '\n';
          }

          index++;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      output += this._indentString("".concat(suffix), indent, indentLevel);
      return output;
    }
  }, {
    key: "_prettyFormatFunction",
    value: function _prettyFormatFunction(fn) {
      return "[Function: ".concat(fn.name, "]");
    }
  }, {
    key: "_prettyFormat",
    value: function _prettyFormat(obj, indent, indentLevel) {
      var typeString = (0, _typeDetect.default)(obj);
      var output = '';

      if (typeString === 'string') {
        output = "\"".concat(obj, "\"");
      } else if (typeString === 'number' || typeString === 'boolean' || typeString === 'undefined' || typeString === 'null') {
        output = "".concat(obj);
      } else if (typeString === 'array') {
        output = this._prettyFormatFlatIterable(obj, obj.length, indent, indentLevel, '[', ']');
      } else if (typeString === 'set') {
        output = this._prettyFormatFlatIterable(obj, obj.size, indent, indentLevel, 'Set(', ')');
      } else if (typeString === 'map') {
        output = this._prettyFormatMap(obj, indent, indentLevel, 'Map(', ')', ' => ');
      } else if (typeString === 'function') {
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

  }, {
    key: "toString",
    value: function toString(indent) {
      indent = indent || 0;
      return this._prettyFormat(this._obj, indent, 0);
    }
  }]);

  return PrettyFormat;
}();

exports.default = PrettyFormat;
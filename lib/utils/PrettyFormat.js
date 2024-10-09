"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeDetect = _interopRequireDefault(require("./typeDetect"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var PrettyFormat = exports.default = /*#__PURE__*/function () {
  function PrettyFormat(obj) {
    _classCallCheck(this, PrettyFormat);
    this._obj = obj;
  }
  return _createClass(PrettyFormat, [{
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
      var _iterator = _createForOfIteratorHelper(flatIterable),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
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
        _iterator.e(err);
      } finally {
        _iterator.f();
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
      var _iterator2 = _createForOfIteratorHelper(map),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
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
        _iterator2.e(err);
      } finally {
        _iterator2.f();
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
}();
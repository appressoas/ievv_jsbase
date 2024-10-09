"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeDetect = _interopRequireDefault(require("../utils/typeDetect"));
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
 * Query-string creator and parser.
 *
 * @example <caption>Basics - build a querystring</caption>
 * const querystring = new QueryString()
 * querystring.set('name', 'Peter')
 * querystring.setIterable('tags', ['person', 'male'])
 * const encodedQuerystring = querystring.urlencode()
 * // encodedQuerystring === 'name=Peter&tags=person&tags=male'  // order may vary
 *
 * @example <caption>Parse a querystring</caption>
 * const querystring = new QueryString('name=Peter&tags=person&tags=male')
 * const name = querystring.get('name')
 * const tags = querystring.getArray('tags')
 * const firstTag = querystring.get('tags')
 *
 * @example <caption>Parse a querystring from window.location.search</caption>
 * // window.location.search == "?name=test&age=12"
 * const querystring = new QueryString(window.location.search)
 * const name = querystring.get('name')
 * const age = querystring.get('age')
 *
 * @example <caption>Parse and modify a querystring</caption>
 * const querystring = new QueryString('name=Peter&tags=person&tags=male')
 * querystring.set('name', 'John')
 * querystring.append('tags', 'important')
 * // querystring.urlencode() === 'name=John&tags=person&tags=male&tags=important'
 * querystring.setIterable('tags', ['male'])
 * // querystring.urlencode() === 'name=John&tags=male'
 */
var QueryString = exports.default = /*#__PURE__*/function () {
  /**
   *
   * @param {string} querystring Optional input querystring to parse.
   */
  function QueryString() {
    var querystring = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    _classCallCheck(this, QueryString);
    this._queryStringMap = new Map();
    if (querystring) {
      if (typeof querystring !== 'string') {
        throw new TypeError('The querystring argument must be a string.');
      }
      this._parseQueryString(querystring);
    }
  }

  /**
   * Create a deep copy of this QueryString object.
   *
   * @return The copy.
   */
  return _createClass(QueryString, [{
    key: "deepCopy",
    value: function deepCopy() {
      var copy = Object.assign(Object.create(this), this);
      copy._queryStringMap = new Map(this._queryStringMap);
      return copy;
    }

    /**
     * Returns ``true`` if the querystring is empty, otherwise ``false``.
     *
     * @returns {boolean}
     */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this._queryStringMap.size === 0;
    }

    /**
     * Remove all keys and values from the QueryString.
     */
  }, {
    key: "clear",
    value: function clear() {
      this._queryStringMap.clear();
    }
  }, {
    key: "_parseQueryStringItem",
    value: function _parseQueryStringItem(querystringItem) {
      var splitPair = querystringItem.split('=');
      var key = decodeURIComponent(splitPair[0]);
      var value = decodeURIComponent(splitPair[1]);
      this.append(key, value);
    }
  }, {
    key: "_parseQueryString",
    value: function _parseQueryString(querystring) {
      if (querystring.substring(0, 1) === '?') {
        querystring = querystring.substring(1);
      }
      var splitQueryString = querystring.split('&');
      var _iterator = _createForOfIteratorHelper(splitQueryString),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var querystringItem = _step.value;
          this._parseQueryStringItem(querystringItem);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "_addToKey",
    value: function _addToKey(key, value) {
      this._queryStringMap.get(key).push(value);
    }
  }, {
    key: "_setKeyToEmptyArray",
    value: function _setKeyToEmptyArray(key) {
      this._queryStringMap.set(key, []);
    }

    /**
     * Set values from a querystring, like window.location.search.
     *
     * Overwrites any key/value pairs currently in this object with keys in the
     * provided ``querystring``.
     *
     * @example
     * const querystring = new QueryString()
     * querystring.set('name', 'oldname')
     * querystring.addValuesFromQueryString('name=newname&age=33')
     * // querystring.get('name') == 'newname'
     * // querystring.get('age') == '33'
     *
     * @param {string} querystring A querystring, like the one in window.location.search.
     *    Examples: ``"?a=10"``, ``"a=10"``, ``"a=10&s=test"``.
     */
  }, {
    key: "setValuesFromQueryString",
    value: function setValuesFromQueryString(querystring) {
      this.merge(new this.constructor(querystring));
    }

    /**
     * Set values from an Object.
     *
     * Overwrites any key/value pairs currently in this QueryString
     * with key/value pairs in the provided ``object``.
     *
     * Uses {@link QueryString#setSmart} to set the values, so
     * the values of the map can be both simple types and
     * iterables like arrays and sets.
     *
     * @example
     * const querystring = new QueryString()
     * querystring.set('name', 'oldname')
     * querystring.setValuesFromObject({
     *   name: 'newname',
     *   age: 33,
     *   tags: ['tag1', 'tag2']
     * })
     * // querystring.get('name') == 'newname'
     * // querystring.get('age') == 33
     * // querystring.getArray('tags') == ['tag1', 'tag2']
     *
     * @param {Object} object An Object.
     */
  }, {
    key: "setValuesFromObject",
    value: function setValuesFromObject(object) {
      for (var _i = 0, _Object$keys = Object.keys(object); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        this.setSmart(key, object[key]);
      }
    }

    /**
     * Set values from a Map.
     *
     * Overwrites any key/value pairs currently in this QueryString
     * with key/value pairs in the provided ``map``.
     *
     * Uses {@link QueryString#setSmart} to set the values, so
     * the values of the map can be both simple types and
     * iterables like arrays and sets.
     *
     * @example
     * const querystring = new QueryString()
     * querystring.set('name', 'oldname')
     * querystring.setValuesFromMap(new Map([
     *   ['name', 'newname'],
     *   ['age', 33],
     *   ['tags', ['tag1', 'tag2']]
     * ]))
     * // querystring.get('name') == 'newname'
     * // querystring.get('age') == 33
     * // querystring.getArray('tags') == ['tag1', 'tag2']
     *
     * @param {Map} map A map.
     */
  }, {
    key: "setValuesFromMap",
    value: function setValuesFromMap(map) {
      var _iterator2 = _createForOfIteratorHelper(map.entries()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            key = _step2$value[0],
            value = _step2$value[1];
          this.setSmart(key, value);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    /**
     * Merge {@link QueryString} objects into with this object.
     *
     * Overwrites any key/value pairs currently in this object with keys in the
     * provided queryStringObjects in provided order, with the last
     * one overwriting any preceding values.
     *
     * @example
     * const querystring = new QueryString('name=oldname')
     * querystring.merge(
     *    new QueryString('name=newname1&age=33'),
     *    new QueryString('name=newname2&size=large'))
     * // querystring.get('name') == 'newname2'
     * // querystring.get('age') == '33'
     * // querystring.get('size') == 'large'
     *
     * @param queryStringObjects Zero or more {@link QueryString} objects.
     */
  }, {
    key: "merge",
    value: function merge() {
      for (var _len = arguments.length, queryStringObjects = new Array(_len), _key = 0; _key < _len; _key++) {
        queryStringObjects[_key] = arguments[_key];
      }
      for (var _i2 = 0, _queryStringObjects = queryStringObjects; _i2 < _queryStringObjects.length; _i2++) {
        var queryStringObject = _queryStringObjects[_i2];
        var _iterator3 = _createForOfIteratorHelper(queryStringObject._queryStringMap),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _step3$value = _slicedToArray(_step3.value, 2),
              key = _step3$value[0],
              value = _step3$value[1];
            this._queryStringMap.set(key, value);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }

    /**
     * Set value from an iterable.
     *
     * @param {string} key The key to set.
     * @param iterable Something that can be iterated with a
     *      ``for(const value of iterable)`` loop.
     *      All the values in the iterable must be strings.
     *      If the iterable is empty the key will be removed
     *      from the QueryString.
     *
     * @example
     * const querystring = QueryString()
     * querystring.setIterable('names', ['Peter', 'Jane'])
     */
  }, {
    key: "setIterable",
    value: function setIterable(key, iterable) {
      this._setKeyToEmptyArray(key);
      var _iterator4 = _createForOfIteratorHelper(iterable),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var value = _step4.value;
          this._addToKey(key, value);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      if (this._queryStringMap.get(key).length === 0) {
        this.remove(key);
      }
    }

    /**
     * Set a value.
     *
     * @param {string} key The key to store the value as.
     * @param {string} value The value to set.
     *
     * @example
     * const querystring = QueryString()
     * querystring.set('name', 'Peter')
     */
  }, {
    key: "set",
    value: function set(key, value) {
      this.setIterable(key, [value]);
    }

    /**
     * Calls {@link QueryString#set} or {@link QueryString#setIterable} depending
     * on the type of the provided value.
     *
     * @param {string} key The key to store the value as.
     * @param {string|number|boolean|array|Set} value The value to set using
     *    {@link QueryString#set} or {@link QueryString#setIterable} depending
     *    on the type.
     */
  }, {
    key: "setSmart",
    value: function setSmart(key, value) {
      if (value === null || value === undefined) {
        if (this.has(key)) {
          this.remove(key);
        }
      } else {
        var valueType = (0, _typeDetect.default)(value);
        if (valueType === 'string' || valueType === 'number' || valueType === 'boolean') {
          this.set(key, value);
        } else if (valueType === 'array' || valueType === 'set') {
          this.setIterable(key, value);
        } else {
          throw new Error("Unsupporter value type: ".concat(valueType));
        }
      }
    }

    /**
     * Get a value.
     *
     * @param {string} key The key to get the value for.
     * @param {string} fallback An optional fallback value if the key is
     *      not in the QueryString. Defaults to ``undefined``.
     */
  }, {
    key: "get",
    value: function get(key) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var value = this._queryStringMap.get(key);
      if (typeof value === 'undefined') {
        return fallback;
      } else {
        return value[0];
      }
    }
  }, {
    key: "getSmart",
    value: function getSmart(key) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      if (!this.has(key)) {
        return fallback;
      }
      var valueArray = this.getArray(key);
      if (valueArray.length === 1) {
        return valueArray[0];
      }
      return valueArray;
    }

    /**
     * Append a value to a key.
     *
     * @param {string} key The key to append a value to.
     * @param {string} value The value to append.
     *
     * @example
     * const querystring = QueryString()
     * querystring.append('names', 'Jane')
     * querystring.append('names', 'Joe')
     * // querystring.urlencode() === 'names=Jane&names=Joe'
     */
  }, {
    key: "append",
    value: function append(key, value) {
      if (!this._queryStringMap.has(key)) {
        this._setKeyToEmptyArray(key);
      }
      this._addToKey(key, value);
    }

    /**
     * Get the values for the specified key as an array.
     *
     * Always returns an array, even if the value was set
     * with {@link QueryString#set}.
     *
     * @param {string} key The key to get the values for.
     * @param {Array} fallback An optional fallback value if they
     *      key is not in the QueryString. Defaults to an empty array.
     * @returns {Array}
     */
  }, {
    key: "getArray",
    value: function getArray(key) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      if (this._queryStringMap.has(key)) {
        var valueArray = this._queryStringMap.get(key);
        return Array.from(valueArray);
      }
      if (typeof fallback !== 'undefined') {
        return [];
      }
      return fallback;
    }

    /**
     * Remove the specified key from the QueryString.
     *
     * @param {string} key The key to remove.
     */
  }, {
    key: "remove",
    value: function remove(key) {
      this._queryStringMap.delete(key);
    }

    /**
     * Check if the QueryString contains the given key.
     *
     * @param {string} key The key to check for.
     * @returns {boolean}
     */
  }, {
    key: "has",
    value: function has(key) {
      return this._queryStringMap.has(key);
    }
  }, {
    key: "_encodeKeyValue",
    value: function _encodeKeyValue(key, value) {
      key = "".concat(key);
      value = "".concat(value);
      return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(value));
    }

    /**
     * Get all the keys in the querystring.
     *
     * @returns {IterableIterator<any>}
     */
  }, {
    key: "keys",
    value: function keys() {
      return this._queryStringMap.keys();
    }

    /**
     * Get the QueryString object as a string in query-string format.
     *
     * @example
     * const querystring = QueryString()
     * querystring.set('next', '/a&b/')
     * querystring.set('name', 'john')
     * let urlEncodedQuerystring = querystring.urlencode()
     * // urlEncodedQuerystring === 'name=john&next=%2Fa%26b%2F'  // order may vary
     *
     * @example <caption>Sort keys</caption>
     * const querystring = QueryString()
     * querystring.set('name', 'john')
     * querystring.set('age', 33)
     * let urlEncodedQuerystring = querystring.urlencode({sortKeys: true})
     * // urlEncodedQuerystring === 'age=33&name=john'
     *
     * @example <caption>Sort values</caption>
     * const querystring = QueryString()
     * querystring.setIterable('name', ['john', 'amy', 'xion'])
     * let urlEncodedQuerystring = querystring.urlencode()
     * // urlEncodedQuerystring === 'name=amy&name=john&name=xion'
     *
     *
     * @param {Object} options Options. All are optional
     * @param {boolean} options.sortKeys Sort the keys using Array.sort? ``false`` by default.
     * @param {boolean} options.sortValues Sort the values using Array.sort? ``false`` by default.
     *    This only makes sense if you have keys with multiple values.
     * @param {boolean} options.skipEmptyValues Skip empty values? ``false`` by default.
     */
  }, {
    key: "urlencode",
    value: function urlencode() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var sortKeys = options.sortKeys,
        sortValues = options.sortValues,
        skipEmptyValues = options.skipEmptyValues;
      var keys = this._queryStringMap.keys();
      if (sortKeys) {
        keys = Array.from(keys);
        keys.sort();
      }
      var urlEncodedArray = [];
      var _iterator5 = _createForOfIteratorHelper(keys),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var key = _step5.value;
          var valueArray = this._queryStringMap.get(key);
          if (sortValues) {
            valueArray = Array.from(valueArray);
            valueArray.sort();
          }
          var _iterator6 = _createForOfIteratorHelper(valueArray),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var value = _step6.value;
              if (skipEmptyValues && "".concat(value) === '') {
                continue;
              }
              urlEncodedArray.push(this._encodeKeyValue(key, value));
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return urlEncodedArray.join('&');
    }
  }]);
}();
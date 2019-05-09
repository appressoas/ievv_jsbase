"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeDetect = _interopRequireDefault(require("../utils/typeDetect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var QueryString =
/*#__PURE__*/
function () {
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


  _createClass(QueryString, [{
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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = splitQueryString[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var querystringItem = _step.value;

          this._parseQueryStringItem(querystringItem);
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
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = map.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              key = _step2$value[0],
              value = _step2$value[1];

          this.setSmart(key, value);
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
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = queryStringObject._queryStringMap[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _step3$value = _slicedToArray(_step3.value, 2),
                key = _step3$value[0],
                value = _step3$value[1];

            this._queryStringMap.set(key, value);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
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

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = iterable[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var value = _step4.value;

          this._addToKey(key, value);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
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
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = keys[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var key = _step5.value;

          var valueArray = this._queryStringMap.get(key);

          if (sortValues) {
            valueArray = Array.from(valueArray);
            valueArray.sort();
          }

          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = valueArray[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var value = _step6.value;

              if (skipEmptyValues && "".concat(value) === '') {
                continue;
              }

              urlEncodedArray.push(this._encodeKeyValue(key, value));
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
                _iterator6.return();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return urlEncodedArray.join('&');
    }
  }]);

  return QueryString;
}();

exports.default = QueryString;
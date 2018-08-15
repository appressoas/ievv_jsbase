import typeDetect from '../utils/typeDetect'

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
export default class QueryString {
  /**
   *
   * @param {string} querystring Optional input querystring to parse.
   */
  constructor(querystring='') {
    this._queryStringMap = new Map()
    if(querystring) {
      if(typeof querystring !== 'string') {
        throw new TypeError('The querystring argument must be a string.')
      }
      this._parseQueryString(querystring)
    }
  }

  /**
   * Create a deep copy of this QueryString object.
   *
   * @return The copy.
   */
  deepCopy () {
    let copy = Object.assign(Object.create(this), this)
    copy._queryStringMap = new Map(this._queryStringMap)
    return copy
  }

  /**
   * Returns ``true`` if the querystring is empty, otherwise ``false``.
   *
   * @returns {boolean}
   */
  isEmpty() {
    return this._queryStringMap.size === 0
  }

  /**
   * Remove all keys and values from the QueryString.
   */
  clear() {
    this._queryStringMap.clear()
  }

  _parseQueryStringItem(querystringItem) {
    const splitPair = querystringItem.split('=')
    const key = decodeURIComponent(splitPair[0])
    const value = decodeURIComponent(splitPair[1])
    this.append(key, value)
  }

  _parseQueryString(querystring) {
    if(querystring.substring(0, 1) == '?') {
      querystring = querystring.substring(1)
    }
    const splitQueryString = querystring.split('&')
    for(const querystringItem of splitQueryString) {
      this._parseQueryStringItem(querystringItem)
    }
  }

  _addToKey(key, value) {
    this._queryStringMap.get(key).push(value)
  }

  _setKeyToEmptyArray(key) {
    this._queryStringMap.set(key, [])
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
  setValuesFromQueryString(querystring) {
    this.merge(new this.constructor(querystring))
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
  setValuesFromObject(object) {
    for(let key of Object.keys(object)) {
      this.setSmart(key, object[key])
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
  setValuesFromMap(map) {
    for(let [key, value] of map.entries()) {
      this.setSmart(key, value)
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
  merge(...queryStringObjects) {
    for(let queryStringObject of queryStringObjects) {
      for (let [key, value] of queryStringObject._queryStringMap) {
        this._queryStringMap.set(key, value)
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
  setIterable(key, iterable) {
    this._setKeyToEmptyArray(key)
    for(const value of iterable) {
      this._addToKey(key, value)
    }
    if(this._queryStringMap.get(key).length === 0) {
      this.remove(key)
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
  set(key, value) {
    this.setIterable(key, [value])
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
  setSmart(key, value) {
    const valueType = typeDetect(value)
    if(valueType === 'string' || valueType === 'number' || valueType === 'boolean') {
      this.set(key, value)
    } else if(valueType === 'array' || valueType === 'set') {
      this.setIterable(key, value)
    } else {
      throw new Error(`Unsupporter value type: ${valueType}`)
    }
  }

  /**
   * Get a value.
   *
   * @param {string} key The key to get the value for.
   * @param {string} fallback An optional fallback value if the key is
   *      not in the QueryString. Defaults to ``undefined``.
   */
  get (key, fallback = undefined) {
    const value = this._queryStringMap.get(key)
    if (typeof value === 'undefined') {
      return fallback
    } else {
      return value[0]
    }
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
  append(key, value) {
    if (!this._queryStringMap.has(key)) {
      this._setKeyToEmptyArray(key)
    }
    this._addToKey(key, value)
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
  getArray(key, fallback) {
    if (this._queryStringMap.has(key)) {
      const valueArray = this._queryStringMap.get(key)
      return Array.from(valueArray)
    }
    if(typeof falback !== 'undefined') {
      return []
    }
    return fallback
  }

  /**
   * Remove the specified key from the QueryString.
   *
   * @param {string} key The key to remove.
   */
  remove(key) {
    this._queryStringMap.delete(key)
  }

  /**
   * Check if the QueryString contains the given key.
   *
   * @param {string} key The key to check for.
   * @returns {boolean}
   */
  has(key) {
    return this._queryStringMap.has(key)
  }

  _encodeKeyValue(key, value) {
    key = `${key}`
    value = `${value}`
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
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
  urlencode(options={}) {
    const {sortKeys, sortValues, skipEmptyValues} = options
    let keys = this._queryStringMap.keys()
    if(sortKeys) {
      keys = Array.from(keys)
      keys.sort()
    }

    let urlEncodedArray = []
    for(let key of keys) {
      let valueArray = this._queryStringMap.get(key)
      if(sortValues) {
        valueArray = Array.from(valueArray)
        valueArray.sort()
      }
      for(const value of valueArray) {
        if(skipEmptyValues && `${value}` === '') {
          continue
        }
        urlEncodedArray.push(this._encodeKeyValue(key, value))
      }
    }
    return urlEncodedArray.join('&')
  }
}

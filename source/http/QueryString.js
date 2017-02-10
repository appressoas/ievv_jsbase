/**
 * Query-string creator and parser.
 *
 * @example <caption>Basics - build a querystring</caption>
 * const querystring = new QueryString();
 * querystring.set('name', 'Peter');
 * querystring.setIterable('tags', ['person', 'male']);
 * const encodedQuerystring = querystring.urlencode();
 * // encodedQuerystring === 'name=Peter&tags=person&tags=male'  // order may vary
 *
 * @example <caption>Parse a querystring</caption>
 * const querystring = new QueryString('name=Peter&tags=person&tags=male');
 * const name = querystring.get('name');
 * const tags = querystring.getArray('tags');
 * const firstTag = querystring.get('tags');
 *
 * @example <caption>Parse and modify a querystring</caption>
 * const querystring = new QueryString('name=Peter&tags=person&tags=male');
 * querystring.set('name', 'John');
 * querystring.append('tags', 'important');
 * // querystring.urlencode() === 'name=John&tags=person&tags=male&tags=important'
 * querystring.setIterable('tags', ['male']);
 * // querystring.urlencode() === 'name=John&tags=male'
 */
export default class QueryString {
    /**
     *
     * @param {string} querystring Optional input querystring to parse.
     */
    constructor(querystring) {
        this._queryStringMap = new Map();
        if(typeof querystring !== 'undefined') {
            if(typeof querystring !== 'string') {
                throw new TypeError('The querystring argument must be a string.')
            }
            this._parseQueryString(querystring);
        }
    }

    /**
     * Returns ``true`` if the querystring is empty, otherwise ``false``.
     *
     * @returns {boolean}
     */
    isEmpty() {
        return this._queryStringMap.size === 0;
    }

    /**
     * Remove all keys and values from the QueryString.
     */
    clear() {
        this._queryStringMap.clear();
    }

    _parseQueryStringItem(querystringItem) {
        const splitPair = querystringItem.split('=');
        const key = decodeURIComponent(splitPair[0]);
        const value = decodeURIComponent(splitPair[1]);
        this.append(key, value);
    }

    _parseQueryString(querystring) {
        const splitQueryString = querystring.split('&');
        for(const querystringItem of splitQueryString) {
            this._parseQueryStringItem(querystringItem);
        }
    }

    _addToKey(key, value) {
        if(typeof key !== 'string') {
            throw new TypeError('All keys added to a QueryString must be strings.')
        }
        if(typeof value !== 'string') {
            throw new TypeError('All values added to a QueryString must be strings.')
        }
        this._queryStringMap.get(key).push(value);
    }

    _setKeyToEmptyArray(key) {
        this._queryStringMap.set(key, []);
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
     * const querystring = QueryString();
     * querystring.setIterable('names', ['Peter', 'Jane']);
     */
    setIterable(key, iterable) {
        this._setKeyToEmptyArray(key);
        for(const value of iterable) {
            this._addToKey(key, value);
        }
        if(this._queryStringMap.get(key).length === 0) {
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
     * const querystring = QueryString();
     * querystring.set('name', 'Peter');
     */
    set(key, value) {
        this.setIterable(key, [value]);
    }

    /**
     * Get a value.
     *
     * @param {string} key The key to get the value for.
     * @param {string} fallback An optional fallback value if the key is
     *      not in the QueryString. Defaults to ``undefined``.
     */
    get(key, fallback) {
        const value = this._queryStringMap.get(key);
        if(typeof value === 'undefined') {
            return fallback;
        } else {
            return value[0];
        }
    }

    /**
     * Append a value to a key.
     *
     * @param {string} key The key to append a value to.
     * @param {string} value The value to append.
     *
     * @example
     * const querystring = QueryString();
     * querystring.append('names', 'Jane');
     * querystring.append('names', 'Joe');
     * // querystring.urlencode() === 'names=Jane&names=Joe'
     */
    append(key, value) {
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
    getArray(key, fallback) {
        if (this._queryStringMap.has(key)) {
            const valueArray = this._queryStringMap.get(key);
            return Array.from(valueArray);
        }
        if(typeof falback !== 'undefined') {
            return [];
        }
        return fallback;
    }

    /**
     * Remove the specified key from the QueryString.
     *
     * @param {string} key The key to remove.
     */
    remove(key) {
        this._queryStringMap.delete(key);
    }

    /**
     * Check if the QueryString contains the given key.
     *
     * @param {string} key The key to check for.
     * @returns {boolean}
     */
    has(key) {
        return this._queryStringMap.has(key);
    }

    _encodeKeyValue(key, value) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }

    /**
     * Get the QueryString object as a string in query-string format.
     *
     * @example
     * const querystring = QueryString();
     * querystring.set('next', '/a&b/');
     * querystring.set('name', 'john');
     * let urlEncodedQuerystring = querystring.urlencode();
     * // urlEncodedQuerystring === 'name=john&next=%2Fa%26b%2F'  // order may vary
     */
    urlencode() {
        let urlEncodedArray = [];
        for(let [key, valueArray] of this._queryStringMap) {
            for(const value of valueArray) {
                urlEncodedArray.push(this._encodeKeyValue(key, value));
            }
        }
        return urlEncodedArray.join('&');
    }
}

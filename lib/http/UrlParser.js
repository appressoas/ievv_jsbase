'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlParser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _QueryString = require('./QueryString');

var _QueryString2 = _interopRequireDefault(_QueryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * URL parser.
 *
 * @example
 * const urlparser = new UrlParser('http://example.com/api/people?name=Jane');
 * urlparser.queryString.set('search', 'doe');
 * // urlparser.buildUrl() === 'http://example.com/api/people?name=Jane&search=doe'
 */
var UrlParser = exports.UrlParser = function () {
  _createClass(UrlParser, null, [{
    key: 'pathJoin',


    /**
     * Join URL paths.
     *
     * @example
     * UrlParser.pathJoin('/test', 'user/')  // == '/test/user/'
     * UrlParser.pathJoin('/test/', 'user/')  // == '/test/user/'
     * UrlParser.pathJoin('/test/', '/user/')  // == '/test/user/'
     * UrlParser.pathJoin('/test')  // == '/test'
     * UrlParser.pathJoin('http://example.com/test/', '/user/', 10) // == http://example.com/test/user/10
     *
     * @param firstPath The first path. Can be an URL.
     * @param paths Paths to join with the first path.
     * @returns {string} The resulting path/url after joining.
     */
    value: function pathJoin(firstPath) {
      var outputPath = firstPath;

      for (var _len = arguments.length, paths = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        paths[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var path = _step.value;

          path = '' + path;
          if (outputPath.endsWith('/')) {
            outputPath = outputPath.substring(0, outputPath.length - 1);
          }
          if (path.startsWith('/')) {
            path = path.substring(1);
          }
          outputPath = outputPath + '/' + path;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return outputPath;
    }
  }]);

  function UrlParser(url) {
    _classCallCheck(this, UrlParser);

    if (typeof url !== 'string') {
      throw new TypeError('url must be a string.');
    }
    var urlSplit = url.split('?');
    this._baseUrl = urlSplit[0];
    this._parsedBaseUrl = this._parseBaseUrl();

    /**
     * The query-string of the the URL.
     * @type {QueryString}
     */
    this.queryString = null;

    if (urlSplit.length > 1) {
      this.setQueryString(new _QueryString2.default(urlSplit[1]));
    } else {
      this.setQueryString(new _QueryString2.default());
    }
  }

  /**
   * Create a deep copy of this UrlParser object.
   *
   * @return The copy.
   */


  _createClass(UrlParser, [{
    key: 'deepCopy',
    value: function deepCopy() {
      var copy = Object.assign(Object.create(this), this);
      if (this.queryString !== null) {
        copy.queryString = this.queryString.deepCopy();
      }
      return copy;
    }
  }, {
    key: '_splitDomainAndPath',
    value: function _splitDomainAndPath(domainAndPath) {
      var split = domainAndPath.split('/');
      var domain = split.shift();
      var path = '';
      if (split.length > 0) {
        path = '/' + split.join('/');
      }
      return {
        domain: domain,
        path: path
      };
    }
  }, {
    key: '_parseBaseUrl',
    value: function _parseBaseUrl() {
      var parsedBaseUrl = {
        scheme: null,
        path: '',
        domain: null
      };
      if (this._baseUrl.match(/^[a-zA-Z0-9]+:\/\//)) {
        // We have a full URL (<scheme>://<domain><path>)
        var split = this._baseUrl.split('://');
        parsedBaseUrl.scheme = split.shift();
        var remaining = split.join('://');
        var domainAndPath = this._splitDomainAndPath(remaining);
        parsedBaseUrl.domain = domainAndPath.domain;
        parsedBaseUrl.path = domainAndPath.path;
      } else if (this._baseUrl.length > 0 && this._baseUrl.substring(0, 1) == '/') {
        // We have path only
        parsedBaseUrl.path = '' + this._baseUrl;
      } else {
        // We have domain and path, but no scheme (<domain><path>)
        var _domainAndPath = this._splitDomainAndPath(this._baseUrl);
        parsedBaseUrl.domain = _domainAndPath.domain;
        parsedBaseUrl.path = _domainAndPath.path;
      }
      return parsedBaseUrl;
    }
  }, {
    key: 'buildUrl',


    /**
     * Build the URL.
     * @returns {String} The built URL.
     */
    value: function buildUrl() {
      var url = this._baseUrl;
      if (!this.queryString.isEmpty()) {
        url = url + '?' + this.queryString.urlencode();
      }
      return url;
    }

    /**
     * Set/replace the query-string.
     *
     * @param {QueryString} queryStringObject The QueryString object
     *      to replace the current query-string with.
     *
     * @example
     * const urlparser = UrlParser('http://example.com/api/people');
     * const querystring = new QueryString();
     * querystring.set('search', 'doe');
     * urlparser.setQueryString(querystring);
     * // urlparser.buildUrl() === 'http://example.com/api/people?search=doe'
     */

  }, {
    key: 'setQueryString',
    value: function setQueryString(queryStringObject) {
      this.queryString = queryStringObject;
    }
  }, {
    key: 'scheme',
    get: function get() {
      return this._parsedBaseUrl.scheme;
    }
  }, {
    key: 'path',
    get: function get() {
      return this._parsedBaseUrl.path;
    }
  }, {
    key: 'domain',
    get: function get() {
      return this._parsedBaseUrl.domain;
    }
  }]);

  return UrlParser;
}();
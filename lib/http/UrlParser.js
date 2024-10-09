"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlParser = void 0;
var _QueryString = _interopRequireDefault(require("./QueryString"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * URL parser.
 *
 * @example
 * const urlparser = new UrlParser('http://example.com/api/people?name=Jane');
 * urlparser.queryString.set('search', 'doe');
 * // urlparser.buildUrl() === 'http://example.com/api/people?name=Jane&search=doe'
 */
var UrlParser = exports.UrlParser = /*#__PURE__*/function () {
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
      this.setQueryString(new _QueryString.default(urlSplit[1]));
    } else {
      this.setQueryString(new _QueryString.default());
    }
  }

  /**
   * Create a deep copy of this UrlParser object.
   *
   * @return The copy.
   */
  return _createClass(UrlParser, [{
    key: "deepCopy",
    value: function deepCopy() {
      var copy = Object.assign(Object.create(this), this);
      if (this.queryString !== null) {
        copy.queryString = this.queryString.deepCopy();
      }
      return copy;
    }
  }, {
    key: "_splitDomainAndPath",
    value: function _splitDomainAndPath(domainAndPath) {
      var split = domainAndPath.split('/');
      var domain = split.shift();
      var path = '';
      if (split.length > 0) {
        path = "/".concat(split.join('/'));
      }
      return {
        domain: domain,
        path: path
      };
    }
  }, {
    key: "_parseBaseUrl",
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
        parsedBaseUrl.path = "".concat(this._baseUrl);
      } else {
        // We have domain and path, but no scheme (<domain><path>)
        var _domainAndPath = this._splitDomainAndPath(this._baseUrl);
        parsedBaseUrl.domain = _domainAndPath.domain;
        parsedBaseUrl.path = _domainAndPath.path;
      }
      return parsedBaseUrl;
    }
  }, {
    key: "scheme",
    get: function get() {
      return this._parsedBaseUrl.scheme;
    }
  }, {
    key: "path",
    get: function get() {
      return this._parsedBaseUrl.path;
    }
  }, {
    key: "domain",
    get: function get() {
      return this._parsedBaseUrl.domain;
    }

    /**
     * Build the URL.
     * @returns {String} The built URL.
     */
  }, {
    key: "buildUrl",
    value: function buildUrl() {
      var url = this._baseUrl;
      if (!this.queryString.isEmpty()) {
        url = "".concat(url, "?").concat(this.queryString.urlencode());
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
    key: "setQueryString",
    value: function setQueryString(queryStringObject) {
      this.queryString = queryStringObject;
    }
  }], [{
    key: "pathJoin",
    value:
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
    function pathJoin(firstPath) {
      var outputPath = firstPath;
      for (var _len = arguments.length, paths = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        paths[_key - 1] = arguments[_key];
      }
      for (var _i = 0, _paths = paths; _i < _paths.length; _i++) {
        var path = _paths[_i];
        path = "".concat(path);
        if (outputPath.endsWith('/')) {
          outputPath = outputPath.substring(0, outputPath.length - 1);
        }
        if (path.startsWith('/')) {
          path = path.substring(1);
        }
        outputPath = "".concat(outputPath, "/").concat(path);
      }
      return outputPath;
    }
  }]);
}();
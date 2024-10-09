"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HttpCookieNotFoundError = void 0;
var _makeCustomError = _interopRequireDefault(require("../makeCustomError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Exception raised by {@link HttpCookies#getStrict} when the cookie is not found.
 *
 * @type {Error}
 */
var HttpCookieNotFoundError = exports.HttpCookieNotFoundError = (0, _makeCustomError.default)('HttpCookieNotFoundError');

/**
 * Makes working with ``document.cookie`` easy.
 *
 * @example <caption>Get a cookie named "name"</caption>
 * import HttpCookies from 'ievv_jsbase/http/HttpCookies';
 * let cookies = HttpCookies();
 * let name = cookies.get('name');
 *
 * @example <caption>Get a cookie named "pageurl", with a fallback</caption>
 * import HttpCookies from 'ievv_jsbase/http/HttpCookies';
 * let cookies = HttpCookies();
 * let name = cookies.get('pageurl', 'http://example.com');
 *
 * @example <caption>Get a cookie named "name" in strict mode</caption>
 * import HttpCookies from 'ievv_jsbase/http/HttpCookies';
 * import {HttpCookieNotFoundError} from 'ievv_jsbase/http/HttpCookies';
 * let cookies = HttpCookies();
 * try {
 *     let name = cookies.getStrict('name');
 * } catch(e) {
 *     if(e instanceof HttpCookieNotFoundError) {
 *         console.error('Cookie not found', e);
 *     } else {
 *         throw e;
 *     }
 * }
 */
var HttpCookies = exports.default = /*#__PURE__*/function () {
  /**
   * @param {string} rawCookies Raw cookies string. This is
   *      optional - it defaults to ``document.cookie``.
   */
  function HttpCookies(rawCookies) {
    _classCallCheck(this, HttpCookies);
    this.rawCookies = rawCookies || document.cookie;
    this.cookies = this.__parse();
  }
  return _createClass(HttpCookies, [{
    key: "__parse",
    value: function __parse() {
      var cookies = {};
      if (this.rawCookies && this.rawCookies !== '') {
        var cookiesArray = this.rawCookies.split(';');
        for (var i = 0; i < cookiesArray.length; i++) {
          var cookie = cookiesArray[i].trim();
          var cookieArray = cookie.split('=', 2);
          if (cookieArray.length === 2) {
            var name = cookieArray[0];
            var value = cookieArray[1];
            cookies[name.trim()] = value.trim();
          }
        }
      }
      return cookies;
    }

    /**
     * Get cookie value.
     *
     * @param {string} cookieName The name of the cookie.
     * @param fallback Fallback value if the cookie with the provided
     *      ``cookieName`` does not exist.
     *      Defaults to ``undefined``.
     * @return {string} The cookie value, or the fallback value if no cookie
     *      with the provided ``cookieName`` is found.
     */
  }, {
    key: "get",
    value: function get(cookieName, fallback) {
      var value = this.cookies[cookieName];
      if (typeof value === 'undefined') {
        return fallback;
      } else {
        return value;
      }
    }

    /**
     * Get cookie value and throw exception if it is not found.
     *
     * @param {string} cookieName The name of the cookie.
     * @returns {string} The cookie value.
     * @throws {HttpCookieNotFoundError} If no cookie named ``cookieName`` is found.
     */
  }, {
    key: "getStrict",
    value: function getStrict(cookieName) {
      var value = this.get(cookieName);
      if (typeof value === 'undefined') {
        throw new HttpCookieNotFoundError("Cookie not found: \"".concat(cookieName, "\"."));
      }
      return value;
    }

    /**
     * Check if a cookie is among the parsed cookies.
     *
     * @param {string} cookieName The name of the cookie to look for.
     * @returns {boolean} ``true`` if the cookie is among the parsed cookies.
     */
  }, {
    key: "contains",
    value: function contains(cookieName) {
      return typeof this.cookies[cookieName] !== 'undefined';
    }
  }]);
}();
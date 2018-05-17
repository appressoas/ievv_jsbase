"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HttpCookieNotFoundError = void 0;

var _makeCustomError = _interopRequireDefault(require("../makeCustomError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Exception raised by {@link HttpCookies#getStrict} when the cookie is not found.
 *
 * @type {Error}
 */
var HttpCookieNotFoundError = (0, _makeCustomError.default)('HttpCookieNotFoundError');
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

exports.HttpCookieNotFoundError = HttpCookieNotFoundError;

var HttpCookies =
/*#__PURE__*/
function () {
  /**
   * @param {string} rawCookies Raw cookies string. This is
   *      optional - it defaults to ``document.cookie``.
   */
  function HttpCookies(rawCookies) {
    _classCallCheck(this, HttpCookies);

    this.rawCookies = rawCookies || document.cookie;
    this.cookies = this.__parse();
  }

  _createClass(HttpCookies, [{
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

  return HttpCookies;
}();

exports.default = HttpCookies;
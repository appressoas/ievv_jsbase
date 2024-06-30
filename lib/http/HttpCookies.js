import makeCustomError from '../makeCustomError'

/**
 * Exception raised by {@link HttpCookies#getStrict} when the cookie is not found.
 *
 * @type {Error}
 */
export let HttpCookieNotFoundError = makeCustomError('HttpCookieNotFoundError')

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
export default class HttpCookies {
  /**
   * @param {string} rawCookies Raw cookies string. This is
   *      optional - it defaults to ``document.cookie``.
   */
  constructor (rawCookies) {
    this.rawCookies = rawCookies || document.cookie
    this.cookies = this.__parse()
  }

  __parse () {
    let cookies = {}
    if (this.rawCookies && this.rawCookies !== '') {
      let cookiesArray = this.rawCookies.split(';')
      for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim()
        let cookieArray = cookie.split('=', 2)
        if (cookieArray.length === 2) {
          let name = cookieArray[0]
          let value = cookieArray[1]
          cookies[name.trim()] = value.trim()
        }
      }
    }
    return cookies
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
  get (cookieName, fallback) {
    let value = this.cookies[cookieName]
    if (typeof value === 'undefined') {
      return fallback
    } else {
      return value
    }
  }

  /**
   * Get cookie value and throw exception if it is not found.
   *
   * @param {string} cookieName The name of the cookie.
   * @returns {string} The cookie value.
   * @throws {HttpCookieNotFoundError} If no cookie named ``cookieName`` is found.
   */
  getStrict (cookieName) {
    let value = this.get(cookieName)
    if (typeof value === 'undefined') {
      throw new HttpCookieNotFoundError(`Cookie not found: "${cookieName}".`)
    }
    return value
  }

  /**
   * Check if a cookie is among the parsed cookies.
   *
   * @param {string} cookieName The name of the cookie to look for.
   * @returns {boolean} ``true`` if the cookie is among the parsed cookies.
   */
  contains (cookieName) {
    return typeof this.cookies[cookieName] !== 'undefined'
  }
}

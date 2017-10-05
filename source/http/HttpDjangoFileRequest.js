import HttpFileRequest from './HttpFileRequest'
import HttpCookies from './HttpCookies'

/**
 * Extends HttpFileRequest with automatic handling of
 * the Django csrftoken.
 */
export default class HttpDjangoFileRequest extends HttpFileRequest {
  /**
   * @param args Same args as for {@link HttpResponse}
   */
  constructor (...args) {
    super(...args)
    this._cookies = new HttpCookies()
  }

  /**
   * Returns the value of the ``csrftoken`` cookie.
   *
   * @returns {string} Csrf token.
   */
  get csrftoken () {
    return this._cookies.getStrict('csrftoken')
  }

  /**
   * Ensures the csrftoken cookie value is automatically set in the
   * ``X-CSRFToken`` header for all request except GET and HEAD.
   *
   * @param method See {@link HttpRequest}.
   */
  setDefaultRequestHeaders (method) {
    super.setDefaultRequestHeaders(method)
    let shouldAddCsrfToken = !(method === 'GET' || method === 'HEAD')
    if (shouldAddCsrfToken) {
      this.setRequestHeader('X-CSRFToken', this.csrftoken)
    }
  }
}

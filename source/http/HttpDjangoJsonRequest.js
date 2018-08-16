import HttpJsonRequest from './HttpJsonRequest'
import HttpCookies from './HttpCookies'

/**
 * Extends {@link HttpJsonRequest} with automatic handling
 * of the Django csrftoken.
 *
 * @example <caption>Make a POST request</caption>
 * const request = new HttpDjangoJsonRequest('http://example.com/api/users/');
 * request.post({'name': 'Peter Pan', 'age': 14})
 *     .then((response) => {
 *         console.log('Success!', response.bodydata);
 *     })
 *     .catch((error) => {
 *         console.error('Error:', error.toString());
 *     });
 */
export default class HttpDjangoJsonRequest extends HttpJsonRequest {
  /**
   * @param args Same args as for {@link HttpResponse}.
   */
  constructor (...args) {
    super(...args)
    this._cookies = new HttpCookies()
  }

  /**
   * Returns the value of the ``csrftoken`` cookie.
   */
  get csrftoken () {
    return this._cookies.getStrict('csrftoken')
  }

  /**
   * Ensures the csrftoken cookie value is automatically set in
   * the ``X-CSRFToken`` header for all requests except GET and HEAD.
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

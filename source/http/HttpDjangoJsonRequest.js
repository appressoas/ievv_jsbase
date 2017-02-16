import HttpJsonRequest from "./HttpJsonRequest";
import HttpCookies from "./HttpCookies";

/**
 * Extends HttpJsonRequest with automatic handling
 * of the Django csrftoken.
 */
export default class HttpDjangoJsonRequest extends HttpJsonRequest {
  /**
   * @param args Same args as for {@link HttpResponse}.
   */
  constructor(...args) {
    super(...args);
    this._cookies = new HttpCookies();
  }

  /**
   * Returns the value of the ``csrftoken`` cookie.
   */
  get csrftoken() {
    return this._cookies.getStrict('csrftoken');
  }

  /**
   * Ensures the csrftoken cookie value is automatically set in
   * the ``X-CSRFToken`` header for all requests except GET and HEAD.
   *
   * @param method See {@link HttpRequest}.
   */
  setDefaultRequestHeaders(method) {
    super.setDefaultRequestHeaders(method);
    let shouldAddCsrfToken = !(method == 'GET' || method == 'HEAD');
    if(shouldAddCsrfToken) {
      this.setRequestHeader("X-CSRFToken", this.csrftoken);
    }
  }
}

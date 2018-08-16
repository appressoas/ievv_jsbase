import HttpResponse from './HttpResponse'

/**
 * Extends HttpResponse with extra functionality for
 * working with JSON response data.
 *
 * The most important addition is the {@link HttpJsonResponse#bodydata}
 * property that you will want to use instead of
 * {@link HttpResponse#body}.
 */
export default class HttpJsonResponse extends HttpResponse {

  /**
   * Get the response body (the responseText attribute of the XMLHttpRequest)
   * decoded from JSON.
   */
  get bodydata () {
    if (this.isConnectionRefused()) {
      return null
    } else {
      return this.__parseResponseTextAsJson()
    }
  }

  __parseResponseTextAsJson () {
    return JSON.parse(this.body)
  }

  /**
   * Overriden to make use of JSON.stringify to produce more
   * pretty output.
   */
  getPrettyfiedBody () {
    let prettyBody
    try {
      prettyBody = JSON.stringify(this.bodydata, null, 2)
    } catch (SyntaxError) {
      prettyBody = this.body
    }
    return prettyBody
  }
}

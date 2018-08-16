import makeCustomError from '../makeCustomError'

/**
 * Error class created by {@link HttpResponse#toError}.
 *
 * @type {Error}
 */
export let HttpResponseError = makeCustomError('HttpResponseError')

/**
 * HTTP response.
 *
 * Wraps a XMLHttpRequest to make it easier to get
 * information about the response from the server.
 */
export default class HttpResponse {
  /**
   *
   * @param request A XMLHttpRequest object.
   */
  constructor (request, timedOut = false) {
    this.request = request
    this.timedOut = timedOut
  }

  /**
   * Returns ``true`` if {@link HttpResponse#status} is
   * 200 or larger and less than 300.
   */
  isSuccess () {
    return this.status >= 200 && this.status < 300
  }

  /**
   * Returns ``true`` if {@link HttpResponse#status} is
   * 300 or larger and less than 400.
   */
  isRedirect () {
    return this.status >= 300 && this.status < 400
  }

  /**
   * Returns ``true`` if {@link HttpResponse#status} is
   * 400 or larger and less than 500.
   */
  isClientError () {
    return this.status >= 400 && this.status < 500
  }

  /**
   * Returns ``true`` if {@link HttpResponse#status} is
   * 500 or larger.
   */
  isServerError () {
    return this.status >= 500
  }

  /**
   * Returns ``true`` if {@link HttpResponse#status} is 0.
   * Assuming the XMLHttpRequest was actually sent, this
   * means that the connection was refused.
   */
  isConnectionRefused () {
    return this.status === 0
  }

  isTimedOut () {
    return this.timedOut
  }

  /**
   * Get the status code of the response (the status attribute of the XMLHttpRequest).
   */
  get status () {
    if (this.isTimedOut()) {
      return 0
    }
    return this.request.status
  }

  /**
   * Get the response body (the responseText attribute of the XMLHttpRequest).
   */
  get body () {
    if (this.isTimedOut()) {
      return null
    }
    return this.request.responseText
  }

  /**
   * Get the response header as string.
   */
  responseHeaderToString () {
    if (this.isTimedOut()) {
      return 'ERROR: Timed out'
    } else if (this.isConnectionRefused()) {
      return 'ERROR: Connection refused'
    } else {
      return `HTTP ${this.status}\n${this.request.getAllResponseHeaders()}`
    }
  }

  /**
   * Create a {@link HttpResponseError} from this HttpResponse.
   *
   * @returns {HttpResponseError} An HttpResponseError with this HttpResponse
   *      as the ``response`` property.
   */
  toError () {
    return new HttpResponseError(this.toString(), {
      response: this
    })
  }

  /**
   * Get {@link HttpResponse#body} pretty formatted.
   *
   * By default, this just returns {@link HttpResponse#body}
   * but subclasses can override this to prettify the body
   * if they know the output format of the body.
   */
  getPrettyfiedBody () {
    return this.body
  }

  /**
   * Format as a string suitable for debugging.
   */
  toString () {
    return `${this.responseHeaderToString()}\n\n${this.getPrettyfiedBody()}`
  }
}

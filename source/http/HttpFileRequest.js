import HttpRequest from './HttpRequest'
import HttpFileResponse from './HttpFileResponse'

/**
 * Extends HttpRequest with file request/response handling.
 */
export default class HttpFileRequest extends HttpRequest {
  /**
   * Overridden to return the response as a
   * {@link HttpFileResponse} instead of a HttpResponse.
   *
   * @returns {HttpFileResponse}
   */
  makeResponse () {
    return new HttpFileResponse(this.request)
  }

  /**
   * Overridden to ensure we send the correct content-type header for
   * file requests.
   */
  setDefaultRequestHeaders (method) {
    super.setDefaultRequestHeaders(method)
    this.setRequestHeader('Accept', 'multipart/form-data')
  }
}

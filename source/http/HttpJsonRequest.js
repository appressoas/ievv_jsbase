import HttpJsonResponse from './HttpJsonResponse'
import HttpRequest from './HttpRequest'
import ObjectManager from '../utils/ObjectManager'

/**
 * Extends {@link HttpRequest} with transparent JSON request/response handling.
 *
 * @example <caption>Make a GET request</caption>
 * const request = new HttpJsonRequest('http://example.com/api/users/')
 * request.urlParser.queryString.set('search', 'doe')
 * request.get()
 *     .then((response) => {
 *         console.log('Success!', response.bodydata)
 *     })
 *     .catch((error) => {
 *         console.error('Error:', error.toString())
 *     })
 */
export default class HttpJsonRequest extends HttpRequest {
  /**
   * Overridden to automatically convert request data to JSON.
   */
  makeRequestBody (data) {
    return JSON.stringify(data)
  }

  /**
   * Overridden to return the response as a
   * {@link HttpJsonResponse} instead if a HttpResponse.
   *
   * @returns {HttpJsonResponse}
   */
  makeResponse () {
    return new HttpJsonResponse(this.request)
  }

  /**
   * Overridden to ensure we send the correct content-type header for
   * json requests.
   */
  setDefaultRequestHeaders (method) {
    super.setDefaultRequestHeaders(method)
    this.setRequestHeader('Accept', 'application/json')
    this.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
  }

  /**
   * Shortcut for getting all pagination pages and resolve an array
   * of the results for all pages.
   *
   * Assumes your API uses pagination where the ``next`` page is returned as
   * an URL, and that the results for each pagination page is an array.
   *
   * The first page retrived is whatever this request is configured for,
   * so you can use this to do things like request pagination page 10 -> 20,
   * just ensure the request is configured so that the page that would have
   * been retrieved if you just used ``get()`` would have been page 10.
   *
   * @param {number} maxPages The max number of pages to load. If this is ``null``
   *    (the default) we load all pages until the ``nextUrlAttribute`` value is ``null``
   *    or ``undefined``.
   * @param {string} resultsAttribute The attribute in the response data that
   *    contains the results array. Defaults to ``results``.
   * @param {string} nextUrlAttribute The attribute in the response data that
   *    contains the URL of the next pagination page. Defaults to ``next``.
   * @returns {Promise<any>}
   */
  getAllPaginationPages (maxPages = null, resultsAttribute = 'results', nextUrlAttribute = 'next') {
    return new Promise((resolve, reject) => {
      const results = []
      let loadedPageCount = 0
      const recursiveLoadAllPagesFromApi = (request) => {
        request.get()
          .then((response) => {
            results.push(...response.bodydata[resultsAttribute])
            loadedPageCount += 1
            let hasMaxPageCount = maxPages !== null && loadedPageCount >= maxPages
            if (!hasMaxPageCount && ObjectManager.validate(response, 'bodydata', nextUrlAttribute)) {
              const nextRequest = request.deepCopy()
              nextRequest.setUrl(response.bodydata.next)
              recursiveLoadAllPagesFromApi(nextRequest)
            } else {
              resolve(results)
            }
          })
          .catch((error) => {
            reject(error)
          })
      }
      recursiveLoadAllPagesFromApi(this)
    })
  }
}

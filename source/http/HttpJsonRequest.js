import HttpJsonResponse from "./HttpJsonResponse";
import HttpRequest from "./HttpRequest";


/**
 * Extends {@link HttpRequest} with transparent JSON request/response handling.
 *
 * @example <caption>Make a GET request</caption>
 * const request = new JsonHttpRequest('http://example.com/api/users/');
 * request.urlParser.queryString.set('search', 'doe');
 * request.get()
 *     .then((response) => {
 *         console.log('Success!', response.bodydata);
 *     })
 *     .catch((error) => {
 *         console.error('Error:', error.toString());
 *     });
 */
export default class JsonHttpRequest extends HttpRequest {
    /**
     * Overridden to automatically convert request data to JSON.
     */
    makeRequestBody(data) {
        return JSON.stringify(data);
    }

    /**
     * Overridden to return the response as a
     * {@link HttpJsonResponse} instead if a HttpResponse.
     *
     * @returns {HttpJsonResponse}
     */
    makeResponse() {
        return new HttpJsonResponse(this.request);
    }

    /**
     * Overridden to ensure we send the correct content-type header for
     * json requests.
     */
    setDefaultRequestHeaders(method) {
        super.setDefaultRequestHeaders(method);
        this.setRequestHeader('Accept', 'application/json');
        this.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    }
}

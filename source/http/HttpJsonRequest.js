import HttpJsonResponse from "./HttpJsonResponse";
import HttpRequest from "./HttpRequest";


/**
 * Extends HttpRequest with transparent JSON request/response handling.
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

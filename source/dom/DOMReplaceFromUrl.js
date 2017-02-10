import DOMReplace from "./DOMReplace";
import HttpRequest from "../http/HttpRequest";


/**
 * Extends {@link DOMReplace} adn change the methods to
 * replace by making a request to the server.
 */
export default class DOMReplaceFromUrl extends DOMReplace {
    _makeRequest(url) {
        return new HttpRequest(url);
    }

    extractHtmlStringFromResponse(response) {
        return response.body;
    }

    _replaceFromUrl(url, callback) {
        return new Promise((resolve, reject) => {
            let request = this._makeRequest(url);
            request.get().then((response) => {
                let htmlString = this.extractHtmlStringFromResponse(response);
                callback(htmlString);
                resolve(htmlString, response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    /**
     * Replace innerHTML of the element with data from a GET request
     * to an URL.
     *
     * The actual replace of the innerHTML is done using
     * {@link DOMReplace#replaceInnerHtml}.
     *
     * @param {string} url The URL to get the HTML from.
     * @return {Promise} A promise. The resolve callback is called
     *      with the html string as first argument and the {@link HttpResponse}
     *      as the second argument. The reject callback is called with
     *      one argument - the {@link HttpResponse}.
     */
    replaceInnerHtml(url) {
        return this._replaceFromUrl(url, (htmlString) => {
            super.replaceInnerHtml(htmlString);
        });
    }


    /**
     * Append to the innerHTML of the element with data from a GET request
     * to an URL.
     *
     * The actual append of the innerHTML is done using
     * {@link DOMReplace#appendInnerHtml}.
     *
     * @param {string} url The URL to get the HTML from.
     * @return {Promise} A promise. The resolve callback is called
     *      with the html string as first argument and the {@link HttpResponse}
     *      as the second argument. The reject callback is called with
     *      one argument - the {@link HttpResponse}.
     */
    appendInnerHtml(url) {
        return this._replaceFromUrl(url, (htmlString) => {
            super.appendInnerHtml(htmlString);
        });
    }

    /**
     * Prepend to the innerHTML of the element with data from a GET request
     * to an URL.
     *
     * The actual prepend of the innerHTML is done using
     * {@link DOMReplace#prependInnerHtml}.
     *
     * @param {string} url The URL to get the HTML from.
     * @return {Promise} A promise. The resolve callback is called
     *      with the html string as first argument and the {@link HttpResponse}
     *      as the second argument. The reject callback is called with
     *      one argument - the {@link HttpResponse}.
     */
    prependInnerHtml(url) {
        return this._replaceFromUrl(url, (htmlString) => {
            super.prependInnerHtml(htmlString);
        });
    }
}

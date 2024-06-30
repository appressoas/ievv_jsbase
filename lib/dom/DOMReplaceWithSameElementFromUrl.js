import DOMReplaceFromUrl from "./DOMReplaceFromUrl";
import HtmlParser from "./HtmlParser";


/**
 * Extends {@link DOMReplaceFromUrl} to replace the element
 * with the same element from the server response.
 *
 * This is intended to be used if you request a full page from the
 * server to replace a single element in your document.
 *
 * ## Example
 * Lets say you have a ``/pages/test`` that produce the following HTML:
 *
 * ```
 * <html>
 *     <body>
 *         <div id="id_something">
 *             Initial data.
 *         </div>
 *     </body>
 * </html>
 * ```
 *
 * And you would like to replace the current content of the ``id_something`` element
 * with updated data from the server:
 *
 * ```
 * let domReplace = new DOMReplaceWithSameElementFromUrl('id_something');
 * domReplace.replaceInnerHtml('/pages/test')
 *     .then((htmlString, response) => {
 *        console.log(
 *            `successfully replaced the current content of id_something with: ${htmlString}`);
 *        console.log(`The full response from the server was: ${response.toString()}`);
 *     })
 *     .catch((error) => {
 *        console.error(`An error occurred: ${error.toString()}`);
 *     });
 * ```
 */
export default class DOMReplaceWithSameElementFromUrl extends DOMReplaceFromUrl {
    /**
     * Overridden to extract the innerHTML of the element
     * with ID matching {@link DOMReplaceWithSameElementFromUrl.elementId}.
     *
     * @param response See {@link DOMReplaceFromUrl#extractHtmlStringFromResponse}
     * @returns {string} The extracted HTML string.
     */
    extractHtmlStringFromResponse(response) {
        let htmlParser = new HtmlParser(response.body);
        let serverElement = htmlParser.querySelector(`#${this.elementId}`);
        return serverElement.innerHTML.trim();
    }
}

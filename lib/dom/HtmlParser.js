/**
 * HTML parser.
 *
 * Takes a HTML string, creates a temporary DOM document,
 * sets the HTML as innerHTML of the body of the temporary
 * document, and provides methods for extracting elements
 * from the temporary document.
 *
 * @example <caption>Parse a single html element and get the Element</caption>
 * let htmlParser = new HtmlParser('<div>Test</div>');
 * let divElement = htmlParser.firstRootElement;
 *
 * @example <caption>Parse multiple html elements</caption>
 * let htmlParser = new HtmlParser('<div>Test</div><p>Test 2</p>');
 * let elements = htmlParser.rootElements;
 *
 * @example <caption>Parse multiple html elements and query them</caption>
 * let htmlParser = new HtmlParser('<div>Test</div><p>Test 2</p>');
 * let elements = htmlParser.rootElements;
 *
 * @example <caption>Parse multiple html elements and query them</caption>
 * let htmlParser = new HtmlParser('<p>Test P 1</p><div>Test DIV</div><p>Test P 2</p>');
 * let divElement = htmlParser.querySelector('div');
 * let pElements = htmlParser.querySelectorAll('p');
 *
 * @example <caption>Parse a full HTML document</caption>
 * let htmlParser = new HtmlParser('<html><body><p>Test</p></body></html>');
 * let pElement = htmlParser.firstRootElement;
 */
export default class HtmlParser {
    /**
     *
     * @param {string} htmlString The HTML string to parse.
     */
    constructor(htmlString) {
        this._tempDocumentBody = this._parseHtml(htmlString);
    }

    _parseHtml(htmlString) {
        var tempDocument = document.implementation.createHTMLDocument();
        tempDocument.body.innerHTML = htmlString;
        return tempDocument.body;
    }

    /**
     * Get the root elements of the parsed document.
     *
     * @returns {HTMLCollection}
     */
    get rootElements() {
        return this._tempDocumentBody.children;
    }

    /**
     * Get the first root element of the parsed document.
     *
     * @returns {null|Element}
     */
    get firstRootElement() {
        return this.rootElements[0];
    }

    /**
     * Query the body element of the parsed document
     * using Element.querySelector.
     *
     * @param {string} query The query.
     * @returns {null|Element}
     */
    querySelector(query) {
        return this._tempDocumentBody.querySelector(query);
    }

    /**
     * Query the body element of the parsed document
     * using Element.querySelectorAll.
     *
     * @param {string} query The query.
     * @returns {NodeList}
     */
    querySelectorAll(query) {
        return Array.from(this._tempDocumentBody.querySelectorAll(query));
    }
}

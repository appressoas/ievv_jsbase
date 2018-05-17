"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var HtmlParser =
/*#__PURE__*/
function () {
  /**
   *
   * @param {string} htmlString The HTML string to parse.
   */
  function HtmlParser(htmlString) {
    _classCallCheck(this, HtmlParser);

    this._tempDocumentBody = this._parseHtml(htmlString);
  }

  _createClass(HtmlParser, [{
    key: "_parseHtml",
    value: function _parseHtml(htmlString) {
      var tempDocument = document.implementation.createHTMLDocument();
      tempDocument.body.innerHTML = htmlString;
      return tempDocument.body;
    }
    /**
     * Get the root elements of the parsed document.
     *
     * @returns {HTMLCollection}
     */

  }, {
    key: "querySelector",

    /**
     * Query the body element of the parsed document
     * using Element.querySelector.
     *
     * @param {string} query The query.
     * @returns {null|Element}
     */
    value: function querySelector(query) {
      return this._tempDocumentBody.querySelector(query);
    }
    /**
     * Query the body element of the parsed document
     * using Element.querySelectorAll.
     *
     * @param {string} query The query.
     * @returns {NodeList}
     */

  }, {
    key: "querySelectorAll",
    value: function querySelectorAll(query) {
      return Array.from(this._tempDocumentBody.querySelectorAll(query));
    }
  }, {
    key: "rootElements",
    get: function get() {
      return this._tempDocumentBody.children;
    }
    /**
     * Get the first root element of the parsed document.
     *
     * @returns {null|Element}
     */

  }, {
    key: "firstRootElement",
    get: function get() {
      return this.rootElements[0];
    }
  }]);

  return HtmlParser;
}();

exports.default = HtmlParser;
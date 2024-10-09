"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var HtmlParser = exports.default = /*#__PURE__*/function () {
  /**
   *
   * @param {string} htmlString The HTML string to parse.
   */
  function HtmlParser(htmlString) {
    _classCallCheck(this, HtmlParser);
    this._tempDocumentBody = this._parseHtml(htmlString);
  }
  return _createClass(HtmlParser, [{
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

    /**
     * Query the body element of the parsed document
     * using Element.querySelector.
     *
     * @param {string} query The query.
     * @returns {null|Element}
     */
  }, {
    key: "querySelector",
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
  }]);
}();
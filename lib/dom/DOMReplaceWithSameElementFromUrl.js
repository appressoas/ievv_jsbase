"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DOMReplaceFromUrl2 = _interopRequireDefault(require("./DOMReplaceFromUrl"));

var _HtmlParser = _interopRequireDefault(require("./HtmlParser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
var DOMReplaceWithSameElementFromUrl =
/*#__PURE__*/
function (_DOMReplaceFromUrl) {
  _inherits(DOMReplaceWithSameElementFromUrl, _DOMReplaceFromUrl);

  function DOMReplaceWithSameElementFromUrl() {
    _classCallCheck(this, DOMReplaceWithSameElementFromUrl);

    return _possibleConstructorReturn(this, _getPrototypeOf(DOMReplaceWithSameElementFromUrl).apply(this, arguments));
  }

  _createClass(DOMReplaceWithSameElementFromUrl, [{
    key: "extractHtmlStringFromResponse",

    /**
     * Overridden to extract the innerHTML of the element
     * with ID matching {@link DOMReplaceWithSameElementFromUrl.elementId}.
     *
     * @param response See {@link DOMReplaceFromUrl#extractHtmlStringFromResponse}
     * @returns {string} The extracted HTML string.
     */
    value: function extractHtmlStringFromResponse(response) {
      var htmlParser = new _HtmlParser.default(response.body);
      var serverElement = htmlParser.querySelector("#".concat(this.elementId));
      return serverElement.innerHTML.trim();
    }
  }]);

  return DOMReplaceWithSameElementFromUrl;
}(_DOMReplaceFromUrl2.default);

exports.default = DOMReplaceWithSameElementFromUrl;
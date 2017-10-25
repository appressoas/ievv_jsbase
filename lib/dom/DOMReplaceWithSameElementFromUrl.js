"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DOMReplaceFromUrl2 = require("./DOMReplaceFromUrl");

var _DOMReplaceFromUrl3 = _interopRequireDefault(_DOMReplaceFromUrl2);

var _HtmlParser = require("./HtmlParser");

var _HtmlParser2 = _interopRequireDefault(_HtmlParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var DOMReplaceWithSameElementFromUrl = function (_DOMReplaceFromUrl) {
  _inherits(DOMReplaceWithSameElementFromUrl, _DOMReplaceFromUrl);

  function DOMReplaceWithSameElementFromUrl() {
    _classCallCheck(this, DOMReplaceWithSameElementFromUrl);

    return _possibleConstructorReturn(this, (DOMReplaceWithSameElementFromUrl.__proto__ || Object.getPrototypeOf(DOMReplaceWithSameElementFromUrl)).apply(this, arguments));
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
      var htmlParser = new _HtmlParser2.default(response.body);
      var serverElement = htmlParser.querySelector("#" + this.elementId);
      return serverElement.innerHTML.trim();
    }
  }]);

  return DOMReplaceWithSameElementFromUrl;
}(_DOMReplaceFromUrl3.default);

exports.default = DOMReplaceWithSameElementFromUrl;
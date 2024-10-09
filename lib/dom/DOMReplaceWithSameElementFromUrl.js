"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DOMReplaceFromUrl2 = _interopRequireDefault(require("./DOMReplaceFromUrl"));
var _HtmlParser = _interopRequireDefault(require("./HtmlParser"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
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
var DOMReplaceWithSameElementFromUrl = exports.default = /*#__PURE__*/function (_DOMReplaceFromUrl) {
  function DOMReplaceWithSameElementFromUrl() {
    _classCallCheck(this, DOMReplaceWithSameElementFromUrl);
    return _callSuper(this, DOMReplaceWithSameElementFromUrl, arguments);
  }
  _inherits(DOMReplaceWithSameElementFromUrl, _DOMReplaceFromUrl);
  return _createClass(DOMReplaceWithSameElementFromUrl, [{
    key: "extractHtmlStringFromResponse",
    value:
    /**
     * Overridden to extract the innerHTML of the element
     * with ID matching {@link DOMReplaceWithSameElementFromUrl.elementId}.
     *
     * @param response See {@link DOMReplaceFromUrl#extractHtmlStringFromResponse}
     * @returns {string} The extracted HTML string.
     */
    function extractHtmlStringFromResponse(response) {
      var htmlParser = new _HtmlParser.default(response.body);
      var serverElement = htmlParser.querySelector("#".concat(this.elementId));
      return serverElement.innerHTML.trim();
    }
  }]);
}(_DOMReplaceFromUrl2.default);
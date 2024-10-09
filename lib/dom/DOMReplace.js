"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _SignalHandlerSingleton = _interopRequireDefault(require("../SignalHandlerSingleton"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * DOM replacer that is mainly intended for DOM replace
 * where some other components may need to know about
 * the change to the DOM.
 *
 * All the methods send out a signal via {@link SignalHandlerSingleton}
 * when they make changes to the DOM.
 */
var DOMReplace = exports.default = /*#__PURE__*/function () {
  /**
   * @param {string} elementId The ID of the element to replace.
   */
  function DOMReplace(elementId) {
    _classCallCheck(this, DOMReplace);
    /**
     * The element DOM ID.
     *
     * @type {string}
     */
    this.elementId = elementId;

    /**
     * The DOM element.
     *
     * @type {Element}
     */
    this.element = document.getElementById(elementId);
  }

  /**
   * Replace innerHTML of the element.
   *
   * Sends a signal named ``ievv_jsbase.DOMReplace.replaceInnerHtml``
   * when the replace is done. The signal is send with this object
   * as the data.
   *
   * @param {string} htmlString The HTML to set as innerHTML of the element.
   */
  return _createClass(DOMReplace, [{
    key: "replaceInnerHtml",
    value: function replaceInnerHtml(htmlString) {
      this.element.innerHTML = htmlString;
      var signalHandler = new _SignalHandlerSingleton.default();
      signalHandler.send('ievv_jsbase.DOMReplace.replaceInnerHtml', this);
    }

    /**
     * Append innerHTML to the element.
     *
     * Sends a signal named ``ievv_jsbase.DOMReplace.appendInnerHtml``
     * when the append is done. The signal is send with this object
     * as the data.
     *
     * @param {string} htmlString The HTML to append to the innerHTML of the element.
     */
  }, {
    key: "appendInnerHtml",
    value: function appendInnerHtml(htmlString) {
      this.element.innerHTML = this.element.innerHTML + htmlString;
      var signalHandler = new _SignalHandlerSingleton.default();
      signalHandler.send('ievv_jsbase.DOMReplace.appendInnerHtml', this);
    }

    /**
     * Prepend innerHTML to the element.
     *
     * Sends a signal named ``ievv_jsbase.DOMReplace.prependInnerHtml``
     * when the prepend is done. The signal is send with this object
     * as the data.
     *
     * @param {string} htmlString The HTML to prepend to the innerHTML of the element.
     */
  }, {
    key: "prependInnerHtml",
    value: function prependInnerHtml(htmlString) {
      this.element.innerHTML = htmlString + this.element.innerHTML;
      var signalHandler = new _SignalHandlerSingleton.default();
      signalHandler.send('ievv_jsbase.DOMReplace.prependInnerHtml', this);
    }
  }]);
}();
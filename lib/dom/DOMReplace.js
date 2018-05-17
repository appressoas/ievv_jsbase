"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SignalHandlerSingleton = _interopRequireDefault(require("../SignalHandlerSingleton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * DOM replacer that is mainly intended for DOM replace
 * where some other components may need to know about
 * the change to the DOM.
 *
 * All the methods send out a signal via {@link SignalHandlerSingleton}
 * when they make changes to the DOM.
 */
var DOMReplace =
/*#__PURE__*/
function () {
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


  _createClass(DOMReplace, [{
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

  return DOMReplace;
}();

exports.default = DOMReplace;
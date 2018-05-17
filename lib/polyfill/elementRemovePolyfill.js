"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = elementRemovePolyfill;

/**
 * Element.remove() polyfill for IE11 compatibility
 */
function elementRemovePolyfill() {
  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }
}
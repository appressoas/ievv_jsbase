/**
 * Element.remove() polyfill for IE11 compatibility
 */
export default function elementRemovePolyfill() {
    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }
}

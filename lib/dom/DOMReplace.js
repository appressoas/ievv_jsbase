import SignalHandlerSingleton from "../SignalHandlerSingleton";

/**
 * DOM replacer that is mainly intended for DOM replace
 * where some other components may need to know about
 * the change to the DOM.
 *
 * All the methods send out a signal via {@link SignalHandlerSingleton}
 * when they make changes to the DOM.
 */
export default class DOMReplace {
    /**
     * @param {string} elementId The ID of the element to replace.
     */
    constructor(elementId) {
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
    replaceInnerHtml(htmlString) {
        this.element.innerHTML = htmlString;
        let signalHandler = new SignalHandlerSingleton();
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
    appendInnerHtml(htmlString) {
        this.element.innerHTML = this.element.innerHTML + htmlString;
        let signalHandler = new SignalHandlerSingleton();
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
    prependInnerHtml(htmlString) {
        this.element.innerHTML = htmlString + this.element.innerHTML;
        let signalHandler = new SignalHandlerSingleton();
        signalHandler.send('ievv_jsbase.DOMReplace.prependInnerHtml', this);
    }
}

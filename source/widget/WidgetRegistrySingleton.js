import makeCustomError from "../makeCustomError";

/**
 * The instance of the {@link WidgetRegistrySingleton}.
 */
let _instance = null;


/**
 * Exception thrown when an element where we expect the
 * ``data-ievv-jsbase-widget-instanceid`` attribute does
 * not have this attribute.
 *
 * @type {Error}
 */
export let ElementHasNoWidgetInstanceIdError = makeCustomError('ElementHasNoWidgetInstanceIdError');


/**
 * Exception thrown when an element that we expect to have
 * the ``data-ievv-jsbase-widget`` attribute does not have
 * this attribute.
 *
 * @type {Error}
 */
export let ElementIsNotWidgetError = makeCustomError('ElementIsNotWidgetError');


/**
 * Exception thrown when an element has a
 * ``data-ievv-jsbase-widget`` with a value that
 * is not an alias registered in the {@link WidgetRegistrySingleton}.
 *
 * @type {Error}
 */
export let InvalidWidgetAliasError = makeCustomError('InvalidWidgetAliasError');


/**
 * Exception thrown when an element with the
 * ``data-ievv-jsbase-widget-instanceid=<widgetInstanceId>`` attribute is not in
 * the {@link WidgetRegistrySingleton} with ``<widgetInstanceId>``.
 *
 * @type {Error}
 */
export let ElementIsNotInitializedAsWidget = makeCustomError('ElementIsNotInitializedAsWidget');


/**
 * A very lightweight widget system.
 *
 * Basic example below - see {@link AbstractWidget} for more examples.
 *
 * @example <caption>Create a very simple widget</caption>
 * export default class OpenMenuWidget extends AbstractWidget {
 *     constructor(element) {
 *          super(element);
 *          this._onClickBound = (...args) => {
 *              this._onClick(...args);
 *          };
 *          this.element.addEventListener('click', this._onClickBound);
 *     }
 *
 *     _onClick = (e) => {
 *          e.preventDefault();
 *          console.log('I should have opened the menu here');
 *     }
 *
 *     destroy() {
 *          this.element.removeEventListener('click', this._onClickBound);
 *     }
 * }
 *
 * @example <caption>Use the widget</caption>
 * <button data-ievv-jsbase-widget="open-menu-button" type="button">
 *     Open menu
 * </button>
 *
 * @example <caption>Register and load widgets</caption>
 * // Somewhere that is called after all the widgets are rendered
 * // - typically at the end of the <body>
 * import WidgetRegistrySingleton from 'ievv_jsbase/widget/WidgetRegistrySingleton';
 * import OpenMenuWidget from 'path/to/OpenMenuWidget';
 * const widgetRegistry = new WidgetRegistrySingleton();
 * widgetRegistry.registerWidgetClass('open-menu-button', OpenMenuWidget);
 * widgetRegistry.initializeAllWidgetsWithinElement(document.body);
 *
 */
export default class WidgetRegistrySingleton {
    constructor() {
        if (!_instance) {
            _instance = this;
            this._initialize();
        }
        return _instance;
    }

    _initialize() {
        this._widgetAttribute = 'data-ievv-jsbase-widget';
        this._widgetInstanceIdAttribute = 'data-ievv-jsbase-widget-instanceid';
        this._widgetClassMap = new Map();
        this._widgetInstanceMap = new Map();
        this._widgetInstanceCounter = 0;
    }

    clear() {
        // TODO: Call destroyAllWidgetsWithinDocumentBody()
        this._widgetClassMap.clear();
        this._widgetInstanceMap.clear();
        this._widgetInstanceCounter = 0;
    }

    /**
     * Register a widget class in the registry.
     *
     * @param {string} alias The alias for the widget. This is the string that
     *      is used as the attribute value with the ``data-ievv-jsbase-widget``
     *      DOM element attribute.
     * @param {AbstractWidget} WidgetClass The widget class.
     */
    registerWidgetClass(alias, WidgetClass) {
        this._widgetClassMap.set(alias, WidgetClass);
    }

    /**
     * Remove widget class from registry.
     *
     * @param alias The alias that the widget class was registered with
     *      by using {@link WidgetRegistrySingleton#registerWidgetClass}.
     */
    removeWidgetClass(alias) {
        this._widgetClassMap.delete(alias);
    }

    /**
     * Initialize the provided element as a widget.
     *
     * @param {Element} element The DOM element to initalize as a widget.
     *
     * @throws {ElementIsNotWidgetError} If the element does not have
     *      the ``data-ievv-jsbase-widget`` attribute.
     * @throws {InvalidWidgetAliasError} If the widget alias is not in this registry.
     */
    initializeWidget(element) {
        let alias = element.getAttribute(this._widgetAttribute);
        if(!alias) {
            throw new ElementIsNotWidgetError(
                `The\n\n${element.outerHTML}\n\nelement has no or empty` +
                `${this._widgetAttribute} attribute.`);
        }
        if(!this._widgetClassMap.has(alias)) {
            throw new InvalidWidgetAliasError(`No WidgetClass registered with the "${alias}" alias.`);
        }
        let WidgetClass = this._widgetClassMap.get(alias);
        this._widgetInstanceCounter ++;
        let widgetInstanceId = this._widgetInstanceCounter.toString();
        let widget = new WidgetClass(element, widgetInstanceId);
        this._widgetInstanceMap.set(widgetInstanceId, widget);
        element.setAttribute(this._widgetInstanceIdAttribute, widgetInstanceId);
        return widget;
    }

    _getAllWidgetElementsWithinElement(element) {
        return Array.from(element.querySelectorAll(`[${this._widgetAttribute}]`));
    }

    /**
     * Initialize all widgets within the provided element.
     *
     * @param {Element} element A DOM element.
     */
    initializeAllWidgetsWithinElement(element) {
        const afterInitializeAllWidgets = [];
        for(let widgetElement of this._getAllWidgetElementsWithinElement(element)) {
            let widget = this.initializeWidget(widgetElement);
            if(widget.useAfterInitializeAllWidgets()) {
                afterInitializeAllWidgets.push(widget);
            }
        }
        for(let widget of afterInitializeAllWidgets) {
            widget.afterInitializeAllWidgets();
        }
    }

    /**
     * Get the value of the ``data-ievv-jsbase-widget-instanceid`` attribute
     * of the provided element.
     *
     * @param {Element} element A DOM element.
     * @returns {null|string}
     */
    getWidgetInstanceIdFromElement(element) {
        return element.getAttribute(this._widgetInstanceIdAttribute);
    }

    /**
     * Get a widget instance by its widget instance id.
     *
     * @param widgetInstanceId A widget instance id.
     * @returns {AbstractWidget} A widget instance or ``null``.
     */
    getWidgetInstanceByInstanceId(widgetInstanceId) {
        return this._widgetInstanceMap.get(widgetInstanceId);
    }

    getWidgetInstanceFromElement(element) {
        let widgetInstanceId = this.getWidgetInstanceIdFromElement(element);
        if(widgetInstanceId) {
            let widgetInstance = this.getWidgetInstanceByInstanceId(widgetInstanceId);
            if(widgetInstance) {
                return widgetInstance;
            } else {
                throw new ElementIsNotInitializedAsWidget(
                    `Element\n\n${element.outerHTML}\n\nhas the ` +
                    `${this._widgetInstanceIdAttribute} attribute, but the id is ` +
                    `not in the widget registry.`);
            }
        } else {
            throw new ElementHasNoWidgetInstanceIdError(
                `Element\n\n${element.outerHTML}\n\nhas no or empty ` +
                `${this._widgetInstanceIdAttribute} attribute.`);
        }
    }

    /**
     * Destroy the widget on the provided element.
     *
     * @param {Element} element A DOM element that has been initialized by
     *      {@link WidgetRegistrySingleton#initializeWidget}.
     *
     * @throws {ElementHasNoWidgetInstanceIdError} If the element has
     *      no ``data-ievv-jsbase-widget-instanceid`` attribute or the
     *      attribute value is empty. This normally means that
     *      the element is not a widget, or that the widget
     *      is not initialized.
     * @throws {ElementIsNotInitializedAsWidget} If the element
     *      has the ``data-ievv-jsbase-widget-instanceid`` attribute
     *      but the value of the attribute is not a valid widget instance
     *      id. This should not happen unless you manipulate the
     *      attribute manually or use the private members of this registry.
     */
    destroyWidget(element) {
        let widgetInstanceId = this.getWidgetInstanceIdFromElement(element);
        if(widgetInstanceId) {
            let widgetInstance = this.getWidgetInstanceByInstanceId(widgetInstanceId);
            if(widgetInstance) {
                widgetInstance.destroy();
                this._widgetInstanceMap.delete(widgetInstanceId);
                element.removeAttribute(this._widgetInstanceIdAttribute);
            } else {
                throw new ElementIsNotInitializedAsWidget(
                    `Element\n\n${element.outerHTML}\n\nhas the ` +
                    `${this._widgetInstanceIdAttribute} attribute, but the id is ` +
                    `not in the widget registry.`);
                }
        } else {
            throw new ElementHasNoWidgetInstanceIdError(
                `Element\n\n${element.outerHTML}\n\nhas no or empty ` +
                `${this._widgetInstanceIdAttribute} attribute.`);
        }
    }

    _getAllInstanciatedWidgetElementsWithinElement(element) {
        return Array.from(element.querySelectorAll(`[${this._widgetInstanceIdAttribute}]`));
    }

    /**
     * Destroy all widgets within the provided element.
     * Only destroys widgets on elements that is a child of the element.
     *
     * @param {Element} element The DOM Element.
     */
    destroyAllWidgetsWithinElement(element) {
        for(let widgetElement of this._getAllInstanciatedWidgetElementsWithinElement(element)) {
            this.destroyWidget(widgetElement);
        }
    }
}

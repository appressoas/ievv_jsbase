"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ElementIsNotInitializedAsWidget = exports.InvalidWidgetAliasError = exports.ElementIsNotWidgetError = exports.ElementHasNoWidgetInstanceIdError = void 0;

var _makeCustomError = _interopRequireDefault(require("../makeCustomError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The instance of the {@link WidgetRegistrySingleton}.
 */
var _instance = null;
/**
 * Exception thrown when an element where we expect the
 * ``data-ievv-jsbase-widget-instanceid`` attribute does
 * not have this attribute.
 *
 * @type {Error}
 */

var ElementHasNoWidgetInstanceIdError = (0, _makeCustomError.default)('ElementHasNoWidgetInstanceIdError');
/**
 * Exception thrown when an element that we expect to have
 * the ``data-ievv-jsbase-widget`` attribute does not have
 * this attribute.
 *
 * @type {Error}
 */

exports.ElementHasNoWidgetInstanceIdError = ElementHasNoWidgetInstanceIdError;
var ElementIsNotWidgetError = (0, _makeCustomError.default)('ElementIsNotWidgetError');
/**
 * Exception thrown when an element has a
 * ``data-ievv-jsbase-widget`` with a value that
 * is not an alias registered in the {@link WidgetRegistrySingleton}.
 *
 * @type {Error}
 */

exports.ElementIsNotWidgetError = ElementIsNotWidgetError;
var InvalidWidgetAliasError = (0, _makeCustomError.default)('InvalidWidgetAliasError');
/**
 * Exception thrown when an element with the
 * ``data-ievv-jsbase-widget-instanceid=<widgetInstanceId>`` attribute is not in
 * the {@link WidgetRegistrySingleton} with ``<widgetInstanceId>``.
 *
 * @type {Error}
 */

exports.InvalidWidgetAliasError = InvalidWidgetAliasError;
var ElementIsNotInitializedAsWidget = (0, _makeCustomError.default)('ElementIsNotInitializedAsWidget');
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

exports.ElementIsNotInitializedAsWidget = ElementIsNotInitializedAsWidget;

var WidgetRegistrySingleton =
/*#__PURE__*/
function () {
  function WidgetRegistrySingleton() {
    _classCallCheck(this, WidgetRegistrySingleton);

    if (!_instance) {
      _instance = this;

      this._initialize();
    }

    return _instance;
  }

  _createClass(WidgetRegistrySingleton, [{
    key: "_initialize",
    value: function _initialize() {
      this._widgetAttribute = 'data-ievv-jsbase-widget';
      this._widgetInstanceIdAttribute = 'data-ievv-jsbase-widget-instanceid';
      this._widgetClassMap = new Map();
      this._widgetInstanceMap = new Map();
      this._widgetInstanceCounter = 0;
    }
  }, {
    key: "clear",
    value: function clear() {
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

  }, {
    key: "registerWidgetClass",
    value: function registerWidgetClass(alias, WidgetClass) {
      this._widgetClassMap.set(alias, WidgetClass);
    }
    /**
     * Remove widget class from registry.
     *
     * @param alias The alias that the widget class was registered with
     *      by using {@link WidgetRegistrySingleton#registerWidgetClass}.
     */

  }, {
    key: "removeWidgetClass",
    value: function removeWidgetClass(alias) {
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

  }, {
    key: "initializeWidget",
    value: function initializeWidget(element) {
      var alias = element.getAttribute(this._widgetAttribute);

      if (!alias) {
        throw new ElementIsNotWidgetError("The\n\n".concat(element.outerHTML, "\n\nelement has no or empty") + "".concat(this._widgetAttribute, " attribute."));
      }

      if (!this._widgetClassMap.has(alias)) {
        throw new InvalidWidgetAliasError("No WidgetClass registered with the \"".concat(alias, "\" alias."));
      }

      var WidgetClass = this._widgetClassMap.get(alias);

      this._widgetInstanceCounter++;

      var widgetInstanceId = this._widgetInstanceCounter.toString();

      var widget = new WidgetClass(element, widgetInstanceId);

      this._widgetInstanceMap.set(widgetInstanceId, widget);

      element.setAttribute(this._widgetInstanceIdAttribute, widgetInstanceId);
      return widget;
    }
  }, {
    key: "_getAllWidgetElementsWithinElement",
    value: function _getAllWidgetElementsWithinElement(element) {
      return Array.from(element.querySelectorAll("[".concat(this._widgetAttribute, "]")));
    }
    /**
     * Initialize all widgets within the provided element.
     *
     * @param {Element} element A DOM element.
     */

  }, {
    key: "initializeAllWidgetsWithinElement",
    value: function initializeAllWidgetsWithinElement(element) {
      var afterInitializeAllWidgets = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._getAllWidgetElementsWithinElement(element)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var widgetElement = _step.value;
          var widget = this.initializeWidget(widgetElement);

          if (widget.useAfterInitializeAllWidgets()) {
            afterInitializeAllWidgets.push(widget);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      for (var _i = 0, _afterInitializeAllWi = afterInitializeAllWidgets; _i < _afterInitializeAllWi.length; _i++) {
        var _widget = _afterInitializeAllWi[_i];

        _widget.afterInitializeAllWidgets();
      }
    }
    /**
     * Get the value of the ``data-ievv-jsbase-widget-instanceid`` attribute
     * of the provided element.
     *
     * @param {Element} element A DOM element.
     * @returns {null|string}
     */

  }, {
    key: "getWidgetInstanceIdFromElement",
    value: function getWidgetInstanceIdFromElement(element) {
      return element.getAttribute(this._widgetInstanceIdAttribute);
    }
    /**
     * Get a widget instance by its widget instance id.
     *
     * @param widgetInstanceId A widget instance id.
     * @returns {AbstractWidget} A widget instance or ``null``.
     */

  }, {
    key: "getWidgetInstanceByInstanceId",
    value: function getWidgetInstanceByInstanceId(widgetInstanceId) {
      return this._widgetInstanceMap.get(widgetInstanceId);
    }
  }, {
    key: "getWidgetInstanceFromElement",
    value: function getWidgetInstanceFromElement(element) {
      var widgetInstanceId = this.getWidgetInstanceIdFromElement(element);

      if (widgetInstanceId) {
        var widgetInstance = this.getWidgetInstanceByInstanceId(widgetInstanceId);

        if (widgetInstance) {
          return widgetInstance;
        } else {
          throw new ElementIsNotInitializedAsWidget("Element\n\n".concat(element.outerHTML, "\n\nhas the ") + "".concat(this._widgetInstanceIdAttribute, " attribute, but the id is ") + "not in the widget registry.");
        }
      } else {
        throw new ElementHasNoWidgetInstanceIdError("Element\n\n".concat(element.outerHTML, "\n\nhas no or empty ") + "".concat(this._widgetInstanceIdAttribute, " attribute."));
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

  }, {
    key: "destroyWidget",
    value: function destroyWidget(element) {
      var widgetInstanceId = this.getWidgetInstanceIdFromElement(element);

      if (widgetInstanceId) {
        var widgetInstance = this.getWidgetInstanceByInstanceId(widgetInstanceId);

        if (widgetInstance) {
          widgetInstance.destroy();

          this._widgetInstanceMap.delete(widgetInstanceId);

          element.removeAttribute(this._widgetInstanceIdAttribute);
        } else {
          throw new ElementIsNotInitializedAsWidget("Element\n\n".concat(element.outerHTML, "\n\nhas the ") + "".concat(this._widgetInstanceIdAttribute, " attribute, but the id is ") + "not in the widget registry.");
        }
      } else {
        throw new ElementHasNoWidgetInstanceIdError("Element\n\n".concat(element.outerHTML, "\n\nhas no or empty ") + "".concat(this._widgetInstanceIdAttribute, " attribute."));
      }
    }
  }, {
    key: "_getAllInstanciatedWidgetElementsWithinElement",
    value: function _getAllInstanciatedWidgetElementsWithinElement(element) {
      return Array.from(element.querySelectorAll("[".concat(this._widgetInstanceIdAttribute, "]")));
    }
    /**
     * Destroy all widgets within the provided element.
     * Only destroys widgets on elements that is a child of the element.
     *
     * @param {Element} element The DOM Element.
     */

  }, {
    key: "destroyAllWidgetsWithinElement",
    value: function destroyAllWidgetsWithinElement(element) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._getAllInstanciatedWidgetElementsWithinElement(element)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var widgetElement = _step2.value;
          this.destroyWidget(widgetElement);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }]);

  return WidgetRegistrySingleton;
}();

exports.default = WidgetRegistrySingleton;
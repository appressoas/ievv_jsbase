"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InvalidWidgetAliasError = exports.ElementIsNotWidgetError = exports.ElementIsNotInitializedAsWidget = exports.ElementHasNoWidgetInstanceIdError = void 0;
var _makeCustomError = _interopRequireDefault(require("../makeCustomError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var ElementHasNoWidgetInstanceIdError = exports.ElementHasNoWidgetInstanceIdError = (0, _makeCustomError.default)('ElementHasNoWidgetInstanceIdError');

/**
 * Exception thrown when an element that we expect to have
 * the ``data-ievv-jsbase-widget`` attribute does not have
 * this attribute.
 *
 * @type {Error}
 */
var ElementIsNotWidgetError = exports.ElementIsNotWidgetError = (0, _makeCustomError.default)('ElementIsNotWidgetError');

/**
 * Exception thrown when an element has a
 * ``data-ievv-jsbase-widget`` with a value that
 * is not an alias registered in the {@link WidgetRegistrySingleton}.
 *
 * @type {Error}
 */
var InvalidWidgetAliasError = exports.InvalidWidgetAliasError = (0, _makeCustomError.default)('InvalidWidgetAliasError');

/**
 * Exception thrown when an element with the
 * ``data-ievv-jsbase-widget-instanceid=<widgetInstanceId>`` attribute is not in
 * the {@link WidgetRegistrySingleton} with ``<widgetInstanceId>``.
 *
 * @type {Error}
 */
var ElementIsNotInitializedAsWidget = exports.ElementIsNotInitializedAsWidget = (0, _makeCustomError.default)('ElementIsNotInitializedAsWidget');

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
var WidgetRegistrySingleton = exports.default = /*#__PURE__*/function () {
  function WidgetRegistrySingleton() {
    _classCallCheck(this, WidgetRegistrySingleton);
    if (!_instance) {
      _instance = this;
      this._initialize();
    }
    return _instance;
  }
  return _createClass(WidgetRegistrySingleton, [{
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
      var _iterator = _createForOfIteratorHelper(this._getAllWidgetElementsWithinElement(element)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var widgetElement = _step.value;
          var _widget = this.initializeWidget(widgetElement);
          if (_widget.useAfterInitializeAllWidgets()) {
            afterInitializeAllWidgets.push(_widget);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      for (var _i = 0, _afterInitializeAllWi = afterInitializeAllWidgets; _i < _afterInitializeAllWi.length; _i++) {
        var widget = _afterInitializeAllWi[_i];
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
      var _iterator2 = _createForOfIteratorHelper(this._getAllInstanciatedWidgetElementsWithinElement(element)),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var widgetElement = _step2.value;
          this.destroyWidget(widgetElement);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }]);
}();
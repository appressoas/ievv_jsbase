"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ObjectManager = _interopRequireDefault(require("../utils/ObjectManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Base class for widgets for {@link WidgetRegistrySingleton}.
 *
 * @example <caption>Create a very simple widget</caption>
 * export default class OpenMenuWidget extends AbstractWidget {
 *     constructor(element, widgetInstanceId) {
 *          super(element, widgetInstanceId);
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
 * <button type="button" data-ievv-jsbase-widget="open-menu-button">
 *     Open menu
 * </button>
 *
 * @example <caption>A widget with configuration input</caption>
 * export default class OpenMenuWidget extends AbstractWidget {
 *     constructor(element) {
 *          super(element);
 *          this._onClickBound = (...args) => {
 *              this._onClick(...args);
 *          };
 *          this.element.addEventListener('click', this._onClickBound);
 *     }
 *
 *     getDefaultConfig() {
 *          return {
 *              'menuId': 'id_main_menu'
 *          }
 *     }
 *
 *     _onClick = (e) => {
 *          e.preventDefault();
 *          console.log(`I should have opened the menu with id="${this.config.menuId}" here`);
 *     }
 *
 *     destroy() {
 *          this.element.removeEventListener('click', this._onClickBound);
 *     }
 * }
 *
 * @example <caption>Use the widget with config</caption>
 * <!-- Using the default config -->
 * <button type="button" data-ievv-jsbase-widget="open-menu-button">
 *     Open the main menu
 * </button>
 * <!-- Override the menuId config -->
 * <button type="button" data-ievv-jsbase-widget="open-menu-button"
 *          data-ievv-jsbase-widget-config='{"menuId": "id_the_other_menu"}'>
 *     Open the other menu
 * </button>
 */
var AbstractWidget =
/*#__PURE__*/
function () {
  /**
   * @param {Element} element The element to load the widget in.
   * @param {string} widgetInstanceId The unique ID of this widget instance
   *  in the widget registry.
   */
  function AbstractWidget(element, widgetInstanceId) {
    _classCallCheck(this, AbstractWidget);

    this.element = element;
    this.widgetInstanceId = widgetInstanceId;
  }
  /**
   * Get the default config.
   *
   * Any config supplied via the ``data-ievv-jsbase-widget-config``
   * attribute is merged into this object.
   *
   * @returns {Object}
   */


  _createClass(AbstractWidget, [{
    key: "getDefaultConfig",
    value: function getDefaultConfig() {
      return {};
    }
  }, {
    key: "_parseConfig",
    value: function _parseConfig() {
      var attributeName = 'data-ievv-jsbase-widget-config';

      if (this.element.hasAttribute(attributeName)) {
        var rawConfig = this.element.getAttribute(attributeName);
        var config = JSON.parse(rawConfig);
        return config;
      }

      return {};
    }
    /**
     * Get the config.
     *
     * JSON decodes any config supplied via the ``data-ievv-jsbase-widget-config``
     * attribute of the Element and {@link AbstractWidget#getDefaultConfig}
     * into a config object. The result of this is cached, so multiple calls
     * to this property will only result in the config object being created
     * once.
     *
     * @throws {SyntaxError} If the ``data-ievv-jsbase-widget-config`` attribute
     *      does not contain valid JSON data.
     *      Not thrown if the element does not have a
     *      ``data-ievv-jsbase-widget-config`` attribute.
     *
     * @returns {Object} The config object. This will be an empty object
     *      if we have no {@link AbstractWidget#getDefaultConfig} and
     *      no config is supplied via the ``data-ievv-jsbase-widget-config``
     *      attribute of the Element.
     */

  }, {
    key: "destroy",

    /**
     * Destroy the widget.
     *
     * You should override this in subclasses if your
     * widget sets up something that will work incorrectly
     * if the widget disappears or is re-created (such as event
     * listeners and signals).
     */
    value: function destroy() {}
    /**
     * If you override {@link AbstractWidget#afterInitializeAllWidgets},
     * you must override this to return ``true``.
     *
     * @returns {boolean} Should return ``true`` if you want the widget registry
     *   to call {@link AbstractWidget#afterInitializeAllWidgets}.
     */

  }, {
    key: "useAfterInitializeAllWidgets",
    value: function useAfterInitializeAllWidgets() {
      return false;
    }
    /**
     * Called after all the widgets within the element that
     * {@link WidgetRegistrySingleton#initializeAllWidgetsWithinElement}
     * was called with is initialized.
     *
     * For performance reasons, this is only called if
     * {@link AbstractWidget#useAfterInitializeAllWidgets} returns
     * ``true``, so you must also override that method if you override
     * this method.
     *
     * This is useful if you need to do something after other
     * widgets have finished initializing, which may be the case
     * for loosely coupled widgets.
     *
     * Does nothing by default.
     */

  }, {
    key: "afterInitializeAllWidgets",
    value: function afterInitializeAllWidgets() {}
  }, {
    key: "config",
    get: function get() {
      if (typeof this._config === 'undefined') {
        var parsedConfig = this._parseConfig();

        this._config = _ObjectManager.default.mergeAndClone(this.getDefaultConfig(), parsedConfig);
      }

      return this._config;
    }
  }]);

  return AbstractWidget;
}();

exports.default = AbstractWidget;
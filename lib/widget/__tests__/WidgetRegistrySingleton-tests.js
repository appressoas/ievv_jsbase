"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WidgetRegistrySingleton = require("../WidgetRegistrySingleton");

var _WidgetRegistrySingleton2 = _interopRequireDefault(_WidgetRegistrySingleton);

var _AbstractWidget2 = require("../AbstractWidget");

var _AbstractWidget3 = _interopRequireDefault(_AbstractWidget2);

var _HtmlParser = require("../../dom/HtmlParser");

var _HtmlParser2 = _interopRequireDefault(_HtmlParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MockWidget = function (_AbstractWidget) {
    _inherits(MockWidget, _AbstractWidget);

    function MockWidget(element) {
        _classCallCheck(this, MockWidget);

        var _this = _possibleConstructorReturn(this, (MockWidget.__proto__ || Object.getPrototypeOf(MockWidget)).call(this, element));

        _this._onDestroy = jest.fn();
        return _this;
    }

    _createClass(MockWidget, [{
        key: "destroy",
        value: function destroy() {
            this._onDestroy();
        }
    }]);

    return MockWidget;
}(_AbstractWidget3.default);

describe('WidgetRegistrySingleton', function () {
    beforeEach(function () {
        new _WidgetRegistrySingleton2.default().clear();
    });

    it('WidgetRegistrySingleton.registerWidgetClass()', function () {
        var mockWidget = jest.fn();
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        widgetRegistry.registerWidgetClass('test', mockWidget);
        expect(widgetRegistry._widgetClassMap.has('test')).toBe(true);
        expect(widgetRegistry._widgetClassMap.get('test')).toBe(mockWidget);
    });

    it('WidgetRegistrySingleton.registerWidgetClass() replaces', function () {
        var mockWidget1 = jest.fn();
        var mockWidget2 = jest.fn();
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        widgetRegistry.registerWidgetClass('test', mockWidget1);
        widgetRegistry.registerWidgetClass('test', mockWidget2);
        expect(widgetRegistry._widgetClassMap.has('test')).toBe(true);
        expect(widgetRegistry._widgetClassMap.get('test')).toBe(mockWidget2);
    });

    it('WidgetRegistrySingleton.removeWidgetClass() does nothing if it does not exist', function () {
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        widgetRegistry.removeWidgetClass('test');
    });

    it('WidgetRegistrySingleton.removeWidgetClass() removes', function () {
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        widgetRegistry.registerWidgetClass('test', jest.fn());
        expect(widgetRegistry._widgetClassMap.has('test')).toBe(true);
        widgetRegistry.removeWidgetClass('test');
        expect(widgetRegistry._widgetClassMap.has('test')).toBe(false);
    });

    it('WidgetRegistrySingleton.initializeWidget() ElementIsNotWidgetError', function () {
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        var element = new _HtmlParser2.default('<div></div>').firstRootElement;
        expect(function () {
            return widgetRegistry.initializeWidget(element);
        }).toThrowError(_WidgetRegistrySingleton.ElementIsNotWidgetError);
    });

    it('WidgetRegistrySingleton.initializeWidget() ElementIsNotWidgetError', function () {
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        var element = new _HtmlParser2.default('<div data-ievv-jsbase-widget="test"></div>').firstRootElement;
        expect(function () {
            return widgetRegistry.initializeWidget(element);
        }).toThrowError(_WidgetRegistrySingleton.InvalidWidgetAliasError);
    });

    it('WidgetRegistrySingleton.initializeWidget()', function () {
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        widgetRegistry.registerWidgetClass('test', MockWidget);
        widgetRegistry._widgetInstanceCounter = 0;
        var element = new _HtmlParser2.default('<div data-ievv-jsbase-widget="test"></div>').firstRootElement;
        var widget = widgetRegistry.initializeWidget(element);
        expect(widget.element).toBe(element);
        expect(element.getAttribute('data-ievv-jsbase-widget-instanceid')).toBe('1');
    });

    it('WidgetRegistrySingleton.initializeAllWidgetsWithinElement() adds to widgetInstanceMap', function () {
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        widgetRegistry.registerWidgetClass('test', MockWidget);
        widgetRegistry._widgetInstanceCounter = 0;
        var rootElement = new _HtmlParser2.default("<div>\n            <div data-ievv-jsbase-widget=\"test\"></div>\n        </div>").firstRootElement;
        widgetRegistry.initializeAllWidgetsWithinElement(rootElement);
        expect(widgetRegistry._widgetInstanceMap.size).toBe(1);
        var createdWidget = widgetRegistry._widgetInstanceMap.get('1');
        expect(createdWidget.element).toBe(rootElement.children[0]);
    });

    it('WidgetRegistrySingleton.initializeAllWidgetsWithinElement() sets instanceid element attribute', function () {
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        widgetRegistry.registerWidgetClass('test', MockWidget);
        widgetRegistry._widgetInstanceCounter = 0;
        var rootElement = new _HtmlParser2.default("<div>\n            <div data-ievv-jsbase-widget=\"test\"></div>\n        </div>").firstRootElement;
        widgetRegistry.initializeAllWidgetsWithinElement(rootElement);
        expect(rootElement.children[0].getAttribute('data-ievv-jsbase-widget-instanceid')).toBe('1');
    });

    it('WidgetRegistrySingleton.initializeAllWidgetsWithinElement() multiple elements', function () {
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        widgetRegistry.registerWidgetClass('test', MockWidget);
        widgetRegistry.registerWidgetClass('test2', MockWidget);
        widgetRegistry.registerWidgetClass('test3', MockWidget);
        widgetRegistry._widgetInstanceCounter = 0;
        var rootElement = new _HtmlParser2.default("<div>\n            <div data-ievv-jsbase-widget=\"test\"></div>\n            <div data-ievv-jsbase-widget=\"test\"></div>\n            <section>\n                <h2>Hello world</h2>\n                <div data-ievv-jsbase-widget=\"test2\">\n                    <div data-ievv-jsbase-widget=\"test3\"></div>\n                </div>\n            </section>\n        </div>").firstRootElement;
        widgetRegistry.initializeAllWidgetsWithinElement(rootElement);
        expect(widgetRegistry._widgetInstanceMap.size).toBe(4);
        expect(rootElement.children[0].getAttribute('data-ievv-jsbase-widget-instanceid')).toBe('1');
    });

    it('WidgetRegistrySingleton.destroyWidget() ElementHasNoWidgetInstanceIdError', function () {
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        var widgetElement = new _HtmlParser2.default("<div data-ievv-jsbase-widget=\"test\"></div>").firstRootElement;
        expect(function () {
            return widgetRegistry.destroyWidget(widgetElement);
        }).toThrowError(_WidgetRegistrySingleton.ElementHasNoWidgetInstanceIdError);
    });

    it('WidgetRegistrySingleton.destroyWidget() ElementIsNotInitializedAsWidget', function () {
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        var widgetElement = new _HtmlParser2.default("<div data-ievv-jsbase-widget=\"test\" data-ievv-jsbase-widget-instanceid=\"invalid\"></div>").firstRootElement;
        expect(function () {
            return widgetRegistry.destroyWidget(widgetElement);
        }).toThrowError(_WidgetRegistrySingleton.ElementIsNotInitializedAsWidget);
    });

    it('WidgetRegistrySingleton.destroyWidget() updates _widgetInstanceMap', function () {
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        widgetRegistry.registerWidgetClass('test', MockWidget);
        var widgetElement = new _HtmlParser2.default("<div data-ievv-jsbase-widget=\"test\"></div>").firstRootElement;
        widgetRegistry.initializeWidget(widgetElement);
        expect(widgetRegistry._widgetInstanceMap.size).toBe(1);
        widgetRegistry.destroyWidget(widgetElement);
        expect(widgetRegistry._widgetInstanceMap.size).toBe(0);
    });

    it('WidgetRegistrySingleton.destroyWidget() calls widget.destroy()', function () {
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        widgetRegistry.registerWidgetClass('test', MockWidget);
        var widgetElement = new _HtmlParser2.default("<div data-ievv-jsbase-widget=\"test\"></div>").firstRootElement;
        widgetRegistry.initializeWidget(widgetElement);
        var widget = widgetRegistry.getWidgetInstanceByInstanceId(widgetRegistry.getWidgetInstanceIdFromElement(widgetElement));
        widgetRegistry.destroyWidget(widgetElement);
        expect(widget._onDestroy).toHaveBeenCalledTimes(1);
    });

    it('WidgetRegistrySingleton.destroyWidget() removes -instanceid attribute', function () {
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        widgetRegistry.registerWidgetClass('test', MockWidget);
        var widgetElement = new _HtmlParser2.default("<div data-ievv-jsbase-widget=\"test\"></div>").firstRootElement;
        widgetRegistry.initializeWidget(widgetElement);
        expect(widgetElement.hasAttribute('data-ievv-jsbase-widget-instanceid')).toBe(true);
        widgetRegistry.destroyWidget(widgetElement);
        expect(widgetElement.hasAttribute('data-ievv-jsbase-widget-instanceid')).toBe(false);
    });

    it('WidgetRegistrySingleton.destroyAllWidgetsWithinElement()', function () {
        var widgetRegistry = new _WidgetRegistrySingleton2.default();
        widgetRegistry.registerWidgetClass('test1', MockWidget);
        widgetRegistry.registerWidgetClass('test2', MockWidget);
        widgetRegistry.registerWidgetClass('test3', MockWidget);
        var rootElement = new _HtmlParser2.default("<div>\n            <div data-ievv-jsbase-widget=\"test1\"></div>\n            <section id=\"id_section\">\n                <div data-ievv-jsbase-widget=\"test2\">\n                    <div data-ievv-jsbase-widget=\"test3\"></div>\n                </div>\n            </section>\n        </div>").firstRootElement;
        widgetRegistry.initializeAllWidgetsWithinElement(rootElement);
        expect(widgetRegistry._widgetInstanceMap.size).toBe(3);
        var sectionElement = rootElement.querySelector('#id_section');
        widgetRegistry.destroyAllWidgetsWithinElement(sectionElement);
        expect(widgetRegistry._widgetInstanceMap.size).toBe(1);
    });
});
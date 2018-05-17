"use strict";

var _WidgetRegistrySingleton = _interopRequireWildcard(require("../WidgetRegistrySingleton"));

var _AbstractWidget2 = _interopRequireDefault(require("../AbstractWidget"));

var _HtmlParser = _interopRequireDefault(require("../../dom/HtmlParser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

var MockWidget =
/*#__PURE__*/
function (_AbstractWidget) {
  function MockWidget(element) {
    var _this;

    _classCallCheck(this, MockWidget);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MockWidget).call(this, element));
    _this._onDestroy = jest.fn();
    return _this;
  }

  _createClass(MockWidget, [{
    key: "destroy",
    value: function destroy() {
      this._onDestroy();
    }
  }]);

  _inherits(MockWidget, _AbstractWidget);

  return MockWidget;
}(_AbstractWidget2.default);

describe('WidgetRegistrySingleton', function () {
  beforeEach(function () {
    new _WidgetRegistrySingleton.default().clear();
  });
  it('WidgetRegistrySingleton.registerWidgetClass()', function () {
    var mockWidget = jest.fn();
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    widgetRegistry.registerWidgetClass('test', mockWidget);
    expect(widgetRegistry._widgetClassMap.has('test')).toBe(true);
    expect(widgetRegistry._widgetClassMap.get('test')).toBe(mockWidget);
  });
  it('WidgetRegistrySingleton.registerWidgetClass() replaces', function () {
    var mockWidget1 = jest.fn();
    var mockWidget2 = jest.fn();
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    widgetRegistry.registerWidgetClass('test', mockWidget1);
    widgetRegistry.registerWidgetClass('test', mockWidget2);
    expect(widgetRegistry._widgetClassMap.has('test')).toBe(true);
    expect(widgetRegistry._widgetClassMap.get('test')).toBe(mockWidget2);
  });
  it('WidgetRegistrySingleton.removeWidgetClass() does nothing if it does not exist', function () {
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    widgetRegistry.removeWidgetClass('test');
  });
  it('WidgetRegistrySingleton.removeWidgetClass() removes', function () {
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    widgetRegistry.registerWidgetClass('test', jest.fn());
    expect(widgetRegistry._widgetClassMap.has('test')).toBe(true);
    widgetRegistry.removeWidgetClass('test');
    expect(widgetRegistry._widgetClassMap.has('test')).toBe(false);
  });
  it('WidgetRegistrySingleton.initializeWidget() ElementIsNotWidgetError', function () {
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    var element = new _HtmlParser.default('<div></div>').firstRootElement;
    expect(function () {
      return widgetRegistry.initializeWidget(element);
    }).toThrowError(_WidgetRegistrySingleton.ElementIsNotWidgetError);
  });
  it('WidgetRegistrySingleton.initializeWidget() ElementIsNotWidgetError', function () {
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    var element = new _HtmlParser.default('<div data-ievv-jsbase-widget="test"></div>').firstRootElement;
    expect(function () {
      return widgetRegistry.initializeWidget(element);
    }).toThrowError(_WidgetRegistrySingleton.InvalidWidgetAliasError);
  });
  it('WidgetRegistrySingleton.initializeWidget()', function () {
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    widgetRegistry.registerWidgetClass('test', MockWidget);
    widgetRegistry._widgetInstanceCounter = 0;
    var element = new _HtmlParser.default('<div data-ievv-jsbase-widget="test"></div>').firstRootElement;
    var widget = widgetRegistry.initializeWidget(element);
    expect(widget.element).toBe(element);
    expect(element.getAttribute('data-ievv-jsbase-widget-instanceid')).toBe('1');
  });
  it('WidgetRegistrySingleton.initializeAllWidgetsWithinElement() adds to widgetInstanceMap', function () {
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    widgetRegistry.registerWidgetClass('test', MockWidget);
    widgetRegistry._widgetInstanceCounter = 0;
    var rootElement = new _HtmlParser.default("<div>\n            <div data-ievv-jsbase-widget=\"test\"></div>\n        </div>").firstRootElement;
    widgetRegistry.initializeAllWidgetsWithinElement(rootElement);
    expect(widgetRegistry._widgetInstanceMap.size).toBe(1);

    var createdWidget = widgetRegistry._widgetInstanceMap.get('1');

    expect(createdWidget.element).toBe(rootElement.children[0]);
  });
  it('WidgetRegistrySingleton.initializeAllWidgetsWithinElement() sets instanceid element attribute', function () {
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    widgetRegistry.registerWidgetClass('test', MockWidget);
    widgetRegistry._widgetInstanceCounter = 0;
    var rootElement = new _HtmlParser.default("<div>\n            <div data-ievv-jsbase-widget=\"test\"></div>\n        </div>").firstRootElement;
    widgetRegistry.initializeAllWidgetsWithinElement(rootElement);
    expect(rootElement.children[0].getAttribute('data-ievv-jsbase-widget-instanceid')).toBe('1');
  });
  it('WidgetRegistrySingleton.initializeAllWidgetsWithinElement() multiple elements', function () {
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    widgetRegistry.registerWidgetClass('test', MockWidget);
    widgetRegistry.registerWidgetClass('test2', MockWidget);
    widgetRegistry.registerWidgetClass('test3', MockWidget);
    widgetRegistry._widgetInstanceCounter = 0;
    var rootElement = new _HtmlParser.default("<div>\n            <div data-ievv-jsbase-widget=\"test\"></div>\n            <div data-ievv-jsbase-widget=\"test\"></div>\n            <section>\n                <h2>Hello world</h2>\n                <div data-ievv-jsbase-widget=\"test2\">\n                    <div data-ievv-jsbase-widget=\"test3\"></div>\n                </div>\n            </section>\n        </div>").firstRootElement;
    widgetRegistry.initializeAllWidgetsWithinElement(rootElement);
    expect(widgetRegistry._widgetInstanceMap.size).toBe(4);
    expect(rootElement.children[0].getAttribute('data-ievv-jsbase-widget-instanceid')).toBe('1');
  });
  it('WidgetRegistrySingleton.destroyWidget() ElementHasNoWidgetInstanceIdError', function () {
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    var widgetElement = new _HtmlParser.default("<div data-ievv-jsbase-widget=\"test\"></div>").firstRootElement;
    expect(function () {
      return widgetRegistry.destroyWidget(widgetElement);
    }).toThrowError(_WidgetRegistrySingleton.ElementHasNoWidgetInstanceIdError);
  });
  it('WidgetRegistrySingleton.destroyWidget() ElementIsNotInitializedAsWidget', function () {
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    var widgetElement = new _HtmlParser.default("<div data-ievv-jsbase-widget=\"test\" data-ievv-jsbase-widget-instanceid=\"invalid\"></div>").firstRootElement;
    expect(function () {
      return widgetRegistry.destroyWidget(widgetElement);
    }).toThrowError(_WidgetRegistrySingleton.ElementIsNotInitializedAsWidget);
  });
  it('WidgetRegistrySingleton.destroyWidget() updates _widgetInstanceMap', function () {
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    widgetRegistry.registerWidgetClass('test', MockWidget);
    var widgetElement = new _HtmlParser.default("<div data-ievv-jsbase-widget=\"test\"></div>").firstRootElement;
    widgetRegistry.initializeWidget(widgetElement);
    expect(widgetRegistry._widgetInstanceMap.size).toBe(1);
    widgetRegistry.destroyWidget(widgetElement);
    expect(widgetRegistry._widgetInstanceMap.size).toBe(0);
  });
  it('WidgetRegistrySingleton.destroyWidget() calls widget.destroy()', function () {
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    widgetRegistry.registerWidgetClass('test', MockWidget);
    var widgetElement = new _HtmlParser.default("<div data-ievv-jsbase-widget=\"test\"></div>").firstRootElement;
    widgetRegistry.initializeWidget(widgetElement);
    var widget = widgetRegistry.getWidgetInstanceByInstanceId(widgetRegistry.getWidgetInstanceIdFromElement(widgetElement));
    widgetRegistry.destroyWidget(widgetElement);
    expect(widget._onDestroy).toHaveBeenCalledTimes(1);
  });
  it('WidgetRegistrySingleton.destroyWidget() removes -instanceid attribute', function () {
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    widgetRegistry.registerWidgetClass('test', MockWidget);
    var widgetElement = new _HtmlParser.default("<div data-ievv-jsbase-widget=\"test\"></div>").firstRootElement;
    widgetRegistry.initializeWidget(widgetElement);
    expect(widgetElement.hasAttribute('data-ievv-jsbase-widget-instanceid')).toBe(true);
    widgetRegistry.destroyWidget(widgetElement);
    expect(widgetElement.hasAttribute('data-ievv-jsbase-widget-instanceid')).toBe(false);
  });
  it('WidgetRegistrySingleton.destroyAllWidgetsWithinElement()', function () {
    var widgetRegistry = new _WidgetRegistrySingleton.default();
    widgetRegistry.registerWidgetClass('test1', MockWidget);
    widgetRegistry.registerWidgetClass('test2', MockWidget);
    widgetRegistry.registerWidgetClass('test3', MockWidget);
    var rootElement = new _HtmlParser.default("<div>\n            <div data-ievv-jsbase-widget=\"test1\"></div>\n            <section id=\"id_section\">\n                <div data-ievv-jsbase-widget=\"test2\">\n                    <div data-ievv-jsbase-widget=\"test3\"></div>\n                </div>\n            </section>\n        </div>").firstRootElement;
    widgetRegistry.initializeAllWidgetsWithinElement(rootElement);
    expect(widgetRegistry._widgetInstanceMap.size).toBe(3);
    var sectionElement = rootElement.querySelector('#id_section');
    widgetRegistry.destroyAllWidgetsWithinElement(sectionElement);
    expect(widgetRegistry._widgetInstanceMap.size).toBe(1);
  });
});
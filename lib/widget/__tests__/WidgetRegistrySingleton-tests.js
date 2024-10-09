"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _WidgetRegistrySingleton = _interopRequireWildcard(require("../WidgetRegistrySingleton"));
var _AbstractWidget2 = _interopRequireDefault(require("../AbstractWidget"));
var _HtmlParser = _interopRequireDefault(require("../../dom/HtmlParser"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var MockWidget = /*#__PURE__*/function (_AbstractWidget) {
  function MockWidget(element) {
    var _this;
    _classCallCheck(this, MockWidget);
    _this = _callSuper(this, MockWidget, [element]);
    _this._onDestroy = jest.fn();
    return _this;
  }
  _inherits(MockWidget, _AbstractWidget);
  return _createClass(MockWidget, [{
    key: "destroy",
    value: function destroy() {
      this._onDestroy();
    }
  }]);
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
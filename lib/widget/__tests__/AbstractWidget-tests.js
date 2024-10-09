"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _AbstractWidget2 = _interopRequireDefault(require("../AbstractWidget"));
var _HtmlParser = _interopRequireDefault(require("../../dom/HtmlParser"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
var MockWidgetWithDefaultConfig = /*#__PURE__*/function (_MockWidget) {
  function MockWidgetWithDefaultConfig() {
    _classCallCheck(this, MockWidgetWithDefaultConfig);
    return _callSuper(this, MockWidgetWithDefaultConfig, arguments);
  }
  _inherits(MockWidgetWithDefaultConfig, _MockWidget);
  return _createClass(MockWidgetWithDefaultConfig, [{
    key: "getDefaultConfig",
    value: function getDefaultConfig() {
      return {
        "name": "Jack",
        "age": 29
      };
    }
  }]);
}(MockWidget);
describe('AbstractWidget', function () {
  it('AbstractWidget constructor', function () {
    var mockElement = jest.fn();
    var widget = new MockWidget(mockElement);
    expect(widget.element).toBe(mockElement);
  });
  it('AbstractWidget config invalid JSON', function () {
    var element = new _HtmlParser.default("\n            <div data-ievv-jsbase-widget-config='{\"a\":}'></div>\n        ").firstRootElement;
    var widget = new MockWidget(element);
    expect(function () {
      return widget.config;
    }).toThrowError(SyntaxError);
  });
  it('AbstractWidget config', function () {
    var element = new _HtmlParser.default("\n            <div data-ievv-jsbase-widget-config='{\"a\": 10, \"b\": 20}'></div>\n        ").firstRootElement;
    var widget = new MockWidget(element);
    expect(widget.config).toEqual({
      a: 10,
      b: 20
    });
  });
  it('AbstractWidget defaultConfig', function () {
    var element = new _HtmlParser.default("<div></div>").firstRootElement;
    var widget = new MockWidgetWithDefaultConfig(element);
    expect(widget.config).toEqual({
      "name": "Jack",
      "age": 29
    });
  });
  it('AbstractWidget defaultConfig and input config', function () {
    var element = new _HtmlParser.default("\n            <div data-ievv-jsbase-widget-config='{\"name\": \"John\"}'></div>\n        ").firstRootElement;
    var widget = new MockWidgetWithDefaultConfig(element);
    expect(widget.config).toEqual({
      "name": "John",
      "age": 29
    });
  });
  it('AbstractWidget destroy()', function () {
    var element = jest.fn();
    var widget = new MockWidget(element);
    expect(widget._onDestroy).toHaveBeenCalledTimes(0);
    widget.destroy();
    expect(widget._onDestroy).toHaveBeenCalledTimes(1);
  });
});
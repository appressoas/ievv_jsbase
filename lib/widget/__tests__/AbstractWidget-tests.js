"use strict";

var _AbstractWidget2 = _interopRequireDefault(require("../AbstractWidget"));

var _HtmlParser = _interopRequireDefault(require("../../dom/HtmlParser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var MockWidgetWithDefaultConfig =
/*#__PURE__*/
function (_MockWidget) {
  function MockWidgetWithDefaultConfig() {
    _classCallCheck(this, MockWidgetWithDefaultConfig);

    return _possibleConstructorReturn(this, _getPrototypeOf(MockWidgetWithDefaultConfig).apply(this, arguments));
  }

  _createClass(MockWidgetWithDefaultConfig, [{
    key: "getDefaultConfig",
    value: function getDefaultConfig() {
      return {
        "name": "Jack",
        "age": 29
      };
    }
  }]);

  _inherits(MockWidgetWithDefaultConfig, _MockWidget);

  return MockWidgetWithDefaultConfig;
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
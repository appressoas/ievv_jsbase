"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var MockWidgetWithDefaultConfig = function (_MockWidget) {
    _inherits(MockWidgetWithDefaultConfig, _MockWidget);

    function MockWidgetWithDefaultConfig() {
        _classCallCheck(this, MockWidgetWithDefaultConfig);

        return _possibleConstructorReturn(this, (MockWidgetWithDefaultConfig.__proto__ || Object.getPrototypeOf(MockWidgetWithDefaultConfig)).apply(this, arguments));
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

    return MockWidgetWithDefaultConfig;
}(MockWidget);

describe('AbstractWidget', function () {
    it('AbstractWidget constructor', function () {
        var mockElement = jest.fn();
        var widget = new MockWidget(mockElement);
        expect(widget.element).toBe(mockElement);
    });

    it('AbstractWidget config invalid JSON', function () {
        var element = new _HtmlParser2.default("\n            <div data-ievv-jsbase-widget-config='{\"a\":}'></div>\n        ").firstRootElement;
        var widget = new MockWidget(element);
        expect(function () {
            return widget.config;
        }).toThrowError(SyntaxError);
    });

    it('AbstractWidget config', function () {
        var element = new _HtmlParser2.default("\n            <div data-ievv-jsbase-widget-config='{\"a\": 10, \"b\": 20}'></div>\n        ").firstRootElement;
        var widget = new MockWidget(element);
        expect(widget.config).toEqual({
            a: 10,
            b: 20
        });
    });

    it('AbstractWidget defaultConfig', function () {
        var element = new _HtmlParser2.default("<div></div>").firstRootElement;
        var widget = new MockWidgetWithDefaultConfig(element);
        expect(widget.config).toEqual({
            "name": "Jack",
            "age": 29
        });
    });

    it('AbstractWidget defaultConfig and input config', function () {
        var element = new _HtmlParser2.default("\n            <div data-ievv-jsbase-widget-config='{\"name\": \"John\"}'></div>\n        ").firstRootElement;
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
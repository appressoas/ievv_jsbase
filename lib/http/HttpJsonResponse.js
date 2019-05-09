"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HttpResponse2 = _interopRequireDefault(require("./HttpResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Extends HttpResponse with extra functionality for
 * working with JSON response data.
 *
 * The most important addition is the {@link HttpJsonResponse#bodydata}
 * property that you will want to use instead of
 * {@link HttpResponse#body}.
 */
var HttpJsonResponse =
/*#__PURE__*/
function (_HttpResponse) {
  _inherits(HttpJsonResponse, _HttpResponse);

  function HttpJsonResponse() {
    _classCallCheck(this, HttpJsonResponse);

    return _possibleConstructorReturn(this, _getPrototypeOf(HttpJsonResponse).apply(this, arguments));
  }

  _createClass(HttpJsonResponse, [{
    key: "__parseResponseTextAsJson",
    value: function __parseResponseTextAsJson() {
      return JSON.parse(this.body);
    }
    /**
     * Overriden to make use of JSON.stringify to produce more
     * pretty output.
     */

  }, {
    key: "getPrettyfiedBody",
    value: function getPrettyfiedBody() {
      var prettyBody;

      try {
        prettyBody = JSON.stringify(this.bodydata, null, 2);
      } catch (SyntaxError) {
        prettyBody = this.body;
      }

      return prettyBody;
    }
  }, {
    key: "bodydata",

    /**
     * Get the response body (the responseText attribute of the XMLHttpRequest)
     * decoded from JSON.
     */
    get: function get() {
      if (this.isConnectionRefused()) {
        return null;
      } else if (this.status === 204) {
        return null;
      } else {
        return this.__parseResponseTextAsJson();
      }
    }
  }]);

  return HttpJsonResponse;
}(_HttpResponse2.default);

exports.default = HttpJsonResponse;
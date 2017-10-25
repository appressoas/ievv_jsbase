"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _HttpJsonResponse = require("./HttpJsonResponse");

var _HttpJsonResponse2 = _interopRequireDefault(_HttpJsonResponse);

var _HttpRequest2 = require("./HttpRequest");

var _HttpRequest3 = _interopRequireDefault(_HttpRequest2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Extends HttpRequest with transparent JSON request/response handling.
 */
var JsonHttpRequest = function (_HttpRequest) {
  _inherits(JsonHttpRequest, _HttpRequest);

  function JsonHttpRequest() {
    _classCallCheck(this, JsonHttpRequest);

    return _possibleConstructorReturn(this, (JsonHttpRequest.__proto__ || Object.getPrototypeOf(JsonHttpRequest)).apply(this, arguments));
  }

  _createClass(JsonHttpRequest, [{
    key: "makeRequestBody",

    /**
     * Overridden to automatically convert request data to JSON.
     */
    value: function makeRequestBody(data) {
      return JSON.stringify(data);
    }

    /**
     * Overridden to return the response as a
     * {@link HttpJsonResponse} instead if a HttpResponse.
     *
     * @returns {HttpJsonResponse}
     */

  }, {
    key: "makeResponse",
    value: function makeResponse() {
      return new _HttpJsonResponse2.default(this.request);
    }

    /**
     * Overridden to ensure we send the correct content-type header for
     * json requests.
     */

  }, {
    key: "setDefaultRequestHeaders",
    value: function setDefaultRequestHeaders(method) {
      _get(JsonHttpRequest.prototype.__proto__ || Object.getPrototypeOf(JsonHttpRequest.prototype), "setDefaultRequestHeaders", this).call(this, method);
      this.setRequestHeader('Accept', 'application/json');
      this.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    }
  }]);

  return JsonHttpRequest;
}(_HttpRequest3.default);

exports.default = JsonHttpRequest;
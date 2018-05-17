"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HttpRequest2 = _interopRequireDefault(require("./HttpRequest"));

var _HttpFileResponse = _interopRequireDefault(require("./HttpFileResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

/**
 * Extends HttpRequest with file request/response handling.
 */
var HttpFileRequest =
/*#__PURE__*/
function (_HttpRequest) {
  function HttpFileRequest() {
    _classCallCheck(this, HttpFileRequest);

    return _possibleConstructorReturn(this, _getPrototypeOf(HttpFileRequest).apply(this, arguments));
  }

  _createClass(HttpFileRequest, [{
    key: "makeResponse",

    /**
     * Overridden to return the response as a
     * {@link HttpFileResponse} instead of a HttpResponse.
     *
     * @returns {HttpFileResponse}
     */
    value: function makeResponse() {
      return new _HttpFileResponse.default(this.request);
    }
    /**
     * Overridden to ensure we send the correct content-type header for
     * file requests.
     */

  }, {
    key: "setDefaultRequestHeaders",
    value: function setDefaultRequestHeaders(method) {
      _get(_getPrototypeOf(HttpFileRequest.prototype), "setDefaultRequestHeaders", this).call(this, method);

      this.setRequestHeader('Accept', 'multipart/form-data');
    }
  }]);

  _inherits(HttpFileRequest, _HttpRequest);

  return HttpFileRequest;
}(_HttpRequest2.default);

exports.default = HttpFileRequest;
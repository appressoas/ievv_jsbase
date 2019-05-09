"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HttpFileRequest2 = _interopRequireDefault(require("./HttpFileRequest"));

var _HttpCookies = _interopRequireDefault(require("./HttpCookies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Extends HttpFileRequest with automatic handling of
 * the Django csrftoken.
 */
var HttpDjangoFileRequest =
/*#__PURE__*/
function (_HttpFileRequest) {
  _inherits(HttpDjangoFileRequest, _HttpFileRequest);

  /**
   * @param args Same args as for {@link HttpResponse}
   */
  function HttpDjangoFileRequest() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, HttpDjangoFileRequest);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HttpDjangoFileRequest)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this._cookies = new _HttpCookies.default();
    return _this;
  }
  /**
   * Returns the value of the ``csrftoken`` cookie.
   *
   * @returns {string} Csrf token.
   */


  _createClass(HttpDjangoFileRequest, [{
    key: "setDefaultRequestHeaders",

    /**
     * Ensures the csrftoken cookie value is automatically set in the
     * ``X-CSRFToken`` header for all request except GET and HEAD.
     *
     * @param method See {@link HttpRequest}.
     */
    value: function setDefaultRequestHeaders(method) {
      _get(_getPrototypeOf(HttpDjangoFileRequest.prototype), "setDefaultRequestHeaders", this).call(this, method);

      var shouldAddCsrfToken = !(method === 'GET' || method === 'HEAD');

      if (shouldAddCsrfToken) {
        this.setRequestHeader('X-CSRFToken', this.csrftoken);
      }
    }
  }, {
    key: "csrftoken",
    get: function get() {
      return this._cookies.getStrict('csrftoken');
    }
  }]);

  return HttpDjangoFileRequest;
}(_HttpFileRequest2.default);

exports.default = HttpDjangoFileRequest;
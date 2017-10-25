'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _HttpFileRequest2 = require('./HttpFileRequest');

var _HttpFileRequest3 = _interopRequireDefault(_HttpFileRequest2);

var _HttpCookies = require('./HttpCookies');

var _HttpCookies2 = _interopRequireDefault(_HttpCookies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Extends HttpFileRequest with automatic handling of
 * the Django csrftoken.
 */
var HttpDjangoFileRequest = function (_HttpFileRequest) {
  _inherits(HttpDjangoFileRequest, _HttpFileRequest);

  /**
   * @param args Same args as for {@link HttpResponse}
   */
  function HttpDjangoFileRequest() {
    var _ref;

    _classCallCheck(this, HttpDjangoFileRequest);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = HttpDjangoFileRequest.__proto__ || Object.getPrototypeOf(HttpDjangoFileRequest)).call.apply(_ref, [this].concat(args)));

    _this._cookies = new _HttpCookies2.default();
    return _this;
  }

  /**
   * Returns the value of the ``csrftoken`` cookie.
   *
   * @returns {string} Csrf token.
   */


  _createClass(HttpDjangoFileRequest, [{
    key: 'setDefaultRequestHeaders',


    /**
     * Ensures the csrftoken cookie value is automatically set in the
     * ``X-CSRFToken`` header for all request except GET and HEAD.
     *
     * @param method See {@link HttpRequest}.
     */
    value: function setDefaultRequestHeaders(method) {
      _get(HttpDjangoFileRequest.prototype.__proto__ || Object.getPrototypeOf(HttpDjangoFileRequest.prototype), 'setDefaultRequestHeaders', this).call(this, method);
      var shouldAddCsrfToken = !(method === 'GET' || method === 'HEAD');
      if (shouldAddCsrfToken) {
        this.setRequestHeader('X-CSRFToken', this.csrftoken);
      }
    }
  }, {
    key: 'csrftoken',
    get: function get() {
      return this._cookies.getStrict('csrftoken');
    }
  }]);

  return HttpDjangoFileRequest;
}(_HttpFileRequest3.default);

exports.default = HttpDjangoFileRequest;
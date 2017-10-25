'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _HttpRequest2 = require('./HttpRequest');

var _HttpRequest3 = _interopRequireDefault(_HttpRequest2);

var _HttpFileResponse = require('./HttpFileResponse');

var _HttpFileResponse2 = _interopRequireDefault(_HttpFileResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Extends HttpRequest with file request/response handling.
 */
var HttpFileRequest = function (_HttpRequest) {
  _inherits(HttpFileRequest, _HttpRequest);

  function HttpFileRequest() {
    _classCallCheck(this, HttpFileRequest);

    return _possibleConstructorReturn(this, (HttpFileRequest.__proto__ || Object.getPrototypeOf(HttpFileRequest)).apply(this, arguments));
  }

  _createClass(HttpFileRequest, [{
    key: 'makeResponse',

    /**
     * Overridden to return the response as a
     * {@link HttpFileResponse} instead of a HttpResponse.
     *
     * @returns {HttpFileResponse}
     */
    value: function makeResponse() {
      return new _HttpFileResponse2.default(this.request);
    }

    /**
     * Overridden to ensure we send the correct content-type header for
     * file requests.
     */

  }, {
    key: 'setDefaultRequestHeaders',
    value: function setDefaultRequestHeaders(method) {
      _get(HttpFileRequest.prototype.__proto__ || Object.getPrototypeOf(HttpFileRequest.prototype), 'setDefaultRequestHeaders', this).call(this, method);
      this.setRequestHeader('Accept', 'multipart/form-data');
    }
  }]);

  return HttpFileRequest;
}(_HttpRequest3.default);

exports.default = HttpFileRequest;
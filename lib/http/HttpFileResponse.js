'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HttpResponse2 = require('./HttpResponse');

var _HttpResponse3 = _interopRequireDefault(_HttpResponse2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Extends HttpResponse with extra functionality for
 * working with JSON response data.
 */
var HttpFileResponse = function (_HttpResponse) {
  _inherits(HttpFileResponse, _HttpResponse);

  function HttpFileResponse() {
    _classCallCheck(this, HttpFileResponse);

    return _possibleConstructorReturn(this, (HttpFileResponse.__proto__ || Object.getPrototypeOf(HttpFileResponse)).apply(this, arguments));
  }

  return HttpFileResponse;
}(_HttpResponse3.default);

exports.default = HttpFileResponse;
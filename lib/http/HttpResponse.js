"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HttpResponseError = void 0;

var _makeCustomError = _interopRequireDefault(require("../makeCustomError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Error class created by {@link HttpResponse#toError}.
 *
 * @type {Error}
 */
var HttpResponseError = (0, _makeCustomError.default)('HttpResponseError');
/**
 * HTTP response.
 *
 * Wraps a XMLHttpRequest to make it easier to get
 * information about the response from the server.
 */

exports.HttpResponseError = HttpResponseError;

var HttpResponse =
/*#__PURE__*/
function () {
  /**
   *
   * @param request A XMLHttpRequest object.
   */
  function HttpResponse(request) {
    var timedOut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, HttpResponse);

    this.request = request;
    this.timedOut = timedOut;
  }
  /**
   * Returns ``true`` if {@link HttpResponse#status} is
   * 200 or larger and less than 300.
   */


  _createClass(HttpResponse, [{
    key: "isSuccess",
    value: function isSuccess() {
      return this.status >= 200 && this.status < 300;
    }
    /**
     * Returns ``true`` if {@link HttpResponse#status} is
     * 300 or larger and less than 400.
     */

  }, {
    key: "isRedirect",
    value: function isRedirect() {
      return this.status >= 300 && this.status < 400;
    }
    /**
     * Returns ``true`` if {@link HttpResponse#status} is
     * 400 or larger and less than 500.
     */

  }, {
    key: "isClientError",
    value: function isClientError() {
      return this.status >= 400 && this.status < 500;
    }
    /**
     * Returns ``true`` if {@link HttpResponse#status} is
     * 500 or larger.
     */

  }, {
    key: "isServerError",
    value: function isServerError() {
      return this.status >= 500;
    }
    /**
     * Returns ``true`` if {@link HttpResponse#status} is 0.
     * Assuming the XMLHttpRequest was actually sent, this
     * means that the connection was refused.
     */

  }, {
    key: "isConnectionRefused",
    value: function isConnectionRefused() {
      return this.status === 0;
    }
  }, {
    key: "isTimedOut",
    value: function isTimedOut() {
      return this.timedOut;
    }
    /**
     * Get the status code of the response (the status attribute of the XMLHttpRequest).
     */

  }, {
    key: "responseHeaderToString",

    /**
     * Get the response header as string.
     */
    value: function responseHeaderToString() {
      if (this.isTimedOut()) {
        return 'ERROR: Timed out';
      } else if (this.isConnectionRefused()) {
        return 'ERROR: Connection refused';
      } else {
        return "HTTP ".concat(this.status, "\n").concat(this.request.getAllResponseHeaders());
      }
    }
    /**
     * Create a {@link HttpResponseError} from this HttpResponse.
     *
     * @returns {HttpResponseError} An HttpResponseError with this HttpResponse
     *      as the ``response`` property.
     */

  }, {
    key: "toError",
    value: function toError() {
      return new HttpResponseError(this.toString(), {
        response: this
      });
    }
    /**
     * Get {@link HttpResponse#body} pretty formatted.
     *
     * By default, this just returns {@link HttpResponse#body}
     * but subclasses can override this to prettify the body
     * if they know the output format of the body.
     */

  }, {
    key: "getPrettyfiedBody",
    value: function getPrettyfiedBody() {
      return this.body;
    }
    /**
     * Format as a string suitable for debugging.
     */

  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.responseHeaderToString(), "\n\n").concat(this.getPrettyfiedBody());
    }
  }, {
    key: "status",
    get: function get() {
      if (this.isTimedOut()) {
        return 0;
      }

      return this.request.status;
    }
    /**
     * Get the response body (the responseText attribute of the XMLHttpRequest).
     */

  }, {
    key: "body",
    get: function get() {
      if (this.isTimedOut()) {
        return null;
      }

      return this.request.responseText;
    }
  }]);

  return HttpResponse;
}();

exports.default = HttpResponse;
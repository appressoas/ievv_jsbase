"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HttpResponseError = void 0;
var _makeCustomError = _interopRequireDefault(require("../makeCustomError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Error class created by {@link HttpResponse#toError}.
 *
 * @type {Error}
 */
var HttpResponseError = exports.HttpResponseError = (0, _makeCustomError.default)('HttpResponseError');

/**
 * HTTP response.
 *
 * Wraps a XMLHttpRequest to make it easier to get
 * information about the response from the server.
 */
var HttpResponse = exports.default = /*#__PURE__*/function () {
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
  return _createClass(HttpResponse, [{
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

    /**
     * Get the response header as string.
     */
  }, {
    key: "responseHeaderToString",
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
  }]);
}();
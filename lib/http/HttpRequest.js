"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HttpResponse = _interopRequireDefault(require("./HttpResponse"));

var _UrlParser = require("./UrlParser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * API for performing HTTP requests.
 *
 * @example <caption>Make a POST request</caption>
 * const request = new HttpRequest('http://example.com/api/users/')
 * request.post('Hello world')
 *     .then((response) => {
 *         // Success - response is a HttpResponse object.
 *         console.log(response.toString())
 *         if(response.isSuccess()) {
 *             console.log('Success: ', response.body)
 *         } else if (response.isRedirect) {
 *             console.log('Hmm strange, we got a redirect instead of a 2xx response.')
 *         }
 *     })
 *     .catch((error) => {
 *         // Error - response is an HttpResponse object.
 *         console.error(error.toString())
 *         if(error.response.isRedirect()) {
 *             // Yes - redirect is treated as an error by default.
 *             // you can change this by supplying an extra argument
 *             // to HttpResponse()
 *             console.log('We got a 3xx response!', error.response.body)
 *         } else if(error.response.isClientError()) {
 *             console.log('We got a 4xx response!', error.response.body)
 *         } else if (error.response.isServerError()) {
 *             console.log('We got a 5xx response!', error.response.body)
 *         } else if (error.response.isConnectionRefused()) {
 *             console.log('Connection refused.')
 *         }
 *         // throw error  // You can throw the error as an exception
 *     })
 *
 * @example <caption>Make a GET request with a querystring</caption>
 * const request = new HttpRequest('http://example.com/api/users/')
 * request.urlParser.queryString.set('search', 'doe')
 * request.get()
 *     .then((response) => {
 *         console.log('Success!', response.toString())
 *     })
 *     .catch((error) => {
 *         console.error('Error:', error.toString())
 *     })
 */
var HttpRequest =
/*#__PURE__*/
function () {
  /**
   * @param {string} url The URL to request.
   *      If this is supplied, it is passed to
   *      {@link HttpRequest#setUrl}
   */
  function HttpRequest(url) {
    _classCallCheck(this, HttpRequest);

    this._treatRedirectResponseAsError = true;
    this.requestHeaders = new Map();
    this.request = null;
    this._urlParser = null;
    this._timeoutMs = null;

    if (typeof url !== 'undefined') {
      this.setUrl(url);
    }

    this._handleTimeout = this._handleTimeout.bind(this);
  }
  /**
   * Create a deep copy of this HttpRequest object.
   *
   * WARNING: This does not copy request headers since those
   * are set on the XMLHttpRequest object, and that object is
   * reset in the copy.
   *
   * @return The copy.
   */


  _createClass(HttpRequest, [{
    key: "deepCopy",
    value: function deepCopy() {
      var copy = Object.assign(Object.create(this), this);
      copy.request = null;

      if (this._urlParser !== null) {
        copy._urlParser = this._urlParser.deepCopy();
      }

      copy.requestHeaders = new Map(this.requestHeaders);
      return copy;
    }
    /**
     * Get the parsed URL of the request.
     *
     * @returns {UrlParser} The UrlParser for the parsed URL.
     */

  }, {
    key: "setUrl",

    /**
     * Set the URL of the request.
     *
     * @param {String} url The URL.
     */
    value: function setUrl(url) {
      this._urlParser = new _UrlParser.UrlParser(url);
    }
  }, {
    key: "setTimeout",
    value: function setTimeout(timeoutMs) {
      this._timeoutMs = timeoutMs;
    }
    /**
     * Set how we treat 3xx responses.
     *
     * By default they are treated as errors, but you can change
     * this behavior by calling this function.
     *
     * @param {bool} treatRedirectResponseAsError Treat 3xx responses as
     *      errors?
     *
     * @example <caption>Do not treat 3xx responses as error</caption>
     * const request = HttpRequest('http://example.com/api/')
     * request.setTreatRedirectResponseAsError(false)
     */

  }, {
    key: "setTreatRedirectResponseAsError",
    value: function setTreatRedirectResponseAsError(treatRedirectResponseAsError) {
      this._treatRedirectResponseAsError = treatRedirectResponseAsError;
    }
  }, {
    key: "_makeXMLHttpRequest",
    value: function _makeXMLHttpRequest() {
      return new window.XMLHttpRequest();
    }
  }, {
    key: "_handleTimeout",
    value: function _handleTimeout(reject, event) {
      var response = this.makeResponse(true);
      reject(response.toError());
    }
  }, {
    key: "_applyTimeoutToRequest",
    value: function _applyTimeoutToRequest(reject) {
      var _this = this;

      if (this._timeoutMs !== null) {
        this.request.timeout = this._timeoutMs;

        this.request.ontimeout = function (event) {
          _this._handleTimeout(reject, event);
        };
      }
    }
  }, {
    key: "_applyRequestFailureManagement",
    value: function _applyRequestFailureManagement(reject) {
      var _this2 = this;

      this.request.onreadystatechange = function () {
        if (_this2.request.readyState === 4 && _this2.request.status === 0) {
          var response = _this2.makeResponse();

          reject(response);
        }
      };
    }
    /**
     * Send the request.
     *
     * @param method The HTTP method. I.e.: "get", "post", ...
     * @param data Request body data. This is sent through
     *      {@link HttpRequest#makeRequestBody} before it
     *      is sent.*
     * @return {Promise} A Promise.
     *
     *      The resolve function argument is an
     *      an object of whatever {@link HttpRequest#makeResponse}
     *      returns.
     *
     *      The reject function argument is a
     *      {@link HttpResponseError} object created using
     *      {@link HttpResponse#toError}.
     */

  }, {
    key: "send",
    value: function send(method, data) {
      var _this3 = this;

      method = method.toUpperCase();

      if (this._urlParser === null) {
        throw new TypeError('Can not call send() without an url.');
      }

      return new Promise(function (resolve, reject) {
        _this3.request = _this3._makeXMLHttpRequest();

        _this3.request.open(method, _this3.urlParser.buildUrl(), true);

        _this3.setDefaultRequestHeaders(method);

        _this3._applyRequestHeadersToRequest();

        _this3._applyTimeoutToRequest(reject);

        _this3._applyRequestFailureManagement(reject);

        _this3.request.onload = function () {
          return _this3._onComplete(resolve, reject);
        };

        _this3.request.send(_this3.makeRequestBody(data));
      });
    }
    /**
     * Shortcut for ``send("get", data)``.
     *
     * @see {@link HttpRequest#send}
     */

  }, {
    key: "get",
    value: function get(data) {
      return this.send('get', data);
    }
    /**
     * Shortcut for ``send("head", data)``.
     *
     * @see {@link HttpRequest#send}
     */

  }, {
    key: "head",
    value: function head(data) {
      return this.send('head', data);
    }
    /**
     * Shortcut for ``send("post", data)``.
     *
     * @see {@link HttpRequest#send}
     */

  }, {
    key: "post",
    value: function post(data) {
      return this.send('post', data);
    }
    /**
     * Shortcut for ``send("put", data)``.
     *
     * @see {@link HttpRequest#send}
     */

  }, {
    key: "put",
    value: function put(data) {
      return this.send('put', data);
    }
    /**
     * Shortcut for ``send("patch", data)``.
     *
     * @see {@link HttpRequest#send}
     */

  }, {
    key: "patch",
    value: function patch(data) {
      return this.send('patch', data);
    }
    /**
     * Shortcut for ``send("delete", data)``.
     *
     * Named httpdelete to avoid crash with builtin keyword ``delete``.
     *
     * @see {@link HttpRequest#send}
     */

  }, {
    key: "httpdelete",
    value: function httpdelete(data) {
      return this.send('delete', data);
    }
    /**
     * Make request body from the provided data.
     *
     * By default this just returns the provided data,
     * but subclasses can override this to perform automatic
     * conversion.
     *
     * Must return a string.
     */

  }, {
    key: "makeRequestBody",
    value: function makeRequestBody(data) {
      return data;
    }
    /**
     * Creates a {@link HttpResponse}.
     * @returns {HttpResponse}
     */

  }, {
    key: "makeResponse",
    value: function makeResponse() {
      for (var _len = arguments.length, extraResponseParams = new Array(_len), _key = 0; _key < _len; _key++) {
        extraResponseParams[_key] = arguments[_key];
      }

      return _construct(_HttpResponse.default, [this.request].concat(extraResponseParams));
    }
  }, {
    key: "_applyRequestHeadersToRequest",
    value: function _applyRequestHeadersToRequest() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.requestHeaders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              header = _step$value[0],
              value = _step$value[1];

          this.request.setRequestHeader(header, value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    /**
     * Set a request header.
     *
     * @param header The header name. E.g.: ``"Content-type"``.
     * @param value The header value.
     */

  }, {
    key: "setRequestHeader",
    value: function setRequestHeader(header, value) {
      this.requestHeaders.set(header, value);
    }
    /**
     * Set default request headers.
     *
     * Does nothing by default, but subclasses can override this.
     *
     * @param method The HTTP request method (GET, POST, PUT, ...).
     *      Will always be uppercase.
     */

  }, {
    key: "setDefaultRequestHeaders",
    value: function setDefaultRequestHeaders(method) {}
  }, {
    key: "_onComplete",
    value: function _onComplete(resolve, reject) {
      var response = this.makeResponse();
      var isSuccess = false;

      if (this._treatRedirectResponseAsError) {
        isSuccess = response.isSuccess();
      } else {
        isSuccess = response.isSuccess() || response.isRedirect();
      }

      if (isSuccess) {
        resolve(response);
      } else {
        reject(response.toError());
      }
    }
  }, {
    key: "urlParser",
    get: function get() {
      return this._urlParser;
    }
  }]);

  return HttpRequest;
}();

exports.default = HttpRequest;
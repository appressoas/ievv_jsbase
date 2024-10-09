"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.HttpRequestQueueSingleton = void 0;
var _HttpResponse = _interopRequireDefault(require("./HttpResponse"));
var _UrlParser = require("./UrlParser");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var QueuedHttpRequest = /*#__PURE__*/function () {
  function QueuedHttpRequest(_ref) {
    var queue = _ref.queue,
      httprequest = _ref.httprequest,
      method = _ref.method,
      data = _ref.data,
      reject = _ref.reject,
      resolve = _ref.resolve;
    _classCallCheck(this, QueuedHttpRequest);
    this.queue = queue;
    this.uniqueId = Symbol();
    this.httprequest = httprequest;
    this.data = data;
    this.method = method;
    this._reject = reject;
    this._resolve = resolve;
    this.reject = this.reject.bind(this);
    this.resolve = this.resolve.bind(this);
    this._retryCount = 0;
    this._retryTimeout = null;
    this._cancelled = false;
  }
  return _createClass(QueuedHttpRequest, [{
    key: "cancel",
    value: function cancel() {
      this._cancelled = true;
    }
  }, {
    key: "_removeFromQueue",
    value: function _removeFromQueue() {
      this.queue._remove(this.uniqueId);
    }
  }, {
    key: "_appendToPendingQueue",
    value: function _appendToPendingQueue() {
      this.queue._addToPendingQueue(this);
    }
  }, {
    key: "_canRetry",
    value: function _canRetry(response) {
      if (this._cancelled) {
        return false;
      }
      // We retry for these status codes (ref https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses):
      // - 502 Bad Gateway  (server is most likely temporarily unavailable because of a major update)
      // - 503 Service Unavailable  (server is most likely temporarily unavailable because of update or overload)
      // - 504 Gateway Timeout  (normally caused by too much load on the server)
      // - 0 Server is "gone" (normally just during development, but CAN also happen during major updates of cluster)
      if (this._retryCount < this.queue._retryTimings.length) {
        return response.status === 0 || response.status === 502 || response.status === 503 || response.status === 504;
      }
    }
  }, {
    key: "_retryDelayMs",
    value: function _retryDelayMs() {
      var delayMs = this.queue._retryTimings[this._retryCount] * 1000;
      // +- 0.5 second of random time to spread out the load
      return delayMs - 500 + Math.floor(Math.random() * 1000);
    }
  }, {
    key: "reject",
    value: function reject(error) {
      var _this = this;
      this._removeFromQueue();
      if (error.response) {
        if (this._canRetry(error.response)) {
          var retryDelay = this._retryDelayMs();
          console.debug("Request", this.httprequest._urlParser.buildUrl(), "failed with", error.response.status, "Retrying in ", retryDelay, "ms");
          this._retryTimeout = window.setTimeout(function () {
            _this._appendToPendingQueue();
          }, retryDelay);
          this._retryCount++;
          return;
        }
      }
      this._reject(error);
    }
  }, {
    key: "resolve",
    value: function resolve(result) {
      this._removeFromQueue();
      this._resolve(result);
    }
  }, {
    key: "send",
    value: function send() {
      var _this2 = this;
      this.httprequest.request = this.httprequest._makeXMLHttpRequest();
      this.httprequest.request.open(this.method, this.httprequest.urlParser.buildUrl(), true);
      this.httprequest.setDefaultRequestHeaders(this.method);
      this.httprequest._applyRequestHeadersToRequest();
      this.httprequest._applyTimeoutToRequest(this.reject);
      this.httprequest._applyRequestFailureManagement(this.reject);
      this.httprequest.request.onload = function () {
        return _this2.httprequest._onComplete(_this2.resolve, _this2.reject);
      };
      this.httprequest.request.send(this.httprequest.makeRequestBody(this.data));
    }
  }]);
}();
var _instance = null;

/**
 * Http request queue singleton. Used to throttle HTTP requests
 * so a single client does not perform too many at the same time,
 * and to retry typical errors that can occur during updates or load
 * spikes (which autoscaling typically fixes after a minute or two)
 *
 * @example <caption>Can be configured as follows</caption>
 * import { HttpRequestQueueSingleton } from 'ievv_jsbase/lib/http/HttpRequest';
 * const requestQueueSingleton = new HttpRequestQueueSingleton();
 * // Set max number of concurrent request:
 * requestQueueSingleton.setMaxConcurrent(10);  // Defaults to 6
 * // Set how many retries for status 0, 502, 503 and 504 we perform
 * // and the delay between them. The length of the array is the number of 
 * // retries and ``retryTiming[retryAttemptNumber]`` is the delay
 * // in seconds before we retry each attempt.
 *  requestQueueSingleton.setRetryTimings([2, 3, 5, 10, 12, 15])  // Defaults to [2, 4, 6, 7, 7, 10, 12, 12, 12, 12, 12];
 
 */
var HttpRequestQueueSingleton = exports.HttpRequestQueueSingleton = /*#__PURE__*/function () {
  /**
   * Get an instance of the singleton.
   *
   * The first time this is called, we create a new instance.
   * For all subsequent calls, we return the instance that was
   * created on the first call.
   */
  function HttpRequestQueueSingleton() {
    _classCallCheck(this, HttpRequestQueueSingleton);
    if (!_instance) {
      _instance = this;
    }
    this._pendingQueue = new Map();
    this._runningQueue = new Map();
    this._maxConcurrent = 6;
    this._retryTimings = [2, 4, 6, 7, 7, 10, 12, 12, 12, 12, 12];
    this._currentUrlPath = null;
    return _instance;
  }
  return _createClass(HttpRequestQueueSingleton, [{
    key: "setRetryTimings",
    value: function setRetryTimings(retryTimings) {
      this._retryTimings = retryTimings;
    }
  }, {
    key: "setMaxConcurrent",
    value: function setMaxConcurrent(maxConcurrent) {
      this._maxConcurrent = maxConcurrent;
    }
  }, {
    key: "_send",
    value: function _send(_ref2) {
      var httprequest = _ref2.httprequest,
        method = _ref2.method,
        data = _ref2.data,
        reject = _ref2.reject,
        resolve = _ref2.resolve;
      var queuedRequest = new QueuedHttpRequest({
        httprequest: httprequest,
        method: method,
        data: data,
        reject: reject,
        resolve: resolve,
        queue: this
      });
      this._addToPendingQueue(queuedRequest);
    }
  }, {
    key: "_addToPendingQueue",
    value: function _addToPendingQueue(queuedRequest) {
      if (window.location.pathname !== this._currentUrlPath) {
        if (this._currentUrlPath !== null) {
          this._clear("URL path change detected - clearing/cancelling queued HTTP requests");
        }
        this._currentUrlPath = window.location.pathname;
      }
      this._pendingQueue.set(queuedRequest.uniqueId, queuedRequest);
      this._processPendingQueue();
    }
  }, {
    key: "_clear",
    value: function _clear(logMessage) {
      if (this._pendingQueue.size === 0 && this._runningQueue.size === 0) {
        return;
      }
      console.debug(logMessage);
      this._pendingQueue = new Map();
      var _iterator = _createForOfIteratorHelper(this._runningQueue.values()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var queuedRequest = _step.value;
          queuedRequest.cancel();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this._runningQueue = new Map();
    }
  }, {
    key: "_remove",
    value: function _remove(uniqueId) {
      this._pendingQueue.delete(uniqueId);
      this._runningQueue.delete(uniqueId);
      this._processPendingQueue();
    }
  }, {
    key: "_processPendingQueue",
    value: function _processPendingQueue() {
      if (this._pendingQueue.size === 0) {
        return;
      }
      if (this._runningQueue.size >= this._maxConcurrent) {
        console.debug("Running HTTP request queue is full (".concat(this._runningQueue.size, ") - ") + "deferring further requests until there is space in the queue. " + "Pending queue size: ".concat(this._pendingQueue.size, "."));
        return;
      }
      var nextQueued = this._pendingQueue.values().next().value;
      this._pendingQueue.delete(nextQueued.uniqueId);
      this._runningQueue.set(nextQueued.uniqueId, nextQueued);
      nextQueued.send();
      this._processPendingQueue();
    }
  }]);
}();
/**
 * API for performing HTTP requests.
 *
 * @example <caption>Make a POST request</caption>
 * const request = new HttpRequest('http://example.com/api/users/')
 * request.post('Hello world')
 *     .then((response) => {
 *         // Success - response is a HttpResponse object.
 *         console.debug(response.toString())
 *         if(response.isSuccess()) {
 *             console.debug('Success: ', response.body)
 *         } else if (response.isRedirect) {
 *             console.debug('Hmm strange, we got a redirect instead of a 2xx response.')
 *         }
 *     })
 *     .catch((error) => {
 *         // Error - response is an HttpResponse object.
 *         console.error(error.toString())
 *         if(error.response.isRedirect()) {
 *             // Yes - redirect is treated as an error by default.
 *             // you can change this by supplying an extra argument
 *             // to HttpResponse()
 *             console.debug('We got a 3xx response!', error.response.body)
 *         } else if(error.response.isClientError()) {
 *             console.debug('We got a 4xx response!', error.response.body)
 *         } else if (error.response.isServerError()) {
 *             console.debug('We got a 5xx response!', error.response.body)
 *         } else if (error.response.isConnectionRefused()) {
 *             console.debug('Connection refused.')
 *         }
 *         // throw error  // You can throw the error as an exception
 *     })
 *
 * @example <caption>Make a GET request with a querystring</caption>
 * const request = new HttpRequest('http://example.com/api/users/')
 * request.urlParser.queryString.set('search', 'doe')
 * request.get()
 *     .then((response) => {
 *         console.debug('Success!', response.toString())
 *     })
 *     .catch((error) => {
 *         console.error('Error:', error.toString())
 *     })
 */
var HttpRequest = exports.default = /*#__PURE__*/function () {
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
    if (typeof url !== "undefined") {
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
  return _createClass(HttpRequest, [{
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
    key: "urlParser",
    get: function get() {
      return this._urlParser;
    }

    /**
     * Set the URL of the request.
     *
     * @param {String} url The URL.
     */
  }, {
    key: "setUrl",
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
      var _this3 = this;
      if (this._timeoutMs !== null) {
        this.request.timeout = this._timeoutMs;
        this.request.ontimeout = function (event) {
          _this3._handleTimeout(reject, event);
        };
      }
    }
  }, {
    key: "_applyRequestFailureManagement",
    value: function _applyRequestFailureManagement(reject) {
      var _this4 = this;
      this.request.onreadystatechange = function () {
        if (_this4.request.readyState === 4 && _this4.request.status === 0) {
          var response = _this4.makeResponse();
          reject(response.toError());
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
      var _this5 = this;
      method = method.toUpperCase();
      if (this._urlParser === null) {
        throw new TypeError("Can not call send() without an url.");
      }
      return new Promise(function (resolve, reject) {
        new HttpRequestQueueSingleton()._send({
          httprequest: _this5,
          method: method,
          data: data,
          reject: reject,
          resolve: resolve
        });
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
      return this.send("get", data);
    }

    /**
     * Shortcut for ``send("head", data)``.
     *
     * @see {@link HttpRequest#send}
     */
  }, {
    key: "head",
    value: function head(data) {
      return this.send("head", data);
    }

    /**
     * Shortcut for ``send("post", data)``.
     *
     * @see {@link HttpRequest#send}
     */
  }, {
    key: "post",
    value: function post(data) {
      return this.send("post", data);
    }

    /**
     * Shortcut for ``send("put", data)``.
     *
     * @see {@link HttpRequest#send}
     */
  }, {
    key: "put",
    value: function put(data) {
      return this.send("put", data);
    }

    /**
     * Shortcut for ``send("patch", data)``.
     *
     * @see {@link HttpRequest#send}
     */
  }, {
    key: "patch",
    value: function patch(data) {
      return this.send("patch", data);
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
      return this.send("delete", data);
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
      var _iterator2 = _createForOfIteratorHelper(this.requestHeaders),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            header = _step2$value[0],
            value = _step2$value[1];
          this.request.setRequestHeader(header, value);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
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
  }]);
}();
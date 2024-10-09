"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpJsonRequest2 = _interopRequireDefault(require("./HttpJsonRequest"));
var _HttpCookies = _interopRequireDefault(require("./HttpCookies"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/**
 * Extends {@link HttpJsonRequest} with automatic handling
 * of the Django csrftoken.
 *
 * @example <caption>Make a POST request</caption>
 * const request = new HttpDjangoJsonRequest('http://example.com/api/users/');
 * request.post({'name': 'Peter Pan', 'age': 14})
 *     .then((response) => {
 *         console.log('Success!', response.bodydata);
 *     })
 *     .catch((error) => {
 *         console.error('Error:', error.toString());
 *     });
 */
var HttpDjangoJsonRequest = exports.default = /*#__PURE__*/function (_HttpJsonRequest) {
  /**
   * @param args Same args as for {@link HttpResponse}.
   */
  function HttpDjangoJsonRequest() {
    var _this;
    _classCallCheck(this, HttpDjangoJsonRequest);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, HttpDjangoJsonRequest, [].concat(args));
    _this._cookies = new _HttpCookies.default();
    return _this;
  }

  /**
   * Returns the value of the ``csrftoken`` cookie.
   */
  _inherits(HttpDjangoJsonRequest, _HttpJsonRequest);
  return _createClass(HttpDjangoJsonRequest, [{
    key: "csrftoken",
    get: function get() {
      if (window.ievvJsBaseDjangoCsrfToken) {
        return window.ievvJsBaseDjangoCsrfToken;
      }
      return this._cookies.getStrict('csrftoken');
    }

    /**
     * Ensures the csrftoken cookie value is automatically set in
     * the ``X-CSRFToken`` header for all requests except GET and HEAD.
     *
     * @param method See {@link HttpRequest}.
     */
  }, {
    key: "setDefaultRequestHeaders",
    value: function setDefaultRequestHeaders(method) {
      _get(_getPrototypeOf(HttpDjangoJsonRequest.prototype), "setDefaultRequestHeaders", this).call(this, method);
      var shouldAddCsrfToken = !(method === 'GET' || method === 'HEAD');
      if (shouldAddCsrfToken) {
        var csrftoken = this.csrftoken;
        if (csrftoken) {
          this.setRequestHeader('X-CSRFToken', this.csrftoken);
        } else {
          console.warn('CSRF token not found');
        }
      }
    }
  }]);
}(_HttpJsonRequest2.default);
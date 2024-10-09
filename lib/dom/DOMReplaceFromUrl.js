"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DOMReplace2 = _interopRequireDefault(require("./DOMReplace"));
var _HttpRequest = _interopRequireDefault(require("../http/HttpRequest"));
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
 * Extends {@link DOMReplace} adn change the methods to
 * replace by making a request to the server.
 */
var DOMReplaceFromUrl = exports.default = /*#__PURE__*/function (_DOMReplace) {
  function DOMReplaceFromUrl() {
    _classCallCheck(this, DOMReplaceFromUrl);
    return _callSuper(this, DOMReplaceFromUrl, arguments);
  }
  _inherits(DOMReplaceFromUrl, _DOMReplace);
  return _createClass(DOMReplaceFromUrl, [{
    key: "_makeRequest",
    value: function _makeRequest(url) {
      return new _HttpRequest.default(url);
    }
  }, {
    key: "extractHtmlStringFromResponse",
    value: function extractHtmlStringFromResponse(response) {
      return response.body;
    }
  }, {
    key: "_replaceFromUrl",
    value: function _replaceFromUrl(url, callback) {
      var _this = this;
      return new Promise(function (resolve, reject) {
        var request = _this._makeRequest(url);
        request.get().then(function (response) {
          var htmlString = _this.extractHtmlStringFromResponse(response);
          callback(htmlString);
          resolve(htmlString, response);
        }).catch(function (error) {
          reject(error);
        });
      });
    }

    /**
     * Replace innerHTML of the element with data from a GET request
     * to an URL.
     *
     * The actual replace of the innerHTML is done using
     * {@link DOMReplace#replaceInnerHtml}.
     *
     * @param {string} url The URL to get the HTML from.
     * @return {Promise} A promise. The resolve callback is called
     *      with the html string as first argument and the {@link HttpResponse}
     *      as the second argument. The reject callback is called with
     *      one argument - the {@link HttpResponse}.
     */
  }, {
    key: "replaceInnerHtml",
    value: function replaceInnerHtml(url) {
      var _this2 = this;
      return this._replaceFromUrl(url, function (htmlString) {
        _get(_getPrototypeOf(DOMReplaceFromUrl.prototype), "replaceInnerHtml", _this2).call(_this2, htmlString);
      });
    }

    /**
     * Append to the innerHTML of the element with data from a GET request
     * to an URL.
     *
     * The actual append of the innerHTML is done using
     * {@link DOMReplace#appendInnerHtml}.
     *
     * @param {string} url The URL to get the HTML from.
     * @return {Promise} A promise. The resolve callback is called
     *      with the html string as first argument and the {@link HttpResponse}
     *      as the second argument. The reject callback is called with
     *      one argument - the {@link HttpResponse}.
     */
  }, {
    key: "appendInnerHtml",
    value: function appendInnerHtml(url) {
      var _this3 = this;
      return this._replaceFromUrl(url, function (htmlString) {
        _get(_getPrototypeOf(DOMReplaceFromUrl.prototype), "appendInnerHtml", _this3).call(_this3, htmlString);
      });
    }

    /**
     * Prepend to the innerHTML of the element with data from a GET request
     * to an URL.
     *
     * The actual prepend of the innerHTML is done using
     * {@link DOMReplace#prependInnerHtml}.
     *
     * @param {string} url The URL to get the HTML from.
     * @return {Promise} A promise. The resolve callback is called
     *      with the html string as first argument and the {@link HttpResponse}
     *      as the second argument. The reject callback is called with
     *      one argument - the {@link HttpResponse}.
     */
  }, {
    key: "prependInnerHtml",
    value: function prependInnerHtml(url) {
      var _this4 = this;
      return this._replaceFromUrl(url, function (htmlString) {
        _get(_getPrototypeOf(DOMReplaceFromUrl.prototype), "prependInnerHtml", _this4).call(_this4, htmlString);
      });
    }
  }]);
}(_DOMReplace2.default);
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpJsonResponse = _interopRequireDefault(require("./HttpJsonResponse"));
var _HttpRequest2 = _interopRequireDefault(require("./HttpRequest"));
var _ObjectManager = _interopRequireDefault(require("../utils/ObjectManager"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
 * Extends {@link HttpRequest} with transparent JSON request/response handling.
 *
 * @example <caption>Make a GET request</caption>
 * const request = new HttpJsonRequest('http://example.com/api/users/')
 * request.urlParser.queryString.set('search', 'doe')
 * request.get()
 *     .then((response) => {
 *         console.log('Success!', response.bodydata)
 *     })
 *     .catch((error) => {
 *         console.error('Error:', error.toString())
 *     })
 */
var HttpJsonRequest = exports.default = /*#__PURE__*/function (_HttpRequest) {
  function HttpJsonRequest() {
    _classCallCheck(this, HttpJsonRequest);
    return _callSuper(this, HttpJsonRequest, arguments);
  }
  _inherits(HttpJsonRequest, _HttpRequest);
  return _createClass(HttpJsonRequest, [{
    key: "makeRequestBody",
    value:
    /**
     * Overridden to automatically convert request data to JSON.
     */
    function makeRequestBody(data) {
      return JSON.stringify(data);
    }

    /**
     * Overridden to return the response as a
     * {@link HttpJsonResponse} instead if a HttpResponse.
     *
     * @returns {HttpJsonResponse}
     */
  }, {
    key: "makeResponse",
    value: function makeResponse() {
      return new _HttpJsonResponse.default(this.request);
    }

    /**
     * Overridden to ensure we send the correct content-type header for
     * json requests.
     */
  }, {
    key: "setDefaultRequestHeaders",
    value: function setDefaultRequestHeaders(method) {
      _get(_getPrototypeOf(HttpJsonRequest.prototype), "setDefaultRequestHeaders", this).call(this, method);
      this.setRequestHeader('Accept', 'application/json');
      this.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    }

    /**
     * Shortcut for getting all pagination pages and resolve an array
     * of the results for all pages.
     *
     * Assumes your API uses pagination where the ``next`` page is returned as
     * an URL, and that the results for each pagination page is an array.
     *
     * The first page retrived is whatever this request is configured for,
     * so you can use this to do things like request pagination page 10 -> 20,
     * just ensure the request is configured so that the page that would have
     * been retrieved if you just used ``get()`` would have been page 10.
     *
     * @param {number} maxPages The max number of pages to load. If this is ``null``
     *    (the default) we load all pages until the ``nextUrlAttribute`` value is ``null``
     *    or ``undefined``.
     * @param {string} resultsAttribute The attribute in the response data that
     *    contains the results array. Defaults to ``results``.
     * @param {string} nextUrlAttribute The attribute in the response data that
     *    contains the URL of the next pagination page. Defaults to ``next``.
     * @returns {Promise<any>}
     */
  }, {
    key: "getAllPaginationPages",
    value: function getAllPaginationPages() {
      var _this = this;
      var maxPages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var resultsAttribute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'results';
      var nextUrlAttribute = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'next';
      return new Promise(function (resolve, reject) {
        var results = [];
        var loadedPageCount = 0;
        var recursiveLoadAllPagesFromApi = function recursiveLoadAllPagesFromApi(request) {
          request.get().then(function (response) {
            results.push.apply(results, _toConsumableArray(response.bodydata[resultsAttribute]));
            loadedPageCount += 1;
            var hasMaxPageCount = maxPages !== null && loadedPageCount >= maxPages;
            if (!hasMaxPageCount && _ObjectManager.default.validate(response, 'bodydata', nextUrlAttribute)) {
              var nextRequest = request.deepCopy();
              nextRequest.setUrl(response.bodydata.next);
              recursiveLoadAllPagesFromApi(nextRequest);
            } else {
              resolve(results);
            }
          }).catch(function (error) {
            reject(error);
          });
        };
        recursiveLoadAllPagesFromApi(_this);
      });
    }
  }]);
}(_HttpRequest2.default);
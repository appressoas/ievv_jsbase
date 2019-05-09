"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HttpJsonResponse = _interopRequireDefault(require("./HttpJsonResponse"));

var _HttpRequest2 = _interopRequireDefault(require("./HttpRequest"));

var _ObjectManager = _interopRequireDefault(require("../utils/ObjectManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
var HttpJsonRequest =
/*#__PURE__*/
function (_HttpRequest) {
  _inherits(HttpJsonRequest, _HttpRequest);

  function HttpJsonRequest() {
    _classCallCheck(this, HttpJsonRequest);

    return _possibleConstructorReturn(this, _getPrototypeOf(HttpJsonRequest).apply(this, arguments));
  }

  _createClass(HttpJsonRequest, [{
    key: "makeRequestBody",

    /**
     * Overridden to automatically convert request data to JSON.
     */
    value: function makeRequestBody(data) {
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

  return HttpJsonRequest;
}(_HttpRequest2.default);

exports.default = HttpJsonRequest;
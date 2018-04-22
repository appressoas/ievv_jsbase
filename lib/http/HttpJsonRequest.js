"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _HttpJsonResponse = require("./HttpJsonResponse");

var _HttpJsonResponse2 = _interopRequireDefault(_HttpJsonResponse);

var _HttpRequest2 = require("./HttpRequest");

var _HttpRequest3 = _interopRequireDefault(_HttpRequest2);

var _ObjectManager = require("../utils/ObjectManager");

var _ObjectManager2 = _interopRequireDefault(_ObjectManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Extends {@link HttpRequest} with transparent JSON request/response handling.
 *
 * @example <caption>Make a GET request</caption>
 * const request = new JsonHttpRequest('http://example.com/api/users/')
 * request.urlParser.queryString.set('search', 'doe')
 * request.get()
 *     .then((response) => {
 *         console.log('Success!', response.bodydata)
 *     })
 *     .catch((error) => {
 *         console.error('Error:', error.toString())
 *     })
 */
var JsonHttpRequest = function (_HttpRequest) {
  _inherits(JsonHttpRequest, _HttpRequest);

  function JsonHttpRequest() {
    _classCallCheck(this, JsonHttpRequest);

    return _possibleConstructorReturn(this, (JsonHttpRequest.__proto__ || Object.getPrototypeOf(JsonHttpRequest)).apply(this, arguments));
  }

  _createClass(JsonHttpRequest, [{
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
      return new _HttpJsonResponse2.default(this.request);
    }

    /**
     * Overridden to ensure we send the correct content-type header for
     * json requests.
     */

  }, {
    key: "setDefaultRequestHeaders",
    value: function setDefaultRequestHeaders(method) {
      _get(JsonHttpRequest.prototype.__proto__ || Object.getPrototypeOf(JsonHttpRequest.prototype), "setDefaultRequestHeaders", this).call(this, method);
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
     * @param {string} resultsAttribute The attribute in the response data that
     *    contains the results array. Defaults to ``results``.
     * @param {string} nextUrlAttribute The attribute in the response data that
     *    contains the URL of the next pagination page. Defaults to ``next``.
     * @param {number} maxPages The max number of pages to load. If this is ``null``
     *    (the default) we load all pages until the ``nextUrlAttribute`` value is ``null``
     *    or ``undefined``.
     * @returns {Promise<any>}
     */

  }, {
    key: "getAllPaginationPages",
    value: function getAllPaginationPages() {
      var maxPages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var _this2 = this;

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
            if (!hasMaxPageCount && _ObjectManager2.default.validate(response, 'bodydata', nextUrlAttribute)) {
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
        recursiveLoadAllPagesFromApi(_this2);
      });
    }
  }]);

  return JsonHttpRequest;
}(_HttpRequest3.default);

exports.default = JsonHttpRequest;
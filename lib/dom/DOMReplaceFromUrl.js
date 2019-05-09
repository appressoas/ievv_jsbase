"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DOMReplace2 = _interopRequireDefault(require("./DOMReplace"));

var _HttpRequest = _interopRequireDefault(require("../http/HttpRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
 * Extends {@link DOMReplace} adn change the methods to
 * replace by making a request to the server.
 */
var DOMReplaceFromUrl =
/*#__PURE__*/
function (_DOMReplace) {
  _inherits(DOMReplaceFromUrl, _DOMReplace);

  function DOMReplaceFromUrl() {
    _classCallCheck(this, DOMReplaceFromUrl);

    return _possibleConstructorReturn(this, _getPrototypeOf(DOMReplaceFromUrl).apply(this, arguments));
  }

  _createClass(DOMReplaceFromUrl, [{
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

  return DOMReplaceFromUrl;
}(_DOMReplace2.default);

exports.default = DOMReplaceFromUrl;
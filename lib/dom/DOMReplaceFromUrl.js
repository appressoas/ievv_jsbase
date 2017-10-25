"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _DOMReplace2 = require("./DOMReplace");

var _DOMReplace3 = _interopRequireDefault(_DOMReplace2);

var _HttpRequest = require("../http/HttpRequest");

var _HttpRequest2 = _interopRequireDefault(_HttpRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Extends {@link DOMReplace} adn change the methods to
 * replace by making a request to the server.
 */
var DOMReplaceFromUrl = function (_DOMReplace) {
    _inherits(DOMReplaceFromUrl, _DOMReplace);

    function DOMReplaceFromUrl() {
        _classCallCheck(this, DOMReplaceFromUrl);

        return _possibleConstructorReturn(this, (DOMReplaceFromUrl.__proto__ || Object.getPrototypeOf(DOMReplaceFromUrl)).apply(this, arguments));
    }

    _createClass(DOMReplaceFromUrl, [{
        key: "_makeRequest",
        value: function _makeRequest(url) {
            return new _HttpRequest2.default(url);
        }
    }, {
        key: "extractHtmlStringFromResponse",
        value: function extractHtmlStringFromResponse(response) {
            return response.body;
        }
    }, {
        key: "_replaceFromUrl",
        value: function _replaceFromUrl(url, callback) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var request = _this2._makeRequest(url);
                request.get().then(function (response) {
                    var htmlString = _this2.extractHtmlStringFromResponse(response);
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
            var _this3 = this;

            return this._replaceFromUrl(url, function (htmlString) {
                _get(DOMReplaceFromUrl.prototype.__proto__ || Object.getPrototypeOf(DOMReplaceFromUrl.prototype), "replaceInnerHtml", _this3).call(_this3, htmlString);
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
            var _this4 = this;

            return this._replaceFromUrl(url, function (htmlString) {
                _get(DOMReplaceFromUrl.prototype.__proto__ || Object.getPrototypeOf(DOMReplaceFromUrl.prototype), "appendInnerHtml", _this4).call(_this4, htmlString);
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
            var _this5 = this;

            return this._replaceFromUrl(url, function (htmlString) {
                _get(DOMReplaceFromUrl.prototype.__proto__ || Object.getPrototypeOf(DOMReplaceFromUrl.prototype), "prependInnerHtml", _this5).call(_this5, htmlString);
            });
        }
    }]);

    return DOMReplaceFromUrl;
}(_DOMReplace3.default);

exports.default = DOMReplaceFromUrl;
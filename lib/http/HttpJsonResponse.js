"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HttpResponse2 = require("./HttpResponse");

var _HttpResponse3 = _interopRequireDefault(_HttpResponse2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Extends HttpResponse with extra functionality for
 * working with JSON response data.
 *
 * The most important addition is the {@link HttpJsonResponse#bodydata}
 * property that you will want to use instead of
 * {@link HttpResponse#body}.
 */
var HttpJsonResponse = function (_HttpResponse) {
    _inherits(HttpJsonResponse, _HttpResponse);

    function HttpJsonResponse() {
        _classCallCheck(this, HttpJsonResponse);

        return _possibleConstructorReturn(this, (HttpJsonResponse.__proto__ || Object.getPrototypeOf(HttpJsonResponse)).apply(this, arguments));
    }

    _createClass(HttpJsonResponse, [{
        key: "__parseResponseTextAsJson",
        value: function __parseResponseTextAsJson() {
            return JSON.parse(this.body);
        }

        /**
         * Overriden to make use of JSON.stringify to produce more
         * pretty output.
         */

    }, {
        key: "getPrettyfiedBody",
        value: function getPrettyfiedBody() {
            var prettyBody = void 0;
            try {
                prettyBody = JSON.stringify(this.bodydata, null, 2);
            } catch (SyntaxError) {
                prettyBody = this.body;
            }
            return prettyBody;
        }
    }, {
        key: "bodydata",


        /**
         * Get the response body (the responseText attribute of the XMLHttpRequest)
         * decoded from JSON.
         */
        get: function get() {
            if (this.isConnectionRefused()) {
                return null;
            } else {
                return this.__parseResponseTextAsJson();
            }
        }
    }]);

    return HttpJsonResponse;
}(_HttpResponse3.default);

exports.default = HttpJsonResponse;
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpResponseError = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _makeCustomError = require("../makeCustomError");

var _makeCustomError2 = _interopRequireDefault(_makeCustomError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Error class created by {@link HttpResponse#toError}.
 *
 * @type {Error}
 */
var HttpResponseError = exports.HttpResponseError = (0, _makeCustomError2.default)('HttpResponseError');

/**
 * HTTP response.
 *
 * Wraps a XMLHttpRequest to make it easier to get
 * information about the response from the server.
 */

var HttpResponse = function () {
    /**
     *
     * @param request A XMLHttpRequest object.
     */
    function HttpResponse(request) {
        _classCallCheck(this, HttpResponse);

        this.request = request;
    }

    /**
     * Returns ``true`` if {@link HttpResponse#status} is
     * 200 or larger and less than 300.
     */


    _createClass(HttpResponse, [{
        key: "isSuccess",
        value: function isSuccess() {
            return this.status >= 200 && this.status < 300;
        }

        /**
         * Returns ``true`` if {@link HttpResponse#status} is
         * 300 or larger and less than 400.
         */

    }, {
        key: "isRedirect",
        value: function isRedirect() {
            return this.status >= 300 && this.status < 400;
        }

        /**
         * Returns ``true`` if {@link HttpResponse#status} is
         * 400 or larger and less than 500.
         */

    }, {
        key: "isClientError",
        value: function isClientError() {
            return this.status >= 400 && this.status < 500;
        }

        /**
         * Returns ``true`` if {@link HttpResponse#status} is
         * 500 or larger.
         */

    }, {
        key: "isServerError",
        value: function isServerError() {
            return this.status >= 500;
        }

        /**
         * Returns ``true`` if {@link HttpResponse#status} is 0.
         * Assuming the XMLHttpRequest was actually sent, this
         * means that the connection was refused.
         */

    }, {
        key: "isConnectionRefused",
        value: function isConnectionRefused() {
            return this.status === 0;
        }

        /**
         * Get the status code of the response (the status attribute of the XMLHttpRequest).
         */

    }, {
        key: "responseHeaderToString",


        /**
         * Get the response header as string.
         */
        value: function responseHeaderToString() {
            if (this.connectionRefused) {
                return "ERROR: Connection refused";
            } else {
                return "HTTP " + this.status + "\n" + this.request.getAllResponseHeaders();
            }
        }

        /**
         * Create a {@link HttpResponseError} from this HttpResponse.
         *
         * @returns {HttpResponseError} An HttpResponseError with this HttpResponse
         *      as the ``response`` property.
         */

    }, {
        key: "toError",
        value: function toError() {
            return new HttpResponseError(this.toString(), {
                response: this
            });
        }

        /**
         * Get {@link HttpResponse#body} pretty formatted.
         *
         * By default, this just returns {@link HttpResponse#body}
         * but subclasses can override this to prettify the body
         * if they know the output format of the body.
         */

    }, {
        key: "getPrettyfiedBody",
        value: function getPrettyfiedBody() {
            return this.body;
        }

        /**
         * Format as a string suitable for debugging.
         */

    }, {
        key: "toString",
        value: function toString() {
            return this.responseHeaderToString() + "\n\n" + this.getPrettyfiedBody();
        }
    }, {
        key: "status",
        get: function get() {
            return this.request.status;
        }

        /**
         * Get the response body (the responseText attribute of the XMLHttpRequest).
         */

    }, {
        key: "body",
        get: function get() {
            return this.request.responseText;
        }
    }]);

    return HttpResponse;
}();

exports.default = HttpResponse;
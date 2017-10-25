"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DOMReplaceWithSameElementFromUrl = require("../DOMReplaceWithSameElementFromUrl.js");

var _DOMReplaceWithSameElementFromUrl2 = _interopRequireDefault(_DOMReplaceWithSameElementFromUrl);

var _HttpRequest = require("../../http/HttpRequest");

var _HttpRequest2 = _interopRequireDefault(_HttpRequest);

var _XMLHttpRequestMock = require("../../__testhelpers__/XMLHttpRequestMock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MockDOMReplaceWithSameElementFromUrl = function (_DOMReplaceWithSameEl) {
    _inherits(MockDOMReplaceWithSameElementFromUrl, _DOMReplaceWithSameEl);

    function MockDOMReplaceWithSameElementFromUrl() {
        _classCallCheck(this, MockDOMReplaceWithSameElementFromUrl);

        return _possibleConstructorReturn(this, (MockDOMReplaceWithSameElementFromUrl.__proto__ || Object.getPrototypeOf(MockDOMReplaceWithSameElementFromUrl)).apply(this, arguments));
    }

    _createClass(MockDOMReplaceWithSameElementFromUrl, [{
        key: "_makeRequest",
        value: function _makeRequest(url) {
            var httpRequest = new _HttpRequest2.default(url);
            httpRequest.request = new _XMLHttpRequestMock.XMLHttpRequestMock('onload', {
                status: 200,
                responseText: "<html>\n    <body>\n        <div id=\"id_test\">\n            <p>From server</p>\n        </div>\n    </body>\n</html>"
            });
            return httpRequest;
        }
    }]);

    return MockDOMReplaceWithSameElementFromUrl;
}(_DOMReplaceWithSameElementFromUrl2.default);

describe('DOMReplaceWithSameElementFromUrl', function () {
    it('DOMReplaceWithSameElementFromUrl.replaceInnerHtml()', function () {
        document.body.innerHTML = "\n            <div id=\"id_test\">\n                <p>Original</p>\n            </div>";
        var domreplace = new MockDOMReplaceWithSameElementFromUrl('id_test');
        return domreplace.replaceInnerHtml('http://example.com').then(function (htmlString) {
            expect(htmlString).toBe('<p>From server</p>');
            expect(document.body.querySelectorAll('p').length).toBe(1);
            expect(document.body.querySelectorAll('p')[0].textContent).toBe('From server');
        });
    });

    it('DOMReplaceWithSameElementFromUrl.appendInnerHtml()', function () {
        document.body.innerHTML = "\n            <div id=\"id_test\">\n                <p>Original</p>\n            </div>";
        var domreplace = new MockDOMReplaceWithSameElementFromUrl('id_test');
        return domreplace.appendInnerHtml('http://example.com').then(function (htmlString) {
            expect(htmlString).toBe('<p>From server</p>');
            expect(document.body.querySelectorAll('p').length).toBe(2);
            expect(document.body.querySelectorAll('p')[0].textContent).toBe('Original');
            expect(document.body.querySelectorAll('p')[1].textContent).toBe('From server');
        });
    });

    it('DOMReplaceWithSameElementFromUrl.prependInnerHtml()', function () {
        document.body.innerHTML = "\n            <div id=\"id_test\">\n                <p>Original</p>\n            </div>";
        var domreplace = new MockDOMReplaceWithSameElementFromUrl('id_test');
        return domreplace.prependInnerHtml('http://example.com').then(function (htmlString) {
            expect(htmlString).toBe('<p>From server</p>');
            expect(document.body.querySelectorAll('p').length).toBe(2);
            expect(document.body.querySelectorAll('p')[0].textContent).toBe('From server');
            expect(document.body.querySelectorAll('p')[1].textContent).toBe('Original');
        });
    });
});
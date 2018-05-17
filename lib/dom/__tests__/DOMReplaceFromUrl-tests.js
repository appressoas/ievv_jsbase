"use strict";

var _DOMReplaceFromUrl2 = _interopRequireDefault(require("../DOMReplaceFromUrl.js"));

var _HttpRequest = _interopRequireDefault(require("../../http/HttpRequest"));

var sinon = _interopRequireWildcard(require("sinon"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

var server;

var MockDOMReplaceFromUrl =
/*#__PURE__*/
function (_DOMReplaceFromUrl) {
  function MockDOMReplaceFromUrl() {
    _classCallCheck(this, MockDOMReplaceFromUrl);

    return _possibleConstructorReturn(this, _getPrototypeOf(MockDOMReplaceFromUrl).apply(this, arguments));
  }

  _createClass(MockDOMReplaceFromUrl, [{
    key: "_makeRequest",
    value: function _makeRequest(url) {
      server.respondWith('<p>From server</p>');
      return new _HttpRequest.default(url);
    }
  }]);

  _inherits(MockDOMReplaceFromUrl, _DOMReplaceFromUrl);

  return MockDOMReplaceFromUrl;
}(_DOMReplaceFromUrl2.default);

describe('DOMReplaceFromUrl', function () {
  beforeEach(function () {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;
  });
  afterEach(function () {
    server.restore();
  });
  it('DOMReplaceFromUrl.replaceInnerHtml()', function () {
    document.body.innerHTML = "\n            <div id='id_test'>\n                <p>Original</p>\n            </div>";
    var domreplace = new MockDOMReplaceFromUrl('id_test');
    return domreplace.replaceInnerHtml('http://example.com').then(function (htmlString) {
      expect(htmlString).toBe('<p>From server</p>');
      expect(document.body.querySelectorAll('p').length).toBe(1);
      expect(document.body.querySelectorAll('p')[0].textContent).toBe('From server');
    });
  });
  it('DOMReplaceFromUrl.appendInnerHtml()', function () {
    document.body.innerHTML = "\n            <div id='id_test'>\n                <p>Original</p>\n            </div>";
    var domreplace = new MockDOMReplaceFromUrl('id_test');
    return domreplace.appendInnerHtml('http://example.com').then(function (htmlString) {
      expect(htmlString).toBe('<p>From server</p>');
      expect(document.body.querySelectorAll('p').length).toBe(2);
      expect(document.body.querySelectorAll('p')[0].textContent).toBe('Original');
      expect(document.body.querySelectorAll('p')[1].textContent).toBe('From server');
    });
  });
  it('DOMReplaceFromUrl.prependInnerHtml()', function () {
    document.body.innerHTML = "\n            <div id='id_test'>\n                <p>Original</p>\n            </div>";
    var domreplace = new MockDOMReplaceFromUrl('id_test');
    return domreplace.prependInnerHtml('http://example.com').then(function (htmlString) {
      expect(htmlString).toBe('<p>From server</p>');
      expect(document.body.querySelectorAll('p').length).toBe(2);
      expect(document.body.querySelectorAll('p')[0].textContent).toBe('From server');
      expect(document.body.querySelectorAll('p')[1].textContent).toBe('Original');
    });
  });
});
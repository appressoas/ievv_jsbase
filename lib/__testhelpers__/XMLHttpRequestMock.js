"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XMLHttpRequestMock = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var XMLHttpRequestMock =
/*#__PURE__*/
function () {
  function XMLHttpRequestMock(requestEventMethodName, resultingRequest) {
    _classCallCheck(this, XMLHttpRequestMock);

    this.requestEventMethodName = requestEventMethodName;
    this.onerror = null;
    this.onload = null;
    this.headers = [];
    this.sentData = null;
    this.resultingRequest = resultingRequest;
  }

  _createClass(XMLHttpRequestMock, [{
    key: "open",
    value: function open() {}
  }, {
    key: "setRequestHeader",
    value: function setRequestHeader(header, value) {
      this.headers.push({
        header: header,
        value: value
      });
    }
  }, {
    key: "getAllResponseHeaders",
    value: function getAllResponseHeaders() {
      return '';
    }
  }, {
    key: "send",
    value: function send(data) {
      this.sentData = data;
      Object.assign(this, this.resultingRequest);
      this[this.requestEventMethodName]();
    }
  }]);

  return XMLHttpRequestMock;
}();

exports.XMLHttpRequestMock = XMLHttpRequestMock;
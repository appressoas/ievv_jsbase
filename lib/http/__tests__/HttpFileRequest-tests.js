'use strict';

var _HttpFileRequest = require('../HttpFileRequest');

var _HttpFileRequest2 = _interopRequireDefault(_HttpFileRequest);

var _XMLHttpRequestMock = require('../../__testhelpers__/XMLHttpRequestMock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('HttpFileRequest', function () {
  it('Connection error', function () {
    var httprequest = new _HttpFileRequest2.default('http://example.com/');
    httprequest.request = new _XMLHttpRequestMock.XMLHttpRequestMock('onerror', {
      status: 0
    });
    return httprequest.post('test').then(function (response) {
      throw new Error('This should not be called!');
    }, function (error) {
      expect(error.response.status).toBe(0);
      expect(error.response.isConnectionRefused()).toBe(true);
    });
  });

  it('Successful request', function () {
    var httprequest = new _HttpFileRequest2.default('http://example.com/');
    httprequest.request = new _XMLHttpRequestMock.XMLHttpRequestMock('onload', {
      status: 200
    });
    return httprequest.post('test').then(function (response) {
      expect(response.status).toBe(200);
      expect(response.isSuccess()).toBe(true);
    }, function (error) {
      throw new Error('This should not be called!');
    });
  });

  it('Sets content-type and Accept headers', function () {
    var httprequest = new _HttpFileRequest2.default('http://example.com/');
    httprequest.request = new _XMLHttpRequestMock.XMLHttpRequestMock('onload', {
      status: 200
    });
    return httprequest.post('test').then(function (response) {
      expect(httprequest.request.headers.length).toBe(2);
      expect(httprequest.request.headers[0].header).toBe('Accept');
      expect(httprequest.request.headers[0].value).toBe('multipart/form-data');
      expect(httprequest.request.headers[1].header).toBe('Content-Type');
      expect(httprequest.request.headers[1].value).toBe('application/octet-stream');
    });
  });
});
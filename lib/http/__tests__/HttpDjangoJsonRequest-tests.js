"use strict";

var _HttpDjangoJsonRequest = _interopRequireDefault(require("../HttpDjangoJsonRequest"));

var sinon = _interopRequireWildcard(require("sinon"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server;
var defaultRequestHeaders = new Set(['Accept', 'Content-Type']);
var withCsrfTokenRequestHeaders = new Set(defaultRequestHeaders);
withCsrfTokenRequestHeaders.add('X-CSRFToken');
describe('HttpDjangoJsonRequest', function () {
  beforeEach(function () {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;
    document.cookie = 'csrftoken=testtoken';
  });
  afterEach(function () {
    server.restore();
  });
  it('Does not set CSRF header on GET', function () {
    server.respondWith('GET', /\//, function (request) {
      request.respond(200);
    });
    var httprequest = new _HttpDjangoJsonRequest.default('/');
    return httprequest.get().then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(defaultRequestHeaders.size);
      expect(new Set(httprequest.requestHeaders.keys())).toEqual(defaultRequestHeaders);
    });
  });
  it('Does not set CSRF header on HEAD', function () {
    server.respondWith('HEAD', /\//, function (request) {
      request.respond(200);
    });
    var httprequest = new _HttpDjangoJsonRequest.default('/');
    return httprequest.head().then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(defaultRequestHeaders.size);
      expect(new Set(httprequest.requestHeaders.keys())).toEqual(defaultRequestHeaders);
    });
  });
  it('Sets CSRF header on POST', function () {
    server.respondWith('POST', /\//, function (request) {
      request.respond(200);
    });
    var httprequest = new _HttpDjangoJsonRequest.default('/');
    return httprequest.post('test').then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(withCsrfTokenRequestHeaders.size);
      expect(new Set(httprequest.requestHeaders.keys())).toEqual(new Set(withCsrfTokenRequestHeaders));
      expect(httprequest.requestHeaders.get('X-CSRFToken')).toEqual('testtoken');
    });
  });
  it('Sets CSRF header on PUT', function () {
    server.respondWith('PUT', /\//, function (request) {
      request.respond(200);
    });
    var httprequest = new _HttpDjangoJsonRequest.default('/');
    return httprequest.put('test').then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(withCsrfTokenRequestHeaders.size);
      expect(new Set(httprequest.requestHeaders.keys())).toEqual(new Set(withCsrfTokenRequestHeaders));
      expect(httprequest.requestHeaders.get('X-CSRFToken')).toEqual('testtoken');
    });
  });
  it('Sets CSRF header on PATCH', function () {
    server.respondWith('PATCH', /\//, function (request) {
      request.respond(200);
    });
    var httprequest = new _HttpDjangoJsonRequest.default('/');
    return httprequest.patch('test').then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(withCsrfTokenRequestHeaders.size);
      expect(new Set(httprequest.requestHeaders.keys())).toEqual(new Set(withCsrfTokenRequestHeaders));
      expect(httprequest.requestHeaders.get('X-CSRFToken')).toEqual('testtoken');
    });
  });
  it('Sets CSRF header on DELETE', function () {
    server.respondWith('DELETE', /\//, function (request) {
      request.respond(200);
    });
    var httprequest = new _HttpDjangoJsonRequest.default('/');
    return httprequest.httpdelete('test').then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(withCsrfTokenRequestHeaders.size);
      expect(new Set(httprequest.requestHeaders.keys())).toEqual(new Set(withCsrfTokenRequestHeaders));
      expect(httprequest.requestHeaders.get('X-CSRFToken')).toEqual('testtoken');
    });
  });
});
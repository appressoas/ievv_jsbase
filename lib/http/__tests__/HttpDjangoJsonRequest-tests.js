"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _HttpDjangoJsonRequest = _interopRequireDefault(require("../HttpDjangoJsonRequest"));
var sinon = _interopRequireWildcard(require("sinon"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var sinon = _interopRequireWildcard(require("sinon"));
var _HttpRequest = _interopRequireDefault(require("../HttpRequest"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var server;
describe('HttpRequest', function () {
  beforeEach(function () {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;
  });
  afterEach(function () {
    server.restore();
  });
  it('constructor without querystring', function () {
    var httprequest = new _HttpRequest.default('/api/people');
    expect(httprequest.urlParser.queryString.isEmpty()).toBe(true);
  });
  it('constructor with querystring', function () {
    var httprequest = new _HttpRequest.default('http://example.com/api/people?name=Jane');
    expect(httprequest.urlParser.queryString.urlencode()).toBe('name=Jane');
  });
  it('5xx response', function () {
    server.respondWith('POST', /\//, function (request) {
      request.respond(500);
    });
    var httprequest = new _HttpRequest.default('/');
    return httprequest.post('test').then(function (response) {
      throw new Error('This should not be called!');
    }, function (error) {
      expect(error.response.status).toBe(500);
      expect(error.response.isServerError()).toBe(true);
    });
  });
  it('4xx response', function () {
    server.respondWith('POST', /\//, function (request) {
      request.respond(400);
    });
    var httprequest = new _HttpRequest.default('/');
    return httprequest.post('test').then(function (response) {
      throw new Error('This should not be called!');
    }, function (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.isClientError()).toBe(true);
    });
  });
  it('3xx response', function () {
    server.respondWith('POST', /\//, function (request) {
      request.respond(301);
    });
    var httprequest = new _HttpRequest.default('/');
    return httprequest.post('test').then(function (response) {
      throw new Error('This should not be called!');
    }, function (error) {
      expect(error.response.status).toBe(301);
      expect(error.response.isRedirect()).toBe(true);
    });
  });
  it('3xx response treatRedirectResponseAsError=false', function () {
    server.respondWith('POST', /\//, function (request) {
      request.respond(301);
    });
    var httprequest = new _HttpRequest.default('/');
    httprequest.setTreatRedirectResponseAsError(false);
    return httprequest.post('test').then(function (response) {
      expect(response.status).toBe(301);
      expect(response.isRedirect()).toBe(true);
    }, function (error) {
      throw new Error("This should not be called! ".concat(error));
    });
  });
  it('Successful request', function () {
    server.respondWith('POST', /\//, function (request) {
      request.respond(200);
    });
    var httprequest = new _HttpRequest.default('/');
    return httprequest.post('test').then(function (response) {
      expect(response.status).toBe(200);
      expect(response.isSuccess()).toBe(true);
    }, function (error) {
      throw new Error("This should not be called! ".concat(error));
    });
  });
  it('Successful request body', function () {
    server.respondWith('POST', /\//, function (request) {
      request.respond(200, {}, 'test');
    });
    var httprequest = new _HttpRequest.default('/');
    return httprequest.post('test').then(function (response) {
      expect(response.body).toBe('test');
    });
  });
});
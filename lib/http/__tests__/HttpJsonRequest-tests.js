"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _HttpJsonRequest = _interopRequireDefault(require("../HttpJsonRequest"));
var _HttpRequest = _interopRequireDefault(require("../HttpRequest"));
var sinon = _interopRequireWildcard(require("sinon"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var server;
describe('HttpJsonRequest', function () {
  beforeEach(function () {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;
  });
  afterEach(function () {
    server.restore();
  });
  it('Unsuccessful request that reached server', function () {
    server.respondWith('POST', /\//, function (request) {
      request.respond(400);
    });
    var httprequest = new _HttpJsonRequest.default('/');
    return httprequest.post('test').then(function (response) {
      throw new Error('This should not be called!');
    }, function (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.isClientError()).toBe(true);
    });
  });
  it('Successful request', function () {
    server.respondWith('POST', /\//, function (request) {
      request.respond(200);
    });
    var httprequest = new _HttpJsonRequest.default('/');
    return httprequest.post('test').then(function (response) {
      expect(response.status).toBe(200);
      expect(response.isSuccess()).toBe(true);
    }, function (error) {
      throw new Error("This should not be called! ".concat(error));
    });
  });
  it('Successful request body', function () {
    server.respondWith('POST', /\//, function (request) {
      request.respond(200);
    });
    var httprequest = new _HttpJsonRequest.default('/');
    return httprequest.post('test').then(function (response) {
      expect(response.status).toBe(200);
      expect(response.isSuccess()).toBe(true);
    }, function (error) {
      throw new Error("This should not be called! ".concat(error));
    });
  });
  it('Successful request bodydata', function () {
    server.respondWith('POST', /\//, function (request) {
      request.respond(200, {
        'Content-Type': 'application/json'
      }, JSON.stringify({
        a: 10
      }));
    });
    var httprequest = new _HttpJsonRequest.default('/');
    return httprequest.post('test').then(function (response) {
      expect(response.bodydata.a).toBe(10);
    });
  });
  it('Sets content-type and Accept headers', function () {
    server.respondWith('POST', /\//, function (request) {
      request.respond(200);
    });
    var httprequest = new _HttpJsonRequest.default('/');
    return httprequest.post('test').then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(2);
      expect(httprequest.requestHeaders.get('Accept')).toBe('application/json');
      expect(httprequest.requestHeaders.get('Content-Type')).toBe('application/json; charset=UTF-8');
    });
  });
});
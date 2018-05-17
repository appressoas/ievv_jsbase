"use strict";

var _HttpJsonRequest = _interopRequireDefault(require("../HttpJsonRequest"));

var _HttpRequest = _interopRequireDefault(require("../HttpRequest"));

var sinon = _interopRequireWildcard(require("sinon"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
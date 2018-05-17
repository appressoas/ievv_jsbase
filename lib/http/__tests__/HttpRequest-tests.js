"use strict";

var sinon = _interopRequireWildcard(require("sinon"));

var _HttpRequest = _interopRequireDefault(require("../HttpRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
"use strict";

var _HttpDjangoFileRequest = _interopRequireDefault(require("../HttpDjangoFileRequest"));

var sinon = _interopRequireWildcard(require("sinon"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server;
describe('HttpDjangoFileRequest', function () {
  beforeEach(function () {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;
    document.cookie = 'csrftoken=testtoken';
  });
  afterEach(function () {
    server.restore();
  });
  it('Successful request', function () {
    server.respondWith('POST', /\//, function (request) {
      request.respond(200);
    });
    var httprequest = new _HttpDjangoFileRequest.default('/');
    return httprequest.post('test').then(function (response) {
      expect(response.status).toBe(200);
      expect(response.isSuccess()).toBe(true);
    }, function (error) {
      throw new Error("This should not be called! ".concat(error));
    });
  });
  it('Sets content-type and Accept headers', function () {
    var httprequest = new _HttpDjangoFileRequest.default('/');
    server.respondWith('POST', /\//, function (request) {
      request.respond(200);
    });
    return httprequest.post('test').then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(2);
      expect(httprequest.requestHeaders.get('Accept')).toBe('multipart/form-data');
      expect(httprequest.requestHeaders.get('X-CSRFToken')).toEqual('testtoken');
    });
  });
});
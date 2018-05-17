"use strict";

var _QueryString = _interopRequireDefault(require("../QueryString"));

var _UrlParser = require("../UrlParser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('UrlParser', function () {
  it('setQueryString', function () {
    var urlparser = new _UrlParser.UrlParser('http://example.com/');
    expect(urlparser.queryString.isEmpty()).toBe(true);
    var querystring = new _QueryString.default();
    querystring.set('name', 'Jane');
    urlparser.setQueryString(querystring);
    expect(urlparser.queryString.urlencode()).toBe('name=Jane');
  });
  it('buildUrl() no querystring', function () {
    var urlparser = new _UrlParser.UrlParser('http://example.com/api/people');
    expect(urlparser.buildUrl()).toBe('http://example.com/api/people');
  });
  it('buildUrl() with querystring', function () {
    var urlparser = new _UrlParser.UrlParser('http://example.com/api/people');
    urlparser.queryString = new _QueryString.default('name=Jane');
    expect(urlparser.buildUrl()).toBe('http://example.com/api/people?name=Jane');
  });
  it('with scheme - get scheme http', function () {
    var urlparser = new _UrlParser.UrlParser('http://example.com/api/people');
    expect(urlparser.scheme).toBe('http');
  });
  it('with scheme - get scheme https', function () {
    var urlparser = new _UrlParser.UrlParser('https://example.com/api/people');
    expect(urlparser.scheme).toBe('https');
  });
  it('with scheme - get domain', function () {
    var urlparser = new _UrlParser.UrlParser('http://example.com/api/people');
    expect(urlparser.domain).toBe('example.com');
  });
  it('with scheme - get path short', function () {
    var urlparser = new _UrlParser.UrlParser('http://example.com/a');
    expect(urlparser.path).toBe('/a');
  });
  it('with scheme - get path long', function () {
    var urlparser = new _UrlParser.UrlParser('http://example.com/api/people');
    expect(urlparser.path).toBe('/api/people');
  });
  it('with scheme, no path - get path', function () {
    var urlparser = new _UrlParser.UrlParser('http://example.com');
    expect(urlparser.path).toBe('');
  });
  it('no scheme, with domain - get domain', function () {
    var urlparser = new _UrlParser.UrlParser('example.com/api/people');
    expect(urlparser.domain).toBe('example.com');
  });
  it('no scheme, with domain - get path short', function () {
    var urlparser = new _UrlParser.UrlParser('example.com/a');
    expect(urlparser.path).toBe('/a');
  });
  it('no scheme, with domain - get path long', function () {
    var urlparser = new _UrlParser.UrlParser('example.com/api/people');
    expect(urlparser.path).toBe('/api/people');
  });
  it('no scheme, with domain, no path - get path', function () {
    var urlparser = new _UrlParser.UrlParser('example.com');
    expect(urlparser.path).toBe('');
  });
  it('no scheme, no domain - get path short', function () {
    var urlparser = new _UrlParser.UrlParser('/a');
    expect(urlparser.path).toBe('/a');
  });
  it('no scheme, no domain - get path long', function () {
    var urlparser = new _UrlParser.UrlParser('/api/people');
    expect(urlparser.path).toBe('/api/people');
  });
  it('no scheme, no domain, no path - get path', function () {
    var urlparser = new _UrlParser.UrlParser('');
    expect(urlparser.path).toBe('');
  });
  it('pathJoin', function () {
    expect(_UrlParser.UrlParser.pathJoin('/')).toBe('/');
    expect(_UrlParser.UrlParser.pathJoin('/test', 'user/')).toBe('/test/user/');
    expect(_UrlParser.UrlParser.pathJoin('/test/', 'user/')).toBe('/test/user/');
    expect(_UrlParser.UrlParser.pathJoin('/test/', '/user/')).toBe('/test/user/');
    expect(_UrlParser.UrlParser.pathJoin('/test/', '/user/', 10)).toBe('/test/user/10');
    expect(_UrlParser.UrlParser.pathJoin('http://example.com/test/', '/user/', 10)).toBe('http://example.com/test/user/10');
  });
});
import QueryString from "../QueryString";
import {UrlParser} from "../UrlParser";


describe('UrlParser', () => {
  it('setQueryString', () => {
    const urlparser = new UrlParser('http://example.com/');
    expect(urlparser.queryString.isEmpty()).toBe(true);
    const querystring = new QueryString();
    querystring.set('name', 'Jane');
    urlparser.setQueryString(querystring);
    expect(urlparser.queryString.urlencode()).toBe('name=Jane');
  });

  it('buildUrl() no querystring', () => {
    const urlparser = new UrlParser('http://example.com/api/people');
    expect(urlparser.buildUrl()).toBe('http://example.com/api/people');
  });

  it('buildUrl() with querystring', () => {
    const urlparser = new UrlParser('http://example.com/api/people');
    urlparser.queryString = new QueryString('name=Jane');
    expect(urlparser.buildUrl()).toBe('http://example.com/api/people?name=Jane');
  });

  it('with scheme - get scheme http', () => {
    const urlparser = new UrlParser('http://example.com/api/people');
    expect(urlparser.scheme).toBe('http');
  });

  it('with scheme - get scheme https', () => {
    const urlparser = new UrlParser('https://example.com/api/people');
    expect(urlparser.scheme).toBe('https');
  });

  it('with scheme - get domain', () => {
    const urlparser = new UrlParser('http://example.com/api/people');
    expect(urlparser.domain).toBe('example.com');
  });

  it('with scheme - get path short', () => {
    const urlparser = new UrlParser('http://example.com/a');
    expect(urlparser.path).toBe('/a');
  });

  it('with scheme - get path long', () => {
    const urlparser = new UrlParser('http://example.com/api/people');
    expect(urlparser.path).toBe('/api/people');
  });

  it('with scheme, no path - get path', () => {
    const urlparser = new UrlParser('http://example.com');
    expect(urlparser.path).toBe('');
  });

  it('no scheme, with domain - get domain', () => {
    const urlparser = new UrlParser('example.com/api/people');
    expect(urlparser.domain).toBe('example.com');
  });

  it('no scheme, with domain - get path short', () => {
    const urlparser = new UrlParser('example.com/a');
    expect(urlparser.path).toBe('/a');
  });

  it('no scheme, with domain - get path long', () => {
    const urlparser = new UrlParser('example.com/api/people');
    expect(urlparser.path).toBe('/api/people');
  });

  it('no scheme, with domain, no path - get path', () => {
    const urlparser = new UrlParser('example.com');
    expect(urlparser.path).toBe('');
  });

  it('no scheme, no domain - get path short', () => {
    const urlparser = new UrlParser('/a');
    expect(urlparser.path).toBe('/a');
  });

  it('no scheme, no domain - get path long', () => {
    const urlparser = new UrlParser('/api/people');
    expect(urlparser.path).toBe('/api/people');
  });

  it('no scheme, no domain, no path - get path', () => {
    const urlparser = new UrlParser('');
    expect(urlparser.path).toBe('');
  });

  it('pathJoin', () => {
    expect(UrlParser.pathJoin('/')).toBe('/');
    expect(UrlParser.pathJoin('/test', 'user/')).toBe('/test/user/');
    expect(UrlParser.pathJoin('/test/', 'user/')).toBe('/test/user/');
    expect(UrlParser.pathJoin('/test/', '/user/')).toBe('/test/user/');
    expect(UrlParser.pathJoin('/test/', '/user/', 10)).toBe('/test/user/10');
    expect(UrlParser.pathJoin('http://example.com/test/', '/user/', 10)).toBe(
      'http://example.com/test/user/10');
  });

});

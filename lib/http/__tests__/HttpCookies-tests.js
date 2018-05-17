"use strict";

var _HttpCookies = _interopRequireWildcard(require("../HttpCookies.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

describe('HttpCookies', function () {
  it('HttpCookies.contains()', function () {
    var cookies = new _HttpCookies.default('other=othervalue;test=testvalue;evenanother=evenanothervalue');
    expect(cookies.contains('test')).toBe(true);
    expect(cookies.contains('other')).toBe(true);
    expect(cookies.contains('evenanother')).toBe(true);
  });
  it('HttpCookies.get() simple', function () {
    var cookies = new _HttpCookies.default('test=testvalue');
    expect(cookies.get('test')).toBe('testvalue');
  });
  it('HttpCookies.get() from document', function () {
    document.cookie = 'fromdocument=fromdocumentvalue';
    var cookies = new _HttpCookies.default();
    expect(cookies.get('fromdocument')).toBe('fromdocumentvalue');
  });
  it('HttpCookies.get() multiple cookies', function () {
    var cookies = new _HttpCookies.default('other=othervalue;test=testvalue;evenanother=evenanothervalue');
    expect(cookies.get('test')).toBe('testvalue');
    expect(cookies.get('other')).toBe('othervalue');
    expect(cookies.get('evenanother')).toBe('evenanothervalue');
  });
  it('HttpCookies.get() fallback', function () {
    var cookies = new _HttpCookies.default('test=testvalue');
    expect(cookies.get('test2', 'thefallbackvalue')).toBe('thefallbackvalue');
  });
  it('HttpCookies.getStrict()', function () {
    var cookies = new _HttpCookies.default('test=testvalue');
    expect(function () {
      return cookies.getStrict('test2');
    }).toThrowError(_HttpCookies.HttpCookieNotFoundError);
    expect(function () {
      return cookies.getStrict('test2');
    }).toThrowError('Cookie not found: "test2".');
  });
});
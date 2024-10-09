"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _HttpCookies = _interopRequireWildcard(require("../HttpCookies.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
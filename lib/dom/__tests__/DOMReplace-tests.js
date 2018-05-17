"use strict";

var _DOMReplace = _interopRequireDefault(require("../DOMReplace.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DOMReplace', function () {
  it('DOMReplace.replaceInnerHtml()', function () {
    document.body.innerHTML = "\n            <div id=\"id_test\">\n                Hello\n            </div>";
    var domreplace = new _DOMReplace.default('id_test');
    domreplace.replaceInnerHtml('<p>Test</p>');
    expect(document.body.querySelectorAll('p').length).toBe(1);
    expect(document.body.querySelectorAll('p')[0].textContent).toBe('Test');
  });
  it('DOMReplace.appendInnerHtml()', function () {
    document.body.innerHTML = "\n            <div id=\"id_test\">\n                <p>Old</p>\n            </div>";
    var domreplace = new _DOMReplace.default('id_test');
    domreplace.appendInnerHtml('<p>New</p>');
    expect(document.body.querySelectorAll('p').length).toBe(2);
    expect(document.body.querySelectorAll('p')[0].textContent).toBe('Old');
    expect(document.body.querySelectorAll('p')[1].textContent).toBe('New');
  });
  it('DOMReplace.prependInnerHtml()', function () {
    document.body.innerHTML = "\n            <div id=\"id_test\">\n                <p>Old</p>\n            </div>";
    var domreplace = new _DOMReplace.default('id_test');
    domreplace.prependInnerHtml('<p>New</p>');
    expect(document.body.querySelectorAll('p').length).toBe(2);
    expect(document.body.querySelectorAll('p')[0].textContent).toBe('New');
    expect(document.body.querySelectorAll('p')[1].textContent).toBe('Old');
  });
});
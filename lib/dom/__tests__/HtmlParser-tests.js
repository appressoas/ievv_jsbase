"use strict";

var _HtmlParser = _interopRequireDefault(require("../HtmlParser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('HtmlParser', function () {
  it('HtmlParser().rootElements', function () {
    var elements = new _HtmlParser.default('<p>Test</p><span>Test2</span>').rootElements;
    expect(elements.length).toBe(2);
    expect(elements[0].tagName.toLowerCase()).toBe('p');
    expect(elements[1].tagName.toLowerCase()).toBe('span');
  });
  it('HtmlParser().firstRootElement', function () {
    var element = new _HtmlParser.default('<p>Test</p>').firstRootElement;
    expect(element.textContent).toBe('Test');
    expect(element.tagName.toLowerCase()).toBe('p');
  });
  it('HtmlParser().querySelector()', function () {
    var element = new _HtmlParser.default('<p>Test</p>').querySelector('p');
    expect(element.textContent).toBe('Test');
    expect(element.tagName.toLowerCase()).toBe('p');
  });
  it('HtmlParser() querySelectorAll', function () {
    var elements = new _HtmlParser.default('<p>Test1</p><p>Test2</p>').querySelectorAll('p');
    expect(elements.length).toBe(2);
    expect(elements[0].textContent).toBe('Test1');
    expect(elements[1].textContent).toBe('Test2');
  });
  it('HtmlParser() tree', function () {
    var htmlParser = new _HtmlParser.default('<p><em>Test1</em><strong>Test2</strong></p>');
    expect(htmlParser.querySelectorAll('p').length).toBe(1);
    expect(htmlParser.querySelectorAll('p em')[0].textContent).toBe('Test1');
    expect(htmlParser.querySelectorAll('p strong')[0].textContent).toBe('Test2');
  });
  it('HtmlParser() HTML document', function () {
    var htmlParser = new _HtmlParser.default('<html><body><p>Test</p></body></html>');
    expect(htmlParser.firstRootElement.tagName.toLowerCase()).toBe('p');
  });
});
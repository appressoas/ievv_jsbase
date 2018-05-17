"use strict";

var _utils = require("../utils");

describe('isSelfClosingTag', function () {
  it('img', function () {
    expect((0, _utils.isSelfClosingTag)('img')).toBe(true);
  });
  it('br', function () {
    expect((0, _utils.isSelfClosingTag)('br')).toBe(true);
  });
  it('hr', function () {
    expect((0, _utils.isSelfClosingTag)('hr')).toBe(true);
  });
  it('p', function () {
    expect((0, _utils.isSelfClosingTag)('p')).toBe(false);
  });
});
describe('isInlineTag', function () {
  it('em', function () {
    expect((0, _utils.isInlineTag)('em')).toBe(true);
  });
  it('strong', function () {
    expect((0, _utils.isInlineTag)('strong')).toBe(true);
  });
  it('a', function () {
    expect((0, _utils.isInlineTag)('a')).toBe(true);
  });
  it('img', function () {
    expect((0, _utils.isInlineTag)('img')).toBe(true);
  });
  it('br', function () {
    expect((0, _utils.isInlineTag)('br')).toBe(true);
  });
  it('hr', function () {
    expect((0, _utils.isInlineTag)('hr')).toBe(false);
  });
  it('p', function () {
    expect((0, _utils.isInlineTag)('p')).toBe(false);
  });
});
describe('escapeAttributeValue', function () {
  it('& to be escaped', function () {
    expect((0, _utils.escapeAttributeValue)('&')).toEqual('&amp;');
  });
  it('< to be escaped', function () {
    expect((0, _utils.escapeAttributeValue)('<')).toEqual('&lt;');
  });
  it('> to be escaped', function () {
    expect((0, _utils.escapeAttributeValue)('>')).toEqual('&gt;');
  });
  it('" to be escaped', function () {
    expect((0, _utils.escapeAttributeValue)('"')).toEqual('&quot;');
  });
});
describe('attributeObjectToHtml', function () {
  it('empty attributes object', function () {
    expect((0, _utils.attributeObjectToHtml)({})).toEqual('');
  });
  it('undefined attributes object', function () {
    expect((0, _utils.attributeObjectToHtml)()).toEqual('');
  });
  it('attributes object simple', function () {
    expect((0, _utils.attributeObjectToHtml)({
      'name': 'Peter'
    })).toEqual(' name="Peter"');
  });
  it('attributes object value coerced to string', function () {
    expect((0, _utils.attributeObjectToHtml)({
      'age': 28
    })).toEqual(' age="28"');
  });
  it('multiple attributes', function () {
    var result = (0, _utils.attributeObjectToHtml)({
      'a': 'A',
      'b': 'B'
    });
    expect(result).toContain(' a="A"');
    expect(result).toContain(' b="B"');
  });
});
describe('makeHtmlStartTag', function () {
  it('Sanity', function () {
    expect((0, _utils.makeHtmlStartTag)('p')).toEqual('<p>');
  });
  it('Self closing tag', function () {
    expect((0, _utils.makeHtmlStartTag)('img')).toEqual('<img>');
  });
  it('Attributes', function () {
    expect((0, _utils.makeHtmlStartTag)('p', {
      'class': 'test'
    })).toEqual('<p class="test">');
  });
});
describe('makeHtmlEndTag', function () {
  it('Sanity', function () {
    expect((0, _utils.makeHtmlEndTag)('p')).toEqual('</p>');
  });
  it('Self closing tag', function () {
    expect((0, _utils.makeHtmlEndTag)('img')).toEqual('');
  });
});
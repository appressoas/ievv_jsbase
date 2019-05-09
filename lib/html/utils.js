"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSelfClosingTag = isSelfClosingTag;
exports.isInlineTag = isInlineTag;
exports.escapeAttributeValue = escapeAttributeValue;
exports.attributeObjectToHtml = attributeObjectToHtml;
exports.makeHtmlStartTag = makeHtmlStartTag;
exports.makeHtmlEndTag = makeHtmlEndTag;

var _SELF_CLOSING_TAGS = new Set(['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta']);

var _INLINE_TAGS = new Set(['b', 'big', 'i', 'small', 'tt', 'abbr', 'acronym', 'cite', 'code', 'dfn', 'em', 'kbd', 'strong', 'samp', 'time', 'var', 'a', 'bdo', 'br', 'img', 'map', 'object', 'q', 'script', 'span', 'sub', 'sup', 'button', 'input', 'label', 'select', 'textarea']);
/**
 * Returns ``True`` if the provided ``tagName`` is a self closing tag.
 *
 * @param {string} tagName The tag name.
 */


function isSelfClosingTag(tagName) {
  return _SELF_CLOSING_TAGS.has(tagName);
}
/**
 * Returns ``True`` if the provided ``tagName`` is an inline tag.
 *
 * @param {string} tagName The tag name.
 */


function isInlineTag(tagName) {
  return _INLINE_TAGS.has(tagName);
}
/**
 * Escape HTML attribute value.
 *
 * @param value The attribute value to escape. Coerced to string if it
 *      not a string.
 * @returns {string}
 */


function escapeAttributeValue(value) {
  if (typeof value != 'string') {
    value = "".concat(value);
  }

  return value.replace(/\&/g, '&amp;').replace(/</g, '&lt;').replace(/\>/g, '&gt;').replace(/\"/g, '&quot;');
}
/**
 * Takes an object that maps attribute names to values, and
 * returns it as html formatted attributes.
 *
 * The result will start with an empty space if the provided
 * object is not empty.
 *
 * @param {{}} attributes Object mapping attribute names to values.
 * @returns {string} The HTML encoded attributes.
 */


function attributeObjectToHtml(attributes) {
  if (typeof attributes == 'undefined') {
    return '';
  }

  var resultHtml = '';

  for (var _i = 0, _Object$keys = Object.keys(attributes); _i < _Object$keys.length; _i++) {
    var attributeName = _Object$keys[_i];
    var attributeValue = attributes[attributeName];
    var escapedValue = escapeAttributeValue(attributeValue);
    resultHtml += " ".concat(attributeName, "=\"").concat(escapedValue, "\"");
  }

  return resultHtml;
}
/**
 * Make a HTML start tag.
 *
 * Handles self-closing tags automatically.
 *
 * @param {string} tagName Tag name.
 * @param {{}} attributes Object mapping attribute names to values.
 * @returns {string} The HTML start tag.
 */


function makeHtmlStartTag(tagName, attributes) {
  // NOTE: We use HTML5 syntax for self-closing tags, so no /> is needed
  return "<".concat(tagName).concat(attributeObjectToHtml(attributes), ">");
}
/**
 * Make a HTML end tag.
 *
 * Handles self-closing tags automatically.
 *
 * @param {string} tagName Tag name.
 * @returns {string} The HTML end tag.
 */


function makeHtmlEndTag(tagName) {
  if (isSelfClosingTag(tagName)) {
    return '';
  } else {
    return "</".concat(tagName, ">");
  }
}
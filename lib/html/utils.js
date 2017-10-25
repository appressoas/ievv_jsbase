'use strict';

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
        value = '' + value;
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
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(attributes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var attributeName = _step.value;

            var attributeValue = attributes[attributeName];
            var escapedValue = escapeAttributeValue(attributeValue);
            resultHtml += ' ' + attributeName + '="' + escapedValue + '"';
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
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
    return '<' + tagName + attributeObjectToHtml(attributes) + '>';
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
        return '</' + tagName + '>';
    }
}
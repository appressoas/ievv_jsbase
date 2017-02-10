
const _SELF_CLOSING_TAGS = new Set([
    'img',
    'br',
    'hr',
    'area',
    'base',
    'basefont',
    'input',
    'link',
    'meta'
]);

const _INLINE_TAGS = new Set([
    'b',
    'big',
    'i',
    'small',
    'tt',
    'abbr',
    'acronym',
    'cite',
    'code',
    'dfn',
    'em',
    'kbd',
    'strong',
    'samp',
    'time',
    'var',
    'a',
    'bdo',
    'br',
    'img',
    'map',
    'object',
    'q',
    'script',
    'span',
    'sub',
    'sup',
    'button',
    'input',
    'label',
    'select',
    'textarea',
]);


/**
 * Returns ``True`` if the provided ``tagName`` is a self closing tag.
 *
 * @param {string} tagName The tag name.
 */
export function isSelfClosingTag(tagName) {
    return _SELF_CLOSING_TAGS.has(tagName);
}


/**
 * Returns ``True`` if the provided ``tagName`` is an inline tag.
 *
 * @param {string} tagName The tag name.
 */
export function isInlineTag(tagName) {
    return _INLINE_TAGS.has(tagName);
}


/**
 * Escape HTML attribute value.
 *
 * @param value The attribute value to escape. Coerced to string if it
 *      not a string.
 * @returns {string}
 */
export function escapeAttributeValue(value) {
    if (typeof(value) != 'string') {
        value = `${value}`;
    }
    return value.replace(/\&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/\>/g, '&gt;')
        .replace(/\"/g, '&quot;');
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
export function attributeObjectToHtml(attributes) {
    if(typeof attributes == 'undefined') {
        return '';
    }
    let resultHtml = '';
    for(let attributeName of Object.keys(attributes)) {
        let attributeValue = attributes[attributeName];
        let escapedValue = escapeAttributeValue(attributeValue);
        resultHtml += ` ${attributeName}="${escapedValue}"`;
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
export function makeHtmlStartTag(tagName, attributes) {
    // NOTE: We use HTML5 syntax for self-closing tags, so no /> is needed
    return `<${tagName}${attributeObjectToHtml(attributes)}>`;
}


/**
 * Make a HTML end tag.
 *
 * Handles self-closing tags automatically.
 *
 * @param {string} tagName Tag name.
 * @returns {string} The HTML end tag.
 */
export function makeHtmlEndTag(tagName) {
    if(isSelfClosingTag(tagName)) {
        return '';
    } else {
        return `</${tagName}>`;
    }
}

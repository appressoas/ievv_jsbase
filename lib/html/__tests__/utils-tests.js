import {isSelfClosingTag, escapeAttributeValue, attributeObjectToHtml} from "../utils";
import {isInlineTag} from "../utils";
import {makeHtmlStartTag} from "../utils";
import {makeHtmlEndTag} from "../utils";

describe('isSelfClosingTag', () => {
    it('img', () => {
        expect(isSelfClosingTag('img')).toBe(true);
    });

    it('br', () => {
        expect(isSelfClosingTag('br')).toBe(true);
    });

    it('hr', () => {
        expect(isSelfClosingTag('hr')).toBe(true);
    });

    it('p', () => {
        expect(isSelfClosingTag('p')).toBe(false);
    });
});

describe('isInlineTag', () => {
    it('em', () => {
        expect(isInlineTag('em')).toBe(true);
    });

    it('strong', () => {
        expect(isInlineTag('strong')).toBe(true);
    });

    it('a', () => {
        expect(isInlineTag('a')).toBe(true);
    });

    it('img', () => {
        expect(isInlineTag('img')).toBe(true);
    });

    it('br', () => {
        expect(isInlineTag('br')).toBe(true);
    });

    it('hr', () => {
        expect(isInlineTag('hr')).toBe(false);
    });

    it('p', () => {
        expect(isInlineTag('p')).toBe(false);
    });
});


describe('escapeAttributeValue', () => {
    it('& to be escaped', () => {
        expect(escapeAttributeValue('&')).toEqual('&amp;');
    });

    it('< to be escaped', () => {
        expect(escapeAttributeValue('<')).toEqual('&lt;');
    });

    it('> to be escaped', () => {
        expect(escapeAttributeValue('>')).toEqual('&gt;');
    });

    it('" to be escaped', () => {
        expect(escapeAttributeValue('"')).toEqual('&quot;');
    });
});


describe('attributeObjectToHtml', () => {
    it('empty attributes object', () => {
        expect(attributeObjectToHtml({})).toEqual('');
    });

    it('undefined attributes object', () => {
        expect(attributeObjectToHtml()).toEqual('');
    });

    it('attributes object simple', () => {
        expect(attributeObjectToHtml({
            'name': 'Peter'
        })).toEqual(' name="Peter"');
    });

    it('attributes object value coerced to string', () => {
        expect(attributeObjectToHtml({
            'age': 28
        })).toEqual(' age="28"');
    });

    it('multiple attributes', () => {
        const result = attributeObjectToHtml({
            'a': 'A',
            'b': 'B'
        });
        expect(result).toContain(' a="A"');
        expect(result).toContain(' b="B"');
    });
});


describe('makeHtmlStartTag', () => {
    it('Sanity', () => {
        expect(makeHtmlStartTag('p')).toEqual('<p>');
    });

    it('Self closing tag', () => {
        expect(makeHtmlStartTag('img')).toEqual('<img>');
    });

    it('Attributes', () => {
        expect(makeHtmlStartTag('p', {'class': 'test'})).toEqual('<p class="test">');
    });
});


describe('makeHtmlEndTag', () => {
    it('Sanity', () => {
        expect(makeHtmlEndTag('p')).toEqual('</p>');
    });

    it('Self closing tag', () => {
        expect(makeHtmlEndTag('img')).toEqual('');
    });
});

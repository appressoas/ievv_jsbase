import HttpCookies from '../HttpCookies.js';
import {HttpCookieNotFoundError} from '../HttpCookies.js';


describe('HttpCookies', () => {
    it('HttpCookies.contains()', () => {
        const cookies = new HttpCookies('other=othervalue;test=testvalue;evenanother=evenanothervalue');
        expect(cookies.contains('test')).toBe(true);
        expect(cookies.contains('other')).toBe(true);
        expect(cookies.contains('evenanother')).toBe(true);
    });

    it('HttpCookies.get() simple', () => {
        const cookies = new HttpCookies('test=testvalue');
        expect(cookies.get('test')).toBe('testvalue');
    });

    it('HttpCookies.get() from document', () => {
        document.cookie = 'fromdocument=fromdocumentvalue';
        const cookies = new HttpCookies();
        expect(cookies.get('fromdocument')).toBe('fromdocumentvalue');
    });

    it('HttpCookies.get() multiple cookies', () => {
        const cookies = new HttpCookies('other=othervalue;test=testvalue;evenanother=evenanothervalue');
        expect(cookies.get('test')).toBe('testvalue');
        expect(cookies.get('other')).toBe('othervalue');
        expect(cookies.get('evenanother')).toBe('evenanothervalue');
    });

    it('HttpCookies.get() fallback', () => {
        const cookies = new HttpCookies('test=testvalue');
        expect(cookies.get('test2', 'thefallbackvalue')).toBe('thefallbackvalue');
    });

    it('HttpCookies.getStrict()', () => {
        const cookies = new HttpCookies('test=testvalue');
        expect(() => cookies.getStrict('test2')).toThrowError(HttpCookieNotFoundError);
        expect(() => cookies.getStrict('test2')).toThrowError('Cookie not found: "test2".');
    });
});

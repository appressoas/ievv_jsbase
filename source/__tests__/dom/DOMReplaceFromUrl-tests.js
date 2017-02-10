import DOMReplaceFromUrl from '../../dom/DOMReplaceFromUrl.js';
import HttpRequest from "../../http/HttpRequest";
import {XMLHttpRequestMock} from "../../__testhelpers__/XMLHttpRequestMock";


class MockDOMReplaceFromUrl extends DOMReplaceFromUrl {
    _makeRequest(url) {
        let httpRequest = new HttpRequest(url);
        httpRequest.request = new XMLHttpRequestMock('onload', {
            status: 200,
            responseText: '<p>From server</p>'
        });
        return httpRequest;
    }
}


describe('DOMReplaceFromUrl', () => {
    it('DOMReplaceFromUrl.replaceInnerHtml()', () => {
        document.body.innerHTML = `
            <div id="id_test">
                <p>Original</p>
            </div>`;
        const domreplace = new MockDOMReplaceFromUrl('id_test');
        return domreplace.replaceInnerHtml('http://example.com').then((htmlString) => {
            expect(htmlString).toBe('<p>From server</p>');
            expect(document.body.querySelectorAll('p').length).toBe(1);
            expect(document.body.querySelectorAll('p')[0].textContent).toBe('From server');
        });
    });

    it('DOMReplaceFromUrl.appendInnerHtml()', () => {
        document.body.innerHTML = `
            <div id="id_test">
                <p>Original</p>
            </div>`;
        const domreplace = new MockDOMReplaceFromUrl('id_test');
        return domreplace.appendInnerHtml('http://example.com').then((htmlString) => {
            expect(htmlString).toBe('<p>From server</p>');
            expect(document.body.querySelectorAll('p').length).toBe(2);
            expect(document.body.querySelectorAll('p')[0].textContent).toBe('Original');
            expect(document.body.querySelectorAll('p')[1].textContent).toBe('From server');
        });
    });

    it('DOMReplaceFromUrl.prependInnerHtml()', () => {
        document.body.innerHTML = `
            <div id="id_test">
                <p>Original</p>
            </div>`;
        const domreplace = new MockDOMReplaceFromUrl('id_test');
        return domreplace.prependInnerHtml('http://example.com').then((htmlString) => {
            expect(htmlString).toBe('<p>From server</p>');
            expect(document.body.querySelectorAll('p').length).toBe(2);
            expect(document.body.querySelectorAll('p')[0].textContent).toBe('From server');
            expect(document.body.querySelectorAll('p')[1].textContent).toBe('Original');
        });
    });
});

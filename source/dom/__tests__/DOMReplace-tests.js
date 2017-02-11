import DOMReplace from '../DOMReplace.js';


describe('DOMReplace', () => {
    it('DOMReplace.replaceInnerHtml()', () => {
        document.body.innerHTML = `
            <div id="id_test">
                Hello
            </div>`;
        const domreplace = new DOMReplace('id_test');
        domreplace.replaceInnerHtml('<p>Test</p>');
        expect(document.body.querySelectorAll('p').length).toBe(1);
        expect(document.body.querySelectorAll('p')[0].textContent).toBe('Test');
    });

    it('DOMReplace.appendInnerHtml()', () => {
        document.body.innerHTML = `
            <div id="id_test">
                <p>Old</p>
            </div>`;
        const domreplace = new DOMReplace('id_test');
        domreplace.appendInnerHtml('<p>New</p>');
        expect(document.body.querySelectorAll('p').length).toBe(2);
        expect(document.body.querySelectorAll('p')[0].textContent).toBe('Old');
        expect(document.body.querySelectorAll('p')[1].textContent).toBe('New');
    });

    it('DOMReplace.prependInnerHtml()', () => {
        document.body.innerHTML = `
            <div id="id_test">
                <p>Old</p>
            </div>`;
        const domreplace = new DOMReplace('id_test');
        domreplace.prependInnerHtml('<p>New</p>');
        expect(document.body.querySelectorAll('p').length).toBe(2);
        expect(document.body.querySelectorAll('p')[0].textContent).toBe('New');
        expect(document.body.querySelectorAll('p')[1].textContent).toBe('Old');
    });
});

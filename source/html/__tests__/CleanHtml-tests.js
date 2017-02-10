import CleanHtml from "../CleanHtml";
import {FlatListCleanerNode} from "../CleanHtml";
import {MergeIntoParentCleanerNode} from "../CleanHtml";


describe('CleanHtml', () => {
    it('sanity', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        expect(htmlCleaner.clean('<p>Test</p>')).toEqual(
            '<p>Test</p>');
    });

    it('only allowed tags sanity', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = [];
        expect(htmlCleaner.clean('<p class="test">Test</p>')).toEqual(
            'Test');
    });

    it('only allowed tags', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['em', 'strong'];
        expect(htmlCleaner.clean(
            '<p class="test"><em>Test1</em> Test 2 <i>Test 3</i> <strong>Test 4</strong></p>'))
            .toEqual('<em>Test1</em> Test 2 Test 3 <strong>Test 4</strong>');
    });

    it('allowedAttributesMap sanity', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        htmlCleaner.options.allowedAttributesMap = {
            'p': ['class']
        };
        expect(htmlCleaner.clean('<p class="testclass" id="id_test">Test</p>')).toEqual(
            '<p class="testclass">Test</p>');
    });

    it('allowedAttributesMap only applies to specified tags', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p', 'em'];
        htmlCleaner.options.allowedAttributesMap = {
            'p': ['class']
        };
        expect(htmlCleaner.clean('<p class="test"><em class="test">Test</em></p>')).toEqual(
            '<p class="test"><em>Test</em></p>');
    });

    it('wrapStandaloneInline text', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        htmlCleaner.options.wrapStandaloneInlineTagName = 'p';
        expect(htmlCleaner.clean('Test')).toEqual(
            '<p>Test</p>');
    });

    it('wrapStandaloneInline tag', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p', 'em'];
        htmlCleaner.options.wrapStandaloneInlineTagName = 'p';
        expect(htmlCleaner.clean('<em>Test</em>')).toEqual(
            '<p><em>Test</em></p>');
    });

    it('wraps inline other tags than p works', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['li', 'em'];
        htmlCleaner.options.wrapStandaloneInlineTagName = 'li';
        expect(htmlCleaner.clean('<em>Test</em>')).toEqual(
            '<li><em>Test</em></li>');
    });

    it('wraps inline custom attributes', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        htmlCleaner.options.allowedAttributesMap = {
            p: ['class']
        };
        htmlCleaner.options.wrapStandaloneInlineTagName = 'p';
        htmlCleaner.options.wrapStandaloneInlineTagAttributes = {
            'class': 'testclass'
        };
        expect(htmlCleaner.clean('Test')).toEqual(
            '<p class="testclass">Test</p>');
    });

    it('transforms tags simple', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        htmlCleaner.options.transformTagsMap = {
            'div': 'p'
        };
        expect(htmlCleaner.clean('<div>Test</div>')).toEqual(
            '<p>Test</p>');
    });

    it('transforms tags deep', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p', 'em'];
        htmlCleaner.options.transformTagsMap = {
            'div': 'p',
            'i': 'em'
        };
        expect(htmlCleaner.clean('<div><i>Test</i></div>')).toEqual(
            '<p><em>Test</em></p>');
    });

    it('prevent nested simple', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['div'];
        expect(htmlCleaner.clean('<div><div>Test</div></div>')).toEqual(
            '<div>Test</div>');
    });

    it('prevent nested very recursive', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['div'];
        expect(htmlCleaner.clean(
            '<div>Pre <div><div>Test</div></div> Post</div>')).toEqual(
            '<div>Pre Test Post</div>');
    });

    it('FlatListCleanerNode', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['ul', 'li'];
        htmlCleaner.options.allowNestedWithinSameTagSet = ['ul', 'li'];
        htmlCleaner.options.setCleanerNodeClassForTagName('ul', FlatListCleanerNode);
        const original =
            '<ul>' +
                '<li>A</li>' +
                '<li>B</li>' +
                '<li>' +
                    'C' +
                    '<ul>' +
                        '<li>C.1</li>' +
                        '<li>C.2</li>' +
                        '<li>' +
                            'C.3' +
                            '<ul>' +
                                '<li>C.3.1</li>' +
                                '<li>C.3.2</li>' +
                            '</ul>' +
                        '</li>' +
                    '</ul>' +
                '</li>' +
            '</ul>';
        const expected =
            '<ul>' +
                '<li>A</li>' +
                '<li>B</li>' +
                '<li>C</li>' +
                '<li>C.1</li>' +
                '<li>C.2</li>' +
                '<li>C.3</li>' +
                '<li>C.3.1</li>' +
                '<li>C.3.2</li>' +
            '</ul>';
        expect(htmlCleaner.clean(original)).toEqual(expected);
    });

    it('Force common parent is possible', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['ul', 'li'];
        htmlCleaner.options.allowNestedWithinSameTagSet = ['ul', 'li'];
        htmlCleaner.options.allowedAttributesMap = {
            'ul': ['class']
        };
        htmlCleaner.options.setCleanerNodeClassForTagName('ul', FlatListCleanerNode);
        htmlCleaner.options.rootCleanerNodeTagName = 'ul';
        htmlCleaner.options.rootCleanerNodeAttributes = {'class': 'testclass'};
        const original =
            '<ul>' +
                '<li>A</li>' +
                '<li>' +
                    'B' +
                    '<ul>' +
                        '<li>B.1</li>' +
                        '<li>' +
                            'B.2' +
                            '<ul>' +
                                '<li>B.2.1</li>' +
                            '</ul>' +
                        '</li>' +
                    '</ul>' +
                '</li>' +
            '</ul>' +
            '<ul>' +
                '<li>From list 2</li>' +
            '</ul>';
        const expected =
            '<ul class="testclass">' +
                '<li>A</li>' +
                '<li>B</li>' +
                '<li>B.1</li>' +
                '<li>B.2</li>' +
                '<li>B.2.1</li>' +
                '<li>From list 2</li>' +
            '</ul>';
        expect(htmlCleaner.clean(original)).toEqual(expected);
    });

    // it('mergeMode', () => {
    //     const htmlCleaner = new CleanHtml();
    //     htmlCleaner.options.allowedTagsSet = ['ul', 'li'];
        // expect(htmlCleaner.clean('<p>This is</p>')).toEqual(expected);
    // });
});

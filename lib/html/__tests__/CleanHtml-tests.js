import CleanHtml from "../CleanHtml";
import {FlatListCleanerNode} from "../CleanHtml";
import {MergeIntoParentCleanerNode} from "../CleanHtml"
import {CleanerNode} from "../CleanHtml";
import {CleanHtmlOptions} from "../CleanHtml";

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

    it('normalizeEmptyTags remove empty p', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        htmlCleaner.options.normalizeEmptyTags = {
            remove: ['p']
        };
        expect(htmlCleaner.clean('<p></p>').toString()).toEqual('');
    });

    it('normalizeEmptyTags remove empty p at beginning', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        htmlCleaner.options.normalizeEmptyTags = {
            remove: ['p']
        };
        expect(htmlCleaner.clean('<p></p><p>hello</p>').toString()).toEqual('<p>hello</p>');
    });

    it('normalizeEmptyTags remove empty p at end', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        htmlCleaner.options.normalizeEmptyTags = {
            remove: ['p']
        };
        expect(htmlCleaner.clean('<p>hello</p><p></p>').toString()).toEqual('<p>hello</p>');
    });

    it('normalizeEmptyTags remove empty p in middle', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        htmlCleaner.options.normalizeEmptyTags = {
            remove: ['p']
        };
        expect(htmlCleaner.clean('<p>hello</p><p></p><p>goodbye</p>').toString()).toEqual('<p>hello</p><p>goodbye</p>');
    });

    it('normalizeEmptyTags fill empty p', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        htmlCleaner.options.normalizeEmptyTags = {
            fill: {
                p: '<br>'
            }
        };
        expect(htmlCleaner.clean('<p></p>').toString()).toEqual('<p><br></p>');
    });

    it('normalizeEmptyTags fill empty p at beginning', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        htmlCleaner.options.normalizeEmptyTags = {
            fill: {
                p: '<br>'
            }
        };
        expect(htmlCleaner.clean('<p></p><p>hello</p>').toString()).toEqual('<p><br></p><p>hello</p>');
    });

    it('normalizeEmptyTags fill empty p at end', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        htmlCleaner.options.normalizeEmptyTags = {
            fill: {
                p: '<br>'
            }
        };
        expect(htmlCleaner.clean('<p>hello</p><p></p>').toString()).toEqual('<p>hello</p><p><br></p>');
    });

    it('normalizeEmptyTags fill empty p and remove empty em', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p', 'em'];
        htmlCleaner.options.normalizeEmptyTags = {
            remove: ['em'],
            fill: {
                p: '<br>'
            }
        };
        expect(htmlCleaner.clean('<p></p><em></em>').toString()).toEqual('<p><br></p>');
    });

    it('normalizeEmptyTags chaos scenario', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.wrapStandaloneInlineTagName = 'p';
        htmlCleaner.options.allowedTagsSet = ['p'];
        htmlCleaner.options.normalizeEmptyTags = {
            fill: {
                p: '<br>'
            }
        };

        const testText = "Some text here<div><p><br></p><p>other text here</p></div>";
        const expectedText = "<p>Some text here</p><p><br></p><p>other text here</p>";
        expect(htmlCleaner.clean(testText).toString()).toEqual(expectedText);
    });

    it('does not remove paste-marker when asked to keep it', () => {
        const htmlCleaner = new CleanHtml();
        const testText = "Hello <span data-ievv-paste-marker></span> world";
        const expectedText = "Hello <span data-ievv-paste-marker=\"\"></span> world";
        expect(htmlCleaner.clean(testText, true).toString()).toEqual(expectedText);
    });

    it('removes paste-marker when not asked to keep it', () => {
        const htmlCleaner = new CleanHtml();
        const testText = "Hello <span data-ievv-paste-marker></span> world";
        const expectedText = "Hello  world";
        expect(htmlCleaner.clean(testText, false).toString()).toEqual(expectedText);
    });

    it('splits node correctly at index', () => {
        const options = new CleanHtmlOptions();
        options.allowedTagsSet = ['p', 'div'];
        const rootNode = new CleanerNode(options, null, null, false, 'div', {});
        const outerPTag = new CleanerNode(options, rootNode, rootNode, false, 'p', {});
        rootNode.addChildNode(outerPTag);
        outerPTag.addText("Hello world! ");
        outerPTag.addText("How are you?");

        expect(rootNode.toHtml()).toEqual("<div><p>Hello world! How are you?</p></div>");
        outerPTag.splitAfterChildIndex(1);
        expect(rootNode.toHtml()).toEqual("<div><p>Hello world! </p><p>How are you?</p></div>");
    });

    it('splits node at paste-marker', () => {
        const options = new CleanHtmlOptions();
        options.allowedTagsSet = ['p', 'div'];
        const rootNode = new CleanerNode(options, null, null, true, 'div', {});
        const outerPTag = new CleanerNode(options, rootNode, rootNode, true, 'p', {});
        rootNode.addChildNode(outerPTag);
        const pasteMarkerNode = new CleanerNode(options, outerPTag, rootNode, true, 'span', {'data-ievv-paste-marker': ''});
        rootNode.setPasteMarkerNode(pasteMarkerNode);
        outerPTag.addText("Hello world! ");
        outerPTag.addChildNode(pasteMarkerNode);
        outerPTag.addText("How are you?");
        expect(rootNode.toHtml())
            .toEqual("<div><p>Hello world! <span data-ievv-paste-marker=\"\"></span>How are you?</p></div>");
        outerPTag.splitAtPasteMarker();
        expect(rootNode.toHtml())
            .toEqual("<div><p>Hello world! </p><span data-ievv-paste-marker=\"\"></span><p>How are you?</p></div>");
    });

    it('insert unwrapped text just before paste marker works', () => {
        const options = new CleanHtmlOptions();
        options.allowedTagsSet = ['p', 'div'];
        const rootNode = new CleanerNode(options, null, null, true, 'div', {});
        const outerPTag = new CleanerNode(options, rootNode, rootNode, true, 'p', {});
        rootNode.addChildNode(outerPTag);
        const pasteMarkerNode = new CleanerNode(options, outerPTag, rootNode, true, 'span', {'data-ievv-paste-marker': ''});
        rootNode.setPasteMarkerNode(pasteMarkerNode);
        outerPTag.addText("Hello world! ");
        outerPTag.addChildNode(pasteMarkerNode);
        outerPTag.addText("How are you?");
        expect(rootNode.toHtml())
            .toEqual("<div><p>Hello world! <span data-ievv-paste-marker=\"\"></span>How are you?</p></div>");
        outerPTag.insertNodeAtPasteMarker("I am some code. ");
        expect(rootNode.toHtml())
            .toEqual("<div><p>Hello world! I am some code. <span data-ievv-paste-marker=\"\"></span>How are you?</p></div>");
    });

    it('pasting unformatted text without marker', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        const testText = "<p>Hello world! I am some text</p>";
        const pastedText = "awesome";
        const expectedText = "<p>Hello world! I am some text</p>awesome";
        expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
    });

    it('pasting formatted text without marker', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p', 'strong'];
        const testText = "<p>Hello world! I am some text</p>";
        const pastedText = "<strong>awesome</strong>";
        const expectedText = "<p>Hello world! I am some text</p><strong>awesome</strong>";
        expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
    });

    it('pasting unformatted text with marker', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        const testText = "<p>Hello world! I am some <span data-ievv-paste-marker></span>text</p>";
        const pastedText = "awesome";
        const expectedText = "<p>Hello world! I am some awesome<span data-ievv-paste-marker=\"\"></span>text</p>";
        expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
    });

    it('pasting formatted text with marker', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p', 'strong'];
        const testText = "<p>Hello world! I am some <span data-ievv-paste-marker></span>text</p>";
        const pastedText = "<strong>awesome</strong>";
        const expectedText = "<p>Hello world! I am some <strong>awesome<span data-ievv-paste-marker=\"\"></span></strong>text</p>";
        expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
    });

    it('pasting single same block tag with marker', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p'];
        const testText = "<p>Hello world! I am some <span data-ievv-paste-marker></span>text</p>";
        const pastedText = "<p>awesome</p>";
        const expectedText = "<p>Hello world! I am some awesome<span data-ievv-paste-marker=\"\"></span>text</p>";
        expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
    });

    it('pasting different block tag with marker', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p', 'h3'];
        const testText = "<p>Hello world! I am some <span data-ievv-paste-marker></span>text</p>";
        const pastedText = "<h3>awesome</h3>";
        const expectedText = "<p>Hello world! I am some </p><h3>awesome<span data-ievv-paste-marker=\"\"></span></h3><p>text</p>";
        expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
    });

    it('pasting multiple block tag with marker', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p', 'h3'];
        const testText = "<p>Hello world! I am some <span data-ievv-paste-marker></span>text</p>";
        const pastedText = "<p>really</p><p>awesome</p>";
        const expectedText = "<p>Hello world! I am some </p><p>really</p><p>awesome<span data-ievv-paste-marker=\"\"></span></p><p>text</p>";
        expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
    });

    it('pasting formatted text in formatting with marker', () => {
        const htmlCleaner = new CleanHtml();
        htmlCleaner.options.allowedTagsSet = ['p', 'strong'];
        const testText = "<p>Hello world! I am <strong>some <span data-ievv-paste-marker></span>text</strong></p>";
        const pastedText = "<strong>awesome</strong>";
        const expectedText = "<p>Hello world! I am <strong>some </strong><strong>awesome<span data-ievv-paste-marker=\"\"></span></strong><strong>text</strong></p>";
        expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
    });
});

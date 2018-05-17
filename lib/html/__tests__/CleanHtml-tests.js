"use strict";

var _CleanHtml = _interopRequireWildcard(require("../CleanHtml"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

describe('CleanHtml', function () {
  it('sanity', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    expect(htmlCleaner.clean('<p>Test</p>')).toEqual('<p>Test</p>');
  });
  it('only allowed tags sanity', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = [];
    expect(htmlCleaner.clean('<p class="test">Test</p>')).toEqual('Test');
  });
  it('only allowed tags', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['em', 'strong'];
    expect(htmlCleaner.clean('<p class="test"><em>Test1</em> Test 2 <i>Test 3</i> <strong>Test 4</strong></p>')).toEqual('<em>Test1</em> Test 2 Test 3 <strong>Test 4</strong>');
  });
  it('allowedAttributesMap sanity', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    htmlCleaner.options.allowedAttributesMap = {
      'p': ['class']
    };
    expect(htmlCleaner.clean('<p class="testclass" id="id_test">Test</p>')).toEqual('<p class="testclass">Test</p>');
  });
  it('allowedAttributesMap only applies to specified tags', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p', 'em'];
    htmlCleaner.options.allowedAttributesMap = {
      'p': ['class']
    };
    expect(htmlCleaner.clean('<p class="test"><em class="test">Test</em></p>')).toEqual('<p class="test"><em>Test</em></p>');
  });
  it('wrapStandaloneInline text', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    htmlCleaner.options.wrapStandaloneInlineTagName = 'p';
    expect(htmlCleaner.clean('Test')).toEqual('<p>Test</p>');
  });
  it('wrapStandaloneInline tag', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p', 'em'];
    htmlCleaner.options.wrapStandaloneInlineTagName = 'p';
    expect(htmlCleaner.clean('<em>Test</em>')).toEqual('<p><em>Test</em></p>');
  });
  it('wraps inline other tags than p works', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['li', 'em'];
    htmlCleaner.options.wrapStandaloneInlineTagName = 'li';
    expect(htmlCleaner.clean('<em>Test</em>')).toEqual('<li><em>Test</em></li>');
  });
  it('wraps inline custom attributes', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    htmlCleaner.options.allowedAttributesMap = {
      p: ['class']
    };
    htmlCleaner.options.wrapStandaloneInlineTagName = 'p';
    htmlCleaner.options.wrapStandaloneInlineTagAttributes = {
      'class': 'testclass'
    };
    expect(htmlCleaner.clean('Test')).toEqual('<p class="testclass">Test</p>');
  });
  it('transforms tags simple', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    htmlCleaner.options.transformTagsMap = {
      'div': 'p'
    };
    expect(htmlCleaner.clean('<div>Test</div>')).toEqual('<p>Test</p>');
  });
  it('transforms tags deep', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p', 'em'];
    htmlCleaner.options.transformTagsMap = {
      'div': 'p',
      'i': 'em'
    };
    expect(htmlCleaner.clean('<div><i>Test</i></div>')).toEqual('<p><em>Test</em></p>');
  });
  it('prevent nested simple', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['div'];
    expect(htmlCleaner.clean('<div><div>Test</div></div>')).toEqual('<div>Test</div>');
  });
  it('prevent nested very recursive', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['div'];
    expect(htmlCleaner.clean('<div>Pre <div><div>Test</div></div> Post</div>')).toEqual('<div>Pre Test Post</div>');
  });
  it('FlatListCleanerNode', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['ul', 'li'];
    htmlCleaner.options.allowNestedWithinSameTagSet = ['ul', 'li'];
    htmlCleaner.options.setCleanerNodeClassForTagName('ul', _CleanHtml.FlatListCleanerNode);
    var original = '<ul>' + '<li>A</li>' + '<li>B</li>' + '<li>' + 'C' + '<ul>' + '<li>C.1</li>' + '<li>C.2</li>' + '<li>' + 'C.3' + '<ul>' + '<li>C.3.1</li>' + '<li>C.3.2</li>' + '</ul>' + '</li>' + '</ul>' + '</li>' + '</ul>';
    var expected = '<ul>' + '<li>A</li>' + '<li>B</li>' + '<li>C</li>' + '<li>C.1</li>' + '<li>C.2</li>' + '<li>C.3</li>' + '<li>C.3.1</li>' + '<li>C.3.2</li>' + '</ul>';
    expect(htmlCleaner.clean(original)).toEqual(expected);
  });
  it('Force common parent is possible', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['ul', 'li'];
    htmlCleaner.options.allowNestedWithinSameTagSet = ['ul', 'li'];
    htmlCleaner.options.allowedAttributesMap = {
      'ul': ['class']
    };
    htmlCleaner.options.setCleanerNodeClassForTagName('ul', _CleanHtml.FlatListCleanerNode);
    htmlCleaner.options.rootCleanerNodeTagName = 'ul';
    htmlCleaner.options.rootCleanerNodeAttributes = {
      'class': 'testclass'
    };
    var original = '<ul>' + '<li>A</li>' + '<li>' + 'B' + '<ul>' + '<li>B.1</li>' + '<li>' + 'B.2' + '<ul>' + '<li>B.2.1</li>' + '</ul>' + '</li>' + '</ul>' + '</li>' + '</ul>' + '<ul>' + '<li>From list 2</li>' + '</ul>';
    var expected = '<ul class="testclass">' + '<li>A</li>' + '<li>B</li>' + '<li>B.1</li>' + '<li>B.2</li>' + '<li>B.2.1</li>' + '<li>From list 2</li>' + '</ul>';
    expect(htmlCleaner.clean(original)).toEqual(expected);
  }); // it('mergeMode', () => {
  //     const htmlCleaner = new CleanHtml();
  //     htmlCleaner.options.allowedTagsSet = ['ul', 'li'];
  // expect(htmlCleaner.clean('<p>This is</p>')).toEqual(expected);
  // });

  it('normalizeEmptyTags remove empty p', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    htmlCleaner.options.normalizeEmptyTags = {
      remove: ['p']
    };
    expect(htmlCleaner.clean('<p></p>').toString()).toEqual('');
  });
  it('normalizeEmptyTags remove empty p at beginning', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    htmlCleaner.options.normalizeEmptyTags = {
      remove: ['p']
    };
    expect(htmlCleaner.clean('<p></p><p>hello</p>').toString()).toEqual('<p>hello</p>');
  });
  it('normalizeEmptyTags remove empty p at end', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    htmlCleaner.options.normalizeEmptyTags = {
      remove: ['p']
    };
    expect(htmlCleaner.clean('<p>hello</p><p></p>').toString()).toEqual('<p>hello</p>');
  });
  it('normalizeEmptyTags remove empty p in middle', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    htmlCleaner.options.normalizeEmptyTags = {
      remove: ['p']
    };
    expect(htmlCleaner.clean('<p>hello</p><p></p><p>goodbye</p>').toString()).toEqual('<p>hello</p><p>goodbye</p>');
  });
  it('normalizeEmptyTags fill empty p', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    htmlCleaner.options.normalizeEmptyTags = {
      fill: {
        p: '<br>'
      }
    };
    expect(htmlCleaner.clean('<p></p>').toString()).toEqual('<p><br></p>');
  });
  it('normalizeEmptyTags fill empty p at beginning', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    htmlCleaner.options.normalizeEmptyTags = {
      fill: {
        p: '<br>'
      }
    };
    expect(htmlCleaner.clean('<p></p><p>hello</p>').toString()).toEqual('<p><br></p><p>hello</p>');
  });
  it('normalizeEmptyTags fill empty p at end', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    htmlCleaner.options.normalizeEmptyTags = {
      fill: {
        p: '<br>'
      }
    };
    expect(htmlCleaner.clean('<p>hello</p><p></p>').toString()).toEqual('<p>hello</p><p><br></p>');
  });
  it('normalizeEmptyTags fill empty p and remove empty em', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p', 'em'];
    htmlCleaner.options.normalizeEmptyTags = {
      remove: ['em'],
      fill: {
        p: '<br>'
      }
    };
    expect(htmlCleaner.clean('<p></p><em></em>').toString()).toEqual('<p><br></p>');
  });
  it('normalizeEmptyTags chaos scenario', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.wrapStandaloneInlineTagName = 'p';
    htmlCleaner.options.allowedTagsSet = ['p'];
    htmlCleaner.options.normalizeEmptyTags = {
      fill: {
        p: '<br>'
      }
    };
    var testText = "Some text here<div><p><br></p><p>other text here</p></div>";
    var expectedText = "<p>Some text here</p><p><br></p><p>other text here</p>";
    expect(htmlCleaner.clean(testText).toString()).toEqual(expectedText);
  });
  it('does not remove paste-marker when asked to keep it', function () {
    var htmlCleaner = new _CleanHtml.default();
    var testText = "Hello <span data-ievv-paste-marker></span> world";
    var expectedText = "Hello <span data-ievv-paste-marker=\"\"></span> world";
    expect(htmlCleaner.clean(testText, true).toString()).toEqual(expectedText);
  });
  it('removes paste-marker when not asked to keep it', function () {
    var htmlCleaner = new _CleanHtml.default();
    var testText = "Hello <span data-ievv-paste-marker></span> world";
    var expectedText = "Hello  world";
    expect(htmlCleaner.clean(testText, false).toString()).toEqual(expectedText);
  });
  it('splits node correctly at index', function () {
    var options = new _CleanHtml.CleanHtmlOptions();
    options.allowedTagsSet = ['p', 'div'];
    var rootNode = new _CleanHtml.CleanerNode(options, null, null, false, 'div', {});
    var outerPTag = new _CleanHtml.CleanerNode(options, rootNode, rootNode, false, 'p', {});
    rootNode.addChildNode(outerPTag);
    outerPTag.addText("Hello world! ");
    outerPTag.addText("How are you?");
    expect(rootNode.toHtml()).toEqual("<div><p>Hello world! How are you?</p></div>");
    outerPTag.splitAfterChildIndex(1);
    expect(rootNode.toHtml()).toEqual("<div><p>Hello world! </p><p>How are you?</p></div>");
  });
  it('splits node at paste-marker', function () {
    var options = new _CleanHtml.CleanHtmlOptions();
    options.allowedTagsSet = ['p', 'div'];
    var rootNode = new _CleanHtml.CleanerNode(options, null, null, true, 'div', {});
    var outerPTag = new _CleanHtml.CleanerNode(options, rootNode, rootNode, true, 'p', {});
    rootNode.addChildNode(outerPTag);
    var pasteMarkerNode = new _CleanHtml.CleanerNode(options, outerPTag, rootNode, true, 'span', {
      'data-ievv-paste-marker': ''
    });
    rootNode.setPasteMarkerNode(pasteMarkerNode);
    outerPTag.addText("Hello world! ");
    outerPTag.addChildNode(pasteMarkerNode);
    outerPTag.addText("How are you?");
    expect(rootNode.toHtml()).toEqual("<div><p>Hello world! <span data-ievv-paste-marker=\"\"></span>How are you?</p></div>");
    outerPTag.splitAtPasteMarker();
    expect(rootNode.toHtml()).toEqual("<div><p>Hello world! </p><span data-ievv-paste-marker=\"\"></span><p>How are you?</p></div>");
  });
  it('insert unwrapped text just before paste marker works', function () {
    var options = new _CleanHtml.CleanHtmlOptions();
    options.allowedTagsSet = ['p', 'div'];
    var rootNode = new _CleanHtml.CleanerNode(options, null, null, true, 'div', {});
    var outerPTag = new _CleanHtml.CleanerNode(options, rootNode, rootNode, true, 'p', {});
    rootNode.addChildNode(outerPTag);
    var pasteMarkerNode = new _CleanHtml.CleanerNode(options, outerPTag, rootNode, true, 'span', {
      'data-ievv-paste-marker': ''
    });
    rootNode.setPasteMarkerNode(pasteMarkerNode);
    outerPTag.addText("Hello world! ");
    outerPTag.addChildNode(pasteMarkerNode);
    outerPTag.addText("How are you?");
    expect(rootNode.toHtml()).toEqual("<div><p>Hello world! <span data-ievv-paste-marker=\"\"></span>How are you?</p></div>");
    outerPTag.insertNodeAtPasteMarker("I am some code. ");
    expect(rootNode.toHtml()).toEqual("<div><p>Hello world! I am some code. <span data-ievv-paste-marker=\"\"></span>How are you?</p></div>");
  });
  it('pasting unformatted text without marker', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    var testText = "<p>Hello world! I am some text</p>";
    var pastedText = "awesome";
    var expectedText = "<p>Hello world! I am some text</p>awesome";
    expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
  });
  it('pasting formatted text without marker', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p', 'strong'];
    var testText = "<p>Hello world! I am some text</p>";
    var pastedText = "<strong>awesome</strong>";
    var expectedText = "<p>Hello world! I am some text</p><strong>awesome</strong>";
    expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
  });
  it('pasting unformatted text with marker', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    var testText = "<p>Hello world! I am some <span data-ievv-paste-marker></span>text</p>";
    var pastedText = "awesome";
    var expectedText = "<p>Hello world! I am some awesome<span data-ievv-paste-marker=\"\"></span>text</p>";
    expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
  });
  it('pasting formatted text with marker', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p', 'strong'];
    var testText = "<p>Hello world! I am some <span data-ievv-paste-marker></span>text</p>";
    var pastedText = "<strong>awesome</strong>";
    var expectedText = "<p>Hello world! I am some <strong>awesome<span data-ievv-paste-marker=\"\"></span></strong>text</p>";
    expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
  });
  it('pasting single same block tag with marker', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p'];
    var testText = "<p>Hello world! I am some <span data-ievv-paste-marker></span>text</p>";
    var pastedText = "<p>awesome</p>";
    var expectedText = "<p>Hello world! I am some awesome<span data-ievv-paste-marker=\"\"></span>text</p>";
    expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
  });
  it('pasting different block tag with marker', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p', 'h3'];
    var testText = "<p>Hello world! I am some <span data-ievv-paste-marker></span>text</p>";
    var pastedText = "<h3>awesome</h3>";
    var expectedText = "<p>Hello world! I am some </p><h3>awesome<span data-ievv-paste-marker=\"\"></span></h3><p>text</p>";
    expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
  });
  it('pasting multiple block tag with marker', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p', 'h3'];
    var testText = "<p>Hello world! I am some <span data-ievv-paste-marker></span>text</p>";
    var pastedText = "<p>really</p><p>awesome</p>";
    var expectedText = "<p>Hello world! I am some </p><p>really</p><p>awesome<span data-ievv-paste-marker=\"\"></span></p><p>text</p>";
    expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
  });
  it('pasting formatted text in formatting with marker', function () {
    var htmlCleaner = new _CleanHtml.default();
    htmlCleaner.options.allowedTagsSet = ['p', 'strong'];
    var testText = "<p>Hello world! I am <strong>some <span data-ievv-paste-marker></span>text</strong></p>";
    var pastedText = "<strong>awesome</strong>";
    var expectedText = "<p>Hello world! I am <strong>some </strong><strong>awesome<span data-ievv-paste-marker=\"\"></span></strong><strong>text</strong></p>";
    expect(htmlCleaner.paste(testText, pastedText).toString()).toEqual(expectedText);
  });
});
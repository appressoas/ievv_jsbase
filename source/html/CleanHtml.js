import htmlparser from "htmlparser2";
import {makeHtmlStartTag, makeHtmlEndTag, isInlineTag} from "./utils";
import TypeConvert from "../utils/TypeConvert";


export class CleanerNode {
    constructor(options, parentNode, tagName, attributes={}) {
        this._inlineWrapperNode = null;
        this.options = options;
        this.parentNode = parentNode;
        this.originalTagName = tagName;
        this.originalAttributes = attributes;
        this.tagName = this.cleanTagName();
        this.attributes = this.cleanAttributes();
        this.children = [];
    }

    getClosestParentWithTagName(tagName) {
        if(this.parentNode == null || this.parentNode.tagName == null) {
            return null;
        }
        if(this.parentNode.tagName == tagName) {
            return this.parentNode;
        } else {
            return this.parentNode.getClosestParentWithTagName(tagName);
        }
    }

    transformTagName() {
        if(this.originalTagName != null && this.options.transformTagsMap.has(this.originalTagName)) {
            return this.options.transformTagsMap.get(this.originalTagName);
        }
        return this.originalTagName;
    }

    cleanTagName() {
        const tagName = this.transformTagName();
        if(tagName != null && this.options.allowedTagsSet.has(tagName)) {
            return tagName;
        }
        return null;
    }

    cleanAttributes() {
        const cleanedAttributes = {};
        for(let attributeName of Object.keys(this.originalAttributes)) {
            if(this.options.isAllowedAttributeForTagName(this.tagName, attributeName)) {
                cleanedAttributes[attributeName] = this.originalAttributes[attributeName];
            }
        }
        return cleanedAttributes;
    }

    shouldWrapStandaloneInlineTags() {
        return this.parentNode == null && this.options.wrapStandaloneInlineTagName != null;
    }

    getStandaloneInlineTagWrapper() {
        if(this._inlineWrapperNode == null) {
            const node = this.makeChildNode(
                this.options.wrapStandaloneInlineTagName,
                this.options.wrapStandaloneInlineTagAttributes);
            this._inlineWrapperNode = node;
            this.children.push(node);
        }
        return this._inlineWrapperNode;
    }

    stopWrappingStandaloneInlineTags() {
        this._inlineWrapperNode = null;
    }

    addText(text) {
        if(this.shouldWrapStandaloneInlineTags()) {
            this.getStandaloneInlineTagWrapper().addText(text);
        } else {
            this.children.push(text);
        }
    }

    makeChildNode(tagName, attributes) {
        const cleanerNodeClass = this.options.getCleanerNodeClassForTagName(tagName);
        return new cleanerNodeClass(
            this.options, this,
            tagName, attributes);
    }

    isInlineTag() {
        return isInlineTag(this.tagName);
    }

    addChildNode(node) {
        if(this.shouldWrapStandaloneInlineTags() && node.isInlineTag()) {
            this.getStandaloneInlineTagWrapper().addChildNode(node);
        } else {
            this.stopWrappingStandaloneInlineTags();
            this.children.push(node);
        }
    }

    addChildNodeFromTag(tagName, attributes) {
        const node = this.makeChildNode(tagName, attributes);
        this.addChildNode(node);
        return node;
    }

    shouldRenderTag() {
        if(this.tagName == null) {
            return false;
        }
        const closestParentNodeWithSameTag = this.getClosestParentWithTagName(this.tagName);
        if(closestParentNodeWithSameTag == null) {
            return true;
        }
        return this.options.allowNestedWithinSameTagSet.has(this.tagName);
    }

    makeStartTag() {
        if(this.shouldRenderTag()) {
            return makeHtmlStartTag(this.tagName, this.attributes);
        }
        return '';
    }

    makeEndTag() {
        if(this.shouldRenderTag()) {
            return makeHtmlEndTag(this.tagName);
        }
        return '';
    }

    childrenToHtml() {
        let html = '';
        for(let child of this.children) {
            if(typeof child == 'string') {
                html += child;
            } else {
                html += child.toHtml();
            }
        }
        return html;
    }

    toHtml() {
        return `${this.makeStartTag()}${this.childrenToHtml()}${this.makeEndTag(this.tagName)}`;
    }

    toString() {
        return this.toHtml();
    }
}


// Should be the default for nodes that can not contain
// text as a direct child, such as UL, OL, TABLE, ...
// and all the self-closing tags.
export class NoTextCleanerNode extends CleanerNode {
    addText(text) {}
}


export class FlatListCleanerNode extends NoTextCleanerNode {
    shouldRenderTag() {
        if(this.tagName == null) {
            return false;
        }
        const closestUlParentNode = this.getClosestParentWithTagName(this.tagName);
        return closestUlParentNode == null;
    }

    addChildNode(node) {
        const closestListParentNode = this.getClosestParentWithTagName(this.tagName);
        if(closestListParentNode == null) {
            super.addChildNode(node);
        } else {
            closestListParentNode.addChildNode(node);
        }
    }
}




/*
Handle paste:

    <p>Hello PASTEHERE</p>
    <ul>
        <li>Item PASTEHERE</li>
    </ul>

Handle force single parent element (ul).
Handle &nbsp; (should be removed)

2 options:
- Clean everything after paste, and handle invalid nesting in the cleaner.
- Know where we are cleaning.

*/

export class CleanHtmlParser {
    constructor(html, options) {
        this.options = options;
        this._parse(html);
        if(this._isWrappingStandaloneInline) {
            this.endWrappingStandaloneInline();
        }
    }

    _parse(html) {
        this._rootNode = new this.options.rootCleanerNodeClass(
            this.options,
            null,  // parentNode
            this.options.rootCleanerNodeTagName,
            this.options.rootCleanerNodeAttributes);
        this._currentNode = this._rootNode;
        const parser = new htmlparser.Parser({
            onopentag: (...args) => {
                this.onOpenTag(...args);
            },
            ontext: (...args) => {
                this.onText(...args);
            },
            onclosetag: (...args) => {
                this.onCloseTag(...args);
            }
        }, {decodeEntities: true});
        parser.write(html);
        parser.end();
    }

    onOpenTag(tagName, attributes) {
        const node = this._currentNode.addChildNodeFromTag(tagName, attributes);
        // console.log(`${tagName}: ${node.toString()}`);
        this._currentNode = node;
    }

    onText(text) {
        this._currentNode.addText(text);
    }

    onCloseTag(tagName) {
        this._currentNode = this._currentNode.parentNode;
    }

    get rootNode() {
        return this._rootNode;
    }
}



class CleanHtmlOptions {
    constructor() {
        this._allowedTagsSet = new Set();
        this._allowedAttributesMap = new Map();
        this._allowNestedWithinSameTagSet = new Set();
        this._transformTagsMap = new Map();
        this.defaultCleanerNodeClass = CleanerNode;
        this.rootCleanerNodeClass = CleanerNode;
        this.rootCleanerNodeTagName = null;
        this.rootCleanerNodeAttributes = {};
        this._tagNameToCleanerNodeClassMap = new Map();
        this.wrapStandaloneInlineTagName = null;
        this.wrapStandaloneInlineTagAttributes = {};

    }

    get allowedTagsSet() {
        return this._allowedTagsSet;
    }

    set allowedTagsSet(allowedTagsSet) {
        this._allowedTagsSet = TypeConvert.toSet(allowedTagsSet);
    }


    get allowedAttributesMap() {
        return this._allowedAttributesMap;
    }

    set allowedAttributesMap(allowedAttributesMap) {
        this._allowedAttributesMap = TypeConvert.toMapOfSets(allowedAttributesMap);
    }

    isAllowedAttributeForTagName(tagName, attributeName) {
        if(this._allowedAttributesMap.has(tagName)) {
            return this._allowedAttributesMap.get(tagName).has(attributeName);
        }
        return false;
    }


    set transformTagsMap(transformTagsMap) {
        this._transformTagsMap = TypeConvert.toMap(transformTagsMap);
    }

    get transformTagsMap() {
        return this._transformTagsMap;
    }


    get allowNestedWithinSameTagSet() {
        return this._allowNestedWithinSameTagSet;
    }

    set allowNestedWithinSameTagSet(allowNestedWithinSameTagSet) {
        this._allowNestedWithinSameTagSet = TypeConvert.toSet(allowNestedWithinSameTagSet);
    }


    set tagNameToCleanerNodeClassMap(tagNameToCleanerNodeClassMap) {
        this._tagNameToCleanerNodeClassMap = TypeConvert.toMap(tagNameToCleanerNodeClassMap);
    }

    get tagNameToCleanerNodeClassMap() {
        return this._tagNameToCleanerNodeClassMap;
    }

    getCleanerNodeClassForTagName(tagName) {
        if(this._tagNameToCleanerNodeClassMap.has(tagName)) {
            return this._tagNameToCleanerNodeClassMap.get(tagName);
        } else {
            return this.defaultCleanerNodeClass;
        }
    }

    setCleanerNodeClassForTagName(tagName, cleanerNodeClass) {
        this._tagNameToCleanerNodeClassMap.set(tagName, cleanerNodeClass);
    }

    // updateFromObject(optionsObject) {
    //     if(typeof optionsObject.allowedTagsSet != 'undefined') {
    //         this.allowedTagsSet = optionsObject.allowedTagsSet;
    //     }
    //     if(typeof optionsObject.allowedAttributesMap != 'undefined') {
    //         this.allowedAttributesMap = optionsObject.allowedAttributesMap;
    //     }
    //     if(typeof optionsObject.transformTagsMap != 'undefined') {
    //         this.transformTagsMap = optionsObject.transformTagsMap;
    //     }
    // }
}


/**
 * HTML cleaner with extra post cleaning that makes it
 * suitable for cleaning input typed and pasted into
 * contenteditable editors.
 */
export default class CleanHtml {
    constructor() {
        this.options = new CleanHtmlOptions();
    }

    /**
     * Called at the beginning of {@link CleanHtml#clean}
     * before performing the default cleaning.
     *
     * Subclasses can override this to perform additional
     * cleaning pre-cleaning.
     *
     * @param {string} html The HTML to pre-clean.
     * @returns {string} The pre-cleaned HTML. Defaults to returning
     *    the provided ``html`` unchanged.
     */
    preClean(html) {
        return html;
    }


    /**
     * Called at the end of {@link CleanHtml#clean}
     * after performing the default cleaning.
     *
     * Subclasses can override this to perform additional
     * cleaning post-cleaning.
     *
     * @param {string} html The HTML to post-clean.
     * @returns {string} The cleaned HTML. Defaults to returning
     *    the provided ``html`` unchanged.
     */
    postClean(html) {
        return html;
    }

    _clean(html) {
        return new CleanHtmlParser(html, this.options).rootNode.toHtml();
    }

    /**
     * Clean the provided html.
     *
     * @param {string} html The HTML to clean.
     * @returns {string} The cleaned HTML.
     */
    clean(html) {
        let cleanedHtml = this.preClean(html);
        cleanedHtml = this._clean(cleanedHtml);
        cleanedHtml = this.postClean(cleanedHtml);
        return cleanedHtml;
    }
}

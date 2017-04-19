import htmlparser from "htmlparser2";
import {makeHtmlStartTag, makeHtmlEndTag, isInlineTag} from "./utils";
import TypeConvert from "../utils/TypeConvert";
import ObjectManager from "../utils/ObjectManager";
import typeDetect from "../utils/typeDetect";
import {PasteMarkerNotSetError} from "./CleanHtmlErrors";


export class CleanerNode {
    constructor(options, parentNode, rootNode, preservePasteMarker, tagName, attributes={}) {
        this.pasteMarkerAttribute = 'data-ievv-paste-marker';
        this.preservePasteMarker = preservePasteMarker;
        this.pasteMarkerNode = null;
        this.rootNode = rootNode ? rootNode : this;
        this._inlineWrapperNode = null;
        this.options = options;
        this.parentNode = parentNode;
        this.originalTagName = tagName;
        this.originalAttributes = attributes;
        this.tagName = this.cleanTagName();
        this.attributes = this.cleanAttributes();
        this.children = [];
        this.pasteLevels = {
            root: 0,
            block: 1,
            inline: 2
        };
    }

    getPasteLevel() {
        if (this.isRootNode()) {
            return this.pasteLevels.root;
        }
        if (isInlineTag(this.tagName)) {
            return this.pasteLevels.inline;
        }
        return this.pasteLevels.block;
    }

    getPasteMarkerLevel() {
        return this.rootNode.pasteMarkerNode.parentNode.getPasteLevel();
    }

    getDeepestPasteLevelInTree() {
        let pasteLevel = this.getPasteLevel();
        for (let child of this.children) {
            if (pasteLevel == this.pasteLevels.inline) {
                return pasteLevel; // Returning because already at deepest possible level.. no need to iterate further..
            }
            if (typeDetect(child) == 'object') {
                const childPasteLevel = child.getDeepestPasteLevelInTree();
                if (childPasteLevel > pasteLevel) {
                    pasteLevel = childPasteLevel;
                }
            }
        }
        return pasteLevel;
    }

    getBlockNodeForNode(node) {
      if (node.tagName != null && !isInlineTag(node.tagName)) {
        return [true, node.tagName];
      }
      if (!node.isRootNode()) {
        return this.getBlockNodeForNode(node.parentNode);
      }
      return [false, null];
    }

    checkIfNodeIsJustStringAndExtractString(node) {
        if (typeDetect(node) == 'string') {
            return [true, node];
        }
        if (node.tagName == null && node.children.length == 1) {
            return this.checkIfNodeIsJustStringAndExtractString(node.children[0]);
        }

        const [pasteMarkerInBlockTag, pasteMarkerBlockTag] = this.getBlockNodeForNode(this.rootNode.pasteMarkerNode);
        if (pasteMarkerInBlockTag && pasteMarkerBlockTag == node.tagName && node.children.length == 1) {
            return this.checkIfNodeIsJustStringAndExtractString(node.children[0]);
        }
        return [false, null];
    }

    insertNodeAtPasteMarker(node) {
        if (!this.rootNode.pasteMarkerNode) {
            throw new PasteMarkerNotSetError("Cannot insert node at pasteMarker - aborting insertion");
        }
        let [isStringNode, stringValue] = this.checkIfNodeIsJustStringAndExtractString(node);
        if (isStringNode) {
            // console.log("This node is just a string: ", node);
            this.rootNode.pasteMarkerNode.parentNode.addChildNodeAtIndex(
                this.rootNode.pasteMarkerNode.getParentChildListIndex(), stringValue);
            return;
        }
        // console.log("This node is not a string: ", node);
        // console.log("Got rootNode: ", this.rootNode);
        const pasteLevelOfNewNode = node.getDeepestPasteLevelInTree();
        while (this.getPasteMarkerLevel() >= pasteLevelOfNewNode) {
           this.splitAtPasteMarker();
        }

        node.parentNode = this.rootNode.pasteMarkerNode.parentNode;
        this.rootNode.pasteMarkerNode.parentNode.addChildNodeAtIndex(
            this.rootNode.pasteMarkerNode.getParentChildListIndex(), node);
        const [newMarkerParent, newMarkerIndex] = node.getLastPositionInNodeTree();
        this.movePasteMarkerTo(newMarkerParent, newMarkerIndex+1);
    }

    getLastPositionInNodeTree() {
        let parentNode = null, currentNode = this.rootNode;
        while (currentNode.children.length > 0 &&
               typeDetect(currentNode.children[currentNode.children.length-1]) == 'object') {
            currentNode = currentNode.children[currentNode.children.length-1];
        }
        return [currentNode, currentNode.children.length-1];
    }

    splitAtPasteMarker() {
        if (!this.rootNode.pasteMarkerNode) {
            throw new Error("Cannot split at pasteMarker! pasteMarker is not set!");
        }
        if (this.rootNode.pasteMarkerNode.parentNode.isRootNode()) {
            throw new Error("Cannot split at pasteMarker! pasteMarker is placed at root!");
        }
        this.rootNode.pasteMarkerNode.splitParentAfterMe();
        this.movePasteMarkerTo(
            this.rootNode.pasteMarkerNode.parentNode.parentNode,
            this.rootNode.pasteMarkerNode.parentNode.getParentChildListIndex());
    }

    movePasteMarkerTo(node, index) {
        const previousParent = this.rootNode.pasteMarkerNode.parentNode;
        const previousParentIndex = this.rootNode.pasteMarkerNode.getParentChildListIndex();
        previousParent.children.splice(previousParentIndex, 1);
        this.rootNode.pasteMarkerNode.parentNode = node;
        node.addChildNodeAtIndex(index, this.rootNode.pasteMarkerNode);
    }

    getParentChildListIndex() {
        if (!this.parentNode) {
            throw new Error("Cannot get parentChildListIndex. Has no parent.");
        }
        return this.parentNode.children.indexOf(this);
    }

    splitAfterChildIndex(index) {
        if (index >= this.children.length) {
            throw new Error(`Cannot split children at index ${index}, children.length: ${this.children.length}`);
        }

        const newSiblingNode = new CleanerNode(
          this.options, this.parentNode, this.rootNode,
          this.preservePasteMarker, this.tagName, this.attributes);
        newSiblingNode.children = this.children.slice(index);
        for (let child of newSiblingNode.children) {
            if (typeDetect(child) == 'object') {
                child.parentNode = newSiblingNode;
            }
        }
        this.children = this.children.slice(0, index);
        this.parentNode.addChildNodeAtIndex(this.getParentChildListIndex()+1, newSiblingNode);
    }

    splitParentAfterMe() {
        this.parentNode.splitAfterChildIndex(this.getParentChildListIndex());
    }

    addChildNodeAtIndex(index, node) {
        this.children.splice(index, 0, node);
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
        if((tagName != null && this.options.allowedTagsSet.has(tagName)) || this.isSpecialNode()) {
            return tagName;
        }
        return null;
    }

    cleanAttributes() {
        const cleanedAttributes = {};
        for(let attributeName of Object.keys(this.originalAttributes)) {
            if(this.options.isAllowedAttributeForTagName(this.tagName, attributeName) || this.isSpecialNode()) {
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
            this.options, this, this.rootNode, this.preservePasteMarker,
            tagName, attributes);
    }

    isInlineTag() {
        return isInlineTag(this.tagName);
    }

    isRootNode() {
      return this.parentNode == null;
    }

    isPasteMarker() {
        if (this.originalAttributes.hasOwnProperty(this.pasteMarkerAttribute)) {
            if (this.isRootNode()) {
                throw new Error("the rootnode cannot be the paste marker-node!");
            }
            this.rootNode.setPasteMarkerNode(this);
            return true;
        }
        return false;
    }

    setPasteMarkerNode(node) {
      this.pasteMarkerNode = node;
    }

    /**
     * Special nodes are nodes like the paste-marker. If the cleaner is configured for it, these nodes should not be
     * cleaned or altered in any way.
     *
     * @returns {boolean} if true, the current node is a special node, as such, any attributes is legal and any tagname is legal.
     */
    isSpecialNode() {
        if (this.preservePasteMarker && this.isPasteMarker()) {
            return true;
        }

        // Add if-tests for other special nodes here if any are added...

        return false;
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
        if (this.isSpecialNode()) {
            return true;
        }
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
        let html = `${this.makeStartTag()}${this.childrenToHtml()}${this.makeEndTag()}`;
        if (ObjectManager.validate(this.options, 'normalizeEmptyTags')) {
            const emptyTagHtml = `<${this.tagName}></${this.tagName}>`;
            if(html == emptyTagHtml) {
                if (ObjectManager.validate(this.options.normalizeEmptyTags, 'fill', this.tagName)) {
                    const textToFillEmptyTag = this.options.normalizeEmptyTags.fill[this.tagName];
                    return `<${this.tagName}>${textToFillEmptyTag}</${this.tagName}>`;
                }
                if (ObjectManager.validate(this.options.normalizeEmptyTags, 'remove')) {
                    if (this.options.normalizeEmptyTags.remove.includes(this.tagName)) {
                        return '';
                    }
                }
            }
        }

        return html;
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
    constructor(html, options, preservePasteMarker) {
        this.options = options;
        this.preservePasteMarker = preservePasteMarker;
        this._parse(html);
        if(this._isWrappingStandaloneInline) {
            this.endWrappingStandaloneInline();
        }
    }

    _parse(html) {
        this._rootNode = new this.options.rootCleanerNodeClass(
            this.options,
            null,  // parentNode
            null,  // rootNode
            this.preservePasteMarker,
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


export class CleanHtmlOptions {
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
        this.normalizeEmptyTags = null;
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

    _getCleanedTree(html, preservePasteMarker) {
        return new CleanHtmlParser(html, this.options, preservePasteMarker);
    }

    _clean(html, preservePasteMarker) {
        return this._getCleanedTree(html, preservePasteMarker).rootNode.toHtml();
    }

    /**
     * Clean the provided html.
     *
     * @param {string} html The HTML to clean.
     * @param preservePasteMarker {boolean} if true, leave the tag with `data-ievv-paste-marker` attribute.
     * @returns {string} The cleaned HTML.
     */
    clean(html, preservePasteMarker=false) {
        let cleanedHtml = this.preClean(html);
        cleanedHtml = this._clean(cleanedHtml, preservePasteMarker);
        cleanedHtml = this.postClean(cleanedHtml);
        return cleanedHtml;
    }

    /**
     * This function takes two html-blobs, `originalHtml` is the original text, `pastedHtml` is text to be inserted in
     * `originalHtml`.
     * The original html-blob should contain a 'marker-element' determining where to paste the given `pastedHtml`. This
     * marker element should have the data-attribute `data-ievv-paste-marker`. If multiple marker-elements are present,
     * an error will be logged, and `pastedHtml` will be inserted at the first one.
     *
     * Note: result from these examples will be cleaned once more using default cleaner, so if the cleaner is configured
     * to wrap standalone text the standalone text in e.g. example 1 would be wrapped in some block-level tag before returning.
     *
     * @example <caption>1 - pasting unformatted text without marker:</caption>
     * originalHtml: <p>Hello world! I am some text</p>
     * pastedHtml: awesome
     * result: <p>Hello world! I am some text</p>awesome
     *
     * @example <caption>2 - pasting formatted text without marker:</caption>
     * originalHtml: <p>Hello world! I am some text</p>
     * pastedHtml: <strong>awesome</strong>
     * result: <p>Hello world! I am some text</p><strong>awesome</strong>
     *
     * @example <caption>3 - pasting unformatted text with marker:</caption>
     * originalHtml: <p>Hello world! I am some <span data-ievv-paste-marker></span>text</p>
     * pastedHtml: awesome
     * result: <p>Hello world! I am some awesome<span data-ievv-paste-marker></span>text</p>
     *
     * @example <caption>4 - pasting formatted text with marker:</caption>
     * originalHtml: <p>Hello world! I am some <span data-ievv-paste-marker></span>text</p>
     * pastedHtml: <strong>awesome</strong>
     * result: <p>Hello world! I am some <strong>awesome<span data-ievv-paste-marker></span></strong>text</p>
     *
     * @example <caption>5 - pasting block tag with marker:</caption>
     * originalHtml: <p>Hello world! I am some <span data-ievv-paste-marker></span>text</p>
     * pastedHtml: <p>awesome</p>
     * result: <p>Hello world! I am some </p>
     *         <p>awesome<span data-ievv-paste-marker></span></p>
     *         <p>text</p>
     *
     * @example <caption>6 - pasting formatted text in formatting with marker:</caption>
     * originalHtml: <p>Hello world! I am <strong>some <span data-ievv-paste-marker></span>text</strong></p>
     * pastedHtml: <strong>awesome</strong>
     * result: <p>Hello world! I am <strong>some </strong><strong>awesome<span data-ievv-paste-marker></span></strong><strong>text</strong></p>
     *
     * @param originalHtml
     * @param pastedHtml
     */
    paste(originalHtml, pastedHtml) {
        const cleanedPastedTree = this._getCleanedTree(pastedHtml);
        const cleanedOriginalTree = this._getCleanedTree(originalHtml, true);

        // console.log(`Running paste.\n\nCleaned original tree: ${cleanedOriginalTree.rootNode.toHtml()}\n\ncleanedPastedTree: ${cleanedPastedTree.rootNode.toHtml()}`);
        // console.log(`cleanedOriginalTree.rootNode: `, cleanedOriginalTree.rootNode);
        // console.log(`cleanedPastedTree.rootNode: `, cleanedPastedTree.rootNode);

        try {
            cleanedOriginalTree.rootNode.insertNodeAtPasteMarker(cleanedPastedTree.rootNode);
        } catch(e) {
            if (e instanceof PasteMarkerNotSetError) {
                const cleanedOriginalHtml = cleanedOriginalTree.rootNode.toHtml();
                const cleanedPastedHtml = cleanedPastedTree.rootNode.toHtml();
                return this.clean(`${cleanedOriginalHtml}${cleanedPastedHtml}`, true);
            } else {
                throw e;
            }
        }

        return this.clean(cleanedOriginalTree.rootNode.toHtml(), true);
    }
}

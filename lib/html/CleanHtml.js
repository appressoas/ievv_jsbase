"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CleanHtmlOptions = exports.CleanHtmlParser = exports.FlatListCleanerNode = exports.NoTextCleanerNode = exports.CleanerNode = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _htmlparser = require("htmlparser2");

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _utils = require("./utils");

var _TypeConvert = require("../utils/TypeConvert");

var _TypeConvert2 = _interopRequireDefault(_TypeConvert);

var _ObjectManager = require("../utils/ObjectManager");

var _ObjectManager2 = _interopRequireDefault(_ObjectManager);

var _typeDetect = require("../utils/typeDetect");

var _typeDetect2 = _interopRequireDefault(_typeDetect);

var _CleanHtmlErrors = require("./CleanHtmlErrors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CleanerNode = exports.CleanerNode = function () {
    function CleanerNode(options, parentNode, rootNode, preservePasteMarker, tagName) {
        var attributes = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

        _classCallCheck(this, CleanerNode);

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

    _createClass(CleanerNode, [{
        key: "getPasteLevel",
        value: function getPasteLevel() {
            if (this.isRootNode()) {
                return this.pasteLevels.root;
            }
            if ((0, _utils.isInlineTag)(this.tagName)) {
                return this.pasteLevels.inline;
            }
            return this.pasteLevels.block;
        }
    }, {
        key: "getPasteMarkerLevel",
        value: function getPasteMarkerLevel() {
            return this.rootNode.pasteMarkerNode.parentNode.getPasteLevel();
        }
    }, {
        key: "getDeepestPasteLevelInTree",
        value: function getDeepestPasteLevelInTree() {
            var pasteLevel = this.getPasteLevel();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var child = _step.value;

                    if (pasteLevel == this.pasteLevels.inline) {
                        return pasteLevel; // Returning because already at deepest possible level.. no need to iterate further..
                    }
                    if ((0, _typeDetect2.default)(child) == 'object') {
                        var childPasteLevel = child.getDeepestPasteLevelInTree();
                        if (childPasteLevel > pasteLevel) {
                            pasteLevel = childPasteLevel;
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return pasteLevel;
        }
    }, {
        key: "getBlockNodeForNode",
        value: function getBlockNodeForNode(node) {
            if (node.tagName != null && !(0, _utils.isInlineTag)(node.tagName)) {
                return [true, node.tagName];
            }
            if (!node.isRootNode()) {
                return this.getBlockNodeForNode(node.parentNode);
            }
            return [false, null];
        }
    }, {
        key: "checkIfNodeIsJustStringAndExtractString",
        value: function checkIfNodeIsJustStringAndExtractString(node) {
            if ((0, _typeDetect2.default)(node) == 'string') {
                return [true, node];
            }
            if (node.tagName == null && node.children.length == 1) {
                return this.checkIfNodeIsJustStringAndExtractString(node.children[0]);
            }

            var _getBlockNodeForNode = this.getBlockNodeForNode(this.rootNode.pasteMarkerNode),
                _getBlockNodeForNode2 = _slicedToArray(_getBlockNodeForNode, 2),
                pasteMarkerInBlockTag = _getBlockNodeForNode2[0],
                pasteMarkerBlockTag = _getBlockNodeForNode2[1];

            if (pasteMarkerInBlockTag && pasteMarkerBlockTag == node.tagName && node.children.length == 1) {
                return this.checkIfNodeIsJustStringAndExtractString(node.children[0]);
            }
            return [false, null];
        }
    }, {
        key: "insertNodeAtPasteMarker",
        value: function insertNodeAtPasteMarker(node) {
            if (!this.rootNode.pasteMarkerNode) {
                throw new _CleanHtmlErrors.PasteMarkerNotSetError("Cannot insert node at pasteMarker - aborting insertion");
            }

            var _checkIfNodeIsJustStr = this.checkIfNodeIsJustStringAndExtractString(node),
                _checkIfNodeIsJustStr2 = _slicedToArray(_checkIfNodeIsJustStr, 2),
                isStringNode = _checkIfNodeIsJustStr2[0],
                stringValue = _checkIfNodeIsJustStr2[1];

            if (isStringNode) {
                // console.log("This node is just a string: ", node);
                this.rootNode.pasteMarkerNode.parentNode.addChildNodeAtIndex(this.rootNode.pasteMarkerNode.getParentChildListIndex(), stringValue);
                return;
            }
            // console.log("This node is not a string: ", node);
            // console.log("Got rootNode: ", this.rootNode);
            var pasteLevelOfNewNode = node.getDeepestPasteLevelInTree();
            while (this.getPasteMarkerLevel() >= pasteLevelOfNewNode) {
                this.splitAtPasteMarker();
            }

            node.parentNode = this.rootNode.pasteMarkerNode.parentNode;
            this.rootNode.pasteMarkerNode.parentNode.addChildNodeAtIndex(this.rootNode.pasteMarkerNode.getParentChildListIndex(), node);

            var _node$getLastPosition = node.getLastPositionInNodeTree(),
                _node$getLastPosition2 = _slicedToArray(_node$getLastPosition, 2),
                newMarkerParent = _node$getLastPosition2[0],
                newMarkerIndex = _node$getLastPosition2[1];

            this.movePasteMarkerTo(newMarkerParent, newMarkerIndex + 1);
        }
    }, {
        key: "getLastPositionInNodeTree",
        value: function getLastPositionInNodeTree() {
            var parentNode = null,
                currentNode = this.rootNode;
            while (currentNode.children.length > 0 && (0, _typeDetect2.default)(currentNode.children[currentNode.children.length - 1]) == 'object') {
                currentNode = currentNode.children[currentNode.children.length - 1];
            }
            return [currentNode, currentNode.children.length - 1];
        }
    }, {
        key: "splitAtPasteMarker",
        value: function splitAtPasteMarker() {
            if (!this.rootNode.pasteMarkerNode) {
                throw new Error("Cannot split at pasteMarker! pasteMarker is not set!");
            }
            if (this.rootNode.pasteMarkerNode.parentNode.isRootNode()) {
                throw new Error("Cannot split at pasteMarker! pasteMarker is placed at root!");
            }
            this.rootNode.pasteMarkerNode.splitParentAfterMe();
            this.movePasteMarkerTo(this.rootNode.pasteMarkerNode.parentNode.parentNode, this.rootNode.pasteMarkerNode.parentNode.getParentChildListIndex());
        }
    }, {
        key: "movePasteMarkerTo",
        value: function movePasteMarkerTo(node, index) {
            var previousParent = this.rootNode.pasteMarkerNode.parentNode;
            var previousParentIndex = this.rootNode.pasteMarkerNode.getParentChildListIndex();
            previousParent.children.splice(previousParentIndex, 1);
            this.rootNode.pasteMarkerNode.parentNode = node;
            node.addChildNodeAtIndex(index, this.rootNode.pasteMarkerNode);
        }
    }, {
        key: "getParentChildListIndex",
        value: function getParentChildListIndex() {
            if (!this.parentNode) {
                throw new Error("Cannot get parentChildListIndex. Has no parent.");
            }
            return this.parentNode.children.indexOf(this);
        }
    }, {
        key: "splitAfterChildIndex",
        value: function splitAfterChildIndex(index) {
            if (index >= this.children.length) {
                throw new Error("Cannot split children at index " + index + ", children.length: " + this.children.length);
            }

            var newSiblingNode = new CleanerNode(this.options, this.parentNode, this.rootNode, this.preservePasteMarker, this.tagName, this.attributes);
            newSiblingNode.children = this.children.slice(index);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = newSiblingNode.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var child = _step2.value;

                    if ((0, _typeDetect2.default)(child) == 'object') {
                        child.parentNode = newSiblingNode;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this.children = this.children.slice(0, index);
            this.parentNode.addChildNodeAtIndex(this.getParentChildListIndex() + 1, newSiblingNode);
        }
    }, {
        key: "splitParentAfterMe",
        value: function splitParentAfterMe() {
            this.parentNode.splitAfterChildIndex(this.getParentChildListIndex());
        }
    }, {
        key: "addChildNodeAtIndex",
        value: function addChildNodeAtIndex(index, node) {
            this.children.splice(index, 0, node);
        }
    }, {
        key: "getClosestParentWithTagName",
        value: function getClosestParentWithTagName(tagName) {
            if (this.parentNode == null || this.parentNode.tagName == null) {
                return null;
            }
            if (this.parentNode.tagName == tagName) {
                return this.parentNode;
            } else {
                return this.parentNode.getClosestParentWithTagName(tagName);
            }
        }
    }, {
        key: "transformTagName",
        value: function transformTagName() {
            if (this.originalTagName != null && this.options.transformTagsMap.has(this.originalTagName)) {
                return this.options.transformTagsMap.get(this.originalTagName);
            }
            return this.originalTagName;
        }
    }, {
        key: "cleanTagName",
        value: function cleanTagName() {
            var tagName = this.transformTagName();
            if (tagName != null && this.options.allowedTagsSet.has(tagName) || this.isSpecialNode()) {
                return tagName;
            }
            return null;
        }
    }, {
        key: "cleanAttributes",
        value: function cleanAttributes() {
            var cleanedAttributes = {};
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = Object.keys(this.originalAttributes)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var attributeName = _step3.value;

                    if (this.options.isAllowedAttributeForTagName(this.tagName, attributeName) || this.isSpecialNode()) {
                        cleanedAttributes[attributeName] = this.originalAttributes[attributeName];
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return cleanedAttributes;
        }
    }, {
        key: "shouldWrapStandaloneInlineTags",
        value: function shouldWrapStandaloneInlineTags() {
            return this.parentNode == null && this.options.wrapStandaloneInlineTagName != null;
        }
    }, {
        key: "getStandaloneInlineTagWrapper",
        value: function getStandaloneInlineTagWrapper() {
            if (this._inlineWrapperNode == null) {
                var node = this.makeChildNode(this.options.wrapStandaloneInlineTagName, this.options.wrapStandaloneInlineTagAttributes);
                this._inlineWrapperNode = node;
                this.children.push(node);
            }
            return this._inlineWrapperNode;
        }
    }, {
        key: "stopWrappingStandaloneInlineTags",
        value: function stopWrappingStandaloneInlineTags() {
            this._inlineWrapperNode = null;
        }
    }, {
        key: "addText",
        value: function addText(text) {
            if (this.shouldWrapStandaloneInlineTags()) {
                this.getStandaloneInlineTagWrapper().addText(text);
            } else {
                this.children.push(text);
            }
        }
    }, {
        key: "makeChildNode",
        value: function makeChildNode(tagName, attributes) {
            var cleanerNodeClass = this.options.getCleanerNodeClassForTagName(tagName);
            return new cleanerNodeClass(this.options, this, this.rootNode, this.preservePasteMarker, tagName, attributes);
        }
    }, {
        key: "isInlineTag",
        value: function isInlineTag() {
            return (0, _utils.isInlineTag)(this.tagName);
        }
    }, {
        key: "isRootNode",
        value: function isRootNode() {
            return this.parentNode == null;
        }
    }, {
        key: "isPasteMarker",
        value: function isPasteMarker() {
            if (this.originalAttributes.hasOwnProperty(this.pasteMarkerAttribute)) {
                if (this.isRootNode()) {
                    throw new Error("the rootnode cannot be the paste marker-node!");
                }
                this.rootNode.setPasteMarkerNode(this);
                return true;
            }
            return false;
        }
    }, {
        key: "setPasteMarkerNode",
        value: function setPasteMarkerNode(node) {
            this.pasteMarkerNode = node;
        }

        /**
         * Special nodes are nodes like the paste-marker. If the cleaner is configured for it, these nodes should not be
         * cleaned or altered in any way.
         *
         * @returns {boolean} if true, the current node is a special node, as such, any attributes is legal and any tagname is legal.
         */

    }, {
        key: "isSpecialNode",
        value: function isSpecialNode() {
            if (this.preservePasteMarker && this.isPasteMarker()) {
                return true;
            }

            // Add if-tests for other special nodes here if any are added...

            return false;
        }
    }, {
        key: "addChildNode",
        value: function addChildNode(node) {
            if (this.shouldWrapStandaloneInlineTags() && node.isInlineTag()) {
                this.getStandaloneInlineTagWrapper().addChildNode(node);
            } else {
                this.stopWrappingStandaloneInlineTags();
                this.children.push(node);
            }
        }
    }, {
        key: "addChildNodeFromTag",
        value: function addChildNodeFromTag(tagName, attributes) {
            var node = this.makeChildNode(tagName, attributes);
            this.addChildNode(node);
            return node;
        }
    }, {
        key: "shouldRenderTag",
        value: function shouldRenderTag() {
            if (this.isSpecialNode()) {
                return true;
            }
            if (this.tagName == null) {
                return false;
            }
            var closestParentNodeWithSameTag = this.getClosestParentWithTagName(this.tagName);
            if (closestParentNodeWithSameTag == null) {
                return true;
            }
            return this.options.allowNestedWithinSameTagSet.has(this.tagName);
        }
    }, {
        key: "makeStartTag",
        value: function makeStartTag() {
            if (this.shouldRenderTag()) {
                return (0, _utils.makeHtmlStartTag)(this.tagName, this.attributes);
            }
            return '';
        }
    }, {
        key: "makeEndTag",
        value: function makeEndTag() {
            if (this.shouldRenderTag()) {
                return (0, _utils.makeHtmlEndTag)(this.tagName);
            }
            return '';
        }
    }, {
        key: "childrenToHtml",
        value: function childrenToHtml() {
            var html = '';
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var child = _step4.value;

                    if (typeof child == 'string') {
                        html += child;
                    } else {
                        html += child.toHtml();
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return html;
        }
    }, {
        key: "toHtml",
        value: function toHtml() {
            var html = "" + this.makeStartTag() + this.childrenToHtml() + this.makeEndTag();
            if (_ObjectManager2.default.validate(this.options, 'normalizeEmptyTags')) {
                var emptyTagHtml = "<" + this.tagName + "></" + this.tagName + ">";
                if (html == emptyTagHtml) {
                    if (_ObjectManager2.default.validate(this.options.normalizeEmptyTags, 'fill', this.tagName)) {
                        var textToFillEmptyTag = this.options.normalizeEmptyTags.fill[this.tagName];
                        return "<" + this.tagName + ">" + textToFillEmptyTag + "</" + this.tagName + ">";
                    }
                    if (_ObjectManager2.default.validate(this.options.normalizeEmptyTags, 'remove')) {
                        if (this.options.normalizeEmptyTags.remove.includes(this.tagName)) {
                            return '';
                        }
                    }
                }
            }

            return html;
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.toHtml();
        }
    }]);

    return CleanerNode;
}();

// Should be the default for nodes that can not contain
// text as a direct child, such as UL, OL, TABLE, ...
// and all the self-closing tags.


var NoTextCleanerNode = exports.NoTextCleanerNode = function (_CleanerNode) {
    _inherits(NoTextCleanerNode, _CleanerNode);

    function NoTextCleanerNode() {
        _classCallCheck(this, NoTextCleanerNode);

        return _possibleConstructorReturn(this, (NoTextCleanerNode.__proto__ || Object.getPrototypeOf(NoTextCleanerNode)).apply(this, arguments));
    }

    _createClass(NoTextCleanerNode, [{
        key: "addText",
        value: function addText(text) {}
    }]);

    return NoTextCleanerNode;
}(CleanerNode);

var FlatListCleanerNode = exports.FlatListCleanerNode = function (_NoTextCleanerNode) {
    _inherits(FlatListCleanerNode, _NoTextCleanerNode);

    function FlatListCleanerNode() {
        _classCallCheck(this, FlatListCleanerNode);

        return _possibleConstructorReturn(this, (FlatListCleanerNode.__proto__ || Object.getPrototypeOf(FlatListCleanerNode)).apply(this, arguments));
    }

    _createClass(FlatListCleanerNode, [{
        key: "shouldRenderTag",
        value: function shouldRenderTag() {
            if (this.tagName == null) {
                return false;
            }
            var closestUlParentNode = this.getClosestParentWithTagName(this.tagName);
            return closestUlParentNode == null;
        }
    }, {
        key: "addChildNode",
        value: function addChildNode(node) {
            var closestListParentNode = this.getClosestParentWithTagName(this.tagName);
            if (closestListParentNode == null) {
                _get(FlatListCleanerNode.prototype.__proto__ || Object.getPrototypeOf(FlatListCleanerNode.prototype), "addChildNode", this).call(this, node);
            } else {
                closestListParentNode.addChildNode(node);
            }
        }
    }]);

    return FlatListCleanerNode;
}(NoTextCleanerNode);

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


var CleanHtmlParser = exports.CleanHtmlParser = function () {
    function CleanHtmlParser(html, options, preservePasteMarker) {
        _classCallCheck(this, CleanHtmlParser);

        this.options = options;
        this.preservePasteMarker = preservePasteMarker;
        this._parse(html);
        if (this._isWrappingStandaloneInline) {
            this.endWrappingStandaloneInline();
        }
    }

    _createClass(CleanHtmlParser, [{
        key: "_parse",
        value: function _parse(html) {
            var _this3 = this;

            this._rootNode = new this.options.rootCleanerNodeClass(this.options, null, // parentNode
            null, // rootNode
            this.preservePasteMarker, this.options.rootCleanerNodeTagName, this.options.rootCleanerNodeAttributes);
            this._currentNode = this._rootNode;
            var parser = new _htmlparser2.default.Parser({
                onopentag: function onopentag() {
                    _this3.onOpenTag.apply(_this3, arguments);
                },
                ontext: function ontext() {
                    _this3.onText.apply(_this3, arguments);
                },
                onclosetag: function onclosetag() {
                    _this3.onCloseTag.apply(_this3, arguments);
                }
            }, { decodeEntities: true });
            parser.write(html);
            parser.end();
        }
    }, {
        key: "onOpenTag",
        value: function onOpenTag(tagName, attributes) {
            var node = this._currentNode.addChildNodeFromTag(tagName, attributes);
            // console.log(`${tagName}: ${node.toString()}`);
            this._currentNode = node;
        }
    }, {
        key: "onText",
        value: function onText(text) {
            this._currentNode.addText(text);
        }
    }, {
        key: "onCloseTag",
        value: function onCloseTag(tagName) {
            this._currentNode = this._currentNode.parentNode;
        }
    }, {
        key: "rootNode",
        get: function get() {
            return this._rootNode;
        }
    }]);

    return CleanHtmlParser;
}();

var CleanHtmlOptions = exports.CleanHtmlOptions = function () {
    function CleanHtmlOptions() {
        _classCallCheck(this, CleanHtmlOptions);

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

    _createClass(CleanHtmlOptions, [{
        key: "isAllowedAttributeForTagName",
        value: function isAllowedAttributeForTagName(tagName, attributeName) {
            if (this._allowedAttributesMap.has(tagName)) {
                return this._allowedAttributesMap.get(tagName).has(attributeName);
            }
            return false;
        }
    }, {
        key: "getCleanerNodeClassForTagName",
        value: function getCleanerNodeClassForTagName(tagName) {
            if (this._tagNameToCleanerNodeClassMap.has(tagName)) {
                return this._tagNameToCleanerNodeClassMap.get(tagName);
            } else {
                return this.defaultCleanerNodeClass;
            }
        }
    }, {
        key: "setCleanerNodeClassForTagName",
        value: function setCleanerNodeClassForTagName(tagName, cleanerNodeClass) {
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

    }, {
        key: "allowedTagsSet",
        get: function get() {
            return this._allowedTagsSet;
        },
        set: function set(allowedTagsSet) {
            this._allowedTagsSet = _TypeConvert2.default.toSet(allowedTagsSet);
        }
    }, {
        key: "allowedAttributesMap",
        get: function get() {
            return this._allowedAttributesMap;
        },
        set: function set(allowedAttributesMap) {
            this._allowedAttributesMap = _TypeConvert2.default.toMapOfSets(allowedAttributesMap);
        }
    }, {
        key: "transformTagsMap",
        set: function set(transformTagsMap) {
            this._transformTagsMap = _TypeConvert2.default.toMap(transformTagsMap);
        },
        get: function get() {
            return this._transformTagsMap;
        }
    }, {
        key: "allowNestedWithinSameTagSet",
        get: function get() {
            return this._allowNestedWithinSameTagSet;
        },
        set: function set(allowNestedWithinSameTagSet) {
            this._allowNestedWithinSameTagSet = _TypeConvert2.default.toSet(allowNestedWithinSameTagSet);
        }
    }, {
        key: "tagNameToCleanerNodeClassMap",
        set: function set(tagNameToCleanerNodeClassMap) {
            this._tagNameToCleanerNodeClassMap = _TypeConvert2.default.toMap(tagNameToCleanerNodeClassMap);
        },
        get: function get() {
            return this._tagNameToCleanerNodeClassMap;
        }
    }]);

    return CleanHtmlOptions;
}();

/**
 * HTML cleaner with extra post cleaning that makes it
 * suitable for cleaning input typed and pasted into
 * contenteditable editors.
 */


var CleanHtml = function () {
    function CleanHtml() {
        _classCallCheck(this, CleanHtml);

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


    _createClass(CleanHtml, [{
        key: "preClean",
        value: function preClean(html) {
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

    }, {
        key: "postClean",
        value: function postClean(html) {
            return html;
        }
    }, {
        key: "_getCleanedTree",
        value: function _getCleanedTree(html, preservePasteMarker) {
            return new CleanHtmlParser(html, this.options, preservePasteMarker);
        }
    }, {
        key: "_clean",
        value: function _clean(html, preservePasteMarker) {
            return this._getCleanedTree(html, preservePasteMarker).rootNode.toHtml();
        }

        /**
         * Clean the provided html.
         *
         * @param {string} html The HTML to clean.
         * @param preservePasteMarker {boolean} if true, leave the tag with `data-ievv-paste-marker` attribute.
         * @returns {string} The cleaned HTML.
         */

    }, {
        key: "clean",
        value: function clean(html) {
            var preservePasteMarker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var cleanedHtml = this.preClean(html);
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

    }, {
        key: "paste",
        value: function paste(originalHtml, pastedHtml) {
            var cleanedPastedTree = this._getCleanedTree(pastedHtml);
            var cleanedOriginalTree = this._getCleanedTree(originalHtml, true);

            // console.log(`Running paste.\n\nCleaned original tree: ${cleanedOriginalTree.rootNode.toHtml()}\n\ncleanedPastedTree: ${cleanedPastedTree.rootNode.toHtml()}`);
            // console.log(`cleanedOriginalTree.rootNode: `, cleanedOriginalTree.rootNode);
            // console.log(`cleanedPastedTree.rootNode: `, cleanedPastedTree.rootNode);

            try {
                cleanedOriginalTree.rootNode.insertNodeAtPasteMarker(cleanedPastedTree.rootNode);
            } catch (e) {
                if (e instanceof _CleanHtmlErrors.PasteMarkerNotSetError) {
                    var cleanedOriginalHtml = cleanedOriginalTree.rootNode.toHtml();
                    var cleanedPastedHtml = cleanedPastedTree.rootNode.toHtml();
                    return this.clean("" + cleanedOriginalHtml + cleanedPastedHtml, true);
                } else {
                    throw e;
                }
            }

            return this.clean(cleanedOriginalTree.rootNode.toHtml(), true);
        }
    }]);

    return CleanHtml;
}();

exports.default = CleanHtml;
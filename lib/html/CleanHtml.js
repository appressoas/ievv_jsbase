"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CleanHtmlOptions = exports.CleanHtmlParser = exports.FlatListCleanerNode = exports.NoTextCleanerNode = exports.CleanerNode = void 0;

var _htmlparser = _interopRequireDefault(require("htmlparser2"));

var _utils = require("./utils");

var _TypeConvert = _interopRequireDefault(require("../utils/TypeConvert"));

var _ObjectManager = _interopRequireDefault(require("../utils/ObjectManager"));

var _typeDetect = _interopRequireDefault(require("../utils/typeDetect"));

var _CleanHtmlErrors = require("./CleanHtmlErrors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CleanerNode =
/*#__PURE__*/
function () {
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

          if ((0, _typeDetect.default)(child) == 'object') {
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
          if (!_iteratorNormalCompletion && _iterator.return != null) {
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
      if ((0, _typeDetect.default)(node) == 'string') {
        return [true, node];
      }

      if (node.tagName == null && node.children.length == 1) {
        return this.checkIfNodeIsJustStringAndExtractString(node.children[0]);
      }

      var _this$getBlockNodeFor = this.getBlockNodeForNode(this.rootNode.pasteMarkerNode),
          _this$getBlockNodeFor2 = _slicedToArray(_this$getBlockNodeFor, 2),
          pasteMarkerInBlockTag = _this$getBlockNodeFor2[0],
          pasteMarkerBlockTag = _this$getBlockNodeFor2[1];

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

      var _this$checkIfNodeIsJu = this.checkIfNodeIsJustStringAndExtractString(node),
          _this$checkIfNodeIsJu2 = _slicedToArray(_this$checkIfNodeIsJu, 2),
          isStringNode = _this$checkIfNodeIsJu2[0],
          stringValue = _this$checkIfNodeIsJu2[1];

      if (isStringNode) {
        // console.log("This node is just a string: ", node);
        this.rootNode.pasteMarkerNode.parentNode.addChildNodeAtIndex(this.rootNode.pasteMarkerNode.getParentChildListIndex(), stringValue);
        return;
      } // console.log("This node is not a string: ", node);
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

      while (currentNode.children.length > 0 && (0, _typeDetect.default)(currentNode.children[currentNode.children.length - 1]) == 'object') {
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
        throw new Error("Cannot split children at index ".concat(index, ", children.length: ").concat(this.children.length));
      }

      var newSiblingNode = new CleanerNode(this.options, this.parentNode, this.rootNode, this.preservePasteMarker, this.tagName, this.attributes);
      newSiblingNode.children = this.children.slice(index);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = newSiblingNode.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var child = _step2.value;

          if ((0, _typeDetect.default)(child) == 'object') {
            child.parentNode = newSiblingNode;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
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

      for (var _i2 = 0, _Object$keys = Object.keys(this.originalAttributes); _i2 < _Object$keys.length; _i2++) {
        var attributeName = _Object$keys[_i2];

        if (this.options.isAllowedAttributeForTagName(this.tagName, attributeName) || this.isSpecialNode()) {
          cleanedAttributes[attributeName] = this.originalAttributes[attributeName];
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
      } // Add if-tests for other special nodes here if any are added...


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
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var child = _step3.value;

          if (typeof child == 'string') {
            html += child;
          } else {
            html += child.toHtml();
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return html;
    }
  }, {
    key: "toHtml",
    value: function toHtml() {
      var html = "".concat(this.makeStartTag()).concat(this.childrenToHtml()).concat(this.makeEndTag());

      if (_ObjectManager.default.validate(this.options, 'normalizeEmptyTags')) {
        var emptyTagHtml = "<".concat(this.tagName, "></").concat(this.tagName, ">");

        if (html == emptyTagHtml) {
          if (_ObjectManager.default.validate(this.options.normalizeEmptyTags, 'fill', this.tagName)) {
            var textToFillEmptyTag = this.options.normalizeEmptyTags.fill[this.tagName];
            return "<".concat(this.tagName, ">").concat(textToFillEmptyTag, "</").concat(this.tagName, ">");
          }

          if (_ObjectManager.default.validate(this.options.normalizeEmptyTags, 'remove')) {
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
}(); // Should be the default for nodes that can not contain
// text as a direct child, such as UL, OL, TABLE, ...
// and all the self-closing tags.


exports.CleanerNode = CleanerNode;

var NoTextCleanerNode =
/*#__PURE__*/
function (_CleanerNode) {
  _inherits(NoTextCleanerNode, _CleanerNode);

  function NoTextCleanerNode() {
    _classCallCheck(this, NoTextCleanerNode);

    return _possibleConstructorReturn(this, _getPrototypeOf(NoTextCleanerNode).apply(this, arguments));
  }

  _createClass(NoTextCleanerNode, [{
    key: "addText",
    value: function addText(text) {}
  }]);

  return NoTextCleanerNode;
}(CleanerNode);

exports.NoTextCleanerNode = NoTextCleanerNode;

var FlatListCleanerNode =
/*#__PURE__*/
function (_NoTextCleanerNode) {
  _inherits(FlatListCleanerNode, _NoTextCleanerNode);

  function FlatListCleanerNode() {
    _classCallCheck(this, FlatListCleanerNode);

    return _possibleConstructorReturn(this, _getPrototypeOf(FlatListCleanerNode).apply(this, arguments));
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
        _get(_getPrototypeOf(FlatListCleanerNode.prototype), "addChildNode", this).call(this, node);
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


exports.FlatListCleanerNode = FlatListCleanerNode;

var CleanHtmlParser =
/*#__PURE__*/
function () {
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
      var _this = this;

      this._rootNode = new this.options.rootCleanerNodeClass(this.options, null, // parentNode
      null, // rootNode
      this.preservePasteMarker, this.options.rootCleanerNodeTagName, this.options.rootCleanerNodeAttributes);
      this._currentNode = this._rootNode;
      var parser = new _htmlparser.default.Parser({
        onopentag: function onopentag() {
          _this.onOpenTag.apply(_this, arguments);
        },
        ontext: function ontext() {
          _this.onText.apply(_this, arguments);
        },
        onclosetag: function onclosetag() {
          _this.onCloseTag.apply(_this, arguments);
        }
      }, {
        decodeEntities: true
      });
      parser.write(html);
      parser.end();
    }
  }, {
    key: "onOpenTag",
    value: function onOpenTag(tagName, attributes) {
      var node = this._currentNode.addChildNodeFromTag(tagName, attributes); // console.log(`${tagName}: ${node.toString()}`);


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

exports.CleanHtmlParser = CleanHtmlParser;

var CleanHtmlOptions =
/*#__PURE__*/
function () {
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
    } // updateFromObject(optionsObject) {
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
      this._allowedTagsSet = _TypeConvert.default.toSet(allowedTagsSet);
    }
  }, {
    key: "allowedAttributesMap",
    get: function get() {
      return this._allowedAttributesMap;
    },
    set: function set(allowedAttributesMap) {
      this._allowedAttributesMap = _TypeConvert.default.toMapOfSets(allowedAttributesMap);
    }
  }, {
    key: "transformTagsMap",
    set: function set(transformTagsMap) {
      this._transformTagsMap = _TypeConvert.default.toMap(transformTagsMap);
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
      this._allowNestedWithinSameTagSet = _TypeConvert.default.toSet(allowNestedWithinSameTagSet);
    }
  }, {
    key: "tagNameToCleanerNodeClassMap",
    set: function set(tagNameToCleanerNodeClassMap) {
      this._tagNameToCleanerNodeClassMap = _TypeConvert.default.toMap(tagNameToCleanerNodeClassMap);
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


exports.CleanHtmlOptions = CleanHtmlOptions;

var CleanHtml =
/*#__PURE__*/
function () {
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

      var cleanedOriginalTree = this._getCleanedTree(originalHtml, true); // console.log(`Running paste.\n\nCleaned original tree: ${cleanedOriginalTree.rootNode.toHtml()}\n\ncleanedPastedTree: ${cleanedPastedTree.rootNode.toHtml()}`);
      // console.log(`cleanedOriginalTree.rootNode: `, cleanedOriginalTree.rootNode);
      // console.log(`cleanedPastedTree.rootNode: `, cleanedPastedTree.rootNode);


      try {
        cleanedOriginalTree.rootNode.insertNodeAtPasteMarker(cleanedPastedTree.rootNode);
      } catch (e) {
        if (e instanceof _CleanHtmlErrors.PasteMarkerNotSetError) {
          var cleanedOriginalHtml = cleanedOriginalTree.rootNode.toHtml();
          var cleanedPastedHtml = cleanedPastedTree.rootNode.toHtml();
          return this.clean("".concat(cleanedOriginalHtml).concat(cleanedPastedHtml), true);
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NoTextCleanerNode = exports.FlatListCleanerNode = exports.CleanerNode = exports.CleanHtmlParser = exports.CleanHtmlOptions = void 0;
var _htmlparser = _interopRequireDefault(require("htmlparser2"));
var _utils = require("./utils");
var _TypeConvert = _interopRequireDefault(require("../utils/TypeConvert"));
var _ObjectManager = _interopRequireDefault(require("../utils/ObjectManager"));
var _typeDetect = _interopRequireDefault(require("../utils/typeDetect"));
var _CleanHtmlErrors = require("./CleanHtmlErrors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CleanerNode = exports.CleanerNode = /*#__PURE__*/function () {
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
  return _createClass(CleanerNode, [{
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
      var _iterator = _createForOfIteratorHelper(this.children),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
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
        _iterator.e(err);
      } finally {
        _iterator.f();
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
      var _iterator2 = _createForOfIteratorHelper(newSiblingNode.children),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var child = _step2.value;
          if ((0, _typeDetect.default)(child) == 'object') {
            child.parentNode = newSiblingNode;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
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
      for (var _i = 0, _Object$keys = Object.keys(this.originalAttributes); _i < _Object$keys.length; _i++) {
        var attributeName = _Object$keys[_i];
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
      var _iterator3 = _createForOfIteratorHelper(this.children),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var child = _step3.value;
          if (typeof child == 'string') {
            html += child;
          } else {
            html += child.toHtml();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
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
}(); // Should be the default for nodes that can not contain
// text as a direct child, such as UL, OL, TABLE, ...
// and all the self-closing tags.
var NoTextCleanerNode = exports.NoTextCleanerNode = /*#__PURE__*/function (_CleanerNode) {
  function NoTextCleanerNode() {
    _classCallCheck(this, NoTextCleanerNode);
    return _callSuper(this, NoTextCleanerNode, arguments);
  }
  _inherits(NoTextCleanerNode, _CleanerNode);
  return _createClass(NoTextCleanerNode, [{
    key: "addText",
    value: function addText(text) {}
  }]);
}(CleanerNode);
var FlatListCleanerNode = exports.FlatListCleanerNode = /*#__PURE__*/function (_NoTextCleanerNode) {
  function FlatListCleanerNode() {
    _classCallCheck(this, FlatListCleanerNode);
    return _callSuper(this, FlatListCleanerNode, arguments);
  }
  _inherits(FlatListCleanerNode, _NoTextCleanerNode);
  return _createClass(FlatListCleanerNode, [{
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
var CleanHtmlParser = exports.CleanHtmlParser = /*#__PURE__*/function () {
  function CleanHtmlParser(html, options, preservePasteMarker) {
    _classCallCheck(this, CleanHtmlParser);
    this.options = options;
    this.preservePasteMarker = preservePasteMarker;
    this._parse(html);
    if (this._isWrappingStandaloneInline) {
      this.endWrappingStandaloneInline();
    }
  }
  return _createClass(CleanHtmlParser, [{
    key: "_parse",
    value: function _parse(html) {
      var _this = this;
      this._rootNode = new this.options.rootCleanerNodeClass(this.options, null,
      // parentNode
      null,
      // rootNode
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
}();
var CleanHtmlOptions = exports.CleanHtmlOptions = /*#__PURE__*/function () {
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
  return _createClass(CleanHtmlOptions, [{
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
    key: "isAllowedAttributeForTagName",
    value: function isAllowedAttributeForTagName(tagName, attributeName) {
      if (this._allowedAttributesMap.has(tagName)) {
        return this._allowedAttributesMap.get(tagName).has(attributeName);
      }
      return false;
    }
  }, {
    key: "transformTagsMap",
    get: function get() {
      return this._transformTagsMap;
    },
    set: function set(transformTagsMap) {
      this._transformTagsMap = _TypeConvert.default.toMap(transformTagsMap);
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
    get: function get() {
      return this._tagNameToCleanerNodeClassMap;
    },
    set: function set(tagNameToCleanerNodeClassMap) {
      this._tagNameToCleanerNodeClassMap = _TypeConvert.default.toMap(tagNameToCleanerNodeClassMap);
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
  }]);
}();
/**
 * HTML cleaner with extra post cleaning that makes it
 * suitable for cleaning input typed and pasted into
 * contenteditable editors.
 */
var CleanHtml = exports.default = /*#__PURE__*/function () {
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
  return _createClass(CleanHtml, [{
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
          return this.clean("".concat(cleanedOriginalHtml).concat(cleanedPastedHtml), true);
        } else {
          throw e;
        }
      }
      return this.clean(cleanedOriginalTree.rootNode.toHtml(), true);
    }
  }]);
}();
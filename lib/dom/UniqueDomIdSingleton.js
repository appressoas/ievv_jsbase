"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _instance = null;

/**
 * Unique DOM id generator singleton.
 *
 * @example
 * const domId1 = new UniqueDomIdSingleton().generate()
 * // domId1 === 'id_ievvjsbase_auto_1'
 * const domId2 = new UniqueDomIdSingleton().generate()
 * // domId2 === 'id_ievvjsbase_auto_2'
 */
var UniqueDomIdSingleton = exports.default = /*#__PURE__*/function () {
  /**
   * Get an instance of the singleton.
   *
   * The first time this is called, we create a new instance.
   * For all subsequent calls, we return the instance that was
   * created on the first call.
   */
  function UniqueDomIdSingleton() {
    _classCallCheck(this, UniqueDomIdSingleton);
    if (!_instance) {
      _instance = this;
    }
    this.domIdIndex = 0;
    return _instance;
  }

  /**
   * Generate a unique DOM id.
   */
  return _createClass(UniqueDomIdSingleton, [{
    key: "generate",
    value: function generate() {
      this.domIdIndex++;
      return "id_ievvjsbase_auto_".concat(this.domIdIndex);
    }
  }]);
}();
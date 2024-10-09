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
var AbstractBackend = exports.default = /*#__PURE__*/function () {
  function AbstractBackend() {
    _classCallCheck(this, AbstractBackend);
  }
  return _createClass(AbstractBackend, [{
    key: "gettext",
    value: function gettext(msgid) {
      return msgid;
    }
  }, {
    key: "pluralidx",
    value: function pluralidx(count) {
      return count === 1 ? 0 : 1;
    }
  }, {
    key: "ngettext",
    value: function ngettext(singular, plural, count) {
      return count === 1 ? singular : plural;
    }
  }, {
    key: "gettextNoop",
    value: function gettextNoop(msgid) {
      return msgid;
    }
  }, {
    key: "pgettext",
    value: function pgettext(context, msgid) {
      return msgid;
    }
  }, {
    key: "npgettext",
    value: function npgettext(context, singular, plural, count) {
      return count === 1 ? singular : plural;
    }
  }, {
    key: "interpolate",
    value: function interpolate(fmt, obj, named) {
      if (named) {
        return fmt.replace(/%\(\w+\)s/g, function (match) {
          return String(obj[match.slice(2, -2)]);
        });
      } else {
        return fmt.replace(/%s/g, function (match) {
          return String(obj.shift());
        });
      }
    }
  }, {
    key: "getFormat",
    value: function getFormat(formatType) {
      return formatType;
    }
  }, {
    key: "getActivationWarning",
    value: function getActivationWarning() {
      return null;
    }
  }]);
}();
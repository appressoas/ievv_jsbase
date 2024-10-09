"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GettextBackendRegistry = void 0;
var _django = require("./django");
var _noop = require("./noop");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _instance = null;
var GettextBackendRegistry = exports.GettextBackendRegistry = /*#__PURE__*/function () {
  function GettextBackendRegistry() {
    _classCallCheck(this, GettextBackendRegistry);
    if (!_instance) {
      _instance = this;
      this.initialize();
    }
    return _instance;
  }
  return _createClass(GettextBackendRegistry, [{
    key: "initialize",
    value: function initialize() {
      this._backendMap = new Map();
      this.addDefaultBackends();
      if (process.env.IEVV_GETTEXT_BACKEND_ID) {
        this.autoActivateBackend();
      } else {
        this.activateBackend('noop');
      }
    }
  }, {
    key: "addDefaultBackends",
    value: function addDefaultBackends() {
      this.add('noop', new _noop.NoopBackend());
      this.add('noop_silent', new _noop.NoopSilentBackend());
      this.add('django', new _django.DjangoBackend());
    }
  }, {
    key: "add",
    value: function add(backendId, backendObject) {
      this._backendMap.set(backendId, backendObject);
    }
  }, {
    key: "activateBackend",
    value: function activateBackend(backendId) {
      if (!this._backendMap.has(backendId)) {
        if (process.env.NODE_ENV !== 'test') {
          console.warn("Invalid gettext backend ID: ".concat(backendId, "."));
        }
        backendId = 'noop';
      }
      this.backend = this._backendMap.get(backendId);
      if (process.env.NODE_ENV !== 'test') {
        var warning = this.backend.getActivationWarning();
        if (warning !== null) {
          console.warn(warning);
        }
      }
    }
  }, {
    key: "autoActivateBackend",
    value: function autoActivateBackend() {
      if (process.env.IEVV_GETTEXT_BACKEND_ID) {
        this.activateBackend(process.env.IEVV_GETTEXT_BACKEND_ID);
      } else {
        this.activateBackend('noop');
      }
    }
  }]);
}();
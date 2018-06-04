"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GettextBackendRegistry = void 0;

var _django = require("./django");

var _noop = require("./noop");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _instance = null;

var GettextBackendRegistry =
/*#__PURE__*/
function () {
  function GettextBackendRegistry() {
    _classCallCheck(this, GettextBackendRegistry);

    if (!_instance) {
      _instance = this;
      this.initialize();
    }

    return _instance;
  }

  _createClass(GettextBackendRegistry, [{
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

  return GettextBackendRegistry;
}();

exports.GettextBackendRegistry = GettextBackendRegistry;
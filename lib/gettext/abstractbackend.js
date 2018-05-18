"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AbstractBackend =
/*#__PURE__*/
function () {
  function AbstractBackend() {
    _classCallCheck(this, AbstractBackend);
  }

  _createClass(AbstractBackend, [{
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

  return AbstractBackend;
}();

exports.default = AbstractBackend;
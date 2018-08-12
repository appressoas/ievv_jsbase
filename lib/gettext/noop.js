"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoopSilentBackend = exports.NoopBackend = void 0;

var _abstractbackend = _interopRequireDefault(require("./abstractbackend"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

var NoopBackend =
/*#__PURE__*/
function (_AbstractBackend) {
  function NoopBackend() {
    _classCallCheck(this, NoopBackend);

    return _possibleConstructorReturn(this, _getPrototypeOf(NoopBackend).apply(this, arguments));
  }

  _createClass(NoopBackend, [{
    key: "getActivationWarning",
    value: function getActivationWarning() {
      return 'Using "noop" gettext backend. Translations are disabled.';
    }
  }]);

  _inherits(NoopBackend, _AbstractBackend);

  return NoopBackend;
}(_abstractbackend.default);

exports.NoopBackend = NoopBackend;

var NoopSilentBackend =
/*#__PURE__*/
function (_AbstractBackend2) {
  function NoopSilentBackend() {
    _classCallCheck(this, NoopSilentBackend);

    return _possibleConstructorReturn(this, _getPrototypeOf(NoopSilentBackend).apply(this, arguments));
  }

  _inherits(NoopSilentBackend, _AbstractBackend2);

  return NoopSilentBackend;
}(_abstractbackend.default);

exports.NoopSilentBackend = NoopSilentBackend;
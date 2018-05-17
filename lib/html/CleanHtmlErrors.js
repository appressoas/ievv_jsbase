"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasteMarkerNotSetError = void 0;

var _makeCustomError = _interopRequireDefault(require("../makeCustomError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PasteMarkerNotSetError = (0, _makeCustomError.default)("PasteMarkerNotSet");
exports.PasteMarkerNotSetError = PasteMarkerNotSetError;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notBlankValidator = notBlankValidator;
exports.noOpValidator = noOpValidator;

var gettext = _interopRequireWildcard(require("../gettext"));

var _customErrors = require("../customErrors");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function notBlankValidator(value) {
  if (value === null || value === undefined || value.trim() === '') {
    throw (0, _customErrors.ValidationError)(gettext.pgettext('frontend validation error', 'This field can not be blank'));
  }

  return value;
}

function noOpValidator(value) {
  return value;
}
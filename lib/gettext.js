"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gettext = gettext;
exports.pluralidx = pluralidx;
exports.ngettext = ngettext;
exports.gettext_noop = gettext_noop;
exports.pgettext = pgettext;
exports.npgettext = npgettext;
exports.interpolate = interpolate;
exports.get_format = get_format;

var _backendregistry = require("./gettext/backendregistry");

function gettext(msgid) {
  return new _backendregistry.GettextBackendRegistry().backend.gettext(msgid);
}

function pluralidx(count) {
  return new _backendregistry.GettextBackendRegistry().backend.pluralidx(count);
}

function ngettext(singular, plural, count) {
  return new _backendregistry.GettextBackendRegistry().backend.ngettext(singular, plural, count);
}

function gettext_noop(msgid) {
  return new _backendregistry.GettextBackendRegistry().backend.gettextNoop(msgid);
}

function pgettext(context, msgid) {
  return new _backendregistry.GettextBackendRegistry().backend.pgettext(context, msgid);
}

function npgettext(context, singular, plural, count) {
  return new _backendregistry.GettextBackendRegistry().backend.npgettext(context, singular, plural, count);
}

function interpolate(fmt, obj, named) {
  return new _backendregistry.GettextBackendRegistry().backend.interpolate(fmt, obj, named);
}

function get_format(formatType) {
  return new _backendregistry.GettextBackendRegistry().backend.getFormat(formatType);
}
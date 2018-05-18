import { GettextBackendRegistry } from './gettext/backendregistry'

export function gettext (msgid) {
  return new GettextBackendRegistry().backend.gettext(msgid)
}

export function pluralidx (count) {
  return new GettextBackendRegistry().backend.pluralidx(count)
}

export function ngettext (singular, plural, count) {
  return new GettextBackendRegistry().backend.ngettext(singular, plural, count)
}

export function gettext_noop (msgid) {
  return new GettextBackendRegistry().backend.gettextNoop(msgid)
}

export function pgettext (context, msgid) {
  return new GettextBackendRegistry().backend.pgettext(context, msgid)
}

export function npgettext (context, singular, plural, count) {
  return new GettextBackendRegistry().backend.npgettext(context, singular, plural, count)
}

export function interpolate (fmt, obj, named) {
  return new GettextBackendRegistry().backend.interpolate(fmt, obj, named)
}

export function get_format (formatType) {
  return new GettextBackendRegistry().backend.getFormat(formatType)
}

import AbstractBackend from './abstractbackend'

export class DjangoBackend extends AbstractBackend {
  gettext (msgid) {
    return window.gettext(msgid)
  }

  pluralidx (count) {
    return window.pluralidx(count)
  }

  ngettext (singular, plural, count) {
    return window.ngettext(singular, plural, count)
  }

  gettextNoop (msgid) {
    return window.gettext_noop(msgid)
  }

  pgettext (context, msgid) {
    return window.pgettext(context, msgid)
  }

  npgettext (context, singular, plural, count) {
    return window.npgettext(context, singular, plural, count)
  }

  interpolate (fmt, obj, named) {
    return window.interpolate(fmt, obj, named)
  }

  getFormat (formatType) {
    return window.get_format(formatType)
  }
}

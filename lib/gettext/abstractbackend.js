export default class AbstractBackend {
  gettext (msgid) {
    return msgid
  }

  pluralidx (count) {
    return count === 1 ? 0 : 1
  }

  ngettext (singular, plural, count) {
    return count === 1 ? singular : plural
  }

  gettextNoop (msgid) {
    return msgid
  }

  pgettext (context, msgid) {
    return msgid
  }

  npgettext (context, singular, plural, count) {
    return count === 1 ? singular : plural
  }

  interpolate (fmt, obj, named) {
    if (named) {
      return fmt.replace(/%\(\w+\)s/g, function (match) {
        return String(obj[match.slice(2, -2)])
      })
    } else {
      return fmt.replace(/%s/g, function (match) {
        return String(obj.shift())
      })
    }
  }

  getFormat (formatType) {
    return formatType
  }

  getActivationWarning () {
    return null
  }
}

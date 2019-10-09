import * as gettext from '../gettext'
import { ValidationError } from '../customErrors'

export function notBlankValidator (value) {
  if (value === null || value === undefined || value.trim() === '') {
    throw ValidationError(gettext.pgettext('signup frontend validation error', 'This field can not be blank'))
  }
  return value
}

export function noOpValidator (value) {
  return value
}

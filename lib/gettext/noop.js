import AbstractBackend from './abstractbackend'

export class NoopBackend extends AbstractBackend {
  getActivationWarning () {
    return 'Using "noop" gettext backend. Translations are disabled.'
  }
}

export class NoopSilentBackend extends AbstractBackend {}

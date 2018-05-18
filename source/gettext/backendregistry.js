import { DjangoBackend } from './django'
import { NoopBackend, NoopSilentBackend } from './noop'

let _instance = null

export class GettextBackendRegistry {
  constructor () {
    if (!_instance) {
      _instance = this
      this.initialize()
    }
    return _instance
  }

  initialize () {
    this._backendMap = new Map()
    this.addDefaultBackends()
    if (process.env.IEVV_GETTEXT_BACKEND_ID) {
      this.autoActivateBackend()
    } else {
      this.activateBackend('noop')
    }
  }

  addDefaultBackends () {
    this.add('noop', NoopBackend())
    this.add('noop_silent', NoopSilentBackend())
    this.add('django', DjangoBackend())
  }

  add (backendId, backendObject) {
    this._backendMap.add(backendId, backendObject)
  }

  activateBackend (backendId) {
    if (!this._backendMap.contains(backendId)) {
      if (process.env.NODE_ENV !== 'test') {
        console.warn(`Invalid gettext backend ID: ${backendId}.`)
      }
      backendId = 'noop'
    }

    this.backend = this._backendMap.get(backendId)

    if (process.env.NODE_ENV !== 'test') {
      const warning = this.backend.getActivationWarning()
      if (warning !== null) {
        console.warn(warning)
      }
    }
  }

  autoActivateBackend () {
    if (process.env.IEVV_GETTEXT_BACKEND_ID) {
      this.activateBackend(process.env.IEVV_GETTEXT_BACKEND_ID)
    } else {
      this.activateBackend('noop')
    }
  }
}

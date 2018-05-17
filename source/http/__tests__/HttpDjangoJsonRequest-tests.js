import HttpDjangoJsonRequest from '../HttpDjangoJsonRequest'
import * as sinon from 'sinon'

let server
const defaultRequestHeaders = new Set(['Accept', 'Content-Type'])
const withCsrfTokenRequestHeaders = new Set(defaultRequestHeaders)
withCsrfTokenRequestHeaders.add('X-CSRFToken')

describe('HttpDjangoJsonRequest', () => {
  beforeEach(() => {
    server = sinon.fakeServer.create()
    server.respondImmediately = true
    document.cookie = 'csrftoken=testtoken'
  })

  afterEach(() => {
    server.restore()
  })

  it('Does not set CSRF header on GET', () => {
    server.respondWith('GET', /\//, (request) => {
      request.respond(200)
    })
    const httprequest = new HttpDjangoJsonRequest('/')
    return httprequest.get().then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(defaultRequestHeaders.size)
      expect(new Set(httprequest.requestHeaders.keys())).toEqual(
        defaultRequestHeaders)
    })
  })

  it('Does not set CSRF header on HEAD', () => {
    server.respondWith('HEAD', /\//, (request) => {
      request.respond(200)
    })
    const httprequest = new HttpDjangoJsonRequest('/')
    return httprequest.head().then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(defaultRequestHeaders.size)
      expect(new Set(httprequest.requestHeaders.keys())).toEqual(
        defaultRequestHeaders)
    })
  })

  it('Sets CSRF header on POST', () => {
    server.respondWith('POST', /\//, (request) => {
      request.respond(200)
    })
    const httprequest = new HttpDjangoJsonRequest('/')
    return httprequest.post('test').then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(withCsrfTokenRequestHeaders.size)
      expect(new Set(httprequest.requestHeaders.keys())).toEqual(
        new Set(withCsrfTokenRequestHeaders)
      )
      expect(httprequest.requestHeaders.get('X-CSRFToken')).toEqual('testtoken')
    })
  })

  it('Sets CSRF header on PUT', () => {
    server.respondWith('PUT', /\//, (request) => {
      request.respond(200)
    })
    const httprequest = new HttpDjangoJsonRequest('/')
    return httprequest.put('test').then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(withCsrfTokenRequestHeaders.size)
      expect(new Set(httprequest.requestHeaders.keys())).toEqual(
        new Set(withCsrfTokenRequestHeaders)
      )
      expect(httprequest.requestHeaders.get('X-CSRFToken')).toEqual('testtoken')
    })
  })

  it('Sets CSRF header on PATCH', () => {
    server.respondWith('PATCH', /\//, (request) => {
      request.respond(200)
    })
    const httprequest = new HttpDjangoJsonRequest('/')
    return httprequest.patch('test').then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(withCsrfTokenRequestHeaders.size)
      expect(new Set(httprequest.requestHeaders.keys())).toEqual(
        new Set(withCsrfTokenRequestHeaders)
      )
      expect(httprequest.requestHeaders.get('X-CSRFToken')).toEqual('testtoken')
    })
  })

  it('Sets CSRF header on DELETE', () => {
    server.respondWith('DELETE', /\//, (request) => {
      request.respond(200)
    })
    const httprequest = new HttpDjangoJsonRequest('/')
    return httprequest.httpdelete('test').then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(withCsrfTokenRequestHeaders.size)
      expect(new Set(httprequest.requestHeaders.keys())).toEqual(
        new Set(withCsrfTokenRequestHeaders)
      )
      expect(httprequest.requestHeaders.get('X-CSRFToken')).toEqual('testtoken')
    })
  })
})

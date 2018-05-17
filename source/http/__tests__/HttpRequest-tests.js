import * as sinon from 'sinon'
import HttpRequest from '../HttpRequest'

let server

describe('HttpRequest', () => {
  beforeEach(() => {
    server = sinon.fakeServer.create()
    server.respondImmediately = true
  })

  afterEach(() => {
    server.restore()
  })

  it('constructor without querystring', () => {
    const httprequest = new HttpRequest('/api/people')
    expect(httprequest.urlParser.queryString.isEmpty()).toBe(true)
  })

  it('constructor with querystring', () => {
    const httprequest = new HttpRequest('http://example.com/api/people?name=Jane')
    expect(httprequest.urlParser.queryString.urlencode()).toBe('name=Jane')
  })

  it('5xx response', () => {
    server.respondWith('POST', /\//, (request) => {
      request.respond(500)
    })
    const httprequest = new HttpRequest('/')
    return httprequest.post('test').then(function(response) {
      throw new Error('This should not be called!')
    }, function (error) {
      expect(error.response.status).toBe(500)
      expect(error.response.isServerError()).toBe(true)
    })
  })

  it('4xx response', () => {
    server.respondWith('POST', /\//, (request) => {
      request.respond(400)
    })
    const httprequest = new HttpRequest('/')
    return httprequest.post('test').then(function(response) {
      throw new Error('This should not be called!')
    }, function (error) {
      expect(error.response.status).toBe(400)
      expect(error.response.isClientError()).toBe(true)
    })
  })

  it('3xx response', () => {
    server.respondWith('POST', /\//, (request) => {
      request.respond(301)
    })
    const httprequest = new HttpRequest('/')
    return httprequest.post('test').then(function(response) {
      throw new Error('This should not be called!')
    }, function (error) {
      expect(error.response.status).toBe(301)
      expect(error.response.isRedirect()).toBe(true)
    })
  })

  it('3xx response treatRedirectResponseAsError=false', () => {
    server.respondWith('POST', /\//, (request) => {
      request.respond(301)
    })
    const httprequest = new HttpRequest('/')
    httprequest.setTreatRedirectResponseAsError(false)
    return httprequest.post('test').then(function (response) {
      expect(response.status).toBe(301)
      expect(response.isRedirect()).toBe(true)
    }, function (error) {
      throw new Error(`This should not be called! ${error}`)
    })
  })

  it('Successful request', () => {
    server.respondWith('POST', /\//, (request) => {
      request.respond(200)
    })
    const httprequest = new HttpRequest('/')
    return httprequest.post('test').then(function (response) {
      expect(response.status).toBe(200)
      expect(response.isSuccess()).toBe(true)
    }, function (error) {
      throw new Error(`This should not be called! ${error}`)
    })
  })

  it('Successful request body', () => {
    server.respondWith('POST', /\//, (request) => {
      request.respond(200, {}, 'test')
    })
    const httprequest = new HttpRequest('/')
    return httprequest.post('test').then(function (response) {
      expect(response.body).toBe('test')
    })
  })
})

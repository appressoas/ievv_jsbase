import HttpJsonRequest from '../HttpJsonRequest'
import HttpRequest from '../HttpRequest'
import * as sinon from 'sinon'

let server

describe('HttpJsonRequest', () => {
  beforeEach(() => {
    server = sinon.fakeServer.create()
    server.respondImmediately = true
  })

  afterEach(() => {
    server.restore()
  })

  it('Unsuccessful request that reached server', () => {
    server.respondWith('POST', /\//, (request) => {
      request.respond(400)
    })
    const httprequest = new HttpJsonRequest('/')
    return httprequest.post('test').then(function(response) {
      throw new Error('This should not be called!')
    }, function (error) {
      expect(error.response.status).toBe(400)
      expect(error.response.isClientError()).toBe(true)
    })
  })

  it('Successful request', () => {
    server.respondWith('POST', /\//, (request) => {
      request.respond(200)
    })
    const httprequest = new HttpJsonRequest('/')
    return httprequest.post('test').then(function (response) {
      expect(response.status).toBe(200)
      expect(response.isSuccess()).toBe(true)
    }, function (error) {
      throw new Error(`This should not be called! ${error}`)
    })
  })

  it('Successful request body', () => {
    server.respondWith('POST', /\//, (request) => {
      request.respond(200)
    })
    const httprequest = new HttpJsonRequest('/')
    return httprequest.post('test').then(function (response) {
      expect(response.status).toBe(200)
      expect(response.isSuccess()).toBe(true)
    }, function (error) {
      throw new Error(`This should not be called! ${error}`)
    })
  })

  it('Successful request bodydata', () => {
    server.respondWith('POST', /\//, (request) => {
      request.respond(200, {'Content-Type': 'application/json'}, JSON.stringify({
        a: 10
      }))
    })
    const httprequest = new HttpJsonRequest('/')
    return httprequest.post('test').then(function(response) {
      expect(response.bodydata.a).toBe(10)
    })
  })

  it('Sets content-type and Accept headers', () => {
    server.respondWith('POST', /\//, (request) => {
      request.respond(200)
    })
    const httprequest = new HttpJsonRequest('/')
    return httprequest.post('test').then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(2)
      expect(httprequest.requestHeaders.get('Accept')).toBe(
        'application/json')
      expect(httprequest.requestHeaders.get('Content-Type')).toBe(
        'application/json; charset=UTF-8')
    })
  })

})

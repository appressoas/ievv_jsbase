import HttpDjangoFileRequest from '../HttpDjangoFileRequest'
import * as sinon from 'sinon'

let server

describe('HttpDjangoFileRequest', () => {
  beforeEach(() => {
    server = sinon.fakeServer.create()
    server.respondImmediately = true
    document.cookie = 'csrftoken=testtoken'
  })

  afterEach(() => {
    server.restore()
  })

  it('Successful request', () => {
    server.respondWith('POST', /\//, (request) => {
      request.respond(200)
    })
    const httprequest = new HttpDjangoFileRequest('/')
    return httprequest.post('test').then(function (response) {
      expect(response.status).toBe(200)
      expect(response.isSuccess()).toBe(true)
    }, function (error) {
      throw new Error(`This should not be called! ${error}`)
    })
  })

  it('Sets content-type and Accept headers', () => {
    const httprequest = new HttpDjangoFileRequest('/')
    server.respondWith('POST', /\//, (request) => {
      request.respond(200)
    })
    return httprequest.post('test').then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(2)
      expect(httprequest.requestHeaders.get('Accept')).toBe(
        'multipart/form-data')
      expect(httprequest.requestHeaders.get('X-CSRFToken')).toEqual('testtoken')
    })
  })
})

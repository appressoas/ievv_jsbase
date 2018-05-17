import HttpFileRequest from '../HttpFileRequest'
import * as sinon from 'sinon'

let server

describe('HttpFileRequest', () => {
  beforeEach(() => {
    server = sinon.fakeServer.create()
    server.respondImmediately = true
  })

  afterEach(() => {
    server.restore()
  })

  it('Successful request', () => {
    server.respondWith('POST', /\//, (request) => {
      request.respond(200)
    })
    const httprequest = new HttpFileRequest('/')
    return httprequest.post('test').then(function (response) {
      expect(response.status).toBe(200)
      expect(response.isSuccess()).toBe(true)
    }, function (error) {
      throw new Error(`This should not be called! ${error}`)
    })
  })

  it('Sets content-type and Accept headers', () => {
    const httprequest = new HttpFileRequest('/')
    server.respondWith('POST', /\//, (request) => {
      request.respond(200)
    })
    return httprequest.post('test').then(function (response) {
      expect(httprequest.requestHeaders.size).toBe(1)
      expect(httprequest.requestHeaders.get('Accept')).toBe(
        'multipart/form-data')
    })
  })
})

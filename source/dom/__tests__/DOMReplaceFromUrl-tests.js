import DOMReplaceFromUrl from '../DOMReplaceFromUrl.js'
import HttpRequest from '../../http/HttpRequest'
import * as sinon from 'sinon'

let server

class MockDOMReplaceFromUrl extends DOMReplaceFromUrl {
  _makeRequest (url) {
    server.respondWith('<p>From server</p>')
    return new HttpRequest(url)
  }
}

describe('DOMReplaceFromUrl', () => {
  beforeEach(() => {
    server = sinon.fakeServer.create()
    server.respondImmediately = true
  })

  afterEach(() => {
    server.restore()
  })

  it('DOMReplaceFromUrl.replaceInnerHtml()', () => {
    document.body.innerHTML = `
            <div id='id_test'>
                <p>Original</p>
            </div>`
    const domreplace = new MockDOMReplaceFromUrl('id_test')
    return domreplace.replaceInnerHtml('http://example.com').then((htmlString) => {
      expect(htmlString).toBe('<p>From server</p>')
      expect(document.body.querySelectorAll('p').length).toBe(1)
      expect(document.body.querySelectorAll('p')[0].textContent).toBe('From server')
    })
  })

  it('DOMReplaceFromUrl.appendInnerHtml()', () => {
    document.body.innerHTML = `
            <div id='id_test'>
                <p>Original</p>
            </div>`
    const domreplace = new MockDOMReplaceFromUrl('id_test')
    return domreplace.appendInnerHtml('http://example.com').then((htmlString) => {
      expect(htmlString).toBe('<p>From server</p>')
      expect(document.body.querySelectorAll('p').length).toBe(2)
      expect(document.body.querySelectorAll('p')[0].textContent).toBe('Original')
      expect(document.body.querySelectorAll('p')[1].textContent).toBe('From server')
    })
  })

  it('DOMReplaceFromUrl.prependInnerHtml()', () => {
    document.body.innerHTML = `
            <div id='id_test'>
                <p>Original</p>
            </div>`
    const domreplace = new MockDOMReplaceFromUrl('id_test')
    return domreplace.prependInnerHtml('http://example.com').then((htmlString) => {
      expect(htmlString).toBe('<p>From server</p>')
      expect(document.body.querySelectorAll('p').length).toBe(2)
      expect(document.body.querySelectorAll('p')[0].textContent).toBe('From server')
      expect(document.body.querySelectorAll('p')[1].textContent).toBe('Original')
    })
  })
})

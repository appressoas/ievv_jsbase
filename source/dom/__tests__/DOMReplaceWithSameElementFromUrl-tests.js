import DOMReplaceWithSameElementFromUrl from '../DOMReplaceWithSameElementFromUrl.js'
import HttpRequest from '../../http/HttpRequest'
import * as sinon from 'sinon'

let server

class MockDOMReplaceWithSameElementFromUrl extends DOMReplaceWithSameElementFromUrl {
  _makeRequest (url) {
    server.respondWith(`<html>
    <body>
        <div id='id_test'>
            <p>From server</p>
        </div>
    </body>
</html>`
    )
    return new HttpRequest(url)
  }
}

describe('DOMReplaceWithSameElementFromUrl', () => {
  beforeEach(() => {
    server = sinon.fakeServer.create()
    server.respondImmediately = true
  })

  afterEach(() => {
    server.restore()
  })

  it('DOMReplaceWithSameElementFromUrl.replaceInnerHtml()', () => {
    document.body.innerHTML = `
            <div id='id_test'>
                <p>Original</p>
            </div>`
    const domreplace = new MockDOMReplaceWithSameElementFromUrl('id_test')
    return domreplace.replaceInnerHtml('http://example.com').then((htmlString) => {
      expect(htmlString).toBe('<p>From server</p>')
      expect(document.body.querySelectorAll('p').length).toBe(1)
      expect(document.body.querySelectorAll('p')[0].textContent).toBe('From server')
    })
  })

  it('DOMReplaceWithSameElementFromUrl.appendInnerHtml()', () => {
    document.body.innerHTML = `
            <div id='id_test'>
                <p>Original</p>
            </div>`
    const domreplace = new MockDOMReplaceWithSameElementFromUrl('id_test')
    return domreplace.appendInnerHtml('http://example.com').then((htmlString) => {
      expect(htmlString).toBe('<p>From server</p>')
      expect(document.body.querySelectorAll('p').length).toBe(2)
      expect(document.body.querySelectorAll('p')[0].textContent).toBe('Original')
      expect(document.body.querySelectorAll('p')[1].textContent).toBe('From server')
    })
  })

  it('DOMReplaceWithSameElementFromUrl.prependInnerHtml()', () => {
    document.body.innerHTML = `
            <div id='id_test'>
                <p>Original</p>
            </div>`
    const domreplace = new MockDOMReplaceWithSameElementFromUrl('id_test')
    return domreplace.prependInnerHtml('http://example.com').then((htmlString) => {
      expect(htmlString).toBe('<p>From server</p>')
      expect(document.body.querySelectorAll('p').length).toBe(2)
      expect(document.body.querySelectorAll('p')[0].textContent).toBe('From server')
      expect(document.body.querySelectorAll('p')[1].textContent).toBe('Original')
    })
  })
})

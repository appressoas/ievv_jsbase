import HttpDjangoJsonRequest from '../../http/HttpDjangoJsonRequest';
import {XMLHttpRequestMock} from "../../__testhelpers__/XMLHttpRequestMock";


describe('HttpDjangoJsonRequest', () => {
    beforeEach(() => {
        document.cookie = 'csrftoken=testtoken';
    });

    it('Unsuccessful request that reached server', () => {
        const httprequest = new HttpDjangoJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 400
        });
        return httprequest.post('test').then(function(response) {
            throw new Error('This should not be called!');
        }, function(error) {
            expect(error.response.status).toBe(400);
            expect(error.response.isConnectionRefused()).toBe(false);
        });
    });

    it('Unsuccessful request that did not reach server', () => {
        const httprequest = new HttpDjangoJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onerror', {
            status: 0
        });
        return httprequest.post('test').then(function(response) {
            throw new Error('This should not be called!');
        }, function(error) {
            expect(error.response.status).toBe(0);
            expect(error.response.isConnectionRefused()).toBe(true);
        });
    });

    it('Successful request', () => {
        const httprequest = new HttpDjangoJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200
        });
        return httprequest.post('test').then(function(response) {
            expect(response.status).toBe(200);
        }, function(error) {
            throw new Error('This should not be called!');
        });
    });

    it('Successful request body', () => {
        const httprequest = new HttpDjangoJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200,
            responseText: 'test'
        });
        return httprequest.post('test').then(function(response) {
            expect(response.body).toBe('test');
        });
    });

    it('Successful request bodydata', () => {
        const httprequest = new HttpDjangoJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200,
            responseText: '{"a": 10}'
        });
        return httprequest.post('test').then(function(response) {
            expect(response.bodydata.a).toBe(10);
        });
    });

    it('JSON encodes input data', () => {
        const httprequest = new HttpDjangoJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200
        });
        return httprequest.post({'a': 10}).then(function(response) {
            expect(httprequest.request.sentData).toBe('{"a":10}');
        });
    });

    it('Sets Content-Type and Accept headers', () => {
        const httprequest = new HttpDjangoJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200
        });
        return httprequest.post('test').then(function(response) {
            expect(httprequest.request.headers.length).toBe(3);
            expect(httprequest.request.headers[0].header).toBe(
                'Accept');
            expect(httprequest.request.headers[0].value).toBe(
                'application/json');
            expect(httprequest.request.headers[1].header).toBe(
                'Content-Type');
            expect(httprequest.request.headers[1].value).toBe(
                'application/json; charset=UTF-8');
        });
    });

    it('Does not set CSRF header on GET', () => {
        const httprequest = new HttpDjangoJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200
        });
        return httprequest.get('test').then(function(response) {
            expect(httprequest.request.headers.length).toBe(2);
        });
    });

    it('Does not set CSRF header on HEAD', () => {
        const httprequest = new HttpDjangoJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200
        });
        return httprequest.head('test').then(function(response) {
            expect(httprequest.request.headers.length).toBe(2);
        });
    });

    it('Sets CSRF header on POST', () => {
        const httprequest = new HttpDjangoJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200
        });
        return httprequest.post('test').then(function(response) {
            expect(httprequest.request.headers.length).toBe(3);
            expect(httprequest.request.headers[2].header).toBe(
                'X-CSRFToken');
            expect(httprequest.request.headers[2].value).toBe(
                'testtoken');
        });
    });

    it('Sets CSRF header on PUT', () => {
        const httprequest = new HttpDjangoJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200
        });
        return httprequest.put('test').then(function(response) {
            expect(httprequest.request.headers.length).toBe(3);
            expect(httprequest.request.headers[2].header).toBe(
                'X-CSRFToken');
            expect(httprequest.request.headers[2].value).toBe(
                'testtoken');
        });
    });

    it('Sets CSRF header on PATCH', () => {
        const httprequest = new HttpDjangoJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200
        });
        return httprequest.patch('test').then(function(response) {
            expect(httprequest.request.headers.length).toBe(3);
            expect(httprequest.request.headers[2].header).toBe(
                'X-CSRFToken');
            expect(httprequest.request.headers[2].value).toBe(
                'testtoken');
        });
    });

    it('Sets CSRF header on DELETE', () => {
        const httprequest = new HttpDjangoJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200
        });
        return httprequest.httpdelete('test').then(function(response) {
            expect(httprequest.request.headers.length).toBe(3);
            expect(httprequest.request.headers[2].header).toBe(
                'X-CSRFToken');
            expect(httprequest.request.headers[2].value).toBe(
                'testtoken');
        });
    });

});

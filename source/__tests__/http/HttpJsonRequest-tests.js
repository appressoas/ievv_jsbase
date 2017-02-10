import HttpJsonRequest from '../../http/HttpJsonRequest';
import {XMLHttpRequestMock} from "../../__testhelpers__/XMLHttpRequestMock";


describe('HttpJsonRequest', () => {
    it('Unsuccessful request that reached server', () => {
        const httprequest = new HttpJsonRequest('http://example.com/');
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
        const httprequest = new HttpJsonRequest('http://example.com/');
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
        const httprequest = new HttpJsonRequest('http://example.com/');
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
        const httprequest = new HttpJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200,
            responseText: 'test'
        });
        return httprequest.post('test').then(function(response) {
            expect(response.body).toBe('test');
        });
    });

    it('Successful request bodydata', () => {
        const httprequest = new HttpJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200,
            responseText: '{"a": 10}'
        });
        return httprequest.post('test').then(function(response) {
            expect(response.bodydata.a).toBe(10);
        });
    });

    it('Sets content-type and Accept headers', () => {
        const httprequest = new HttpJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200
        });
        return httprequest.post('test').then(function(response) {
            expect(httprequest.request.headers.length).toBe(2);
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

    it('JSON encodes input data', () => {
        const httprequest = new HttpJsonRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200
        });
        return httprequest.post({'a': 10}).then(function(response) {
            expect(httprequest.request.sentData).toBe('{"a":10}');
        });
    });
});

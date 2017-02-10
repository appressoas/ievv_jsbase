import HttpRequest from '../../http/HttpRequest';
import {XMLHttpRequestMock} from "../../__testhelpers__/XMLHttpRequestMock";
import QueryString from "../../http/QueryString";


describe('HttpRequest', () => {
    it('constructor without querystring', () => {
        const httprequest = new HttpRequest('http://example.com/api/people');
        expect(httprequest.urlParser.queryString.isEmpty()).toBe(true);
    });

    it('constructor with querystring', () => {
        const httprequest = new HttpRequest('http://example.com/api/people?name=Jane');
        expect(httprequest.urlParser.queryString.urlencode()).toBe('name=Jane');
    });

    it('Connection error', () => {
        const httprequest = new HttpRequest('http://example.com/');
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

    it('5xx response', () => {
        const httprequest = new HttpRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 500
        });
        return httprequest.post('test').then(function(response) {
            throw new Error('This should not be called!');
        }, function(error) {
            expect(error.response.status).toBe(500);
            expect(error.response.isServerError()).toBe(true);
        });
    });

    it('4xx response', () => {
        const httprequest = new HttpRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 400
        });
        return httprequest.post('test').then(function(response) {
            throw new Error('This should not be called!');
        }, function(error) {
            expect(error.response.status).toBe(400);
            expect(error.response.isClientError()).toBe(true);
        });
    });

    it('3xx response', () => {
        const httprequest = new HttpRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 301
        });
        return httprequest.post('test').then(function(response) {
            throw new Error('This should not be called!');
        }, function(error) {
            expect(error.response.status).toBe(301);
            expect(error.response.isRedirect()).toBe(true);
        });
    });

    it('3xx response treatRedirectResponseAsError=false', () => {
        const httprequest = new HttpRequest('http://example.com');
        httprequest.setTreatRedirectResponseAsError(false);
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 301
        });
        return httprequest.post('test').then(function(response) {
            expect(response.status).toBe(301);
            expect(response.isRedirect()).toBe(true);
        }, function(error) {
            throw new Error('This should not be called!');
        });
    });

    it('Successful request', () => {
        const httprequest = new HttpRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200
        });
        return httprequest.post('test').then(function(response) {
            expect(response.status).toBe(200);
            expect(response.isSuccess()).toBe(true);
        }, function(error) {
            throw new Error('This should not be called!');
        });
    });

    it('Successful request body', () => {
        const httprequest = new HttpRequest('http://example.com/');
        httprequest.request = new XMLHttpRequestMock('onload', {
            status: 200,
            responseText: 'test'
        });
        return httprequest.post('test').then(function(response) {
            expect(response.body).toBe('test');
        });
    });
});

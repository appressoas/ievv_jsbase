"use strict";

var _HttpRequest = require("../HttpRequest");

var _HttpRequest2 = _interopRequireDefault(_HttpRequest);

var _XMLHttpRequestMock = require("../../__testhelpers__/XMLHttpRequestMock");

var _QueryString = require("../QueryString");

var _QueryString2 = _interopRequireDefault(_QueryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('HttpRequest', function () {
    it('constructor without querystring', function () {
        var httprequest = new _HttpRequest2.default('http://example.com/api/people');
        expect(httprequest.urlParser.queryString.isEmpty()).toBe(true);
    });

    it('constructor with querystring', function () {
        var httprequest = new _HttpRequest2.default('http://example.com/api/people?name=Jane');
        expect(httprequest.urlParser.queryString.urlencode()).toBe('name=Jane');
    });

    it('Connection error', function () {
        var httprequest = new _HttpRequest2.default('http://example.com/');
        httprequest.request = new _XMLHttpRequestMock.XMLHttpRequestMock('onerror', {
            status: 0
        });
        return httprequest.post('test').then(function (response) {
            throw new Error('This should not be called!');
        }, function (error) {
            expect(error.response.status).toBe(0);
            expect(error.response.isConnectionRefused()).toBe(true);
        });
    });

    it('5xx response', function () {
        var httprequest = new _HttpRequest2.default('http://example.com/');
        httprequest.request = new _XMLHttpRequestMock.XMLHttpRequestMock('onload', {
            status: 500
        });
        return httprequest.post('test').then(function (response) {
            throw new Error('This should not be called!');
        }, function (error) {
            expect(error.response.status).toBe(500);
            expect(error.response.isServerError()).toBe(true);
        });
    });

    it('4xx response', function () {
        var httprequest = new _HttpRequest2.default('http://example.com/');
        httprequest.request = new _XMLHttpRequestMock.XMLHttpRequestMock('onload', {
            status: 400
        });
        return httprequest.post('test').then(function (response) {
            throw new Error('This should not be called!');
        }, function (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.isClientError()).toBe(true);
        });
    });

    it('3xx response', function () {
        var httprequest = new _HttpRequest2.default('http://example.com/');
        httprequest.request = new _XMLHttpRequestMock.XMLHttpRequestMock('onload', {
            status: 301
        });
        return httprequest.post('test').then(function (response) {
            throw new Error('This should not be called!');
        }, function (error) {
            expect(error.response.status).toBe(301);
            expect(error.response.isRedirect()).toBe(true);
        });
    });

    it('3xx response treatRedirectResponseAsError=false', function () {
        var httprequest = new _HttpRequest2.default('http://example.com');
        httprequest.setTreatRedirectResponseAsError(false);
        httprequest.request = new _XMLHttpRequestMock.XMLHttpRequestMock('onload', {
            status: 301
        });
        return httprequest.post('test').then(function (response) {
            expect(response.status).toBe(301);
            expect(response.isRedirect()).toBe(true);
        }, function (error) {
            throw new Error('This should not be called!');
        });
    });

    it('Successful request', function () {
        var httprequest = new _HttpRequest2.default('http://example.com/');
        httprequest.request = new _XMLHttpRequestMock.XMLHttpRequestMock('onload', {
            status: 200
        });
        return httprequest.post('test').then(function (response) {
            expect(response.status).toBe(200);
            expect(response.isSuccess()).toBe(true);
        }, function (error) {
            throw new Error('This should not be called!');
        });
    });

    it('Successful request body', function () {
        var httprequest = new _HttpRequest2.default('http://example.com/');
        httprequest.request = new _XMLHttpRequestMock.XMLHttpRequestMock('onload', {
            status: 200,
            responseText: 'test'
        });
        return httprequest.post('test').then(function (response) {
            expect(response.body).toBe('test');
        });
    });
});
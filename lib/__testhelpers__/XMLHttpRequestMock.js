export class XMLHttpRequestMock {
    constructor(requestEventMethodName, resultingRequest) {
        this.requestEventMethodName = requestEventMethodName;
        this.onerror = null;
        this.onload = null;
        this.headers = [];
        this.sentData = null;
        this.resultingRequest = resultingRequest;
    }

    open() {}

    setRequestHeader(header, value) {
        this.headers.push({
            header: header,
            value: value
        });
    }

    getAllResponseHeaders() {
        return '';
    }

    send(data) {
        this.sentData = data;
        Object.assign(this, this.resultingRequest);
        this[this.requestEventMethodName]();
    }
}

import HttpResponse from './HttpResponse'
import { UrlParser } from './UrlParser'



class QueuedHttpRequest {
	constructor ({queue, httprequest, method, data, reject, resolve}) {
		this.queue = queue;
		this.uniqueId = Symbol();
		this.httprequest = httprequest;
		this.data = data;
		this.method = method;
		this._reject = reject;
		this._resolve = resolve;
		this.reject = this.reject.bind(this);
		this.resolve = this.resolve.bind(this);
		this._retryCount = 0;
		this._retryTimeout = null;
		this._cancelled = false;
	}

	cancel() {
		this._cancelled = true;
	}

	_removeFromQueue () {
		this.queue._remove(this.uniqueId);
	}

	_appendToPendingQueue () {
		this.queue._addToPendingQueue(this);
	}

	_canRetry (response) {
		// We retry for these status codes (ref https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses):
		// - 502 Bad Gateway  (server is most likely temporarily unavailable because of a major update)
		// - 503 Service Unavailable  (server is most likely temporarily unavailable because of update or overload)
		// - 504 Gateway Timeout  (normally caused by too much load on the server)
		// - 0 Server is "gone" (normally just during development, but CAN also happen during major updates of cluster)
		if (this._retryCount < this.queue._retryTimings.length) {
			return (
				response.status === 0 ||
				response.status === 502 ||
				response.status === 503 ||
				response.status === 504
			)
		}
	}

	_retryDelayMs () {
		return this.queue._retryTimings[this._retryCount] * 1000;
	}

	reject (error) {
		if (this._cancelled) {
			return;
		}
		this._removeFromQueue();
		if (error.response) {
			if (this._canRetry(error.response)) {
				console.debug("CAN RETRY!", error.response.status, "Retrying in ", this._retryDelayMs());
				this._retryTimeout = window.setTimeout(() => {
					this._appendToPendingQueue();
				}, this._retryDelayMs());
				this._retryCount ++;
				return;
			}
		}
		this._reject(error)
	}

	resolve (result) {
		if (this._cancelled) {
			return;
		}
		this._removeFromQueue();
		this._resolve(result);
	}

	send () {
		if (this._cancelled) {
			return;
		}
		console.debug("Sending", this.method, this.httprequest._urlParser.buildUrl(), this.httprequest.makeRequestBody(this.data));
		this.httprequest.request = this.httprequest._makeXMLHttpRequest()
		this.httprequest.request.open(this.method, this.httprequest.urlParser.buildUrl(), true)
		this.httprequest.setDefaultRequestHeaders(this.method)
		this.httprequest._applyRequestHeadersToRequest()
		this.httprequest._applyTimeoutToRequest(this.reject)
		this.httprequest._applyRequestFailureManagement(this.reject)
		this.httprequest.request.onload = () => this.httprequest._onComplete(this.resolve, this.reject)
		this.httprequest.request.send(this.httprequest.makeRequestBody(this.data))
	}
}


let _instance = null;


export class HttpRequestQueueSingleton {
	/**
		 * Get an instance of the singleton.
		 *
		 * The first time this is called, we create a new instance.
		 * For all subsequent calls, we return the instance that was
		 * created on the first call.
		 */
	constructor() {
		if(!_instance) {
			_instance = this;
		}
		this._pendingQueue = new Map();
		this._runningQueue = new Map();
		this._maxConcurrent = 6;
		this._retryTimings = [2, 5, 5, 10, 10, 15, 15, 15];
		this._currentUrlPath = null;
		return _instance;
	}

	setRetryTimings (retryTimings) {
		this._retryTimings = retryTimings;
	}

	setMaxConcurrent (maxConcurrent) {
		this._maxConcurrent = maxConcurrent;
	}

	_send({httprequest, method, data, reject, resolve}) {
		const queuedRequest = new QueuedHttpRequest({httprequest, method, data, reject, resolve, queue: this})
		this._addToPendingQueue(queuedRequest);
	}

	_addToPendingQueue(queuedRequest) {
		if (window.location.pathname !== this._currentUrlPath) {
			if (this._currentUrlPath !== null) {
				this._clear("URL path change detected - clearing/cancelling queued HTTP requests");
			}
			this._currentUrlPath = window.location.pathname;
		}
		this._pendingQueue.set(queuedRequest.uniqueId, queuedRequest);
		this._processPendingQueue();
	}

	_clear (logMessage) {
		if (this._pendingQueue.size === 0 && this._runningQueue.size === 0) {
			return;
		}
		console.info(logMessage);
		this._pendingQueue = new Map();
		for (let queuedRequest of this._runningQueue.values()) {
			queuedRequest.cancel();
		}
		this._runningQueue = new Map();
	}

	_remove (uniqueId) {
		this._pendingQueue.delete(uniqueId);
		this._runningQueue.delete(uniqueId);
		this._processPendingQueue();
	}

	_processPendingQueue() {
		if (this._pendingQueue.size === 0) {
			console.debug("PENDING queue is empty");
			return;
		}
		if (this._runningQueue.size >= this._maxConcurrent) {
			console.debug("Max concurrency reached", this._runningQueue.size + 1);
			return;
		}
		console.debug(this._runningQueue.size, "Current Pending", Array.from(this._pendingQueue.values()), "Running:", Array.from(this._runningQueue.values()));
		const nextQueued = this._pendingQueue.values().next().value;
		console.debug(nextQueued);
		this._pendingQueue.delete(nextQueued.uniqueId);
		this._runningQueue.set(nextQueued.uniqueId, nextQueued);
		nextQueued.send();
		this._processPendingQueue();
	}
}


/**
 * API for performing HTTP requests.
 *
 * @example <caption>Make a POST request</caption>
 * const request = new HttpRequest('http://example.com/api/users/')
 * request.post('Hello world')
 *     .then((response) => {
 *         // Success - response is a HttpResponse object.
 *         console.debug(response.toString())
 *         if(response.isSuccess()) {
 *             console.debug('Success: ', response.body)
 *         } else if (response.isRedirect) {
 *             console.debug('Hmm strange, we got a redirect instead of a 2xx response.')
 *         }
 *     })
 *     .catch((error) => {
 *         // Error - response is an HttpResponse object.
 *         console.error(error.toString())
 *         if(error.response.isRedirect()) {
 *             // Yes - redirect is treated as an error by default.
 *             // you can change this by supplying an extra argument
 *             // to HttpResponse()
 *             console.debug('We got a 3xx response!', error.response.body)
 *         } else if(error.response.isClientError()) {
 *             console.debug('We got a 4xx response!', error.response.body)
 *         } else if (error.response.isServerError()) {
 *             console.debug('We got a 5xx response!', error.response.body)
 *         } else if (error.response.isConnectionRefused()) {
 *             console.debug('Connection refused.')
 *         }
 *         // throw error  // You can throw the error as an exception
 *     })
 *
 * @example <caption>Make a GET request with a querystring</caption>
 * const request = new HttpRequest('http://example.com/api/users/')
 * request.urlParser.queryString.set('search', 'doe')
 * request.get()
 *     .then((response) => {
 *         console.debug('Success!', response.toString())
 *     })
 *     .catch((error) => {
 *         console.error('Error:', error.toString())
 *     })
 */
export default class HttpRequest {
  /**
   * @param {string} url The URL to request.
   *      If this is supplied, it is passed to
   *      {@link HttpRequest#setUrl}
   */
  constructor (url) {
    this._treatRedirectResponseAsError = true
    this.requestHeaders = new Map()
    this.request = null
    this._urlParser = null
    this._timeoutMs = null
    if (typeof url !== 'undefined') {
      this.setUrl(url)
    }
    this._handleTimeout = this._handleTimeout.bind(this)
  }

  /**
   * Create a deep copy of this HttpRequest object.
   *
   * WARNING: This does not copy request headers since those
   * are set on the XMLHttpRequest object, and that object is
   * reset in the copy.
   *
   * @return The copy.
   */
  deepCopy () {
    let copy = Object.assign(Object.create(this), this)
    copy.request = null
    if (this._urlParser !== null) {
      copy._urlParser = this._urlParser.deepCopy()
    }
    copy.requestHeaders = new Map(this.requestHeaders)
    return copy
  }

  /**
   * Get the parsed URL of the request.
   *
   * @returns {UrlParser} The UrlParser for the parsed URL.
   */
  get urlParser () {
    return this._urlParser
  }

  /**
   * Set the URL of the request.
   *
   * @param {String} url The URL.
   */
  setUrl (url) {
    this._urlParser = new UrlParser(url)
  }

  setTimeout (timeoutMs) {
    this._timeoutMs = timeoutMs
  }

  /**
   * Set how we treat 3xx responses.
   *
   * By default they are treated as errors, but you can change
   * this behavior by calling this function.
   *
   * @param {bool} treatRedirectResponseAsError Treat 3xx responses as
   *      errors?
   *
   * @example <caption>Do not treat 3xx responses as error</caption>
   * const request = HttpRequest('http://example.com/api/')
   * request.setTreatRedirectResponseAsError(false)
   */
  setTreatRedirectResponseAsError (treatRedirectResponseAsError) {
    this._treatRedirectResponseAsError = treatRedirectResponseAsError
  }

  _makeXMLHttpRequest () {
    return new window.XMLHttpRequest()
  }

  _handleTimeout (reject, event) {
    const response = this.makeResponse(true)
    reject(response.toError())
  }

  _applyTimeoutToRequest (reject) {
    if (this._timeoutMs !== null) {
      this.request.timeout = this._timeoutMs
      this.request.ontimeout = (event) => {
        this._handleTimeout(reject, event)
      }
    }
  }

  _applyRequestFailureManagement (reject) {
    this.request.onreadystatechange = () => {
      if (this.request.readyState === 4 && this.request.status === 0) {
        const response = this.makeResponse()
        reject(response.toError())
      }
    }
  }

  /**
   * Send the request.
   *
   * @param method The HTTP method. I.e.: "get", "post", ...
   * @param data Request body data. This is sent through
   *      {@link HttpRequest#makeRequestBody} before it
   *      is sent.*
   * @return {Promise} A Promise.
   *
   *      The resolve function argument is an
   *      an object of whatever {@link HttpRequest#makeResponse}
   *      returns.
   *
   *      The reject function argument is a
   *      {@link HttpResponseError} object created using
   *      {@link HttpResponse#toError}.
   */
  send (method, data) {
    method = method.toUpperCase()
    if (this._urlParser === null) {
      throw new TypeError('Can not call send() without an url.')
    }
    return new Promise((resolve, reject) => {
			new HttpRequestQueueSingleton()._send({
				httprequest: this, method, data, reject, resolve
			})
    })
  }

  /**
   * Shortcut for ``send("get", data)``.
   *
   * @see {@link HttpRequest#send}
   */
  get (data) {
    return this.send('get', data)
  }

  /**
   * Shortcut for ``send("head", data)``.
   *
   * @see {@link HttpRequest#send}
   */
  head (data) {
    return this.send('head', data)
  }

  /**
   * Shortcut for ``send("post", data)``.
   *
   * @see {@link HttpRequest#send}
   */
  post (data) {
    return this.send('post', data)
  }

  /**
   * Shortcut for ``send("put", data)``.
   *
   * @see {@link HttpRequest#send}
   */
  put (data) {
    return this.send('put', data)
  }

  /**
   * Shortcut for ``send("patch", data)``.
   *
   * @see {@link HttpRequest#send}
   */
  patch (data) {
    return this.send('patch', data)
  }

  /**
   * Shortcut for ``send("delete", data)``.
   *
   * Named httpdelete to avoid crash with builtin keyword ``delete``.
   *
   * @see {@link HttpRequest#send}
   */
  httpdelete (data) {
    return this.send('delete', data)
  }

  /**
   * Make request body from the provided data.
   *
   * By default this just returns the provided data,
   * but subclasses can override this to perform automatic
   * conversion.
   *
   * Must return a string.
   */
  makeRequestBody (data) {
    return data
  }

  /**
   * Creates a {@link HttpResponse}.
   * @returns {HttpResponse}
   */
  makeResponse (...extraResponseParams) {
    return new HttpResponse(this.request, ...extraResponseParams)
  }

  _applyRequestHeadersToRequest () {
    for (let [header, value] of this.requestHeaders) {
      this.request.setRequestHeader(header, value)
    }
  }

  /**
   * Set a request header.
   *
   * @param header The header name. E.g.: ``"Content-type"``.
   * @param value The header value.
   */
  setRequestHeader (header, value) {
    this.requestHeaders.set(header, value)
  }

  /**
   * Set default request headers.
   *
   * Does nothing by default, but subclasses can override this.
   *
   * @param method The HTTP request method (GET, POST, PUT, ...).
   *      Will always be uppercase.
   */
  setDefaultRequestHeaders (method) {}

  _onComplete (resolve, reject) {
    let response = this.makeResponse()
    let isSuccess = false
    if (this._treatRedirectResponseAsError) {
      isSuccess = response.isSuccess()
    } else {
      isSuccess = response.isSuccess() || response.isRedirect()
    }
    if (isSuccess) {
      resolve(response)
    } else {
      reject(response.toError())
    }
  }
}

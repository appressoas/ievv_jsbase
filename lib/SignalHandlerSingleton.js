"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SentSignalInfo = exports.ReceivedSignalInfo = exports.DuplicateReceiverNameForSignal = void 0;
var _makeCustomError = _interopRequireDefault(require("./makeCustomError"));
var _PrettyFormat = _interopRequireDefault(require("./utils/PrettyFormat"));
var _LoggerSingleton = _interopRequireDefault(require("./log/LoggerSingleton"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Exception raised by {@link HttpCookies#getStrict} when the cookie is not found.
 *
 * @type {Error}
 */
var DuplicateReceiverNameForSignal = exports.DuplicateReceiverNameForSignal = (0, _makeCustomError.default)('DuplicateReceiverNameForSignal');

/**
 * Represents information about the received signal.
 *
 * An object of this class is sent to the ``callback``
 * of all signal receivers.
 *
 * The data sent by the signal is available in
 * {@link ReceivedSignalInfo.data}.
 */
var ReceivedSignalInfo = exports.ReceivedSignalInfo = /*#__PURE__*/function () {
  function ReceivedSignalInfo(data, signalName, receiverName) {
    _classCallCheck(this, ReceivedSignalInfo);
    /**
     * The data sent by {@link SignalHandlerSingleton#send}.
     */
    this.data = data;

    /**
     * The signal name.
     *
     * @type {string}
     */
    this.signalName = signalName;

    /**
     * The receiver name.
     *
     * @type {string}
     */
    this.receiverName = receiverName;
  }

  /**
   * Get a string with information about the received signal.
   * Includes signal name and receiver name.
   *
   * @returns {string}
   */
  return _createClass(ReceivedSignalInfo, [{
    key: "toString",
    value: function toString() {
      return "ReceivedSignalInfo: signalName=\"".concat(this.signalName, "\" receiverName=\"").concat(this.receiverName, "\"");
    }

    /**
     * Get the data pretty formatted as a string.
     *
     * @returns {string}
     */
  }, {
    key: "getPrettyFormattedData",
    value: function getPrettyFormattedData() {
      return new _PrettyFormat.default(this.data).toString(2);
    }

    /**
     * Get a string with debug information about the received signal.
     * Includes signal name, receiver name, and pretty formatted data.
     *
     * @returns {string}
     */
  }, {
    key: "toDebugString",
    value: function toDebugString() {
      return "".concat(this.toString, " data=").concat(this.getPrettyFormattedData());
    }
  }]);
}();
/**
 * Private class used by {@link _SignalReceivers} to represent
 * a single receiver listening for a single signal.
 */
var _SignalReceiver = /*#__PURE__*/function () {
  function _SignalReceiver(signal, name, callback) {
    _classCallCheck(this, _SignalReceiver);
    this.signal = signal;
    this.name = name;
    this.callback = callback;
  }

  /**
   * Asynchronously trigger the receiver callback.
   * @param data The signal data (the data argument provided for
   *    {@link SignalHandlerSingleton#send}.
   */
  return _createClass(_SignalReceiver, [{
    key: "trigger",
    value: function trigger(data) {
      var _this = this;
      setTimeout(function () {
        _this.callback(new ReceivedSignalInfo(data, _this.signal.name, _this.name));
      }, 0);
    }
  }]);
}();
/**
 * Object containing debugging information about a sent
 * signal.
 */
var SentSignalInfo = exports.SentSignalInfo = /*#__PURE__*/function () {
  function SentSignalInfo(signalName) {
    _classCallCheck(this, SentSignalInfo);
    /**
     * The signal name.
     *
     * @type {string}
     */
    this.signalName = signalName;

    /**
     * Array of triggered receiver names.
     *
     * @type {Array}
     */
    this.triggeredReceiverNames = [];
  }
  return _createClass(SentSignalInfo, [{
    key: "_addReceiverName",
    value: function _addReceiverName(receiverName) {
      this.triggeredReceiverNames.push(receiverName);
    }

    /**
     * Get a string representation of the sent signal info.
     *
     * @returns {string}
     */
  }, {
    key: "toString",
    value: function toString() {
      var receivers = this.triggeredReceiverNames.join(', ');
      if (receivers === '') {
        receivers = 'NO RECEIVERS';
      }
      return "Signal: ".concat(this.signalName, " was sent to: ").concat(receivers);
    }
  }]);
}();
/**
 * Private class used by {@link SignalHandlerSingleton}
 * to represent all receivers for a single signal.
 */
var _SignalReceivers = /*#__PURE__*/function () {
  function _SignalReceivers(name) {
    _classCallCheck(this, _SignalReceivers);
    this.name = name;
    this.receiverMap = new Map();
  }

  /**
   * Add a receiver.
   *
   * @throw DuplicateReceiverNameForSignal If the receiver is already registered for the signal.
   */
  return _createClass(_SignalReceivers, [{
    key: "addReceiver",
    value: function addReceiver(receiverName, callback) {
      if (this.receiverMap.has(receiverName)) {
        throw new DuplicateReceiverNameForSignal("The \"".concat(receiverName, "\" receiver is already registered for the \"").concat(this.name, "\" signal"));
      }
      this.receiverMap.set(receiverName, new _SignalReceiver(this, receiverName, callback));
    }

    /**
     * Remove a receiver.
     *
     * If the receiver is not registered for the signal,
     * nothing happens.
     */
  }, {
    key: "removeReceiver",
    value: function removeReceiver(receiverName) {
      if (this.receiverMap.has(receiverName)) {
        this.receiverMap.delete(receiverName);
      }
    }

    /**
     * Check if we have a specific receiver for this signal.
     */
  }, {
    key: "hasReceiver",
    value: function hasReceiver(receiverName) {
      return this.receiverMap.has(receiverName);
    }

    /**
     * Get the number of receivers registered for the signal.
     */
  }, {
    key: "receiverCount",
    value: function receiverCount() {
      return this.receiverMap.size;
    }

    /**
     * Send the signal.
     *
     * @param data The data sent with the signal. Forwarded to
     *      the signal receiver callback.
     * @param {SentSignalInfo} info If this is provided, we add the
     *      name of all receivers the signal was sent to.
     */
  }, {
    key: "send",
    value: function send(data, info) {
      var _iterator = _createForOfIteratorHelper(this.receiverMap.values()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var receiver = _step.value;
          receiver.trigger(data);
          if (info) {
            info._addReceiverName(receiver.name);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);
}();
/**
 * The instance of the {@link SignalHandlerSingleton}.
 */
var _instance = null;

/**
 * Signal handler singleton for global communication.
 *
 * @example <caption>Basic example</caption>
 * let signalHandler = new SignalHandlerSingleton();
 * signalHandler.addReceiver('myapp.mysignal', 'myotherapp.MyReceiver', (receivedSignalInfo) => {
 *     console.log('Signal received. Data:', receivedSignalInfo.data);
 * });
 * signalHandler.send('myapp.mysignal', {'the': 'data'});
 *
 *
 * @example <caption>Recommended signal and receiver naming</caption>
 *
 * // In myapp/menu/MenuComponent.js
 * class MenuComponent {
 *     constructor(menuName) {
 *         this.menuName = menuName;
 *         let signalHandler = new SignalHandlerSingleton();
 *         signalHandler.addReceiver(
 *             `toggleMenu#${this.menuName}`,
 *             'myapp.menu.MenuComponent',
 *             (receivedSignalInfo) => {
 *                  this.toggle();
 *             }
 *         );
 *     }
 *     toggle() {
 *         // Toggle the menu
 *     }
 * }
 *
 * // In myotherapp/widgets/MenuToggle.js
 * class MenuToggle {
 *     constructor(menuName) {
 *         this.menuName = menuName;
 *     }
 *     toggle() {
 *         let signalHandler = new SignalHandlerSingleton();
 *         signalHandler.send(`toggleMenu#${this.menuName}`);
 *     }
 * }
 *
 * @example <caption>Multiple receivers</caption>
 * let signalHandler = new SignalHandlerSingleton();
 * signalHandler.addReceiver('myapp.mysignal', 'myotherapp.MyFirstReceiver', (receivedSignalInfo) => {
 *     console.log('Signal received by receiver 1!');
 * });
 * signalHandler.addReceiver('myapp.mysignal', 'myotherapp.MySecondReceiver', (receivedSignalInfo) => {
 *     console.log('Signal received by receiver 1!');
 * });
 * signalHandler.send('myapp.mysignal', {'the': 'data'});
 *
 *
 * @example <caption>Debugging</caption>
 * let signalHandler = new SignalHandlerSingleton();
 * signalHandler.addReceiver('mysignal', 'MyReceiver', (receivedSignalInfo) => {
 *     console.log('received signal:', receivedSignalInfo.toString());
 * });
 * signalHandler.send('myapp.mysignal', {'the': 'data'}, (sentSignalInfo) => {
 *     console.log('sent signal info:', sentSignalInfo.toString());
 * });
 *
 */
var SignalHandlerSingleton = exports.default = /*#__PURE__*/function () {
  function SignalHandlerSingleton() {
    _classCallCheck(this, SignalHandlerSingleton);
    if (!_instance) {
      _instance = this;
      this._signalMap = new Map();
      this._receiverMap = new Map();
      this._logger = new _LoggerSingleton.default().getLogger('SignalHandlerSingleton');
    }
    return _instance;
  }

  /**
   * Remove all receivers for all signals.
   *
   * Useful for debugging and tests, but should not be
   * used for production code.
   */
  return _createClass(SignalHandlerSingleton, [{
    key: "clearAllReceiversForAllSignals",
    value: function clearAllReceiversForAllSignals() {
      this._signalMap.clear();
    }

    /**
     * Add a receiver for a specific signal.
     *
     * @param {string} signalName The name of the signal.
     *      Typically something like ``toggleMenu`` or ``myapp.toggleMenu``.
     *
     *      What if we have multiple objects listening for this ``toggleMenu``
     *      signal, and we only want to toggle a specific menu? You need
     *      to ensure the signalName is unique for each menu. We recommend
     *      that you do this by adding ``#<context>``. For example
     *      ``toggleMenu#mainmenu``. This is shown in one of the examples
     *      above.
     * @param {string} receiverName The name of the receiver.
     *      Must be unique for the signal.
     *      We recommend that you use a very explicit name for your signals.
     *      It should normally be the full path to the method or function receiving
     *      the signal. So if you have a class named ``myapp/menu/MenuComponent.js``
     *      that receives a signal to toggle the menu, the receiverName should be
     *      ``myapp.menu.MenuComponent``.
     * @param callback The callback to call when the signal is sent.
     *      The callback is called with a single argument - a
     *      {@link ReceivedSignalInfo} object.
     */
  }, {
    key: "addReceiver",
    value: function addReceiver(signalName, receiverName, callback) {
      this._logger.debug("adding signal ".concat(signalName, " for receiver ").concat(receiverName, "!"));
      if (typeof callback === 'undefined') {
        throw new TypeError('The callback argument for addReceiver() is required.');
      }
      if (!this._signalMap.has(signalName)) {
        this._signalMap.set(signalName, new _SignalReceivers(signalName));
      }
      if (this._receiverMap.has(receiverName)) {
        this._receiverMap.get(receiverName).add(signalName);
      } else {
        this._receiverMap.set(receiverName, new Set([signalName]));
      }
      var signal = this._signalMap.get(signalName);
      signal.addReceiver(receiverName, callback);
    }

    /**
     * Remove a receiver for a signal added with {@link SignalHandlerSingleton#addReceiver}.
     *
     * @param {string} signalName The name of the signal.
     * @param {string} receiverName The name of the receiver.
     */
  }, {
    key: "removeReceiver",
    value: function removeReceiver(signalName, receiverName) {
      this._logger.debug("removing signal ".concat(signalName, " for receiver ").concat(receiverName, "!"));
      if (this._signalMap.has(signalName)) {
        var signal = this._signalMap.get(signalName);
        signal.removeReceiver(receiverName);
        if (signal.receiverCount() === 0) {
          this._signalMap.delete(signalName);
        }
        var receiverSignalSet = this._receiverMap.get(receiverName);
        if (receiverSignalSet !== undefined) {
          if (receiverSignalSet.has(signalName)) {
            receiverSignalSet.delete(signalName);
          }
          if (receiverSignalSet.size === 0) {
            this._receiverMap.delete(receiverName);
          }
        }
      }
    }

    /**
     * Remove the current receiver for the given name, and add the given receiver for the same name.
     * Just a shortcut for {@link removeReceiver} and {@link addReceiver}.
     *
     * @param signalName The name of the signal.
     * @param receiverName The name of the receiver.
     * @param callback The callback to run when signal is sent.
     */
  }, {
    key: "replaceReceiver",
    value: function replaceReceiver(signalName, receiverName, callback) {
      this.removeReceiver(signalName, receiverName);
      this.addReceiver(signalName, receiverName, callback);
    }

    /**
     * Remove all signals registered for a receiver.
     *
     * @param {string} receiverName The name of the receiver.
     */
  }, {
    key: "removeAllSignalsFromReceiver",
    value: function removeAllSignalsFromReceiver(receiverName) {
      this._logger.debug("Removing all signals from receiver: ".concat(receiverName));
      if (this._receiverMap.has(receiverName)) {
        var _iterator2 = _createForOfIteratorHelper(this._receiverMap.get(receiverName)),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var signalName = _step2.value;
            this.removeReceiver(signalName, receiverName);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }

    /**
     * Check if a signal has a specific receiver.
     *
     * @param {string} signalName The name of the signal.
     * @param {string} receiverName The name of the receiver.
     */
  }, {
    key: "hasReceiver",
    value: function hasReceiver(signalName, receiverName) {
      if (this._signalMap.has(signalName)) {
        var signal = this._signalMap.get(signalName);
        return signal.hasReceiver(receiverName);
      } else {
        return false;
      }
    }

    /**
     * Remove all receivers for a specific signal.
     *
     * @param {string} signalName The name of the signal to remove.
     */
  }, {
    key: "clearAllReceiversForSignal",
    value: function clearAllReceiversForSignal(signalName) {
      if (this._signalMap.has(signalName)) {
        this._signalMap.delete(signalName);
      }
    }

    /**
     * Send a signal.
     *
     * @param {string} signalName The name of the signal to send.
     * @param data Data to send to the callback of all receivers registered
     *      for the signal.
     * @param infoCallback An optional callback that receives information
     *      about the signal. Useful for debugging what actually received
     *      the signal. The ``infoCallback`` is called with a single
     *      argument - a {@link SentSignalInfo} object.
     */
  }, {
    key: "send",
    value: function send(signalName, data, infoCallback) {
      var info = null;
      if (infoCallback) {
        info = new SentSignalInfo(signalName);
      }
      if (this._signalMap.has(signalName)) {
        var signal = this._signalMap.get(signalName);
        signal.send(data, info);
      }
      if (infoCallback) {
        infoCallback(info);
      }
    }
  }]);
}();
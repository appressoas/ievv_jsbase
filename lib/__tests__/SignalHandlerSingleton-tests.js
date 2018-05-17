"use strict";

var _SignalHandlerSingleton = _interopRequireDefault(require("../SignalHandlerSingleton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SignalHandlerSingleton', function () {
  beforeEach(function () {
    jest.useFakeTimers();
    var signalHandler = new _SignalHandlerSingleton.default();
    signalHandler.clearAllReceiversForAllSignals();
  });
  it('addReceiver() creates Signal', function () {
    var signalHandler = new _SignalHandlerSingleton.default();
    signalHandler.addReceiver('testsignal', 'testreceiver', function () {});
    expect(signalHandler._signalMap.has('testsignal')).toBe(true);

    var signal = signalHandler._signalMap.get('testsignal');

    expect(signal.name).toBe('testsignal');
  });
  it('addReceiver() creates SignalReceiver', function () {
    var signalHandler = new _SignalHandlerSingleton.default();
    signalHandler.addReceiver('testsignal', 'testreceiver', function () {});

    var signal = signalHandler._signalMap.get('testsignal');

    expect(signal.receiverMap.has('testreceiver')).toBe(true);
    var receiver = signal.receiverMap.get('testreceiver');
    expect(receiver.name).toBe('testreceiver');
  });
  it('removeReceiver() removes SignalReceiver', function () {
    var signalHandler = new _SignalHandlerSingleton.default();
    signalHandler.addReceiver('testsignal', 'testreceiver1', function () {});
    signalHandler.addReceiver('testsignal', 'testreceiver2', function () {});
    signalHandler.removeReceiver('testsignal', 'testreceiver2');

    var signal = signalHandler._signalMap.get('testsignal');

    expect(signal.receiverMap.has('testreceiver1')).toBe(true);
    expect(signal.receiverMap.has('testreceiver2')).toBe(false);
  });
  it('removeReceiver() last for signal removes Signal', function () {
    var signalHandler = new _SignalHandlerSingleton.default();
    signalHandler.addReceiver('testsignal', 'testreceiver1', function () {});
    signalHandler.addReceiver('testsignal', 'testreceiver2', function () {});
    expect(signalHandler._signalMap.has('testsignal')).toBe(true);
    signalHandler.removeReceiver('testsignal', 'testreceiver1');
    expect(signalHandler._signalMap.has('testsignal')).toBe(true);
    signalHandler.removeReceiver('testsignal', 'testreceiver2');
    expect(signalHandler._signalMap.has('testsignal')).toBe(false);
  });
  it('hasReceiver() is false if no receiver is found', function () {
    var signalHandler = new _SignalHandlerSingleton.default();
    expect(signalHandler.hasReceiver('testsignal', 'testreceiver')).toBe(false);
  });
  it('hasReceiver() is true if receiver is found', function () {
    var signalHandler = new _SignalHandlerSingleton.default();
    signalHandler.addReceiver('testsignal', 'testreceiver', function () {});
    expect(signalHandler.hasReceiver('testsignal', 'testreceiver')).toBe(true);
  });
  it('clearAllReceiversForSignal() with receivers', function () {
    var signalHandler = new _SignalHandlerSingleton.default();
    signalHandler.addReceiver('testsignal', 'testreceiver1', function () {});
    signalHandler.addReceiver('testsignal', 'testreceiver2', function () {});
    expect(signalHandler._signalMap.size).toBe(1);
    signalHandler.clearAllReceiversForSignal('testsignal');
    expect(signalHandler._signalMap.size).toBe(0);
  });
  it('clearAllReceiversForSignal() without receivers', function () {
    var signalHandler = new _SignalHandlerSingleton.default();
    expect(signalHandler._signalMap.size).toBe(0);
    signalHandler.clearAllReceiversForSignal('testsignal');
    expect(signalHandler._signalMap.size).toBe(0);
  });
  it('clearAllReceiversForSignal() only affect specified signal', function () {
    var signalHandler = new _SignalHandlerSingleton.default();
    signalHandler.addReceiver('testsignal', 'testreceiver1', function () {});
    signalHandler.addReceiver('testsignal', 'testreceiver2', function () {});
    signalHandler.addReceiver('testsignal2', 'testreceiver3', function () {});
    expect(signalHandler._signalMap.size).toBe(2);
    signalHandler.clearAllReceiversForSignal('testsignal');
    expect(signalHandler._signalMap.size).toBe(1);
    expect(signalHandler._signalMap.has('testsignal')).toBe(false);
    expect(signalHandler._signalMap.has('testsignal2')).toBe(true);
  });
  it('send() to single receiver', function () {
    var signalHandler = new _SignalHandlerSingleton.default();
    var callback = jest.fn();
    signalHandler.addReceiver('testsignal', 'testreceiver1', callback);
    signalHandler.send('testsignal');
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });
  it('send() to multiple receivers', function () {
    var signalHandler = new _SignalHandlerSingleton.default();
    var callback1 = jest.fn();
    var callback2 = jest.fn();
    signalHandler.addReceiver('testsignal', 'testreceiver1', callback1);
    signalHandler.addReceiver('testsignal', 'testreceiver2', callback2);
    signalHandler.send('testsignal');
    jest.runAllTimers();
    expect(callback1).toBeCalled();
    expect(callback2).toBeCalled();
  });
  it('send() sends data to callback', function () {
    var signalHandler = new _SignalHandlerSingleton.default();
    var callback = jest.fn();
    signalHandler.addReceiver('testsignal', 'testreceiver', callback);
    signalHandler.send('testsignal', 'testdata');
    jest.runAllTimers();
    expect(callback.mock.calls.length).toBe(1);
    expect(callback.mock.calls[0][0].data).toBe('testdata');
  });
  it('send() sends info to callback', function () {
    var signalHandler = new _SignalHandlerSingleton.default();
    var callback = jest.fn();
    signalHandler.addReceiver('testsignal', 'testreceiver', callback);
    signalHandler.send('testsignal');
    jest.runAllTimers();
    expect(callback.mock.calls[0][0].signalName).toBe('testsignal');
    expect(callback.mock.calls[0][0].receiverName).toBe('testreceiver');
  });
  it('send() sends SignalInfo to infoCallback', function () {
    var signalHandler = new _SignalHandlerSingleton.default();
    var infoCallback = jest.fn();
    signalHandler.addReceiver('testsignal', 'testreceiver1', jest.fn());
    signalHandler.addReceiver('testsignal', 'testreceiver2', jest.fn());
    signalHandler.send('testsignal', 'testdata', infoCallback);
    expect(infoCallback).toBeCalled();
    expect(infoCallback.mock.calls[0][0].signalName).toBe('testsignal');
    expect(infoCallback.mock.calls[0][0].triggeredReceiverNames.length).toBe(2);
    expect(infoCallback.mock.calls[0][0].triggeredReceiverNames).toContain('testreceiver1');
    expect(infoCallback.mock.calls[0][0].triggeredReceiverNames).toContain('testreceiver2');
  });
});
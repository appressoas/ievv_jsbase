"use strict";

var _ScriptLoaderSingleton = _interopRequireDefault(require("../ScriptLoaderSingleton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ScriptLoaderSingleton', function () {
  it('ScriptLoaderSingleton.load() adds script tag', function () {
    document.body.innerHTML = "";
    var scriptLoader = new _ScriptLoaderSingleton.default();
    scriptLoader.load('/test.js').then(function (result) {});
    expect(document.body.querySelectorAll('script[src="/test.js"]').length).toBe(1);
  }); // it('ScriptLoaderSingleton.load calls callback on load', () => {
  //   document.body.innerHTML = ``;
  //   const scriptLoader = new ScriptLoaderSingleton();
  //   let promise = scriptLoader.load('/test.js')
  //     .then((script) => {
  //       expect(script.src).toBe('/test.js');
  //     });
  //   // document.body.querySelector('script[src="/test.js"]').onload();
  //   return promise;
  // });
});
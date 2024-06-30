import ScriptLoaderSingleton from "../ScriptLoaderSingleton";

describe('ScriptLoaderSingleton', () => {
  it('ScriptLoaderSingleton.load() adds script tag', () => {
    document.body.innerHTML = ``;
    const scriptLoader = new ScriptLoaderSingleton();
    scriptLoader.load('/test.js')
      .then((result) => {});
    expect(document.body.querySelectorAll('script[src="/test.js"]').length).toBe(1);
  });

  // it('ScriptLoaderSingleton.load calls callback on load', () => {
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

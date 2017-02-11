let _instance = null;


/**
 * A script that is loaded or being loaded by {@link ScriptLoaderSingleton}.
 */
export class Script {
  constructor(src) {
    this.state = 'new';
    this.src = src;
    this.scriptTag = null;
    this._loadedCallbacks = [];
    this._onLoad = this._onLoad.bind(this);
  }

  _onLoad() {
    this.state = 'loaded';
    for(let callbackObject of this._loadedCallbacks) {
      callbackObject.resolve(this);
    }
    this._loadedCallbacks = [];
  }

  _loadScript() {
    this.state = 'loading';
    this.scriptTag = document.createElement('script');
    this.scriptTag.src = this.src;
    if (this.scriptTag.readyState) { //IE
      this.scriptTag.onreadystatechange = () => {
        if (this.scriptTag.readyState == "loaded" || this.scriptTag.readyState == "complete") {
          this.scriptTag.onreadystatechange = null;
          this._onLoad();
        }
      };
    } else { //Others
      this.scriptTag.onload = this._onLoad;
    }

    this.scriptTag.onload = this._onLoad;
    this.scriptTag.onreadystatechange = this._onLoad;
    document.body.appendChild(this.scriptTag);
  }

  _load() {
    return new Promise((resolve, reject) => {
      if(this.state == 'loaded') {
        resolve(this);
      } else {
        this._loadedCallbacks.push({
          resolve: resolve,
          reject: reject
        });
        if(this.state == 'new') {
          this._loadScript();
        }
      }
    });
  }
}


/**
 * Asyncronous script loader.
 *
 * @example
 * const scriptLoader = new ScriptLoaderSingleton();
 * scriptLoader.load('//example.com/myscript.js').then((script) => {
 *   console.log(`The ${script.src} script was loaded`);
 * });
 */
export default class ScriptLoaderSingleton {
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
    this._scriptsMap = new Map(); // Maps src to Script objects
    return _instance;
  }

  /**
   * Load a script.
   *
   * @param {string} src The source URL of the script.
   * @returns {Promise} A Promise that resolves when the script is loaded.
   *    We do not handle errors (not possible with the insert script tag approach),
   *    so this promise will never be rejected.
   */
  load(src) {
    let script;
    if(this._scriptsMap.has(src)) {
      script = this._scriptsMap.get(src);
    } else {
      script = new Script(src);
      this._scriptsMap.set(src, script);
    }
    return script._load();
  }
}

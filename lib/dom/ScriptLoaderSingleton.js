"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Script = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _instance = null;
/**
 * A script that is loaded or being loaded by {@link ScriptLoaderSingleton}.
 */

var Script =
/*#__PURE__*/
function () {
  function Script(src) {
    _classCallCheck(this, Script);

    this.state = 'new';
    this.src = src;
    this.scriptTag = null;
    this._loadedCallbacks = [];
    this._onLoad = this._onLoad.bind(this);
  }

  _createClass(Script, [{
    key: "_onLoad",
    value: function _onLoad() {
      this.state = 'loaded';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._loadedCallbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var callbackObject = _step.value;
          callbackObject.resolve(this);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._loadedCallbacks = [];
    }
  }, {
    key: "_loadScript",
    value: function _loadScript() {
      var _this = this;

      this.state = 'loading';
      this.scriptTag = document.createElement('script');
      this.scriptTag.src = this.src;

      if (this.scriptTag.readyState) {
        //IE
        this.scriptTag.onreadystatechange = function () {
          if (_this.scriptTag.readyState == "loaded" || _this.scriptTag.readyState == "complete") {
            _this.scriptTag.onreadystatechange = null;

            _this._onLoad();
          }
        };
      } else {
        //Others
        this.scriptTag.onload = this._onLoad;
      }

      this.scriptTag.onload = this._onLoad;
      this.scriptTag.onreadystatechange = this._onLoad;
      document.body.appendChild(this.scriptTag);
    }
  }, {
    key: "_load",
    value: function _load() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (_this2.state == 'loaded') {
          resolve(_this2);
        } else {
          _this2._loadedCallbacks.push({
            resolve: resolve,
            reject: reject
          });

          if (_this2.state == 'new') {
            _this2._loadScript();
          }
        }
      });
    }
  }]);

  return Script;
}();
/**
 * Asyncronous script loader.
 *
 * @example
 * const scriptLoader = new ScriptLoaderSingleton();
 * scriptLoader.load('//example.com/myscript.js').then((script) => {
 *   console.log(`The ${script.src} script was loaded`);
 * });
 */


exports.Script = Script;

var ScriptLoaderSingleton =
/*#__PURE__*/
function () {
  /**
   * Get an instance of the singleton.
   *
   * The first time this is called, we create a new instance.
   * For all subsequent calls, we return the instance that was
   * created on the first call.
   */
  function ScriptLoaderSingleton() {
    _classCallCheck(this, ScriptLoaderSingleton);

    if (!_instance) {
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


  _createClass(ScriptLoaderSingleton, [{
    key: "load",
    value: function load(src) {
      var script;

      if (this._scriptsMap.has(src)) {
        script = this._scriptsMap.get(src);
      } else {
        script = new Script(src);

        this._scriptsMap.set(src, script);
      }

      return script._load();
    }
  }]);

  return ScriptLoaderSingleton;
}();

exports.default = ScriptLoaderSingleton;
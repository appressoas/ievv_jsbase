/**
 * A generator for webpack config.
 *
 * @example
 * const webpackConfig = require('ievv_jsbase/webpackHelpers/webpackConfig')
 * const path = require('path')
 *
 * const config = new webpackConfig.WebpackConfig(appconfig.destinationfolder)
 * config.enableBabel()
 * config.addEntry('myapp', [
 *   path.resolve(__dirname, 'source/myapp.js')
 * ])
 *
 * module.exports = config.generate()
 */
class WebpackConfig {
  constructor (destinationFolder) {
    this.destinationFolder = destinationFolder
    this.polyfills = []
    this.entryMap = new Map()
    this.babelExcludeRegex = /node_modules/
    this.babelFileRegex = /.jsx?$/
    this._enableBabelCalled = false
    this.pluginsArray = []
    this.moduleRuleArray = []
  }

  /**
   * Add a polyfill.
   *
   * Each polyfill is added to the beginning of the source
   * files array for each entry.
   *
   * So using this is the same as including the polyfill
   * at the start of the `sourceFilesArray` for each {@link addEntry} call.
   *
   * @param polyfill
   */
  addPolyfill (polyfill) {
    this.polyfills.push(polyfill)
  }

  /**
   * Add an item to the `entry` object.
   *
   * @param {string} name The name of the entry (the key in the object)
   * @param {[]} sourceFilesArray Array of source files.
   */
  addEntry (name, sourceFilesArray) {
    this.entryMap.set(name, sourceFilesArray)
  }

  /**
   * Add a `plugin`.
   */
  addPlugin (plugin) {
    this.pluginsArray.push(plugin)
  }

  /**
   * Add an object to `module.rules`.
   * @param moduleRule A module rule object.
   */
  addModuleRule (moduleRule) {
    this.moduleRuleArray.push(moduleRule)
  }

  /**
   * Generate the `output` object for the webpack config. Used by {@link WebpackConfig#generate}.
   *
   * Can be overridden in subclasses, but you should call super if you do not want
   * to break {@link WebpackConfig#addPolyfill} (which will also break {@link WebpackConfig#enableBabel}.
   */
  generateEntryObject () {
    const entry = {}
    for (const [name, sourceFilesArray] of this.entryMap) {
      entry[name] = this.polyfills.concat(sourceFilesArray)
    }
    return entry
  }

  /**
   * Generate the `output` object for the webpack config. Used by {@link WebpackConfig#generate}.
   *
   * Can be overridden in subclasses.
   */
  generateOutputObject () {
    return {
      filename: '[name].js',
      path: this.destinationFolder
    }
  }

  _generateModuleRules () {
    return this.moduleRuleArray
  }

  _generateModuleObject () {
    return {
      rules: this._generateModuleRules()
    }
  }

  /**
   * Generate the `plugins` array for the webpack config. Used by {@link WebpackConfig#generate}.
   *
   * Can be overridden in subclasses.
   */
  generatePluginsArray () {
    return this.pluginsArray
  }

  /**
   * Generate the module.exports object for your webpack config.
   */
  generate () {
    return {
      entry: this.generateEntryObject(),
      output: this.generateOutputObject(),
      resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules']
      },
      module: this._generateModuleObject(),
      plugins: this.generatePluginsArray()
    }
  }

  _mustCallBeforeEnableBabel (methodName) {
    if (this._enableBabelCalled) {
      throw new Error(`${methodName} can not be called after enableBabel()`)
    }
  }

  /**
   * Set the babel exclude regex (the `test` option for `babel-loader`).
   *
   * The default is `/node_modules/`, so no need to override this if that is
   * what you need.
   *
   * @param excludeRegex A regex. E.g.: `/node_modules|lib/`
   */
  setBabelExcludeRegex (excludeRegex) {
    this._mustCallBeforeEnableBabel()
    this.babelExcludeRegex = excludeRegex
  }

  /**
   * Set the babel exclude regex (the `test` option for `babel-loader`).
   *
   * The default is `/.jsx?$/`, so no need to override this if that is
   * what you need.
   *
   * @param fileRegex A regex. E.g.: `/.jsx?$|.es6$/`
   */
  setBabelFileRegex (fileRegex) {
    this._mustCallBeforeEnableBabel()
    this.babelFileRegex = fileRegex
  }

  /**
   * Generate a module.rules object for `babel-loader`
   * @returns {{test: (RegExp|*), loader: string, exclude: (RegExp|*)}}.
   */
  generateBabelLoaderModuleRule () {
    this._mustCallBeforeEnableBabel()
    return {
      test: this.babelFileRegex,
      loader: 'babel-loader',
      exclude: this.babelExcludeRegex
    }
  }

  /**
   * Add babel polyfill.
   *
   * Just a shortcut for ``addPolyfill('@babel/polyfill')``.
   *
   * See {@link addPolyfill}.
   */
  addBabelPolyfill () {
    this.addPolyfill('@babel/polyfill')
  }

  /**
   * Shortcut for enabling babel.
   *
   * Just a shortcut for calling ``addBabelPolyfill()`` and
   * ``addModuleRule(generateBabelLoaderModuleRule())``.
   *
   * See:
   *
   * - {@link WebpackConfig#addBabelPolyfill}
   * - {@link WebpackConfig#addModuleRule}
   * - {@link WebpackConfig#generateBabelLoaderModuleRule}
   */
  enableBabel () {
    this.addBabelPolyfill()
    this.addModuleRule(this.generateBabelLoaderModuleRule())
  }
}

module.exports.WebpackConfig = WebpackConfig

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _instance = null;
/**
 * Unique DOM id generator singleton.
 *
 * @example
 * const domId1 = new UniqueDomIdSingleton().generate()
 * // domId1 === 'id_ievvjsbase_auto_1'
 * const domId2 = new UniqueDomIdSingleton().generate()
 * // domId2 === 'id_ievvjsbase_auto_2'
 */

var UniqueDomIdSingleton =
/*#__PURE__*/
function () {
  /**
   * Get an instance of the singleton.
   *
   * The first time this is called, we create a new instance.
   * For all subsequent calls, we return the instance that was
   * created on the first call.
   */
  function UniqueDomIdSingleton() {
    _classCallCheck(this, UniqueDomIdSingleton);

    if (!_instance) {
      _instance = this;
    }

    this.domIdIndex = 0;
    return _instance;
  }
  /**
   * Generate a unique DOM id.
   */


  _createClass(UniqueDomIdSingleton, [{
    key: "generate",
    value: function generate() {
      this.domIdIndex++;
      return "id_ievvjsbase_auto_".concat(this.domIdIndex);
    }
  }]);

  return UniqueDomIdSingleton;
}();

exports.default = UniqueDomIdSingleton;
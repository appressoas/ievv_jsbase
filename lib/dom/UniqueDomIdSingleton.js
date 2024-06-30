let _instance = null

/**
 * Unique DOM id generator singleton.
 *
 * @example
 * const domId1 = new UniqueDomIdSingleton().generate()
 * // domId1 === 'id_ievvjsbase_auto_1'
 * const domId2 = new UniqueDomIdSingleton().generate()
 * // domId2 === 'id_ievvjsbase_auto_2'
 */
export default class UniqueDomIdSingleton {
  /**
   * Get an instance of the singleton.
   *
   * The first time this is called, we create a new instance.
   * For all subsequent calls, we return the instance that was
   * created on the first call.
   */
  constructor () {
    if (!_instance) {
      _instance = this
    }
    this.domIdIndex = 0
    return _instance
  }

  /**
   * Generate a unique DOM id.
   */
  generate () {
    this.domIdIndex++
    return `id_ievvjsbase_auto_${this.domIdIndex}`
  }
}

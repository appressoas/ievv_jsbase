"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeDetect = _interopRequireDefault(require("./typeDetect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Utility-class with several static functions to simplify validation, merging and other standard operations on
 * javascript-Objects.
 */
var ObjectManager =
/*#__PURE__*/
function () {
  function ObjectManager() {
    _classCallCheck(this, ObjectManager);
  }

  _createClass(ObjectManager, null, [{
    key: "_hasOwnValue",

    /**
     * Checks that given object is not null and not undefined. Also checks the same inwards in provided nested keys
     *
     * @example
     *  let check = this._hasOwnValue({"foo": {"bar": ""}}, false, true, "foo", "bar");
     *  // check is now false. key "foo" is found, key "bar" is found, but "bar" is emptyString, and params specify to check for them
     *
     * @example
     *  let check = this._hasOwnValue({"foo": {"bar": {}}}, true, false, "foo", "bar");
     *  // check is now false. key "foo" is found, key "bar" is found, but "bar" is {}, and params specify to check for emptyObject.
     *
     * @example
     *  let check = this._hasOwnValue({"foo": {"bar": {}}}, false, false, "foo", "bar");
     *  // check is now true. key "foo" is found, key "bar" is found, so no requested values are null or undefined.
     *
     *  NOTE: Other functions in this file lets you ignore the boolean params - so just use them :)
     *
     * @param givenObject   The object to validate
     * @param emptyObject   if true - keys mapped to empty object {} will also give false
     * @param emptyString   if true - keys mapped to empty string "" will also give false
     * @param args          nested keys to look for, so to validate myObject.foo.bar call this._hasOwnValue(myObject, false, false, "foo". "bar")
     * @returns {boolean}   true if validation passes, false if not.
     */
    value: function _hasOwnValue(givenObject, emptyObject, emptyString) {
      function checkValue(value) {
        return value != undefined && value != null && (!emptyObject || value != {}) && (!emptyString || value != "");
      }

      if (!checkValue(givenObject)) {
        return false;
      }

      for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        args[_key - 3] = arguments[_key];
      }

      for (var _i = 0, _args = args; _i < _args.length; _i++) {
        var key = _args[_i];

        if (!(key in givenObject) || !checkValue(givenObject[key])) {
          return false;
        }

        givenObject = givenObject[key];
      }

      return true;
    }
    /**
     * Validate that an object and nested keys are not null, undefined or empty string "".
     *
     * @example
     * // check that myObject.foo.bar exists:
     * validateAllowEmptyObject(myObject, "foo", "bar")
     *
     * @param givenObject   the object to validate
     * @param args          nested keys to check
     * @returns {boolean}   true if neither the object or any provided nested key is null, undefined or ""
     */

  }, {
    key: "validateAllowEmptyObject",
    value: function validateAllowEmptyObject(givenObject) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return this._hasOwnValue.apply(this, [givenObject, false, true].concat(args));
    }
    /**
     * Validate that an object and nested keys are not null, undefined or empty object {}.
     *
     * @example
     * // check that myObject.foo.bar exists:
     * validateAllowEmptyObject(myObject, "foo", "bar")
     *
     * @param givenObject   the object to validate
     * @param args          nested keys to check
     * @returns {boolean}   true if neither the object or any provided nested key is null, undefined or {}
     */

  }, {
    key: "validateAllowEmptyString",
    value: function validateAllowEmptyString(givenObject) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return this._hasOwnValue.apply(this, [givenObject, true, false].concat(args));
    }
    /**
     * Validate that an object and nested keys are not null, undefined or empty string "" or empty object {}.
     *
     * @example
     * // check that myObject.foo.bar exists:
     * validateAllowEmptyObject(myObject, "foo", "bar")
     *
     * @param givenObject   the object to validate
     * @param args          nested keys to check
     * @returns {boolean}   true if neither the object or any provided nested key is null, undefined, {} or ""
     */

  }, {
    key: "validate",
    value: function validate(givenObject) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      return this._hasOwnValue.apply(this, [givenObject, true, true].concat(args));
    }
    /**
     * Validate that an object and nested keys are not null or undefined.
     *
     * @example
     * // check that myObject.foo.bar exists:
     * validateAllowEmptyObject(myObject, "foo", "bar")
     *
     * @param givenObject   the object to validate
     * @param args          nested keys to check
     * @returns {boolean}   true if neither the object or any provided nested key is null or undefined.
     */

  }, {
    key: "validateAllowEmptyStringAndEmptyObject",
    value: function validateAllowEmptyStringAndEmptyObject(givenObject) {
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      return this._hasOwnValue.apply(this, [givenObject, false, false].concat(args));
    }
    /**
     * uses {@link validate} to lookup given args in given objectToBeValidated.
     * This ensures the lookup is not null, undefined, empty object, or empty string.
     * If this test fails, given fallbackValue is returned.
     *
     * @example
     *  // to validate myObject.foo.bar, and get "helloworld" back as default if it is empty:
     *  validateOrFallback("helloworld", myObject, "foo", "bar")
     *
     * @param fallbackValue         what to return if empty
     * @param objectToBeValidated   object to do lookup in
     * @param args                  indices used for lookup in object
     * @returns {*}                 lookup in objectToBeValidated if validation succeeded, fallbackValue if not.
     */

  }, {
    key: "validateOrFallback",
    value: function validateOrFallback(fallbackValue, objectToBeValidated) {
      for (var _len6 = arguments.length, args = new Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
        args[_key6 - 2] = arguments[_key6];
      }

      if (!this.validate.apply(this, [objectToBeValidated].concat(args))) {
        return fallbackValue;
      }

      for (var _i2 = 0, _args2 = args; _i2 < _args2.length; _i2++) {
        var arg = _args2[_i2];
        objectToBeValidated = objectToBeValidated[arg];
      }

      return objectToBeValidated;
    }
    /**
     * Utilityfunction to simplify validation! uses {@link validateOrFallback} for validation, and executes
     * given callback (and returns returnvalue from it) if validation fails.
     *
     * @param callback              Function to be executed if validation fails
     * @param objectToBeValidated   The object to do validation-lookup in
     * @param args                  indices used for lookup in objectToBeValidated
     * @returns {*}                 lookup in objectToBeValidated if validation succeeded, returnvalue from callback if not.
     */

  }, {
    key: "validateOrCallback",
    value: function validateOrCallback(callback, objectToBeValidated) {
      for (var _len7 = arguments.length, args = new Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
        args[_key7 - 2] = arguments[_key7];
      }

      var validatedValue = this.validateOrFallback.apply(this, [null, objectToBeValidated].concat(args));

      if (validatedValue == null) {
        return callback();
      }

      return validatedValue;
    }
    /**
     * Utilityfunction to simplify validation! uses {@link validateOrCallback} for validation, and passes
     * a callback that simply thrown an Error if validation fails.
     *
     * @param errorMessage          the message to use in new Error(errorMessage)
     * @param objectToBeValidated   the object to validate args in
     * @param args                  args for lookup. see {@link validateOrFallback}
     * @returns {*}                 the looked-up value from objectToBeValidated if it exists
     */

  }, {
    key: "validateOrError",
    value: function validateOrError(errorMessage, objectToBeValidated) {
      for (var _len8 = arguments.length, args = new Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
        args[_key8 - 2] = arguments[_key8];
      }

      return this.validateOrCallback.apply(this, [function () {
        throw new Error(errorMessage);
      }, objectToBeValidated].concat(args));
    }
  }, {
    key: "_recursiveMerge",
    value: function _recursiveMerge(mergedValues, overrides) {
      for (var key in overrides) {
        var detectedType = (0, _typeDetect.default)(overrides[key]);

        if (detectedType == 'object') {
          if (mergedValues[key] == undefined) {
            mergedValues[key] = {};
          }

          mergedValues[key] = this._recursiveMerge(mergedValues[key], overrides[key]);
        } else if (detectedType == 'array') {
          mergedValues[key] = Array.from(overrides[key]);
        } else if (detectedType == 'null' || detectedType == 'number' || detectedType == 'boolean' || detectedType == 'string') {
          mergedValues[key] = overrides[key];
        } else {
          throw new Error("Unsupported type: ".concat(detectedType, "."));
        }
      }

      return mergedValues;
    }
    /**
     * Deep copy all values from overrides to givenObject.
     *
     * All keys in passed overrides-object will be cloned to passed givenObject. This happens deeply, so all
     * nested objects will also be iterated (NOTE: lists are not iterated, only objects).
     *
     * Note that objects are passed by-reference, so if you do not want givenObject to be modified directly make sure
     * you pass false as third param
     *
     * @param givenObject             The object to override values in
     * @param overrides               The object to copy all values from
     * @param overrideValuesInGiven   if true givenObjects will be overwritten directly, if false a new object
     *                                will be created to merge both given objects into.
     * @returns {*}                   The result from deep-merging
     */

  }, {
    key: "_merge",
    value: function _merge(givenObject, overrides, overrideValuesInGiven) {
      if (overrideValuesInGiven) {
        return this._recursiveMerge(givenObject, overrides);
      }

      var mergedValues = {};
      mergedValues = this._recursiveMerge(mergedValues, givenObject);
      return this._recursiveMerge(mergedValues, overrides);
    }
    /**
     * Merges all values from overrideObject into originalObject.
     * This happens in place (as objects are passed-by-reference), so originalObject is modified.
     *
     * This is a deep-merge (unlike Object.assign).
     *
     * @example <caption>Simple example</caption>
     * let originalObject = {
     *      foo: "bar",
     *      person: {
     *          name: "Sandy claws",
     *          age: 42
     *      }
     * }
     *
     * let overrideObject = {
     *      foo: "baz",
     *      person: {
     *          age: 23,
     *          phone: 12345678
     *      }
     *  }
     *
     *  ObjectManager.mergeInPlace(originalObject, overrideObject);
     *
     *  // originalObject will now be:
     *  originalObject == {
     *      foo: "baz",
     *      person: {
     *          age: 23,
     *          phone: 12345678,
     *          name: "Sandy claws"
     *      }
     *  }
     *
     * @param originalObject    the object to modify
     * @param overrideObject    the object to copy values from
     */

  }, {
    key: "mergeInPlace",
    value: function mergeInPlace(originalObject, overrideObject) {
      this._merge(originalObject, overrideObject, true);
    }
    /**
     * Merges all values from originalObject and overrideObject into a new object that is returned.
     *
     * This is a deep-merge (unlike Object.assign).
     *
     * First, all values from originalObject are merged into a new object.
     * Then all values from overrideObject are merged into the same object, overriding any corresponding keys from
     * originalObject.
     *
     * @example <caption>Simple example</caption>
     * let originalObject = {
     *      foo: "bar",
     *      person: {
     *          name: "Sandy claws",
     *          age: 42
     *      }
     * }
     *
     * let overrideObject = {
     *      foo: "baz",
     *      person: {
     *          age: 23,
     *          phone: 12345678
     *      }
     *  }
     *
     *  let mergedObject = ObjectManager.mergeAndCopy(originalObject, overrideObject);
     *
     *  // mergedObject will now be:
     *  mergedObject == {
     *      foo: "baz",
     *      person: {
     *          age: 23,
     *          phone: 12345678,
     *          name: "Sandy claws"
     *      }
     *  }
     *
     * @param originalObject    initial values for new object
     * @param overrideObject    object to override values from original object with
     * @returns {{}}            new object containing values from originalObject overridden by overrideObject (see example)
     */

  }, {
    key: "mergeAndClone",
    value: function mergeAndClone(originalObject, overrideObject) {
      return this._merge(originalObject, overrideObject, false);
    }
    /**
     * Copies all values from given originalObject into a new object, which is returned to caller.
     *
     * uses {@link ObjectManager#mergeAndClone}, but passes an empty object as one of the two it desires for merging..
     *
     * @param originalObject
     * @returns {{}}
     */

  }, {
    key: "clone",
    value: function clone(originalObject) {
      return this.mergeAndClone({}, originalObject);
    }
  }]);

  return ObjectManager;
}();

exports.default = ObjectManager;
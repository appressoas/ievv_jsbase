import typeDetect from "./typeDetect";
/**
 * Utility-class with several static functions to simplify validation, merging and other standard operations on
 * javascript-Objects.
 */
export default class ObjectManager {
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
    static _hasOwnValue(givenObject, emptyObject, emptyString, ...args) {
        function checkValue(value) {
            return (value != undefined && value != null && (!emptyObject || value != {}) && (!emptyString || value != ""));
        }

        if (!checkValue(givenObject)) {
            return false;
        }

        for (let key of args) {
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
    static validateAllowEmptyObject(givenObject, ...args) {
        return this._hasOwnValue(givenObject, false, true, ...args);
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
    static validateAllowEmptyString(givenObject, ...args) {
        return this._hasOwnValue(givenObject, true, false, ...args);
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
    static validate(givenObject, ...args) {
        return this._hasOwnValue(givenObject, true, true, ...args);
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
    static validateAllowEmptyStringAndEmptyObject(givenObject, ...args) {
        return this._hasOwnValue(givenObject, false, false, ...args);
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
    static validateOrFallback(fallbackValue, objectToBeValidated, ...args) {
        if (!this.validate(objectToBeValidated, ...args)) {
            return fallbackValue;
        }
        for (let arg of args) {
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
    static validateOrCallback(callback, objectToBeValidated, ...args) {
        const validatedValue = this.validateOrFallback(null, objectToBeValidated, ...args);
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
    static validateOrError(errorMessage, objectToBeValidated, ...args) {
        return this.validateOrCallback(()=>{throw new Error(errorMessage);}, objectToBeValidated, ...args);
    }


    static _recursiveMerge(mergedValues, overrides) {
        for (let key in overrides) {
            let detectedType = typeDetect(overrides[key]);
            if (detectedType == 'object') {
                if(mergedValues[key] == undefined) {
                    mergedValues[key] = {};
                }
                mergedValues[key] = this._recursiveMerge(mergedValues[key], overrides[key]);
            } else if(detectedType == 'array') {
                mergedValues[key] = Array.from(overrides[key]);
            } else if(detectedType == 'null' || detectedType == 'number'
                || detectedType == 'boolean' || detectedType == 'string') {
                mergedValues[key] = overrides[key];
            } else {
                throw new Error(`Unsupported type: ${detectedType}.`);
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
    static _merge(givenObject, overrides, overrideValuesInGiven) {
        if (overrideValuesInGiven) {
            return this._recursiveMerge(givenObject, overrides);
        }

        let mergedValues = {};
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
    static mergeInPlace(originalObject, overrideObject) {
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
    static mergeAndClone(originalObject, overrideObject) {
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
    static clone(originalObject) {
        return this.mergeAndClone({}, originalObject);
    }
}

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeApiDataMapIsLoading = makeApiDataMapIsLoading;
exports.makeApiDataMapNewData = makeApiDataMapNewData;
exports.makeApiDataMapError = makeApiDataMapError;
exports.makeApiDataMapDeleted = makeApiDataMapDeleted;
exports.getObjectFromReduxMapOrNullIfLoading = getObjectFromReduxMapOrNullIfLoading;
exports.makeImmutableOrderedMapFromValueArray = makeImmutableOrderedMapFromValueArray;
exports.makeTypeMappedReduxMapFromApiData = makeTypeMappedReduxMapFromApiData;
exports.getValuesFromTypeMappedReduxMap = getValuesFromTypeMappedReduxMap;
exports.ensureMapHasDataInReduxStore = ensureMapHasDataInReduxStore;
exports.TYPE_MAPPED_REDUX_MAP_DEFAULT_KEY = void 0;

var _immutable = require("immutable");

var _LoggerSingleton = _interopRequireDefault(require("../log/LoggerSingleton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var logger = new _LoggerSingleton.default().getLogger('churchill_js.utilities.reduxApiUtilities');
/**
 * Util used by all `action.js`-files in `redux/api/*`.
 * This is used to mark an entry in a redux-map as loading.
 *
 * sets `isLoading` to `true` and `apiError` to null.
 *
 * @param oldApiDataMap Previous contents of `data` in the redux-map in question
 * @return {Immutable.Map<string, any>} The new Map to insert as entry in the redux-map being updated.
 */

function makeApiDataMapIsLoading() {
  var oldApiDataMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return new _immutable.Map({
    isLoading: true,
    isDeleted: false,
    apiError: null,
    data: oldApiDataMap === null ? new _immutable.Map() : oldApiDataMap.get('data')
  });
}
/**
 * Util used by all `action.js`-files in `redux/api/*`.
 * This is used to format data to store in redux-state-map when an api-call is successful.
 *
 * The given `newData` is inserted as an ImmutableMap `data`.
 *
 * sets `isLoading` to `false`, `apiError` to null and `timestamp` to now.
 *
 * @param newData {Object} the object returned from the api which should be formated for insertion in the
 *   redux-state-map. If fromList is true this should be an iterable.
 * @param fromList {boolean} if true, make an ImmutableList of the given data instead of ImmutableMap
 * @param noWrap {boolean} if true, newData will not be wrapped in ImmutableMap or ImmutableList. Only use this if the
 *   data you are setting is already an ImmutableMap or ImmutableList!
 * @return {Immutable.Map} newly formatted ImmutableMap ready to be placed in redux-state-map
 */


function makeApiDataMapNewData(newData) {
  var fromList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var noWrap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var getData = function getData() {
    if (noWrap) {
      return newData;
    }

    if (fromList) {
      return new _immutable.List(newData);
    }

    return new _immutable.Map(newData);
  };

  return new _immutable.Map({
    isLoading: false,
    isDeleted: false,
    apiError: null,
    data: getData(),
    timestamp: new Date()
  });
}
/**
 * Util used by all `action.js`-files in `redux/api/*`.
 *
 * This is used to build a common error-format for all redux-map-entries.
 * sets `isLoading` to `false`, `data` to `null`, `timestamp` to now.
 *
 * stores the error in the field `apiError` formatted like this:
 *
 * apiError: ImmutableMap({
 *  status: error.response.status,
 *  bodydata: ImmutableMap(error.response.bodydata)
 * })
 *
 * @param error
 * @return {Immutable.Map}
 */


function makeApiDataMapError(error) {
  logger.warning('makeApiDataMapError: got error: ', error);
  return new _immutable.Map({
    isLoading: false,
    isDeleted: false,
    apiError: new _immutable.Map({
      status: error.response.status,
      bodydata: new _immutable.Map(error.response.bodydata)
    }),
    data: null,
    timestamp: new Date()
  });
}
/**
 * Used to mark an object in redux-state as deleted.
 * @param oldData
 * @return {Immutable.Map}
 */


function makeApiDataMapDeleted() {
  var oldData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _immutable.Map();
  return new _immutable.Map({
    isLoading: false,
    isDeleted: true,
    apiError: null,
    data: null,
    timestamp: new Date(),
    oldData: oldData
  });
}
/**
 * Simple util to fetch data from a redux-api-map (which should always be built by {@link makeApiDataMapIsLoading},
 * {@link makeApiDataMapNewData} or {@link makeApiDataMapError}).
 *
 * This util will lookup the given id in the given map and return it if it exists.
 * If the entry is missing or loading, null is returned.
 * If the entry is missing (and not already loading), the given `dispatchAction` is dispatched and null is returned.
 *
 * Note that this util will still return the object even if it is an error-object (`apiError !== null`), so you need
 * to handle errors in your component.
 *
 * @param map {Immutable.Map} a map built by {@link makeApiDataMapIsLoading}, {@link makeApiDataMapNewData} or
 *   {@link makeApiDataMapError}
 * @param id {number} the entry-id to look for in the map
 * @param dispatchAction {function} the `redux.api...actions.<action>` to dispatch to load the entry if missing
 * @param dispatch {function} a `redux-thunk` dispatch, like `this.props.dispatch` from a connected React.Component.
 * @return {null|Immutable.Map} null if the entry is loading, or an ImmutableMap of the entry if it exists.
 */


function getObjectFromReduxMapOrNullIfLoading(map, id, dispatchAction, dispatch) {
  if (id === null || id === undefined) {
    throw new Error("Cannot do a map-lookup with invalid key: \"".concat(id, "\""));
  }

  var element = map.get(id, null);

  if (element === null) {
    dispatch(dispatchAction(id));
    return null;
  }

  if (element.get('isLoading', true)) {
    return null;
  }

  return element;
}
/**
 * Used for the internal OrderedMap from {@link makeTypeMappedReduxMapFromApiData}, and should be used for other
 * type-lists from api.
 *
 * The only required fieldname on the api-data is `value`, which will be used as key in the ImmutableOrderedMap
 *
 * Builds a structure like this:
 *   ImmutableOrderedMap({
 *     <valueKey>: ImmutableMap({
 *       label: <some label>,
 *       description: <some description>,
 *       <otherfield>: <otherfieldkey>,
 *         ...
 *     })
 *   })
 *
 * from input-data formatted like this:
 *   [
 *     {
 *       "value": "<valueKey>",
 *       "label": "<some label>",
 *       "description": "<some description>",
 *       <otherfield>: <otherfieldkey>,
 *       ...
 *     }
 *   ]
 *
 * @param valueArray See input-data doc above
 * @param valueKey default to 'value' as in example above. can be set to any valid value. note that this is NOT
 *   validated or enforced in any way
 * @return {Immutable.OrderedMap<string, Immutable.Map<string, string>>} see example above
 */


function makeImmutableOrderedMapFromValueArray(valueArray) {
  var valueKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';
  return new _immutable.OrderedMap().withMutations(function (newValuesForNodeTypeMap) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = valueArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var valueObject = _step.value;
        // const {value, ...object} = valueObject
        // newValuesForNodeTypeMap.set(value, new ImmutableMap(object))
        var value = valueObject[valueKey];
        delete valueObject[valueKey];
        newValuesForNodeTypeMap.set(value, new _immutable.Map(valueObject));
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
  });
}
/**
 * Used for apis like nodePaymentSubscriptionTypes and nodeMembershipTypes.
 *
 * Builds a structure like this:
 * ImmutableMap({
 *  <nodeType>: ImmutableOrderedMap({
 *     <valueKey>: ImmutableMap({
 *       label: <some label>,
 *       description: <some description>,
 *       <otherfield>: <otherfieldkey>,
 *         ...
 *     })
 *   })
 * })
 *
 * Expects apiResponseBodydata to be formatted like this:
 *  {
 *     "<nodeType>": [
 *       {
 *         "value": "<valueKey>",
 *         "label": "<some label>",
 *         "description": "<some description>",
 *         <otherfield>: <otherfieldkey>,
 *         ...
 *       }
 *     ]
 *  }
 *
 * @param apiResponseBodydata `bodydata` from a response. This response has to be formatted correctly.
 * @return {Immutable.Map<string, Immutable.OrderedMap<string, Immutable.Map<string, string>>>} See example in doc above
 */


function makeTypeMappedReduxMapFromApiData(apiResponseBodydata) {
  return new _immutable.Map().withMutations(function (data) {
    for (var _i = 0, _Object$entries = Object.entries(apiResponseBodydata); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          typeKey = _Object$entries$_i[0],
          valuesForTypeKey = _Object$entries$_i[1];

      data.set(typeKey, makeImmutableOrderedMapFromValueArray(valuesForTypeKey));
    }
  });
}
/**
 * The default key for maps built by {@link makeTypeMappedReduxMapFromApiData}.
 * This should be the same key used by the server-side apis, so do not change it unless you know what you are doing.
 *
 * @type {string}
 */


var TYPE_MAPPED_REDUX_MAP_DEFAULT_KEY = '__default__';
/**
 * Used to fetch the ImmutableOrderedMap of values for a <typeKey> in a structure built by
 * {@link makeTypeMappedReduxMapFromApiData}. See its documentation for structure.
 *
 * If the given <typeKey> is not present in the map, then the entry referenced by
 * {@link TYPE_MAPPED_REDUX_MAP_DEFAULT_KEY} will be returned instead.
 *
 * @param typeMappedReduxMap a map built by {@link makeTypeMappedReduxMapFromApiData}
 * @param typeKey the <typeKey> to look for in the map
 * @param fallbackToDefault if true return default-data if no data for typekey is present. If false, return null.
 * @return {Immutable.OrderedMap<string, Immutable.Map<string, string>>} The ImmutableOrderedMap referenced by the
 *   given <typeKey>
 */

exports.TYPE_MAPPED_REDUX_MAP_DEFAULT_KEY = TYPE_MAPPED_REDUX_MAP_DEFAULT_KEY;

function getValuesFromTypeMappedReduxMap(typeMappedReduxMap, typeKey) {
  var fallbackToDefault = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (typeMappedReduxMap.get('isLoading')) {
    return null;
  }

  var typeMappedValue = typeMappedReduxMap.getIn(['data', typeKey], null);

  if (typeMappedValue !== null) {
    return typeMappedValue;
  }

  if (fallbackToDefault) {
    return typeMappedReduxMap.getIn(['data', TYPE_MAPPED_REDUX_MAP_DEFAULT_KEY]);
  }

  return null;
}
/**
 * Used to ensure that a map built by {@link makeTypeMappedReduxMapFromApiData} or
 * {@link makeImmutableOrderedMapFromValueArray} is loaded in redux-store
 *
 * Note that this should only be used in cases where the data is static (e.g. load once, use always), as it does
 * not pass any params to the api or check if any specific data is present. This simply triggers the given
 * action if the map is empty and not already loading.
 *
 * @param typeMap The redux-store-map you want to ensure is loaded (e.g. userNotificationTypesMap)
 * @param dispatchAction the redux-action to dispatch to load the typemap
 * @param dispatch The dispatcher to use to dispatch the dispatchAction, e.g. props.dispatch
 * @return {boolean} true if the given map is loaded, false if not.
 */


function ensureMapHasDataInReduxStore(typeMap, dispatchAction, dispatch) {
  if (!typeMap.get('data').size > 0) {
    if (!typeMap.get('isLoading', false)) {
      dispatch(dispatchAction());
    }

    return false;
  }

  return true;
}
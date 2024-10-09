"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYPE_MAPPED_REDUX_MAP_DEFAULT_KEY = void 0;
exports.ensureMapHasDataInReduxStore = ensureMapHasDataInReduxStore;
exports.getObjectFromReduxMapOrNullIfLoading = getObjectFromReduxMapOrNullIfLoading;
exports.getValuesFromTypeMappedReduxMap = getValuesFromTypeMappedReduxMap;
exports.makeApiDataMapDeleted = makeApiDataMapDeleted;
exports.makeApiDataMapError = makeApiDataMapError;
exports.makeApiDataMapIsLoading = makeApiDataMapIsLoading;
exports.makeApiDataMapNewData = makeApiDataMapNewData;
exports.makeImmutableOrderedMapFromValueArray = makeImmutableOrderedMapFromValueArray;
exports.makeTypeMappedReduxMapFromApiData = makeTypeMappedReduxMapFromApiData;
var _immutable = require("immutable");
var _LoggerSingleton = _interopRequireDefault(require("../log/LoggerSingleton"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
    var _iterator = _createForOfIteratorHelper(valueArray),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var valueObject = _step.value;
        // const {value, ...object} = valueObject
        // newValuesForNodeTypeMap.set(value, new ImmutableMap(object))
        var value = valueObject[valueKey];
        delete valueObject[valueKey];
        newValuesForNodeTypeMap.set(value, new _immutable.Map(valueObject));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
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
var TYPE_MAPPED_REDUX_MAP_DEFAULT_KEY = exports.TYPE_MAPPED_REDUX_MAP_DEFAULT_KEY = '__default__';

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
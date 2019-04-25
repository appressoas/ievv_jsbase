import { Map as ImmutableMap, OrderedMap as ImmutableOrderedMap, List as ImmutableList } from 'immutable'
import LoggerSingleton from 'ievv_jsbase/lib/log/LoggerSingleton'

const logger = new LoggerSingleton().getLogger('churchill_js.utilities.reduxApiUtilities')

/**
 * Util used by all `action.js`-files in `redux/api/*`.
 * This is used to mark an entry in a redux-map as loading.
 *
 * sets `isLoading` to `true` and `apiError` to null.
 *
 * @param oldApiDataMap Previous contents of `data` in the redux-map in question
 * @return {Immutable.Map<string, any>} The new Map to insert as entry in the redux-map being updated.
 */
export function makeApiDataMapIsLoading (oldApiDataMap = null) {
  return new ImmutableMap({
    isLoading: true,
    isDeleted: false,
    apiError: null,
    data: oldApiDataMap === null ? new ImmutableMap() : oldApiDataMap.get('data')
  })
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
export function makeApiDataMapNewData (newData, fromList = false, noWrap = false) {
  const getData = () => {
    if (noWrap) {
      return newData
    }
    if (fromList) {
      return new ImmutableList(newData)
    }
    return new ImmutableMap(newData)
  }

  return new ImmutableMap({
    isLoading: false,
    isDeleted: false,
    apiError: null,
    data: getData(),
    timestamp: new Date()
  })
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
export function makeApiDataMapError (error) {
  logger.warning('makeApiDataMapError: got error: ', error)
  return new ImmutableMap({
    isLoading: false,
    isDeleted: false,
    apiError: new ImmutableMap({
      status: error.response.status,
      bodydata: new ImmutableMap(error.response.bodydata)
    }),
    data: null,
    timestamp: new Date()
  })
}

/**
 * Used to mark an object in redux-state as deleted.
 * @param oldData
 * @return {Immutable.Map}
 */
export function makeApiDataMapDeleted (oldData = new ImmutableMap()) {
  return new ImmutableMap({
    isLoading: false,
    isDeleted: true,
    apiError: null,
    data: null,
    timestamp: new Date(),
    oldData
  })
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
export function getObjectFromReduxMapOrNullIfLoading (map, id, dispatchAction, dispatch) {
  if (id === null || id === undefined) {
    throw new Error(`Cannot do a map-lookup with invalid key: "${id}"`)
  }
  const element = map.get(id, null)
  if (element === null) {
    dispatch(dispatchAction(id))
    return null
  }
  if (element.get('isLoading', true)) {
    return null
  }
  return element
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
export function makeImmutableOrderedMapFromValueArray (valueArray, valueKey = 'value') {
  return new ImmutableOrderedMap()
    .withMutations((newValuesForNodeTypeMap) => {
      for (const valueObject of valueArray) {
        // const {value, ...object} = valueObject
        // newValuesForNodeTypeMap.set(value, new ImmutableMap(object))
        const value = valueObject[valueKey]
        delete valueObject[valueKey]
        newValuesForNodeTypeMap.set(value, new ImmutableMap(valueObject))
      }
    })
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
export function makeTypeMappedReduxMapFromApiData (apiResponseBodydata) {
  return new ImmutableMap().withMutations((data) => {
    for (const [typeKey, valuesForTypeKey] of Object.entries(apiResponseBodydata)) {
      data.set(typeKey, makeImmutableOrderedMapFromValueArray(valuesForTypeKey))
    }
  })
}

/**
 * The default key for maps built by {@link makeTypeMappedReduxMapFromApiData}.
 * This should be the same key used by the server-side apis, so do not change it unless you know what you are doing.
 *
 * @type {string}
 */
export const TYPE_MAPPED_REDUX_MAP_DEFAULT_KEY = '__default__'

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
export function getValuesFromTypeMappedReduxMap (typeMappedReduxMap, typeKey, fallbackToDefault = true) {
  if (typeMappedReduxMap.get('isLoading')) {
    return null
  }
  const typeMappedValue = typeMappedReduxMap.getIn(['data', typeKey], null)
  if (typeMappedValue !== null) {
    return typeMappedValue
  }
  if (fallbackToDefault) {
    return typeMappedReduxMap.getIn(['data', TYPE_MAPPED_REDUX_MAP_DEFAULT_KEY])
  }
  return null
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
export function ensureMapHasDataInReduxStore (typeMap, dispatchAction, dispatch) {
  if (!typeMap.get('data').size > 0) {
    if (!typeMap.get('isLoading', false)) {
      dispatch(dispatchAction())
    }
    return false
  }
  return true
}

import createTypes from './createTypes'
import { isNil, isEmpty, join, map, mapObjIndexed, zipObj, pipe, keys, replace, toUpper } from 'ramda'

// matches on capital letters (except at the start & end of the string)
const RX_CAPS = /(?!^)([A-Z])/g

// converts a camelCaseWord into a SCREAMING_SNAKE_CASE word
const camelToScreamingSnake = pipe(
  replace(RX_CAPS, '_$1'),
  toUpper
)

// build Action Types out of an object
const convertToTypes = (config, prefix) => {
  const temp = pipe(
    keys,                       // just the keys
    map(camelToScreamingSnake), // CONVERT_THEM
    join(' '),                  // space separated
  )(config)
  return createTypes(temp, prefix)                 // make them into Redux Types
}

// an action creator with additional properties
const createActionCreator = (name, extraPropNames, prefix) => {
  // types are upcase and snakey
  const type = prefix ? prefix + camelToScreamingSnake(name) : camelToScreamingSnake(name)

  // do we need extra props for this?
  const noKeys = isNil(extraPropNames) || isEmpty(extraPropNames)

  // a type-only action creator
  if (noKeys) return () => ({ type })

  // an action creator with type + properties
  return (...values) => {
    const extraProps = zipObj(extraPropNames, values)
    return { type, ...extraProps }
  }
}

// build Action Creators out of an objet
const convertToCreators = (config, prefix) => {
  return mapObjIndexed((num, key, value) => {
    if (typeof value[key] === 'function') {
      // the user brought their own action creator
      return value[key]
    } else {
      // lets make an action creator for them!
      return createActionCreator(key, value[key], prefix)
    }
  })(config, prefix)
}

export default (config, prefix) => {
  if (isNil(config)) {
    throw new Error('an object is required to setup types and creators')
  }
  if (isEmpty(config)) {
    throw new Error('empty objects are not supported')
  }


  return {
    Types: convertToTypes(config, prefix),
    Creators: convertToCreators(config, prefix)
  }
}

'use strict'

/**
 * Compare two objects for shallow equality.
 * @param {Function} [compFn] optional comparison function(a, b) => Boolean
 * @param {Object} a
 * @param {Object} b
 * @return {Boolean}
 * @api public
 */
function objEql(compFn, a, b) {
  var keys, len, i

  if (arguments.length < 3) {
    b = a
    a = compFn
    compFn = null
  }

  if (a === b) {
    return true
  }

  if (!(a instanceof Object && b instanceof Object)) {
    return false
  }

  keys = Object.keys(a)
  len = keys.length

  if (len !== Object.keys(b).length) {
    return false
  }

  for (i = 0; i < len; ++i) {
    if (compFn ? !compFn(a[keys[i]], b[keys[i]]) : a[keys[i]] !== b[keys[i]]) {
      return false
    }
  }

  return true
}

objEql.deep = objEql.bind(null, function (a, b) { return objEql.deep(a, b) })

module.exports = objEql


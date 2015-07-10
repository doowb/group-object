/*!
 * group-object <https://github.com/doowb/group-object>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var set = require('upsert-value');
var forIn = require('for-in');

module.exports = groupBy;

/**
 * Create groupings from an object's keys and values.
 *
 * ```js
 * function grouper (acc, value, key, obj, setter) {
 *   return value.group;
 * }
 *
 * function setter (acc, group, value, key, obj) {
 *   acc[group] = acc[group] || {};
 *   acc[group][key] = value;
 * }
 *
 * var obj = {
 *   a: { group: 'one', content: 'A'},
 *   b: { group: 'one', content: 'B'},
 *   c: { group: 'two', content: 'C'},
 *   d: { group: 'two', content: 'D'},
 *   e: { group: 'three', content: 'E'},
 *   f: { group: 'three', content: 'F'}
 * };
 *
 * var groups = groupBy(obj, grouper, setter);
 * //=> {
 * //=>   one: {
 * //=>     a: { group: 'one', content: 'A'},
 * //=>     b: { group: 'one', content: 'B'}
 * //=>   },
 * //=>   two: {
 * //=>     c: { group: 'two', content: 'C'},
 * //=>     d: { group: 'two', content: 'D'}
 * //=>   },
 * //=>   three: {
 * //=>     e: { group: 'three', content: 'E'},
 * //=>     f: { group: 'three', content: 'F'}
 * //=>   }
 * //=> }
 * ```
 *
 * @param  {Object} `obj` Object to group.
 * @param  {Function} `grouper` Optional grouping function that takes `acc, value, key, obj, setter`
 * @param  {Function} `setter` Optional setter function that takes `acc, group, value, key, obj`
 * @param  {Object} `acc` Optional accumulator object passed to the setter function.
 * @return {Object} Object containing groups as keys and list of objects as values in the group.
 * @api public
 */

function groupBy (obj, grouper, setter, acc) {
  if (grouper != null && typeof grouper === 'object') {
    return groupBy(obj, null, null, grouper);
  }
  if (setter != null && typeof setter === 'object') {
    return groupBy(obj, grouper, null, setter);
  }

  acc = acc || {};
  if (typeof grouper !== 'function') {
    grouper = function (acc, value) {
      return value;
    };
  }
  if (typeof setter !== 'function') {
    setter = function (acc, group, value, key, obj) {
      if (typeof group === 'undefined') return;
      set(acc, [group, key].join('.'), value);
    };
  }

  forIn(obj, function (value, key) {
    setter(acc, grouper(acc, value, key, obj, setter), value, key, obj);
  });
  return acc;
}

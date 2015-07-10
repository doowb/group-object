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
 * function grouper (value, key, obj, setter) {
 *   return value.group;
 * }
 *
 * function setter (group, value, key, acc) {
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
 * @doc    api-[method]
 * @param  {[type]}     obj     [description]
 * @param  {[type]}     grouper [description]
 * @param  {[type]}     setter  [description]
 * @return {[type]}             [description]
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
    grouper = function (value) {
      return value;
    };
  }
  if (typeof setter !== 'function') {
    setter = function (group, value, key, acc) {
      if (typeof value === 'undefined') return;
      set(acc, [group, key].join('.'), value);
    };
  }

  forIn(obj, function (value, key) {
    setter(grouper(value, key, obj, setter), value, key, acc);
  });
  return acc;
}

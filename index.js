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
 * var groups = {};
 * function grouper (value, key, obj, setter) {
 *   return value.group;
 * }
 *
 * function setter (group, value, key, obj) {
 *   groups[group] = groups[group] || {};
 *   groups[group][key] = value;
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
 * groups = groupBy(obj, grouper, setter);
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
function groupBy (obj, grouper, setter) {
  var res = {};
  if (typeof grouper !== 'function') {
    grouper = function (value) {
      return value;
    };
  }
  if (typeof setter !== 'function') {
    setter = function (group, value, key) {
      if (typeof value === 'undefined') return;
      set(res, [group, key].join('.'), value);
    };
  }

  forIn(obj, function (value, key) {
    setter(grouper(value, key, obj, setter));
  });
  return res;
}

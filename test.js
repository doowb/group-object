'use strict';

var assert = require('assert');
var groupBy = require('./');
var get = require('get-value');

describe('group-object', function () {
  it('should group an object with default values', function () {
    var obj = {
      a: 'one',
      b: 'one',
      c: 'two',
      d: 'two',
      e: 'three',
      f: 'three'
    };

    var groups = groupBy(obj);
    var expected = {
      one: {a: 'one', b: 'one'},
      two: {c: 'two', d: 'two'},
      three: {e: 'three', f: 'three'}
    };
    assert.deepEqual(groups, expected);
  });

  it('should group an object with specified grouper', function () {
    function grouper (acc, value, key, obj, setter) {
      return value.group;
    }

    var obj = {
      a: { group: 'one', content: 'A'},
      b: { group: 'one', content: 'B'},
      c: { group: 'two', content: 'C'},
      d: { group: 'two', content: 'D'},
      e: { group: 'three', content: 'E'},
      f: { group: 'three', content: 'F'}
    };

    var groups = groupBy(obj, grouper);
    var expected = {
      one: { a: { group: 'one', content: 'A' }, b: { group: 'one', content: 'B' } },
      two: { c: { group: 'two', content: 'C' }, d: { group: 'two', content: 'D' } },
      three: { e: { group: 'three', content: 'E' }, f: { group: 'three', content: 'F' } }
    };
    assert.deepEqual(groups, expected);
  });

  it('should group an object with specified setter', function () {

    function setter (acc, group, value, key, obj) {
      acc[group] = acc[group] || {};
      acc[group][key] = value;
    }

    var obj = {
      a: 'one',
      b: 'one',
      c: 'two',
      d: 'two',
      e: 'three',
      f: 'three'
    };

    var groups = groupBy(obj, null, setter);
    var expected = {
      one: {a: 'one', b: 'one'},
      two: {c: 'two', d: 'two'},
      three: {e: 'three', f: 'three'}
    };
    assert.deepEqual(groups, expected);
  });

  it('should group an object with specified grouper and setter', function () {
    function grouper (acc, value, key, obj, setter) {
      return value.group;
    }

    function setter (acc, group, value, key, obj) {
      acc[group] = acc[group] || {};
      acc[group][key] = value;
    }

    var obj = {
      a: { group: 'one', content: 'A'},
      b: { group: 'one', content: 'B'},
      c: { group: 'two', content: 'C'},
      d: { group: 'two', content: 'D'},
      e: { group: 'three', content: 'E'},
      f: { group: 'three', content: 'F'}
    };

    var groups = groupBy(obj, grouper, setter);
    var expected = {
      one: { a: { group: 'one', content: 'A' }, b: { group: 'one', content: 'B' } },
      two: { c: { group: 'two', content: 'C' }, d: { group: 'two', content: 'D' } },
      three: { e: { group: 'three', content: 'E' }, f: { group: 'three', content: 'F' } }
    };
    assert.deepEqual(groups, expected);
  });

  it('should group an object with specified accumulator', function () {
    var obj = {
      a: 'one',
      b: 'one',
      c: 'two',
      d: 'two',
      e: 'three',
      f: 'three'
    };

    var acc = {
      foo: {bar: 'baz'}
    };

    var groups = groupBy(obj, acc);
    var expected = {
      foo: {bar: 'baz'},
      one: {a: 'one', b: 'one'},
      two: {c: 'two', d: 'two'},
      three: {e: 'three', f: 'three'}
    };
    assert.deepEqual(groups, expected);
  });

  it('should group an object with grouper calling setter', function () {
    function grouper (acc, value, key, obj, setter) {
      switch (value.group) {
        case 'one': setter(acc, 1, value, key, obj); break;
        case 'two': setter(acc, 2, value, key, obj); break;
        case 'three': setter(acc, 3, value, key, obj); break;
      }
      return value.group;
    }

    function setter (acc, group, value, key, obj) {
      acc[group] = acc[group] || {};
      acc[group][key] = value;
    }

    var obj = {
      a: { group: 'one', content: 'A'},
      b: { group: 'one', content: 'B'},
      c: { group: 'two', content: 'C'},
      d: { group: 'two', content: 'D'},
      e: { group: 'three', content: 'E'},
      f: { group: 'three', content: 'F'}
    };

    var groups = groupBy(obj, grouper, setter);
    var expected = {
      one: { a: { group: 'one', content: 'A' }, b: { group: 'one', content: 'B' } },
      '1': { a: { group: 'one', content: 'A' }, b: { group: 'one', content: 'B' } },
      two: { c: { group: 'two', content: 'C' }, d: { group: 'two', content: 'D' } },
      '2': { c: { group: 'two', content: 'C' }, d: { group: 'two', content: 'D' } },
      three: { e: { group: 'three', content: 'E' }, f: { group: 'three', content: 'F' } },
      '3': { e: { group: 'three', content: 'E' }, f: { group: 'three', content: 'F' } }
    };
    assert.deepEqual(groups, expected);
  });
});

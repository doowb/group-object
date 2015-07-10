# group-object [![NPM version](https://badge.fury.io/js/group-object.svg)](http://badge.fury.io/js/group-object)  [![Build Status](https://travis-ci.org/doowb/group-object.svg)](https://travis-ci.org/doowb/group-object)

> Group object keys and values into lists.

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i group-object --save
```

## Usage

```js
var groupBy = require('group-object');
```

## API

<!-- add a path or glob pattern for files with code comments to use for docs  -->

### [groupBy](index.js#L62)

Create groupings from an object's keys and values.

**Params**

* `obj` **{Object}**: Object to group.
* `grouper` **{Function}**: Optional grouping function that takes `acc, value, key, obj, setter`
* `setter` **{Function}**: Optional setter function that takes `acc, group, value, key, obj`
* `acc` **{Object}**: Optional accumulator object passed to the setter function.
* `returns` **{Object}**: Object containing groups as keys and list of objects as values in the group.

**Example**

```js
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
//=> {
//=>   one: {
//=>     a: { group: 'one', content: 'A'},
//=>     b: { group: 'one', content: 'B'}
//=>   },
//=>   two: {
//=>     c: { group: 'two', content: 'C'},
//=>     d: { group: 'two', content: 'D'}
//=>   },
//=>   three: {
//=>     e: { group: 'three', content: 'E'},
//=>     f: { group: 'three', content: 'F'}
//=>   }
//=> }
```

## Related projects

<!-- add an array of related projects, then un-escape the helper -->

* [for-in](https://github.com/jonschlinkert/for-in): Iterate over the own and inherited enumerable properties of an objecte, and return an object… [more](https://github.com/jonschlinkert/for-in)
* [get-value](https://github.com/jonschlinkert/get-value): Use property paths (`  a.b.c`) to get a nested value from an object.
* [sort-object](https://github.com/doowb/sort-object): Sort the keys in an object.
* [set-value](https://github.com/jonschlinkert/set-value): Create nested values and any intermediaries using dot notation (`'a.b.c'`) paths.
* [upsert-value](https://github.com/doowb/upsert-value): Update or set nested values and any intermediaries with dot notation (`'a.b.c'`) paths.

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/doowb/group-object/issues/new)

## Author

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/doowb)

## License

Copyright © 2015 Brian Woodward
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on July 10, 2015._
# newspeak
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

This package is inspired by [Mozilla's L20n](http://l20n.org/) project. In
Mozilla's words:

> L20n allows localizers to put small bits of logic into localization resources
> to codify the grammar of the language.

This includes different forms for plurals, gender and conjugation. Supporting
languages such as Polish should become much easier.

Newspeak is diferrent in that the syntax is just JavaScript. A basic
understanding of JS should be sufficient to get started. Not only has this the
advantage of being easy, it's also very fast.

## Installation
```bash
$ npm i --save newspeak
```

## Overview
```js
// Initialize newspeak.
var newspeak = require('newspeak');
var l20n = newspeak({gender: 'male', name: 'Tobi'});
l20n.language('en_US');

// Add a language decision tree.
var data = {
  users: function(obj) {
    if (0 === obj.count) return 'nobody';
    if (1 === obj.count) return 'someone';
    return '{{count}} people';
  }
}
l20n.add('en_US', data);

// Request a string based on parameters.
l20n.get('users', {count: 3});
// => '3 people'
```

## API
#### newspeak()
 Initializes an instance of `newspeak`. Takes an optional `{Object} opts` as
 an argument.
```js
var newspeak = require('newspeak');
var l20n = newspeak({age: 13, foo: 'bar'});
```

#### .language()
Set a `{String} language` to access corresponding language strings. Emits a
`change` event whenever the language changes, but not the first time it's set.
```js
l20n.on('update', function(lang) {console.log(lang)});

l20n.language('en_US');
l20n.language('da_DK');
//=> 'sp'
```

#### .configure()
Store an `{Object} opts` to define configuration variables.
```js
l20n.config({gender: 'male', name: 'Tobi'});
```

#### .add()
Register an `{Object} data` with language strings. Takes a `{String} language`
and `{Object} data` as arguments. `{Object} data` can contain both functions and
strings.
```js
var data = {
  favorite_food: function(args) {
    if (args.mood == 'hungry') return "I'm {{mood}} and want pizza."
    if (args.mood == 'happy') return "I'm {{mood}} and want a salad."
  },
  favorite_color: 'green',
  user_gender: '{{gender}}'
}
l20n.add('en_US', data);
```

#### .remove()
Remove an `{Object} data` from the store. Takes an `{String} language` and
`{Object} data` as arguments. `.remove()` will traverse data keys 1 level deep.

```js
l20n.remove('en_US', data);
```

#### .get()
Get a parsed `{String}` from the store. Takes a `{String} query` and
`{Object} opts` as arguments.
```js
l20n.get('favorite_food', {mood: happy});
// => "I'm happy and want a salad."

l20n.get('favorite_color');
// => 'green'

l20n.get('user_gender');
// => 'male'
```
## License
[MIT](https://tldrlegal.com/license/mit-license) ©
[Yoshua Wuyts](http://yoshuawuyts.com)

[npm-image]: https://img.shields.io/npm/v/newspeak.svg?style=flat-square
[npm-url]: https://npmjs.org/package/newspeak
[travis-image]: https://img.shields.io/travis/yoshuawuyts/newspeak.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/newspeak
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/newspeak.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/newspeak?branch=master

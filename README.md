# newspeak
[![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] 
[![Test coverage][coveralls-image]][coveralls-url]

This package is inspired by [Mozilla's L20n](http://l20n.org/) project. The L20n
project aims to provide natural language support for _all_ languages. This 
includes different forms for plurals, gender and conjugation. So that means you 
can now properly support Slavic languages.

This package is different from the Mozilla project in that the syntax is just
JavaScript. A basic understanding of JS should be sufficient to get started. Not
only has this the advantage of being easy, it's also very fast.

## Installation
```bash
$ npm i --save newspeak
```

## Overview
```js
/**
 * Initialize.
 */

var newspeak = require('newspeak');
var l20n = newspeak();
l20n.language('en');
l20n.configure({gender: 'male', name: 'Tobi'});

/**
 * Create a language object.
 */

var data = {
  users: function(obj) {
    if (0 === obj.count) return 'nobody';
    if (1 === obj.count) return 'someone';
    return '{{count}} people';
  }
}

/**
 * Add language objects.
 */

l20n.add('en', data);

/**
 * Get a string from the store.
 */

l20n.get('users', {count: 3});
// => '3 people'
```

## API
#### newspeak()
Initializes an instance of `newspeak`. Takes `{Object} opts` as an argument.
```js
var newspeak = require('newspeak');
var l20n = newspeak({language: 'en'});
```

#### .language()
Set a `{String} language` to access corresponding language strings. Emits an 
event whenever the language is changed, but not the first time it's set.
```js
l20n.on('update', function(lang) {console.log(lang)});

l20n.language('en');
l20n.language('sp');
//=> 'sp'
```

#### .configure()
Store an `{Object} opts` to define configuration variables.
```js
l20n.config({gender: 'male', name: 'Tobi'});
```

#### .add()
Register an `{Object} data` with language strings. Takes a 
`{String} language` and `{Object} data` as arguments. `{Object} data` can 
contain both functions and strings.
```js
var data = {
  favorite_food: function(args) {
    if (args.mood == 'hungry') return "I'm {{mood}} and want pizza."
    if (args.mood == 'happy') return "I'm {{mood}} and want a salad."
  },
  favorite_color: 'green',
  user_gender: '{{gender}}'
}
l20n.add('en', data);
```

#### .remove()
Remove an `{Object} data` from the store. Takes an `{String} language` and
`{Object} data` as arguments. `.remove()` will traverse data keys 1 level deep.
```js
var data = {
  favorite_food: function(args) {
    if (args.mood == 'hungry') return "I'm {{mood}}, and want pizza."
    if (args.mood == 'happy') return "I'm {{mood}}, and want a salad."
  },
  favorite_color: 'green',
  user_gender: '{{gender}}'
}
l20n.remove('en', data);
```

#### .get()
Get a parsed `{String}` from the store. Takes a `{String} query` and 
`{Object} opts` as arguments.
```js
var favoriteFood = l20n.get('favorite_food', {mood: happy});
// => "I'm happy and want a salad."

var favoriteColor = l20n.get('favorite_color');
// => 'green'

var userGender = l20n.get('user_gender');
// => 'male'
```
## License
[MIT](https://tldrlegal.com/license/mit-license) © [Yoshua Wuyts](http://yoshuawuyts.com)

[npm-image]: https://img.shields.io/npm/v/newspeak.svg?style=flat
[npm-url]: https://npmjs.org/package/newspeak
[travis-image]: https://img.shields.io/travis/yoshuawuyts/newspeak.svg?style=flat
[travis-url]: https://travis-ci.org/yoshuawuyts/newspeak
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/newspeak.svg?style=flat
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/newspeak?branch=master
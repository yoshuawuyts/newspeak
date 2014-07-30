# newspeak
[![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] 
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
```js
// Initializes an instance of `newspeak`. Takes {Object} opts as an argument.

var newspeak = require('newspeak');
var l20n = newspeak({language: 'en'});
```

#### .language()
```js
// Set a `{String} language` to access corresponding language strings. Emits a 
// 'change' event whenever the language changes, but not the first time it's set.

l20n.on('update', function(lang) {console.log(lang)});

l20n.language('en');
l20n.language('sp');
//=> 'sp'
```

#### .configure()
```js
// Store an {Object} opts to define configuration variables.

l20n.config({gender: 'male', name: 'Tobi'});
```

#### .add()
```js
// Register an {Object} data with language strings. Takes a {String} language 
// and {Object} data as arguments. {Object} data can contain both functions and 
// strings.

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

```js
// Remove an {Object} data from the store. Takes an {String} language and
// {Object} data as arguments. .remove() will traverse data keys 1 level deep.

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
```js
// Get a parsed {String} from the store. Takes a {String} query and 
// {Object} opts as arguments.

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
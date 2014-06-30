/**
 * Module dependencies.
 */

var mustache = require('mustache');
var assert = require('assert');

/**
 * Exports.
 */

module.exports = NewSpeak;

/**
 * Expose prototype.
 */

var l20n = NewSpeak.prototype;

/**
 * NewSpeak().
 *
 * @param {Object} opts
 * @api public
 */

function NewSpeak(opts) {
  if (!(this instanceof NewSpeak)) return new NewSpeak(opts);
  this.store = {};
  this.config = opts || {};
}

/**
 * Update you configuration store.
 *
 * @param {Object} data
 * @api public
 */

l20n.configure = function(data) {
  assert('object' == typeof data, 'Data should be an object');
  this.config = recursiveMerge(this.config, data);
}

/**
 * Register language data.
 *
 * @param {String} lang
 * @param {Object} data
 * @api public
 */

l20n.register = function(lang, data) {
  assert('string' == typeof lang, 'Lang should be a string');
  assert('object' == typeof data, 'Data should be an object');

  this.store[lang] = this.store[lang] || {};
  for (var value in data) {
    assert('string' == typeof value || 'function' == typeof value, 'Value should be a function or string');
    this.store[lang][value] = data[value];
  }
}

/**
 * Remove language data.
 *
 * @param {String} lang
 * @param {Object} data
 * @api public
 */

l20n.unregister = function(lang, data) {
  assert('string' == typeof lang, 'Lang should be a string');
  assert('object' == typeof data, 'Data should be an object');
  assert(this.store[lang], 'Language is not registered');

  for (var value in data[lang]) {
    delete this.store[lang][value];
  }
}

/**
 * Return a parsed language string.
 *
 * @param {String} query
 * @param {Object} args
 * @return {String}
 * @api public
 */

l20n.get = function(query, args) {
  assert('string' == typeof query, 'Query should be a string');
  assert('object' == typeof args || 'undefined' == typeof args, 'Args should be an object');
  assert(this.config.language, 'No language specified');
  assert(this.store[this.config.language], 'Store does not contain strings for language: ' + this.config.language);
  assert(this.store[this.config.language][query], 'Store does not contain strings for query: ' + query);

  var res = this.store[this.config.language][query];
  var joinedArgs = recursiveMerge(this.config, args);
  if ('function' == typeof res) return mustache.render(res(joinedArgs), joinedArgs);
  return mustache.render(res, joinedArgs);
}

/**
 * Merge two objects recursively into a new object. 
 *
 * @param {Object} obj1
 * @param {Object} obj2
 * @param {Number} index
 * @return {Object}
 * @api private
 */

function recursiveMerge(obj1, obj2, index) {
  index == index || 0;
  if (0 === index) obj1 = Object.create(obj1);
  for (var i in obj2) {
    if ('object' == typeof obj1[i]) obj1[i] = recursiveMerge(obj1[i], obj2[i], index++);
    else obj1[i] = obj2[i];
  }
  return obj1;
}
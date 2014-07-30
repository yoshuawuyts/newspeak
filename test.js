/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var newspeak = require('./index');
var l20n = newspeak();

/**
 * BeforeEach.
 */

beforeEach(function() {
  l20n = newspeak();
});

/**
 * Test.
 */

describe('newspeak()', function () {
  it('should initialize with empty objects', function() {
    l20n.store.should.be.empty;
    l20n.config.should.be.empty;
  });
});

describe('.configure()', function () {
  it('should catch errors', function() {
    l20n.configure.bind(l20n, 123)
      .should.throw('Data should be an object');
  });
  it('should save a configuration object', function() {
    l20n.configure({gender: 'male'});

    l20n.config.should.eql({gender: 'male'});

    l20n.configure({lang: 'sp'});

    l20n.config.should.eql({gender: 'male', lang: 'sp'});
  });
});

describe('.language()', function() {
  it('should catch errors', function() {
    l20n.configure
  });
});

describe('.register()', function() {
  it('should catch errors', function() {

    l20n.register.bind(l20n, 123).should.throw('Lang should be a string');
    l20n.register.bind(l20n, 'nl', 123).should.throw('Data should be an object');
  });
  it('should register language objects', function() {
    var blob = {sentence: 'hello'};
    var blob2 = {reason: 'food'};

    l20n.register('nl', blob);
    l20n.store.should.eql({nl: blob});

    l20n.register('nl', blob2);
    l20n.store.should.eql({
      nl: {
        sentence: 'hello',
        reason: 'food'
      }
    })
  });
});

describe('.unregister()', function() {
  it('should catch errors', function() {
    l20n.unregister.bind(l20n, 123)
      .should.throw('Lang should be a string');
    l20n.unregister.bind(l20n, 'en', 123)
      .should.throw('Data should be an object');
    l20n.unregister.bind(l20n, 'en', {})
      .should.throw('Language is not registered');
  });
  it('should unregister language data', function() {
    var blob = {en: {foo: 'bar', faz: 'baz', user: 'Jane'}};
    var remove = {en: {foo: 'bar', faz: 'baz'}};
    l20n.store = blob;
    l20n.unregister('en', remove);
    l20n.store.should.eql({en: {user: 'Jane'}});
  });
});

describe('.get()', function() {
  it('should catch errors', function() {
    l20n.get.bind(l20n, 123)
      .should.throw('Query should be a string');
    l20n.get.bind(l20n, 'en', 123)
      .should.throw('Args should be an object');
    l20n.get.bind(l20n, 'string_resource')
      .should.throw('No language specified');

    l20n.config = {language: 'en'};

    l20n.get.bind(l20n, 'string_resource')
      .should.throw('Store does not contain strings for language: en');

    l20n.store.en = {};

    l20n.get.bind(l20n, 'string_resource')
      .should.throw('Store does not contain strings for query: string_resource');
  });
  it('should handle string resources', function() {
    l20n.config = {language: 'en'};
    l20n.store.en = {foo: 'bar'};

    l20n.get('foo').should.eql('bar');
  });
  it('should handle function resources', function() {
    l20n.config = {language: 'en'};
    l20n.store.en = {
      foo: function(args) {
        if ('hi' == args.foo) return 'no, no';
        if ('hello' == args.foo) return 'greeting is {{foo}}';
      }
    };
    l20n.get('foo', {foo: 'hello'}).should.eql('greeting is hello');
  });
});
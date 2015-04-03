var assert = require('assert-diff')
var fs = require('fs');
var scraper = require('../lib/yawscraper');
var nock = require('nock');

describe('Scraper', function(){
  it('should create scrapped objects with info based on a search pattern', function(done) {
    nock('')
      .get('')
      .reply(200, html);
    var testPattern = {
    };
    var testOptions = {
      pattern: testPattern,
      html: '',
    }
    scraper.scrape(testOptions, function(response) {
      assert.deepEqual({}, response);
      done();
    });
  });

  it('should throw error when callback is not a function', function() {
    var testFunction = function(){scraper.scrape({}, callback='console')};
    var testFunction = function(){
      scraper.scrape(testOptions);
      done();
    };
    assert.throws(testFunction, Error, 'Callback is not a function!');
  });

  it('should remove whitespaces', function(done) {
    nock('')
      .get('')
      .reply(200, html);
    var testPattern = {
    };
    var testOptions = {
      pattern: testPattern,
      html: ''
    }
    scraper.scrape(testOptions, function(response) {
      assert.deepEqual({}, response.pop());
      done();
    });
  });

  it('should throw error if pattern is not valid regexp', function(done) {
    nock('')
      .get('')
      .reply(200, html);
    var testPattern = {
      testNotValidRegex: 'NOT VALID'
    };
    var testOptions = {
      pattern: testPattern
    }
    var testFunction = function(){
      scraper.scrape(testOptions);
      done();
    };
    assert.throws(testFunction, Error, 'Pattern contains invalid regexp!');
  });

  it('should scrape from html string without making http requests', function(done) {
    var mockHttp = nock('')
      .get('')
      .reply(200, html);
    var testPattern = {
      situacion: /.*agada/i
    };
    var testOptions = {
      pattern: testPattern,
      url: '',
      html: html
    }
    scraper.scrape(testOptions, function(response) {
      assert.equal(false, mockHttp.isDone());
      done();
    });
  });
});

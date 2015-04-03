var assert = require('assert-diff')
var fs = require('fs');
var scraper = require('../lib/yawscraper');
var nock = require('nock');

describe('yawscraper', function(){
  it('should scrape for regex in pattern', function(done) {
  });
  it('should scrape for element navigation in pattern', function(done) {
  });
  it('should scrape for images <img src>=""', function(done) {
  });
  it('should scrape for links <a>', function(done) {
  });
  it('should recursively scrape for subelements defined in pattern', function(done) {
  });
  it('should navigate inside containers', function(done) {
  });
  it('should default container to body', function(done) {
  });
  it('should throw error if container or path not found', function(done) {
  });
  it('should remove whitespaces', function(done) {
  });
  it('should assign User Agent in headers', function(done) {
  });
  it('should assign Referer in headers', function(done) {
  });
  it('should assign Cookie in headers', function(done) {
  });
  it('should scrape single element, not all occurencies', function(done) {
  });
  it('should throw error when callback is not a function', function() {
    var testFunction = function(){scraper.scrape({}, callback='console')};
    var testFunction = function(){
      scraper.scrape(testOptions);
      done();
    };
    assert.throws(testFunction, Error, 'Callback is not a function!');
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

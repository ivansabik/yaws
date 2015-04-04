var assert = require('assert-diff')
var fs = require('fs');
var yawscraper = require('../lib/yawscraper');
var nock = require('nock');
var fixtures = require('./fixtures/general');

describe('yawscraper', function(){
  it('should scrape a text for regex in pattern', function(done) {
    // Find items in USPS tracking
    var pattern = {
      date: /November 17, 2014 , 1:56 pm/,
      location: /ANKENY, IA 50021/
    };
    var options = {
      pattern: pattern,
      html: uspsTracking,
      container: 'tr'
    }
    yawscraper(options, function(response) {
      assert.deepEqual(fixtures.assertScrapeRegex, response);
      done();
    })
    .scrape();
  });
  it('should scrape an attribute value for regex in pattern', function(done) {
    // Find article in German from the sidebar menu in Wikipedia
    var pattern = {
      link: {
        regex: /Deutsch/,
        attribute: 'a.href'
      }
    };
    var options = {
      pattern: pattern,
      html: wikipediaArticleMenu,
      container: 'p-lang ul',
      allOcurrencies: false
    }
    var assert = {link: '//de.wikipedia.org/wiki/Germanwings'};
    yawscraper(options, function(response) {
      assert.deepEqual(assert, response);
      done();
    })
    .scrape();
  });
  it('should match all elements in pattern, to produce scraped object', function(done) {
  });
  it('should scrape for a list of texts', function(done) {
  });
  it('should scrape for element navigation in pattern', function(done) {
  });
  it('should scrape for images <img src="">', function(done) {
  });
  it('should scrape for links <a href="">', function(done) {
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
  it('should find container elements to be the scraping targets', function(done) {
  });
  it('should scrape a table', function(done) {
  });
  it('should scrape options and values for a <select> element', function(done) {
  });
  it('should warn to console if no container has been selected for scraping', function(done) {
  });
  it('should throw error when container for scraping not found', function(done) {
  });
  it('should scrape from URL', function(done) {
  });
  it('should use request parameters for POST and GET', function(done) {
  });
  it('should use POST for request', function(done) {
  });
  it('should paginate among pages defined by user', function(done) {
  });
  it('should scrape from html string without making http requests', function(done) {
    var mockHttp = nock('')
      .get('')
      .reply(200, html);
    yawscraper(options, function(response) {
      assert.equal(false, mockHttp.isDone());
      done();
    })
    .scrape();
  });
});

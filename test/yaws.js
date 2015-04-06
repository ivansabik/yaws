var assert = require('assert-diff');
var fs = require('fs');
var yaws = require('../lib/yaws');
var nock = require('nock');
var fixtures = require('./fixtures/general');
describe('yaws scrape', function () {
  it('should scrape a text for regex in pattern', function (done) {
// USPS tracking
    var pattern = {
      date: /.* [0-9]{2}, [0-9]{4} , [0-9]{1,2}:[0-9]{1,2} (am|pm)/,
      location: /[A-Z]*, [A-Z]{2} [0-9]{5}/
    };
    var options = {
      pattern: pattern,
      html: fixtures.uspsHtml,
      container: 'tr'
    };
    yaws(options, function (response) {
      assert.deepEqual(fixtures.assertScrapeRegex, response);
      done();
    })
    .scrape();
  });
    it('should scrape a text for regex in pattern forcing to match all pattern elements', function (done) {
// USPS tracking
    var pattern = {
      date: /.* [0-9]{2}, [0-9]{4} , [0-9]{1,2}:[0-9]{1,2} (am|pm)/,
      location: /[A-Z]*, [A-Z]{2} [0-9]{5}/
    };
    var options = {
      pattern: pattern,
      html: fixtures.uspsHtml,
      container: 'tr',
      forceMatch: true
    };
    yaws(options, function (response) {
      assert.deepEqual(fixtures.assertforceMatch, response);
      done();
    })
    .scrape();
  });
  // See what else can achieve same without usint object, like /regex/ --> a.href
  it('should scrape an attribute value for regex in pattern', function (done) {
// Wikipedia
    var pattern = {
      link: {
        regex: /Deutsch/,
        attribute: 'a.href'
      }
    };
    var options = {
      pattern: pattern,
      html: fixtures.wikipediaHtml,
      container: 'p-lang ul',
      allOcurrencies: false
    };
    var assert = {link: '//de.wikipedia.org/wiki/Germanwings'};
    yaws(options, function (response) {
      assert.deepEqual(assert, response);
      done();
    })
    .scrape();
  });
  it('should scrape for more than one option (regexp, dom, etc.)', function (done) {
// USPS tracking
    var pattern = {
      status: [ /Delivered, In\/At Mailbox/, /Departed USPS Facility/, /Arrived at USPS Origin Facility/ ]
    };
    var options = {
      pattern: pattern,
      html: fixtures.uspsHtml,
      container: 'tr'
    };
    yaws(options, function (response) {
      assert.deepEqual(fixtures.assertOptionsList, response);
      done();
    })
    .scrape();
  });
  it('should scrape for element navigation in pattern', function (done) {
// Craigslist
    var pattern = {
      date: 'time.datetime',
      title: 'a',
      price: '.price',
      housingType: '.housing',
      address: '.pnr',
      link: 'a.href'
    };
    var options = {
      pattern: pattern,
      html: fixtures.craigslistHtml,
      container: '.row'
    };
    yaws(options, function (response) {
      assert.deepEqual(assert, response);
      done();
    })
    .scrape();
  });
  it('should recursively scrape for pattern objects defined inside pattern object', function (done) {
    
  });
  it('should throw error if container or path not found', function (done) {
// Craigslist
    var options = {
      pattern: {},
      html: fixtures.craigslistHtml,
      container: '.my-super-non-existent-container'
    };
    var callScrape = function () {
      yaws(options).scrape();
    };
    assert.throws(callScrape, Error, 'Container ".my-super-non-existent-container" was not found in HTML.');
  });
  it('should remove whitespaces in scraped object\'s texts', function (done) {
    var pattern = {
      textWithoutWhitespace: 'p'
    };
    var options = {
      pattern: pattern,
      html: '<div><p>    Hooray no blank here! </p></div><div><p>  Neither here!        </p></div>'
    };
    var assert = [
      { textWithoutWhitespace: 'Hooray no blank here!' },
      { textWithoutWhitespace: 'Neither here!' }
    ];
    yaws(options, function (response) {
      assert.deepEqual(textWithoutWhitespace, response);
      done();
    })
    .scrape();
  });
  it('should scrape single element, not all occurencies', function (done) {
  });
  it('should assign User Agent in headers', function (done) {
  });
  it('should assign Referer in headers', function (done) {
  });
  it('should assign Cookie in headers', function (done) {
  });
  it('should find container elements to be the scraping targets', function (done) {
  });
  it('should scrape a <table> element', function (done) {
  });
  it('should scrape options and values for a <select> element', function (done) {
  });
  it('should warn to console if no container has been selected for scraping', function (done) {
  });
  it('should throw error when container for scraping not found', function (done) {
  });
  it('should scrape from URL', function (done) {
  });
  it('should use request parameters for POST and GET', function (done) {
  });
  it('should use POST for request', function (done) {
  });
  it('should paginate among pages defined by user', function (done) {
  });
  it('should scrape from html string without making http requests', function (done) {
    var mockHttp = nock('')
    .get('')
    .reply(200, html);
    yaws(options, function (response) {
      assert.equal(false, mockHttp.isDone());
      done();
    })
    .scrape();
  });
});

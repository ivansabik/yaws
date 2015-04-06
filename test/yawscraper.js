var assert = require('assert-diff');
var fs = require('fs');
var yawscraper = require('../lib/yawscraper');
var nock = require('nock');
var fixtures = require('./fixtures/general');
describe('yawscraper scrape', function () {
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
    yawscraper(options, function (response) {
      assert.deepEqual(fixtures.assertScrapeRegex, response);
      done();
    })
    .scrape();
  });
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
    yawscraper(options, function (response) {
      assert.deepEqual(assert, response);
      done();
    })
    .scrape();
  });
  it('should scrape for more than one option (regexp, dom, etc.)', function (done) {
// USPS tracking
    var pattern = {
      status: [
        /Delivered, In\/At Mailbox/,
        /Departed USPS Facility/,
        /Arrived at USPS Origin Facility/
      ]
    };
    var options = {
      pattern: pattern,
      html: fixtures.uspsHtml,
      container: 'tr'
    };
    yawscraper(options, function (response) {
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
    yawscraper(options, function (response) {
      assert.deepEqual(assert, response);
      done();
    })
    .scrape();
  });
  it('should recursively scrape for subelements defined in pattern', function (done) {
// Don't remember what this was X_x
  });
  it('should throw error if container or path not found', function (done) {
// Craigslist
    var options = {
      pattern: {},
      html: fixtures.craigslistHtml,
      container: '.my-super-non-existant-container'
    };
    var callScrape = function () {
      yawscraper(options).scrape();
    };
    assert.throws(callScrape, Error, 'Container ".my-super-non-existant-container" was not found in HTML.');
  });
  it('should remove whitespaces in scraped object\'s texts', function (done) {
    var pattern = {
      textWithoutWhitespace: 'p'
    };
    var options = {
      pattern: pattern,
      html: '<div><p>    Hooray no blank here! </p></div><div><p>  Neither here!        </p></div>',
      allOcurrencies: false
    };
    var assert = [
      {textWithoutWhitespace: 'Hooray no blank here!'},
      {textWithoutWhitespace: 'Neither here!'}
    ];
    yawscraper(options, function (response) {
      assert.deepEqual(textWithoutWhitespace, response);
      done();
    })
    .scrape();
  });
  it('should assign User Agent in headers', function (done) {
  });
  it('should assign Referer in headers', function (done) {
  });
  it('should assign Cookie in headers', function (done) {
  });
  it('should scrape single element, not all occurencies', function (done) {
  });
  it('should find container elements to be the scraping targets', function (done) {
  });
  it('should scrape a table', function (done) {
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
    yawscraper(options, function (response) {
      assert.equal(false, mockHttp.isDone());
      done();
    })
    .scrape();
  });
});

var assert = require('assert-diff');
var fs = require('fs');
var yaws = require('../lib/yaws');
var nock = require('nock');
var fixtures = require('./fixtures/general');

// find objects in HTML not tested, is embedded in other tests
describe('yaws scrape', function () {
  this.timeout(10000);
  it('should find a text for regex in pattern', function (done) {
// USPS tracking
    var pattern = {
      date: /.*[0-9]{2}.*.[0-9]{4}.*.[0-9]{1,2}:[0-9]{1,2}.*m/,
      location: /[A-Z]{2}.*[0-9]{5}/
    };
    var options = {
      pattern: pattern,
      html: fixtures.uspsHtml,
      container: 'tr.detail-wrapper'
    };
    yaws(options)
    .scrape(function (response) {
      assert.deepEqual(fixtures.assertScrapeRegex, response);
      done();
    });
  });
  it('should find a text for regex in pattern forcing to match all pattern elements', function (done) {
// USPS tracking
    var pattern = {
      date: /.* [0-9]{2}, [0-9]{4} , [0-9]{1,2}:[0-9]{1,2} (am|pm)/,
      location: /[A-Z]*, [A-Z]{2} [0-9]{5}/
    };
    var options = {
      pattern: pattern,
      html: fixtures.uspsHtml,
      container: 'td',
      forceMatch: true
    };
    yaws(options, function (response) {
      assert.deepEqual(fixtures.assertforceMatch, response);
      done();
    })
    .scrape();
  });
  // See what else can achieve same without usint object, like /regex/ --> a.href
  it('should find an attribute value for regex in pattern', function (done) {
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
  it('should find a list of options (regexp, dom, etc.)', function (done) {
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
  it('should find element based on dom navigation', function (done) {
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
  it('should recursively find nested objects', function (done) {
  });
  it('should throw error if container or dom navigation path not found', function (done) {
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
  it('should remove whitespaces in object\'s texts', function (done) {
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
  it('should change html spaces to blank spaces &nbsp;', function (done) {
    var pattern = {
      textWithoutWhitespace: 'p'
    };
    var options = {
      pattern: pattern,
      html: '<div><p>&nbsp;&nbsp;Hooray&nbsp;no&nbsp;blank&nbsp;here!&nbsp;</p></div><div><p>&nbsp;Neither&nbsp;here!&nbsp;&nbsp;</p></div>'
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
  it('should find a single element, not all occurencies', function (done) {
  });
  it('should emulate desktop Agent', function (done) {
  });
  it('should emulate mobile User Agent', function (done) {
  });
  it('should send Referer in headers', function (done) {
  });
  it('should send Cookie in headers', function (done) {
  });
  it('should find container elements to be the scraping targets', function (done) {
  });
  it('should find a <table> element', function (done) {
    // html is fixtures.excelFunctionsHtml
    yaws(options, function (response) {
      assert.deepEqual(fixtures.assertTable, response);
      done();
    })
    .scrape();
  });
  it('should find options and values for a <select> element', function (done) {
  });
  it('should warn to console if no container defined', function (done) {
  });
  it('should warn to console if no pattern defined', function (done) {
  });
  it('should throw error when container not found', function (done) {
  });
  it('should find objects from URL', function (done) {
  });
  it('should accept and use request parameters for POST and GET', function (done) {
  });
  it('should scrape from e-mail with IMAP', function (done) {
  });
  it('should use POST for request', function (done) {
  });
  it('should paginate among pages', function (done) {
  });
  it('should find objects from HTML text without making http requests', function (done) {
    var mockHttp = nock('')
    .get('')
    .reply(200, html);
    yaws(options, function (response) {
      assert.equal(false, mockHttp.isDone());
      done();
    })
    .scrape();
  });
  it('should find a text for regex in pattern, returning only leaf nodes', function (done) {
    /*
      1:Your item was delivered in or at the mailbox at 1:56 pm on November 17, 2014 in ANKENY, IA 50021., null
      1:Your item was delivered in or at the mailbox at 1:56 pm on November 17, 2014 in ANKENY, IA 50021., ANKENY, IA 50021
      2:, null
      2:, null
      3:Your item was delivered in or at the mailbox at 1:56 pm on November 17, 2014 in ANKENY, IA 50021., null
      3:Your item was delivered in or at the mailbox at 1:56 pm on November 17, 2014 in ANKENY, IA 50021., ANKENY, IA 50021
     */
  });
});

// Tests for yaws scaping functionalities
// Author: ivan sabik

var assert = require('assert-diff');
var fs = require('fs');
var yaws = require('../lib/yaws');
var nock = require('nock');
var fixtures = require('./fixtures/general');

describe('yaws scrape', function () {
  this.timeout(10000);
  /*
   *  The user scrapes a pattern defining regex, in this case USPS
   *  tracking information search for date and location. This is the
   *  default behaviour.
   */ 
  it('should find a text for regex in pattern', function (done) {
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
  /*
   *  The user scrapes a pattern defining regex, using the forceMatchAll
   *  flag. This excludes uncomplete matches. Example, there's a tr container
   *  but has only the date, or only the location. If both are not present
   *  result is not included in the scraped object.
   */
  it('should find a text for regex in pattern forcing to match all pattern elements', function (done) {
    var pattern = {
      date: /.*[0-9]{2}.*.[0-9]{4}.*.[0-9]{1,2}:[0-9]{1,2}.*m/,
      location: /[A-Z]{2}.*[0-9]{5}/
    };
    var options = {
      pattern: pattern,
      html: fixtures.uspsHtml,
      container: 'tr',
      forceMatch: true
    };
    yaws(options)
    .scrape(function (response) {
      assert.deepEqual(fixtures.assertScrapeForceMatch, response);
      done();
    });
  });
  /*
   * The user scrapes an attribute's value by using a regex. In this case
   * a link (href attribute) for a wikipedia article in German.
   */ 
  it('should find an attribute value for regex in pattern', function (done) {
    var pattern = {
      link: {
        regex: /Deutsch/,
        attribute: 'href'
      }
    };
    var options = {
      pattern: pattern,
      html: fixtures.wikipediaHtml,
      container: 'li',
      allOcurrencies: false
    };
    var assertResult = [{link: '//de.wikipedia.org/wiki/Germanwings'}];
    yaws(options)
    .scrape(function (response) {
      assert.deepEqual(assertResult, response);
      done();
    });
  });
  
  /*
   * The user scrapes defining an array of regex
   */ 
  it('should find a list of options (regexp, dom, etc.)', function (done) {
    var pattern = {
      status: [ /Delivered, In\/At Mailbox/, /Departed USPS Facility/, /Arrived at USPS Origin Facility/ ]
    };
    var options = {
      pattern: pattern,
      html: fixtures.uspsHtml,
      container: 'tr'
    };
    yaws(options)
    .scrape(function (response) {
      assert.deepEqual(fixtures.assertOptionsList, response);
      done();
    });
  });
  /*
   * The user scrapes using a DOM navigation path. In this case
   * elements in a Craiglist listing.
   */
  it('should find element based on dom navigation', function (done) {
    var pattern = {
      title: '.hdrlnk',
      price: '.price',
      housingType: '.housing',
      address: '.pnr small'
    };
    var options = {
      pattern: pattern,
      html: fixtures.craigslistHtml,
      container: '.row'
    };
    yaws(options)
    .scrape(function (response) {
      assert.deepEqual(fixtures.assertElementNavigation, response);
      done();
    });
  });
    /*
   * The user scrapes for an attribute using a DOM navigation path. In this case
   * elements in a Craiglist listing.
   */
  it('should find attribute of an element based on dom navigation', function (done) {
    var pattern = {
      date: {
       path: 'time',
       attribute: 'datetime'
      },
      link: {
       path: 'a',
       attribute: 'href'
      }
    };
    var options = {
      pattern: pattern,
      html: fixtures.craigslistHtml,
      container: '.row'
    };
    yaws(options)
    .scrape(function (response) {
      assert.deepEqual(fixtures.assertElementNavigationAttribute, response);
      done();
    });
  });
  /*
   * The user scrapes using a pattern inside a pattern. In this case
   * elements in a Craiglist listing.
   */
  it('should recursively find nested objects', function (done) {
    var assert = {
      maps: {
        google: 'https://maps.google.com/?q=loc%3A+Jean%2DTalon+at+Iberville+Montrel+Qc+CA',
        yahoo: 'http://maps.yahoo.com/maps_result?addr=Jean%2DTalon+at+Iberville&csz=Montrel+Qc&country=CA'
      }
    };
    var pattern = {
      maps: {
        google: {
          regex: /google map/,
          attribute: 'href'
        },
        yahoo: {
          regex: /yahoo map/,
          attribute: 'href'
        }
      }
    };
    var options = {
      pattern: pattern,
      html: fixtures.craigslistHtml,
      container: '.row'
    };
    yaws(options)
    .scrape(function (response) {
      assert.deepEqual(assert, response);
      done();
    });
  });
  /*
   * The user scrapes defining a container that does not exist
   */
  it('should throw error if container or dom navigation path not found', function (done) {
    var pattern = {
      title: '.hdrlnk'
    };
    var options = {
      pattern: pattern,
      html: fixtures.craigslistHtml,
      container: '.row-non-existent'
    };
    yaws(options)
    .scrape(function (response, error) {
      console.log(error)
      assert.equal('No elements to iterate, check if containers exist!', error);
      done();
    });
  });
  //
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
  //
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
  //
  it('should find a single element, not all occurencies', function (done) {
  });
  //
  it('should emulate desktop Agent', function (done) {
  });
  //
  it('should emulate mobile User Agent', function (done) {
  });
  //
  it('should send Referer in headers', function (done) {
  });
  //
  it('should send Cookie in headers', function (done) {
  });
  //
  it('should find container elements to be the scraping targets', function (done) {
  });
  //
  it('should find a <table> element', function (done) {
    // html is fixtures.excelFunctionsHtml
    yaws(options, function (response) {
      assert.deepEqual(fixtures.assertTable, response);
      done();
    })
    .scrape();
  });
  //
  it('should find options and values for a <select> element', function (done) {
  });
  //
  it('should warn to console if no container defined', function (done) {
  });
  //
  it('should warn to console if no pattern defined', function (done) {
  });
  //
  it('should throw error when container not found', function (done) {
  });
  //
  it('should find objects from URL', function (done) {
  });
  //
  it('should accept and use request parameters for POST and GET', function (done) {
  });
  //
  it('should scrape from e-mail with IMAP', function (done) {
  });
  //
  it('should use POST for request', function (done) {
  });
  //
  it('should paginate among pages', function (done) {
  });
  //
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
  //
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

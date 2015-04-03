var assert = require('assert-diff');
var yawscraper = require('../lib/yawscraper');
var nock = require('nock');
var fixtures = require('./fixtures/nyTimesFixtures');

describe('NY Times mobile', function(){
  it('should get international news headlines', function(done) {
    nock('http://mobile.nytimes.com/')
      .get('/international/')
      .reply(200, fixtures.nyTimesHtml);
      var testPattern = {
        title: 'span .title',
        image: 'highlighted-thumb img.src',
        url: 'a.href',
        description: 'p'
      };
      var testOptions = {
        url: 'http://mobile.nytimes.com/international',
        pattern: testPattern,
        container: 'li'
      }
      yawscraper.scrape(testOptions, function(response) {
        assert.deepEqual(fixtures.nyTimesAssert, response);
        done();
      });
  });
});

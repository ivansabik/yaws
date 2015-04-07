var assert = require('assert-diff');
var Yaws = require('../../lib/yaws');
var nock = require('nock');
var fixtures = require('../fixtures/nyTimesFixtures');

describe('NY Times mobile', function(){
  it('should get international news headlines', function(done) {
    nock('http://mobile.nytimes.com/')
      .get('/international/')
      .reply(200, fixtures.nyTimesHtml);
      var pattern = {
        title: 'span .title',
        image: 'img.src',
        url: 'a.href',
        description: 'p'
      };
      var options = {
        url: 'http://mobile.nytimes.com/international',
        pattern: pattern,
        container: 'li'
      };
      yaws(options, function(response) {
        assert.deepEqual(fixtures.nyTimesAssert, response);
        done();
      })
      .scrape();
  });
});

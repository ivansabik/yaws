var assert = require('assert-diff');
var yawscraper = require('../lib/yawscraper');
var nock = require('nock');
var fixtures = require('./fixtures/imdbFixtures');

describe('IMDb', function(){
  it('should get new movies in theatres', function(done) {
    nock('http://www.imdb.com/')
      .get('/movies-in-theaters/')
      .reply(200, fixtures.imdbHtml);
    var testPattern = {
      movieTitle: 'h4',
      certificate: '.cert-runtime-genre',
      time: 'time',
      genres: '.cert-runtime-genre span[itemprop=genre]',
      metascore: '.metascore no_ratings',
      director: 'span[itemprop=director]',
      actors: 'span[itemprop=actors]',
      synopsis: '.thebuzz',
      poster: 'poster shadowed img.src'
    };
    var testOptions = {
      url: 'http://www.imdb.com/movies-in-theaters',
      pattern: testPattern,
      container: 'div[itemtype=http://schema.org/Movie]'
    }
    yawscraper.scrape(testOptions, function(response) {
      assert.deepEqual(fixtures.imdbAssert, response);
      done();
    });
  });
});

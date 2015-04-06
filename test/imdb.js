var assert = require('assert-diff');
var Yaws = require('../lib/yaws');
var nock = require('nock');
var fixtures = require('./fixtures/imdbFixtures');

describe('IMDb', function(){
  it('should get new movies in theatres', function(done) {
    nock('http://www.imdb.com/')
      .get('/movies-in-theaters/')
      .reply(200, fixtures.imdbHtml);
    var pattern = {
      movieTitle: 'h4',
      certificate: '.cert-runtime-genre',
      time: 'time',
      genres: '.cert-runtime-genre span[itemprop=genre]',
      metascore: '.metascore no_ratings',
      director: 'span[itemprop=director]',
      actors: 'span[itemprop=actors]',
      synopsis: 'div[itemprop=description]',
      poster: 'img.src'
    };
    var options = {
      url: 'http://www.imdb.com/movies-in-theaters',
      pattern: pattern,
      container: 'div[itemtype=http://schema.org/Movie]'
    }
    new Yascraper(options, function(response) {
      assert.deepEqual(fixtures.imdbAssert, response);
      done();
    })
    .scrape();
  });
});

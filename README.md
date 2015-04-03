yawscraper
===========

[![Build Status](https://travis-ci.org/ivansabik/yaws.svg)](https://travis-ci.org/ivansabik/yaws)

yawscraper (Yet Another Web Scraper) is a simple to use yet very powerful web scraping util for NodeJS.
It supports scraping by patterns (using Regular Expressions) and by navigating DOM (JQuery style).
Depends on following libs:

- cheerio
- mocha
- assert-diff
- nock

## Install

`npm install yawscraper`

## Run tests

`mocha`

## Usage

yawscraper.scrape(options, callback)

 - url: The url to scrape
 - html: Optionally scrape an HTML
 - ua: Header for User-agent to use, default is 'chrome'. Other available ua's are chrome, firefox, explorer, safari, android, iphone, blackberry
 - referer: Header for Referer to use
 - cookie: Header for Cookies
 - options.allOcurrencies: When false, gets single result an array with many, default is true
 - container: Root rouping element to scrape (li, div, etc), containers are small groups that get scraped one after another
  
#### Callback

Function that is called when scraping is done

## Examples

#### IMDb

```
var yawscraper = require('yawscraper');

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
yawscraper.scrape(testOptions, function(scraped) {
  console.log(scraped);
});
```

#### NYTimes Mobile

```
var yawscraper = require('yawscraper');

var testPattern = {
  title: 'span .title',
  image: 'highlighted-thumb img.src',
  url: 'a.href',
  description: 'p'
};
var testOptions = {
  url: 'http://www.nytimes.com/',
  pattern: testPattern,
  container: 'li'
}
yawscraper.scrape(testOptions, function(scraped) {
  console.log(scraped);
});
```

## Scrape patterns

Patterns are regular expressions or elements (ids, classes, etc)

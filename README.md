yawscraper
===========

[![Build Status](https://travis-ci.org/ivansabik/yaws.svg)](https://travis-ci.org/ivansabik/yaws)

yawscraper (Yet Another Web Scraper) is a simple to use yet very powerful web scraping util for NodeJS.
Uses following libs:

- express
- cheerio
- mocha
- assert-diff
- nock
- request-json

## Install

`npm install yaws`

## Run tests

`mocha`

## Usage

yaws.scrape(options, callback)

#### Options

 - url: The url to scrape
 - html: Optionally scrape an HTML
 - ua: Header for User-agent to use, default is 'chrome'. Other available ua's are chrome, firefox, explorer, safari, android, iphone, blackberry
 - referer: Header for Referer to use
 - cookie: Header for Cookies
 - searchElement = The element looked for (td, span, div, etc.), default is 'text'
 - options.allOcurrencies = When false, gets single result not all of them, default is true
  
#### Callback

Function that is called when scraping is done

## Examples

#### IMDb

```
var yawscraper = require('yawscraper')

var options = {}
options.pattern = {
}
options.url = 'http://www.imdb.com/movies-in-theaters/'
yawscraper.scrape(options, function(response) {
  console.log(response);
});
```

#### Mobile NYTimes

```
var yawscraper = require('yawscraper')

var options = {}
options.pattern = {
}
options.url = 'http://mobile.nytimes.com/international/'
options.ua = 'iphone'
yawscraper.scrape(options, function(response) {
  console.log(response);
});
```

## Scrape patterns

Patterns are regular expressions or elements (ids, classes, etc)

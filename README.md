yawscraper
===========

[![Travis CI Build Status](https://travis-ci.org/ivansabik/yawscraper.svg)](https://travis-ci.org/ivansabik/yawscraper)
[![npm Status](https://img.shields.io/npm/v/yawscraper.svg)](http://libraries.io/npm/yawscraper)

yawscraper (Yet Another Web Scraper) is a simple to use yet very powerful web scraping util for Node.js
It supports scraping by patterns (using Regular Expressions) and by navigating DOM (JQuery style).
It is a Work in Progress including tests for specific cases used when developing (as NYTimes and IMDb) so as for each main functionality.
Depends on following libs:

- cheerio
- mocha
- assert-diff
- nock

## Features

- Definition of scrape target
    - Define HTML to scrape
    - Scrape from url with optional parameters (POST, GET)
    - Define referer in request
    - Assign cookie in request
    - Use different mobile and desktop browsers in request
    
- Scrape
    - Define different scraping patterns which are returned as objects
    - Searched based on containers (li, td, table, etc)
    - Search on a list of texts
    - Search for regular expressions
    - Scrape by navigating the DOM JQuery style
    - Scrape images
    - Scrape links
    - Scrape tables
    - Get single or multiple ocurrences
    - Pagination

## Install

`npm install yawscraper`

## Run tests

 - `npm install -g mocha`
 - `mocha`

## Usage

#### yawscraper(options, callback).scrape()

 - url: The url to scrape
 - html: Optionally scrape an HTML
 - ua: Header for User-agent to use, default is 'chrome'. Other available ua's are chrome, firefox, explorer, safari, android, iphone, blackberry
 - referer: Header for Referer to use
 - cookie: Header for Cookies
 - options.allOcurrencies: When false, gets single result an array with many, default is true
 - container: Root rouping element to scrape (li, div, etc), containers are small groups that get scraped one after another

## Examples

#### IMDb

![yawscraper example IMDb](https://raw.githubusercontent.com/ivansabik/yawscraper/master/doc/yawscraper-imdb-example.png)

```javascript
var yawscraper = require('yawscraper');
```

Should give something like:

```javascript
[
  {
    movieTitle: 'Furious 7 (2015)',
    certificate: 'PG-13',
    time: '137 min',
    genres: ['Action','Crime','Thriller'],
    metascore: '66',
    director: 'James Wan',
    stars: ['Vin Diesel', 'Paul Walker', 'Dwayne Johnson', 'Jason Statham'],
    synopsis: 'Deckard Shaw seeks revenge against Dominic Toretto and his family for the death of his brother.',
    poster: 'http://ia.media-imdb.com/images/M/MV5BMTQxOTA2NDUzOV5BMl5BanBnXkFtZTgwNzY2MTMxMzE@._V1_SX140_CR0,0,140,209_AL_.jpg',
  },
  {
    movieTitle: 'Woman in Gold (2015)',
    certificate: 'PG-13',
    time: '109 min',
    genres: ['Drama'],
    metascore: '49',
    director: 'Simon Curtis',
    stars: ['Helen Mirren', 'Ryan Reynolds', 'Daniel Brühl', 'Katie Holmes'],
    synopsis: 'Maria Altmann, an octogenarian Jewish refugee, takes on the government to recover artwork she believes rightfully belongs to her family.',
    poster: 'http://ia.media-imdb.com/images/M/MV5BMTExMTUxNDQ5MjdeQTJeQWpwZ15BbWU4MDk4NTgxMzQx._V1_SY209_CR0,0,140,209_AL_.jpg',
  },
  {
    movieTitle: '5 to 7 (2014)',
    certificate: 'R',
    time: '95 min',
    genres: ['Comedy','Drama','Romance'],
    metascore: '55',
    director: 'Victor Levin',
    stars: ['Anton Yelchin','Bérénice Marlohe','Olivia Thirlby','Lambert Wilson'],
    synopsis: 'An aspiring novelist enters into a relationship with a woman, though there\'s just one catch: She\'s married, and the couple can only meet between the hours of 5 and 7 each evening.',
    poster: 'http://ia.media-imdb.com/images/M/MV5BMTQ4Mzg3ODQ4M15BMl5BanBnXkFtZTgwMjA3NjE1NDE@._V1_SY209_CR0,0,140,209_AL_.jpg',
  }
];
```

#### NYTimes Mobile

![ywscraper example NY Times mobile](https://raw.githubusercontent.com/ivansabik/yawscraper/master/doc/yawscraper-nytimes-example.png)

```javascript
var yawscraper = require('yawscraper');
```

Should give something like:

```javascript
[
  {
    title: 'Iran’s Leaders Begin Tricky Task of Selling Nuclear Deal at Home',
    image: 'http://graphics8.nytimes.com/images/2015/04/04/world/04Iran3-web/04Iran3-web-thumbLarge.jpg',
    url: '/2015/04/04/world/middleeast/iran-nuclear-deal.html',
    description: 'In a sign that the plan was broadly supported by the establishment, the government was allowed to promote the virtues of it at Friday Prayer.'
  },
  {
    title: 'Israeli Response to Iran Nuclear Deal Could Have Broader Implications',
    image: '',
    url: '/2015/04/04/world/middleeast/israeli-response-to-iran-nuclear-deal-could-have-broader-implications.html',
    description: 'Though Israeli and American officials have long denied any linkage between the Iranian and Palestinian issues, the two are playing out simultaneously.'
  },
  {
    title: 'U.S. Economy Gained 126,000 Jobs in March, an Abrupt Slowdown in Hiring',
    image: 'http://graphics8.nytimes.com/images/2015/04/04/business/04labor-web4/04labor-web4-thumbLarge-v3.jpg',
    url: '/2015/04/04/business/economy/jobs-report-unemployment-march.html',
    description: 'The unemployment rate held steady, but after a year in which job gains exceeded 200,000 monthly, the deceleration confirmed worrying signs in the economy.'
  },
  {
    title: 'Antitrust and Other Inquiries in Europe Target U.S. Tech Giants',
    image: 'http://graphics8.nytimes.com/images/2015/04/03/business/03eutech-web/03eutech-web-thumbLarge.jpg',
    url: '/2015/04/03/technology/europe-regulators-apple-google-facebook.html',
    description: 'New developments offer the latest sign that American tech giants face intensifying scrutiny in Europe that could curb their profits in the region and affect how they operate around the world.'
  }
];
```

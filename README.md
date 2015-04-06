yaws
===========

[![Travis CI Build Status](https://travis-ci.org/ivansabik/yaws.svg)](https://travis-ci.org/ivansabik/yaws)
[![npm Status](https://img.shields.io/npm/v/yaws.svg)](http://libraries.io/npm/yaws)

yaws (Yet Another Web Scraper) is a simple to use yet very powerful web scraping util for Node.js
It supports different techniques commonly used for scraping, defined an object by using patterns with Regular Expressions, by navigating DOM (JQuery style).
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
    - Search for regular expressions
    - Scrape by navigating the DOM JQuery style
    - Search for single element or all ocurrencies
    - Scrape images
    - Scrape links
    - Scrape tables
    - Get single or multiple ocurrences
    - Pagination

## Install

`npm install yaws`

## Run tests

 - `npm install -g mocha`
 - `mocha`

## Usage

#### yaws(options, callback).scrape()

 - url: The url to scrape
 - html: Optionally scrape an HTML
 - ua: Header for User-agent to use, default is 'chrome'. Other available ua's are chrome, firefox, explorer, safari, android, iphone, blackberry
 - referer: Header for Referer to use
 - cookie: Header for Cookies
 - options.allOcurrencies: When false, gets single result an array with many, default is true
 - container: Root rouping element to scrape (li, div, etc), containers are small groups that get scraped one after another

## Examples

See examples.md
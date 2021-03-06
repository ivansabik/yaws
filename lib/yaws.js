// yaws main module
// Author: ivan sabik

var request = require('request');
var cheerio = require('cheerio');

var UA_DICT = {
  chrome: 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2226.0 Safari/537.36',
  firefox: 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20130401 Firefox/31.0',
  explorer: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
  safari: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A',
  android: 'Mozilla/5.0 (Linux; U; Android 4.0.3; de-ch; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
  iphone: 'Mozilla/5.0(iPhone;U;CPUiPhoneOS4_0likeMacOSX;en-us)AppleWebKit/532.9(KHTML,likeGecko)Version/4.0.5Mobile/8A293Safari/6531.22.7',
  blackberry: 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+'
};

module.exports = Yaws;

function Yaws(options) {
  if (!(this instanceof Yaws))
    return new Yaws(options);

  this.callback = function(response) { console.log(response)};
  this.options = {};
  this.options.ua = 'chrome';
  this.options.url = null;
  this.options.findAll = true;
  this.options.forceMatch = true;
  this.options.container = 'div';
  this.options.html = null;
  this.options.allOcurrencies = true;

  if (!options.pattern) throw new Error('Need to define a pattern to search for objects!');
  this.options.pattern = options.pattern;
  
  if (options.ua) this.options.ua = options.ua;
  if (options.url) this.options.url = options.url;
  if (options.findAll) this.options.findAll = findAll;
  if (options.forceMatch) this.options.forceMatch = options.forceMatch;
  if (options.container) this.options.container = options.container;
  if (options.html) this.options.html = options.html;
  if (options.referer) this.options.headers.Referer = options.referer;
  if (options.cookie) this.options.headers.Cookie = options.cookie;
  if (options.container) this.options.container = options.container;
  if (options.html) this.options.html = options.html;
}

Yaws.prototype.scrape = function (callback) {
  var options = this.options;
  if (typeof(callback) !== 'function') throw new Error('Callback is not a function!');
  if (callback) this.callback = callback;
  if (options.allOcurrencies) scraped = [];
  if (!options.allOcurrencies) scraped = {};
  if (options.html) {
    var $ = cheerio.load(this.options.html);
    if ($(options.container).length === 0) {
      this.callback(null, 'No elements to iterate, check if containers exist!');
    }
    pattern = this.options.pattern;
    $(options.container).each(function(i, elem) {
      var match = {};
      $(this).children().each(function(j, elem2) {
        var child = $(this).text().replace(/\u00a0/g, ' ').trim();
        for (var keyPattern in pattern) {
          // Array of regex
          if(Object.prototype.toString.call(pattern[keyPattern]) === '[object Array]') {
            var compares = pattern[keyPattern];
            for(var i=0; i < compares.length; i++) {
              if (child.match(compares[i]))  {
                match[keyPattern] = child.match(compares[i])[0];
              }
            }
          }
          // DOM navigation
          else if(typeof pattern[keyPattern] === 'string') {
            match[keyPattern] = $(this).find(pattern[keyPattern]).text().replace(/\u00a0/g, ' ').trim();
          }
          else if(pattern[keyPattern]['path']) {
            match[keyPattern] = $(this).find(pattern[keyPattern]['path']).attr(pattern[keyPattern]['attribute']);
          }
          // Single regex
          else {
            var searchAttr = false;
            if (pattern[keyPattern]['regex']) {
              searchAttr = true;
            }
            if(searchAttr) {
              if (child.match(pattern[keyPattern]['regex']))  {
                match[keyPattern] = $(this).attr(pattern[keyPattern]['attribute']);
              }
            } else {
              if (child.match(pattern[keyPattern]))  {
                match[keyPattern] = child.match(pattern[keyPattern])[0];
              }
            }
          }
        }
      });
      if(options.forceMatch === true) {
        if(Object.keys(match).length == Object.keys(pattern).length) {
          scraped.push(match);
        }
      } else {
        if(Object.keys(match).length !== 0) {
          scraped.push(match);
        }
      }
    });
    this.callback(scraped);
   } 
};

Yaws.prototype._scrapeRegex = function() {
}

Yaws.prototype._scrapeNavigation = function() {
}

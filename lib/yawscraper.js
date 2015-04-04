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

var defaultCallback = function(response){console.log(response)};

module.exports = Yawscraper;

function Yawscraper(options, callback) {
  if (!(this instanceof Yawscraper)) return new Yawscraper(options, callback);
  
  this.options = options;
  this.callback = callback;
  this.container;
  
  // Set defaults, validate passed options
  if (!this.callback) this.callback = defaultCallback;
  if (typeof(this.callback) !== 'function') throw new Error('Callback is not a function!');
  if (!this.options.ua)	this.options.ua = 'chrome';
  if (!this.options.searchElement)	this.options.searchElement = 'text';
  if (!this.options.allOcurrencies)	this.options.ocurrencies = true;
  if (!this.options.forceAll)	this.options.forceAll = true;
  
  this.requestOptions = {
    url: options.url,
    headers: {
      'User-Agent': UA_DICT[options.ua]
    }
  };
  if (this.options.referer )	this.requestOptions.headers.Referer = options.referer;
  if (this.options.referer )	this.requestOptions.headers.Cookie = options.referer;
}

Yawscraper.prototype.scrape = function() {
  if (!this.options.html) {
    request(this.requestOptions, function (error, response, html) {
      if (!error) this._doMainScrape(html, callback);
      });
  } else {
    this._doMainScrape(options.html, callback);
  }
}

Yawscraper.prototype._doMainScrape = function(html, callback) {
  var $ = cheerio.load(html);
  if (this.options.allOcurrencies) var scraped = [];
  if (!this.options.allOcurrencies) var scraped = {};
  $(options.searchElement).each(function(i, elem) {
    $(this).text()
  });
  callback(scraped);
}

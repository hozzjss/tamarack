var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var port = process.env.PORT || 8080;

app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.get('/scrape', function (req, res) {

	url = 'https://www.youcaring.com/api-all-star-teams-649107';

	request(url, function (error, response, html) {
		if (!error) {
			var $ = cheerio.load(html);

			var json = {
				raised: ""
			};

			var text = $('.fundraiserProgress-current').text();
			var ending = text.indexOf(" ");
			json.raised = text.slice(0, ending);
		}

		//		return res.send(json)
		res.end(JSON.stringify(json))
	});
})

app.listen(port)
	//console.log('Magic happens on port 8081');
exports = module.exports = app;
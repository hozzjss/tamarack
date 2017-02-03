const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const url = require('url')
const app = express()
const port = process.env.PORT || 8080

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
	res.setHeader('Access-Control-Allow-Credentials', true)
	next()
})

app.get('/', function(req, res) {
	res.send("Usage: /scrape")
})

app.get('/scrape', function (req, res) {

	let query = req.query.query

	request(query, function (error, response, html) {
		let raised = "Error!"
		if (!error) {
			let $ = cheerio.load(html)
			raised = $('.fundraiserProgress-current').text()
			if (raised.indexOf("goal") !== -1)
				raised = "$0"
		}
		res.end(raised)
	});
})

app.get('/weather', function (req, res) {
	let lon = req.query.lon;
	let lat = req.query.lat;
	let key = req.query.key;
	let apiReq = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
	request(apiReq, function (error, response, html) {
		if(!error) {
			res.end(html);
		}
	});
});
app.listen(port)
exports = module.exports = app;

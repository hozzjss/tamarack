const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const url = require('url')
const app = express()
const port = process.env.PORT || 8080

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.get('/', function(req, res) {
  res.send("Usage: /scrape")
})

app.get('/scrape', function(req, res) {

  let query = req.query.query

  request(query, function(error, response, html) {
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

app.get('/date', function(req, res) {
    let query = req.query.query;
    request(query, function(error, response, html){
        if (!error) {
            let $ = cheerio.load(html);
	    let data = $('body').text().match(/\w+\s\d{1,2}\,\s\d{4}/g)[0];
            res.end(data);
        } else {
            res.end(error);
        }
    });
});

app.get('/weather', function(req, res) {
  let lon = req.query.lon;
  let lat = req.query.lat;
  let apiReq = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=560c314416cee6b04950e1f5415da8c5`;
  request(apiReq, function(error, response, html) {
    if (!error) {
      console.log(html);
      res.end(html);
    }
  });
});

app.get('/search', function(req, res) {
  let searchQuery = req.query.query;
	let key = req.query.key;
  let options = {
    url: 'https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=' + searchQuery,
    method: 'GET',
    headers: {
      'Ocp-Apim-Subscription-Key': key
    }
  };
	request(options, function (error, response, body) {
		if (!error) {
			console.log(body);
			res.end(body);
		}
	})
})

app.get('/sentiment', function (req, res) {
	let query = req.query.query;
	let key = req.query.key;
	var options = {
		url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Ocp-Apim-Subscription-Key': key
		},
		body: JSON.stringify({
			"documents": [{
				"language": "en",
				"id": "1",
				"text": query
			}]
		}),
	};
	request(options, function (error, response, body) {
		if (!error) {
			console.log(body);
			res.end(body);
		}
	})
})
app.listen(port)
console.log("app running on port", port);
exports = module.exports = app;

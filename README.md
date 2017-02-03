# YouCaring scraping
## an api to scrape raised money for a fundraiser on the youcaring platform
### example
`$.get("https://tamarack.herokuapp.com/scrape?query=YourCampaign'sYoucaringFullLink");`
would return a string like $10,000 
youcaring provides a widget but I did not know so... =D
if you are youcaring and you think this is not appropriate please contact me at my [email] (mailto:medo3578@gmail.com)
# Weather
you can grab also the weather from this api using three parameters:
1. Your API key `key`
2. Longitude `lon`
3. Latitude `lat`
### example
`$.get("https://tamarack.herokuapp.com/weather?key=key&lon=lon&lat=lat");`
would return the object you'd receive from openweathermap api as it downloads the data and sends it to you
the improvement is that it is on an https secure connection not like the openweathermap http one which would work perfectly with the navigator web api

# Chicago Crime 

Sample app and documentation for the Chicago Tribune's Chicago Crime API.

## Getting started with the Chicago Crime API

###[Read the API documentation](https://github.com/newsapps/chicagocrime/blob/master/docs/api_docs.md)

Before running queries, get the JSONView plugin for [Chrome](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en) or [Firefox](https://addons.mozilla.org/EN-us/firefox/addon/jsonview/)

Sample queries:

* **2013 daily crime summary for community area 32, with community area meta:**<br />http://crime.chicagotribune.com/api/1.0-beta1/datesummary/?format=json&limit=0&year=2013&community_area=32&related=1
* **Daily crime summary for all community areas in January 2013:**<br />http://crime.chicagotribune.com/api/1.0-beta1/datesummary/?format=json&crime_date__gte=2013-01-01&&crime_date__lt=2013-02-01
* **Community areas, JSONP format:**<br />http://crime.chicagotribune.com/api/1.0-beta1/communityarea/?format=jsonp&limit=0
* **Crime classifications as a CSV:**<br />http://crime.chicagotribune.com/api/1.0-beta1/crimeclassification/?format=csv&limit=0

## Installing and using the front end app

This works for all browsers on OS X and most versions of Linux:

* Clone this repository
* Run `python -m SimpleHTTPServer` in the cloned directory
* Visit `http://localhost:8000` in your web browser.

## Usage limits

Currently, during beta development, there are no usage limits. We will probably implement a threshold after the first official release.

## Technology

The API is built on [Tastypie](http://django-tastypie.readthedocs.org/en/latest/), which lets us easily provide an API interface based on the Django models powering the Tribune's [Chicago Crime site](http://crime.chicagotribune.com).


## License and authors

Frontend created by David Eads and Andy Boyle.

Crime site and API created by Joe Germuska, David Eads, and Heather Billings.

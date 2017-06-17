
<h1>About</h1>

<p>This is my submission for Project P5: Neighborhood Map, part of Udacity's Full Stack Web Developer Nanodegree.</p>

<h1>project Overview</h1>
<p>You will develop a single page application featuring a map of your neighborhood</p>


## table of contents

- [Quick start](#quick-start)
- [Documentation](#documentation)
- [Usage](#usage)
- [Helpful Resources](#Resources)

## quick-start
- Application utilizes Google's Map API and at least one additional third-party "data API". All data requests are retrieved in an asynchronous manner. In the event of a failed data retrieval errors are handled gracefully.

   ![map-image](https://raw.githubusercontent.com/ashishchopra605/Neighbourhood-Map/master/images/map.png)
   
   
## Documentation
Framework Used: [Knockout](http://knockoutjs.com/)
- Knockout is used to handle the list, filter, and any other information on the page that is subject to changing state. Things that are not be handled by Knockout: anything the Maps API is used for, creating markers, tracking click events on markers, making the map, refreshing the map. Note 1: Tracking click events on list items is handled with Knockout. Note 2: Creating your markers as a part of your ViewModel.
  
# API Used

### Google Map API
- Display map markers identifying at least 5 locations that you are interested in within this neighborhood. This app should displays those locations by default when the page is loaded.

- A list view of the set of locations is implemented

- A filter option is that uses an input field to filter both the list view and the map markers displayed by default on load. The list view and the markers are updated accordingly in real time.

### Wikipedia API
- A functionality is added using third-party APIs to provide information when a map marker or list view entry is clicked. Note that StreetView and Places don't count as an additional 3rd party API because they are libraries included in the Google Maps API.

### FourSquare API
- The Foursquare API gives you access to our world-class places database and the ability to interact with Foursquare users and merchants. Start using the only location API you'll ever need.

## usage
- open index.html

- Clicking a marker on the map should open more information about that location.

- Clicking a marker on the map should open more information about that location.

- Clicking a name in the list view should open the information window for the associated marker.

- The list of locations should be filterable with a text input. Filtering the list also filters the markers on the map.

- This web app is also responsive.

## Helpful Resources
- [Foursquare API](https://developer.foursquare.com/)
- [MediaWikiAPI for Wikipedia](https://www.mediawiki.org/wiki/API:Main_page)
- [Google Maps Street View Service](https://developers.google.com/maps/documentation/javascript/streetview)
- [Google Maps](https://developers.google.com/maps/documentation/)
- [Knockout JS Tutorials](http://learn.knockoutjs.com/#/?tutorial=intro)


 

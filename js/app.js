// These are the real estate listings that will be shown to the user.
// Normally we'd have these in a database instead.
var locations = [
{title: 'Sukhna Lake', location: {lat: 30.742138, lng: 76.818756}, Venue_id: '4c456c4b8c1f20a14ebd3d99'},
{title: 'Rock Garden', location: {lat: 30.752535, lng: 76.810104}, Venue_id: '4b6fe660f964a5206dff2ce3'},
{title: 'Rose Garden', location: {lat: 30.746108, lng: 76.781981}, Venue_id: '4c0ba827009a0f47975cebbf'},
{title: 'Qila Mubarak', location: {lat: 30.3242, lng: 76.4032}, Venue_id: '5298721a11d2c01ecefe5b79'},
{title: 'Chattbir Zoo', location: {lat: 30.603913, lng: 76.792463}, Venue_id: '4f531694e4b07e4c63681170'},
{title: 'Pinjore Gardens', location: {lat: 30.794088, lng: 76.914711}, Venue_id: '50f2dd31e4b0ff7d3253b877'},
{title: 'Government Museum and Art Gallery', location: {lat: 30.748912, lng: 76.787468}, Venue_id: '4c4a9deec9e4ef3b65e4da10'},
{title: 'Elante Mall', location: {lat: 30.705587, lng: 76.80127},Venue_id: '5114cd90e4b06bb0ed15a97f'},
{title: 'Sheesh Mahal', location: {lat:  30.3065, lng: 76.3961}, Venue_id: '4d393e8df8e0a09380658467'},
{title: 'Gurdwara Dukh Nivaran Sahib', location: {lat: 30.3470, lng: 76.3962}, Venue_id: '4e9c220f5c5ce9b9838e7772'},
{title: 'Open Hand Monument', location: {lat: 30.756456, lng: 76.801938}, Venue_id: '4d81ab1abede5481126003d1'},
{title: 'Nada Sahib', location: {lat: 30.692292, lng: 76.890111}, Venue_id: '4e61ab05483bd9a974004ab1'},
{title: 'baradari garden', location: {lat:  30.3359, lng: 76.3921}, Venue_id: '4ce1ec0d825e721e34797e45'}
];

/*
       * Open the drawer when the menu icon is clicked.
       */
       var menu = document.querySelector('#menu');
       var main = document.querySelector('main');
       var drawer = document.querySelector('#drawer');

       menu.addEventListener('click', function(e) {
        drawer.classList.toggle('open');
        e.stopPropagation();
       });
       main.addEventListener('click', function() {
        drawer.classList.remove('open');
       });


var map;
// Create a new blank array for all the listing markers.
var markers = [];

initMap = function() {
       var styles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#3e606f"
            },
            {
                "weight": 2
            },
            {
                "gamma": 0.84
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "weight": 0.6
            },
            {
                "color": "#1a3541"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c5a71"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#406d80"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c5a71"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#29768a"
            },
            {
                "lightness": -37
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#406d80"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#193341"
            }
        ]
    }
];

        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 30.3398, lng: 76.3869},
          zoom: 13,
          styles: styles,
          mapTypeControl: false
        });


        var largeInfowindow = new google.maps.InfoWindow();

        function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color.split('#')[1];
       }

        // Style the markers a bit. This will be our listing marker icon.

        var defaultIcon = makeMarkerIcon(getRandomColor());
        // Create a "highlighted location" marker color for when the user
        // mouses over the marker.
        var highlightedIcon = makeMarkerIcon('FFFF24');
        //mouseover event handler
        mouseoverseticon = function() {
             this.setIcon(highlightedIcon);
         };
         //mouseout event handler
         mouseoutseticon = function() {
         	this.setIcon(marker.icon);
         };
         //click event handler
         populatemarker = function(){
         	getFourSquareData(this);
            populateInfoWindow(this, largeInfowindow);
            this.setAnimation(google.maps.Animation.BOUNCE);
            var self = this;
            setTimeout(function() {
              self.setAnimation(null);
            }, 2000);
         };

        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          var loc_id = locations[i].Venue_id;
          //location_title.push(title);


          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i,
            location_id: loc_id,
          });

          // Push the marker to our array of markers.
          markers.push(marker);

          appViewModel.location()[i].marker = markers[i];
          // Create an onclick event to open the large infowindow at each marker.
           marker.addListener('click', populatemarker);
          // Two event listeners - one for mouseover, one for mouseout,
          // to change the colors back and forth.
           marker.addListener('mouseover', mouseoverseticon);
           marker.addListener('mouseout', mouseoutseticon);
        }

        document.getElementById('show-listings').addEventListener('click', showListings);
        document.getElementById('hide-listings').addEventListener('click', hideListings);

      };

      var wikiUrl;
      var wikiElem = '';
      var url='';
      var Address = '';
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
populateInfoWindow = function(marker, infowindow) {
  wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
  //get data from wikipedia API
  var wikiRequestTimeout = setTimeout(function(){
    marker.wikiElem = "failed to get wikipedia resources";
  },8000);
  $.ajax({
   url: wikiUrl,
   dataType: "jsonp",
 }).done(function( response ) {

  var article = response[2][0];
  var url = response[3][0];
  marker.wikiElem=article;
  marker.url = url;

  clearTimeout(wikiRequestTimeout);
            // Use streetview service to get the closest streetview image within
          // 50 meters of the markers position
  streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);

}).fail(function(jqXHR, textStatus) {
                    if(jqXHR.status === 0) {
                        alert('You are offline!n Please check your network.');
                    } else if(jqXHR.status == 404) {
                        alert('HTML Error Callback');
                    }
                    else alert( "Request failed: " + textStatus + "<br>");
                });

    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
     // Clear the infowindow content to give the streetview time to load.
     infowindow.setContent('');
     infowindow.marker = marker;
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
          infowindow.marker = null;
        });
        var streetViewService = new google.maps.StreetViewService();
        var radius = 50;
          // In case the status is OK, which means the pano was found, compute the
          // position of the streetview image, then calculate the heading, then get a
          // panorama from that and set the options
          getStreetView = function(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
              var nearStreetViewLocation = data.location.latLng;
              var heading = google.maps.geometry.spherical.computeHeading(
                nearStreetViewLocation, marker.position);

              if(!marker.url || !marker.wikiElem) {
              infowindow.setContent(
                                  '<div style="text-align:center; font-size:20px;">' + marker.title +
                                  '</div><p style="color:red;">No information Available</p></a>' +
                                  '<div id="pano"></div>' +
                                  '<div><address>' + Address + '</address></div>');

            }
            else{
              infowindow.setContent(
                                  '<div style="text-align:center; font-size:20px;">' + marker.title +
                                  '</div><a href= ' + marker.url +'><p>' + marker.wikiElem  +'</p></a>' +
                                  '<div id="pano"></div>' +
                                  '<div><address>' + Address + '</address></div>');

            }


              var panoramaOptions = {
               position: nearStreetViewLocation,
               pov: {
                heading: heading,
                pitch: 30
              }
            };
            var panorama = new google.maps.StreetViewPanorama(
             document.getElementById('pano'), panoramaOptions);

          } else {

            if(!marker.url || !marker.wikiElem) {
              infowindow.setContent(
                                  '<div style="text-align:center; font-size:20px;">' + marker.title +
                                  '</div><p style="color:red;">No information Available</p></a>' +
                                  '<div style="color:red;"><p>No Street View Found</p></div>' +
                                  '<div><address>' + Address + '</address></div>');

            }
            else{
              infowindow.setContent(
                                  '<div style="text-align:center; font-size:20px;">' + marker.title +
                                  '</div><a href= ' + marker.url +'><p>' + marker.wikiElem  +'</p></a>' +
                                  '<div style="color:red;"><p>No Street View Found</p></div>' +
                                  '<div><address>' + Address + '</address></div>');

            }


          }
        };
          // Open the infowindow on the correct marker.

          infowindow.open(map, marker);

                }
              };

var googleError = function(){
    alert("Your Google API Key is not valid");
};



//get data from foursquare API
getFourSquareData= function(marker) {

var apiURL = 'https://api.foursquare.com/v2/venues/';
var foursquareClientID = '2EYFKBM53RBTDEZBFS2DOQK4GGNNAYMNHEJMM1HXGFTR5Y1O';
var foursquareSecret ='1W2EVJ1RMMQH55NOVKPQTNVRAOY2AWDRXKWOXLDXRRM4JMQZ';
var foursquareVersion = '20170112';
var venueFoursquareID = marker.location_id;


var foursquareURL = apiURL + venueFoursquareID + '?client_id=' + foursquareClientID +  '&client_secret=' + foursquareSecret +'&v=' + foursquareVersion;
$.ajax({
  url: foursquareURL,
  success: function(data) {

    var response = data.response.venue;

     var address = response.location.formattedAddress[0];
     var city =  response.location.formattedAddress[1];
     var state = response.location.formattedAddress[2];
     var country = response.location.formattedAddress[3];
     Address = address + ',' + city + ',' + state + ',' + country;

  }
}).fail(function(jqXHR, textStatus) {
                    if(jqXHR.status === 0) {
                        alert('You are offline!n Please check your network.');
                    } else if(jqXHR.status == 404) {
                        alert('HTML Error Callback');
                    }
                    else alert( "Request failed: " + textStatus + "<br>");
                });
};

// This function will loop through the markers array and display them all.
showListings = function() {
  var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  };

// This function will loop through the listings and hide them all.
hideListings = function() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
};
// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
makeMarkerIcon = function(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
};
//View Model
var AppViewModel = function() {
  var self = this;

  self.location = ko.observableArray(locations);

  self.filteredInput = ko.observable('');

  //search filter function
  self.search = ko.computed(function() {
    var filter = self.filteredInput().toLowerCase();

    if (!filter) {
      for(var i = 0; i < self.location().length; i++){

        if(self.location()[i].marker){
            self.location()[i].marker.setVisible(true);}
         else{console.log('marker not found!');}
      }
      return self.location();
    } else {
      return ko.utils.arrayFilter(self.location(), function(item) {
        if(item.title.toLowerCase().indexOf(filter) != -1)
        {
          if(item.marker){
              item.marker.setVisible(true);
              return true;}
          else{ console.log('marker not found!');}
        }
          else{
            if(item.marker) {
            item.marker.setVisible(false);
            return false;}
            else { console.log('marker not found!'); }

          }

          });
    }
  });
  //display marker when list item is clicked.
  showclickedinfowindow = function(title) {

    for (var i = 0; i < markers.length; i++) {
      if(markers[i].title == title.title)
      {

        google.maps.event.trigger(markers[title.marker.id], 'click');
      }
    }
  };

};
var appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);

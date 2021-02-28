// Template by http://github.com/jackdougherty/leaflet-map/
// See Leaflet tutorial links in README.md

// set up the map center and zoom level
//var map = L.map('map', {
//  center: [41.76, -72.67], // [41.5, -72.7] for Connecticut; [41.76, -72.67] for Hartford county or city
//  zoom: 9, // zoom 9 for Connecticut; 10 for Hartford county, 12 for Hartford city
//  zoomControl: false, // add later to reposition
//  scrollWheelZoom: false
//});
var map = L.map('map').fitWorld();

// optional : customize link to view source code; add your own GitHub repository
map.attributionControl
.setPrefix('View <a href="http://github.com/jackdougherty/leaflet-map">code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

L.Control.geocoder({position: "topleft"}).addTo(map);

L.control.scale().addTo(map);

// optional Zoom Label for map construction
L.control.zoomLabel({position: "topright"}).addTo(map);

// Reposition zoom control other than default topleft
L.control.zoom({position: "topright"}).addTo(map);

// optional: add legend to toggle any baselayers and/or overlays
// global variable with (null, null) allows indiv layers to be added inside functions below
var controlLayers = L.control.layers( null, null, {
  position: "bottomright", // suggested: bottomright for CT (in Long Island Sound); topleft for Hartford region
  collapsed: false // false = open by default
}).addTo(map);

// optional Coordinate Control for map construction
var c = new L.Control.Coordinates();
c.addTo(map);
map.on('click', function(e) {
	c.setCoordinates(e);
});

/* BASELAYERS */
// use common baselayers below, delete, or add more with plain JavaScript from http://leaflet-extras.github.io/leaflet-providers/preview/
// .addTo(map); -- suffix displays baselayer by default
// controlLayers.addBaseLayer (variableName, 'label'); -- adds baselayer and label to legend; omit if only one baselayer with no toggle desired

var ocm = new L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);// adds layer by default
//controlLayers.addBaseLayer(ocm, 'OpenCamperMap');

// Get location and center map
function onLocationFound(e) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters from this point").openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 160});


/* POINT OVERLAYS */
// ways to load point map data from different sources: coordinates in the code, GeoJSON in local directory, remote GeoJSON and JSON

// load one point from coordinates in code, icon from local directory, no interactive legend button
// places a star on state capital of Hartford, CT
// * TO DO: test whether placement of this code affects its display order, on top of other icons?
var starIcon = L.icon({
  iconUrl: 'src/star-18.png',
  iconRetinaUrl: 'src/star-18@2x.png',
  iconSize: [18, 18]
});
L.marker([41.7646, -72.6823], {icon: starIcon}).addTo(map);

// load point geojson data from local directory, using jQuery function (symbolized by $)
// modify icon source and styling
// modify pointToLayer marker bindPopup function to display GeoJSON data in info window
// option to insert '.addTo(map)' to display layer by default
// insert controlLayers.addOverlay(geoJsonLayer, 'InsertYourTitle') to add to legend


// load GeoJSON point data and clickable icons from local directory, using jQuery function (symbolized by $)
//$.getJSON("src/points.geojson", function (data){
//  var iconStyle = L.icon({
//    iconUrl: "src/hospital-18.png",
//    iconRetinaUrl: 'src/hospital-18@2x.png',
//    iconSize: [18, 18]
//  });
 // var geoJsonLayer = L.geoJson(data, {
 //   pointToLayer: function( feature, latlng) {
 //     var marker = L.marker(latlng,{icon: iconStyle});
 //     marker.bindPopup(feature.properties.Location); // replace 'Location' with properties data label from your GeoJSON file
 //     return marker;
 //   }
 // }); // insert ".addTo(map)" to display layer by default
 // controlLayers.addOverlay(geoJsonLayer, 'Hospitals');
//});

$.getJSON("src/sanitetsstation.geojson", function (data){
  var iconStyle = L.icon({
    iconUrl: "src/Camperservice.png",
    iconRetinaUrl: 'src/hospital-18@2x.png',
    iconSize: [18, 18]
  });
  var geoJsonLayer = L.geoJson(data, {
    pointToLayer: function( feature, latlng) {
      var marker = L.marker(latlng,{icon: iconStyle});
      marker.bindPopup(feature.properties.Location); // replace 'Location' with properties data label from your GeoJSON file
      return marker;
    }
  }); // insert ".addTo(map)" to display layer by default
  //controlLayers.addOverlay(geoJsonLayer, 'Sanitet');
  controlLayers.addOverlay(geoJsonLayer, 'Sanitet')
});




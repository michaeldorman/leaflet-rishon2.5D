var map = new L.Map('map');
map.setView([52.52111, 13.40988], 16, false);
new L.TileLayer('https://{s}.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png', {
  attribution: 'Map tiles &copy; <a href="http://mapbox.com">MapBox</a>',
  maxZoom: 18,
  maxNativeZoom: 20
}).addTo(map);
//var osmb = new OSMBuildings(map).date(new Date("2017-04-09 18:00:00"));
var osmb = new OSMBuildings(map).date(new Date());
//************************************************************
function getCenter(geoJson) {
  var geometry, len = 0, lat = 0, lon = 0;
  for (var i = 0, il = geoJson.features.length; i < il; i++) {
    geometry = geoJson.features[i].geometry.coordinates[0];
    if (geometry[0][0][0]) {
      geometry = geometry[0];
    }
    len += geometry.length-1;
    for (var j = 0, jl = geometry.length-1; j < jl; j++) {
      lat += geometry[j][1];
      lon += geometry[j][0];
    }
  }
  return { lat:lat/len, lon:lon/len };
}
$.getJSON("build1.geojson", function(data) {
  geoJson = data;
  osmb.set(geoJson);
  var center = getCenter(geoJson);
  map.setView([center.lat, center.lon], 18)
});

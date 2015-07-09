// vars
var map;
var meetups = [];

// functions
var listEvents = function (name, lat, lng, url, venue, address) {
  meetups.push({coords:[lat, lng], name: name, url: url, venue: venue, address: address});
};

var showEvents = function () {
  $.each(meetups, function (index, data) {
    $('.events-list').append('<li><strong><a href="' + data.url + '" target="_blank" title="Ver detalhes">' + data.name + '</a></strong> - <i>' + data.venue + '</i></li>');
  });

  meetups.map(function (m) {
    var marker = L.circleMarker(m.coords, {
      radius:12,
      weight:1,
      color: '#000',
      fillColor: '#F8E01E',
      fillOpacity: 0.8
    });
    var text = m.url ? '<a href="' + m.url + '" target="_blank">' + m.name + '</a>' : m.name;
    marker.bindPopup(text);
    map.addLayer(marker);
    return marker;
  });
};

// init
$(document).ready(function () {
  map = L.map('map', {
    scrollWheelZoom: false
  }).setView([-8.058257,-34.8719944], 12);

  L.tileLayer('http://{s}tile.stamen.com/toner/{z}/{x}/{y}.png', {
    'minZoom':      0,
    'maxZoom':      20,
    'subdomains':   ['', 'a.', 'b.', 'c.', 'd.'],
    'scheme':       'xyz'
  }).addTo(map);

  $.getJSON('http://api.meetup.com/2/events?group_urlname=nodebotsrec&key=6d265922775d4c10602c3053324f9&sign=true&callback=?',function(data){
    $.each(data.results, function ( index, data ) {
      listEvents(data.name, data.venue.lat, data.venue.lon, data.event_url, data.venue.name, data.venue.address_1);
    });
    showEvents();
  });
});

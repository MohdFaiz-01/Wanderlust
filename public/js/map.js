mapboxgl.accessToken = mapToken;   //mapToken is accessed from show.ejs <script> as .env variables can't be accessed in public folder

// Creating Map
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates, // starting position [lng, lat].
    zoom: 8, // starting zoom
});


console.log(listing.geometry.coordinates);  //printing coordinates on console(to checking)

// Creating a Marker and add it to the map.
const marker1 = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)   // setting coordinates for marker(getting listing obj from show.ejs)
    .addTo(map);


// Creating a Marker2 to show/add when hover.
const marker2 = new mapboxgl.Marker({ color: "black" })
    .setLngLat(listing.geometry.coordinates);

const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h5>${listing.title}</h5><p>Exact Location will be provided after booking.</p>`);
marker2.setPopup(popup);

// Mouse enter event (show marker1)
marker1.getElement().addEventListener('mouseenter', () => {
    marker2.addTo(map);  // adding marker2 to map when hover
    marker2.togglePopup();  // popping popup message when hover

    marker1.remove();      // Removing marker1
});

// Mouse leave event (revert back to marker1)
marker2.getElement().addEventListener('mouseleave', () => {
    marker2.remove();      // Remove marker2 (Black marker)

    marker1.addTo(map);    // Re-add marker1 (Red marker) back to the map
});
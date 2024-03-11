// Initialize the map
var map = L.map('map').setView([44.5133, -88.0133], 10);

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Add a marker with a popup
// var marker = L.marker([44.630182, -88.061709]).addTo(map)
//     .bindPopup('Home!')
//     .openPopup();



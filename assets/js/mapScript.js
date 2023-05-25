// import { infinityJSONData } from './infinityStones.js';

var map = L.map('map').setView([0, 0], 1);
L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=78zYHolnZukJLq2No3tN')
    .addTo(map);

var customIcon = L.icon({
    iconUrl: 'assets/images/thanos.jpg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    className: "ThanosMarker"
});
L.marker([-14.2350, -51.9253], { icon: customIcon }).addTo(map);

console.log("idooooooo");
console.log(infinityJSONData);
infinityJSONData.stones.forEach(element => {
document.getElementById("places").innerHTML +=
    `<div class="row">
<div class="col d-flex justify-content-center align-items-center ">
    <h4>${element.name}</h4>
</div>
<div class="col d-flex justify-content-center align-items-center">
    <img class="stones" src="${element.image}" id="${element.keyword}" data-lat="${element.latitude}" data-lng="${element.longitude}" style="width: 60px; height: 40px;">
</div>
</div>`
});

// Create markers with custom icons for each Infinity Stone
infinityJSONData.stones.forEach(function (stone) {
    var customMarker = L.icon({
        iconUrl: stone.imageWithNoBg,
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });
    L.marker([stone.latitude, stone.longitude], { icon: customMarker }).addTo(map);
});

var soulStoneImage = document.getElementById('soulStone');
console.log("soul"+soulStoneImage);
soulStoneImage.addEventListener('click', zoomToMarker);

var mindStoneImage = document.getElementById('mindStone');
console.log("mind"+mindStoneImage);
mindStoneImage.addEventListener('click', zoomToMarker);

var powerStoneImage = document.getElementById('powerStone');
console.log("power"+powerStoneImage);
powerStoneImage.addEventListener('click', zoomToMarker);

var spaceStoneImage = document.getElementById('spaceStone');
console.log("space"+spaceStoneImage);
spaceStoneImage.addEventListener('click', zoomToMarker);

var realityStoneImage = document.getElementById('realityStone');
console.log("real"+realityStoneImage);
realityStoneImage.addEventListener('click', zoomToMarker);

var timeStoneImage = document.getElementById('timeStone');
console.log("time"+timeStoneImage);
timeStoneImage.addEventListener('click', zoomToMarker);

function zoomToMarker() {
    var lat = this.getAttribute('data-lat');
    var lng = this.getAttribute('data-lng');

    if (lat && lng) {
        var latLng = L.latLng(parseFloat(lat), parseFloat(lng));
        map.setView(latLng, 8);
        marker.setLatLng(latLng);
    }
}

const key = mapToken;  // yahan apna key paste karo
const map = new maplibregl.Map({
    container: 'map',
    style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`,
    center: listing.geometry.coordinates,
    zoom: 9
});
// Marker add (Delivery Boy / Vehicle marker)
const marker = new maplibregl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new maplibregl.Popup({ offset: 25 })
            .setHTML(`<h3>${listing.location}</h3> <p>Exact location will provided after booking </p>`)
    )
    .addTo(map);
// Movement simulation (video jaisa animation)
// let index = 0;
// const route = [
//     [77.4126, 23.2599],
//     [77.4150, 23.2605],
//     [77.4175, 23.2621],
//     [77.4201, 23.2654],
//     [77.4229, 23.2680]
// ];
// function moveMarker() {
//     marker.setLngLat(route[index]);
//     map.flyTo({ center: route[index], zoom: 14, speed: 0.6 });
//     index++;
//     if (index < route.length) {
//         setTimeout(moveMarker, 1500);
//     }
// }
// setTimeout(moveMarker, 1200);





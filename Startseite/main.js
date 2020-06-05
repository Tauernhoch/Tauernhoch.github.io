//let mapdiv = document.querySelector("#map");
let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47.0748663672, 12.695247219],
    zoom: 8,
    layers: [
        startLayer
        // L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        //     maxZoom: 17,
        //     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>tributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https:/ntopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        // })
    ]
});

let overlay = {
    borders: L.featureGroup(),
}

L.control.layers({
    "BasemapAT.grau": startLayer,
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Nationalpark Hohe Tauern": overlay.borders
}).addTo(map); 

let aussengrenze = L.geoJSON(GRENZE).addTo(overlay.borders);
overlay.borders.addTo(map);

//let ausengrenzen = L.geoJson(ausendata).addTo(map);


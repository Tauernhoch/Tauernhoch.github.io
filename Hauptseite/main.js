let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47.17971944, 12.181495],
    zoom: 11,
    layers: [
        startLayer
    ]
});

let bikekGroup = L.featureGroup().addTo(map);

let overlay = {
    borders: L.featureGroup(),
    ebikes: L.featureGroup(),
    Hoch_Tirol: L.featureGroup(),
    Großglockner:L.featureGroup(),
    Skitour: L.featureGroup(),
    Hütten: L.featureGroup()
}


L.control.layers({
    "BasemapAT.grau": startLayer,
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Nationalpark Hohe Tauern": overlay.borders,
     "E-Bike Routen": overlay.ebikes,
     "Wanderweg Hoch Tirol": overlay.Hoch_Tirol,
     "Großglockner Normalweg": overlay.Großglockner,
     "Skitour Großer Geiger": overlay.Skitour,
     "Unterkünfte": overlay.Hütten,
}).addTo(map);


//Maßstab
L.control.scale({
    imperial: false
}).addTo(map);


let aussengrenze = L.geoJSON(GRENZE).addTo(overlay.borders);
overlay.borders.addTo(map);



let radln = L.geoJSON(EBIKE).addTo(overlay.ebikes);
overlay.ebikes.addTo(map);
// console.log(GRENZE);
// console.log(radln);

// let ebike = EBIKE;

// L.geoJson.ajax(ebike, {
//     style: function (feature) {
//         if (feature.properties.FID == "1") {
//             return {
//                 color: "black",
//                 weight: 2,
//                 dashArray: "15 5"
//             };
//         } else {
//             return {
//                 color: "black",
//                 weight: 2,
//                 dashArray: "1 5"
//             };
//         }
//     },
//     onEachFeature: function (feature, layer) {
//         layer.bindPopup(`<p>${feature.properties.BEZ_TEXT}</p>`);
//     }
// }).addTo(Ma);

let gpx = new L.GPX(`Glockner.gpx`, {
    async: true,
    polyline_options: {
        color: "red",
        dashArray: [2, 5]
    }
});
gpx.on("loaded", function(evt) {
    map.fitBounds(evt.target.getBounds());
}).addTo(overlay.Großglockner);

// let gpx5 = new L.GPX(`venediger_nordgrat_track`, {
//     async: true,
//     polyline_options: {
//         color: "yellow",
//         dashArray: [2, 5]
//     }
// });
// gpx5.on("loaded", function(evt) {
//     map.fitBounds(evt.target.getBounds());
// }).addTo(map);


let gpx2 = new L.GPX(`Hoch_Tirol/TK_01_Hoch_Tirol_3.gpx`, {
    async: true,
    polyline_options: {
        color: "black",
        dashArray: [2, 5]
    }
});
gpx2.on("loaded", function(evt) {
    map.fitBounds(evt.target.getBounds());
}).addTo(overlay.Hoch_Tirol);

let gpx3 = new L.GPX(`Skitour/TK_02_GrosserGeiger.gpx`, {
    async: true,
    polyline_options: {
        color: "black",
        dashArray: [2, 5]
    }
});
gpx3.on("loaded", function(evt) {
    map.fitBounds(evt.target.getBounds());
}).addTo(overlay.Skitour);



let gpx4 = new L.GPX("OEAV_Berghuetten.gpx", {
    async: true,
   
    
    
});
gpx4.on("loaded", function(evt) {
    let marker = L.marker([lon,lat])
    map.fitBounds(evt.target.getBounds());
}).addTo(map).addTo(overlay.Hütten);

// let sight = L.geoJson(SIGHT, {
//     pointToLayer: function(point, latlng) {
//         let marker = L.marker(latlng);
//         console.log("Point", point);
//         marker.bindPopup(`<h3>${point.properties.NAME}</h3>
//         `);
//         return marker;
//     }
L.marker([lat,lng]).addTo(map);


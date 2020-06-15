let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47, 12.5],
    zoom: 11,
    layers: [
        startLayer
    ]
});


//let bikekGroup = L.featureGroup().addTo(map);

let overlay = {
    borders: L.featureGroup(),
    ebikes: L.featureGroup(),
    Hoch_Tirol: L.featureGroup(),
    Großglockner: L.featureGroup(),
    Skitour: L.featureGroup(),
    Huetten: L.featureGroup()
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
    "Unterkünfte": overlay.Huetten,
}).addTo(map);


//Maßstab
L.control.scale({
    imperial: false
}).addTo(map);


let aussengrenze = L.geoJSON(GRENZE).addTo(overlay.borders);
// overlay.borders.addTo(map);


//ebike Routen
let radln = L.geoJSON(BIKE,{
    color: "yellow",
    }).addTo(overlay.ebikes);
overlay.ebikes.addTo(map);

//console.log (EBIKE)


let gpx = new L.GPX(`Glockner.gpx`, {
    async: true,
    marker_options: {
        startIconUrl: 'icons/climbing.png',
        endIconUrl: 'icons/climbing.png',

    },
    polyline_options: {
        color: "red",
        dashArray: [2, 5]
    }
});
gpx.on("loaded", function (evt) {

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
    marker_options: {


        startIconUrl: 'icons/hiking2.png',
        endIconUrl: 'icons/hiking2.png',
        shadowUrl: null,
        iconSize: [1, 37],
    },

    polyline_options: {
        color: "black",
        dashArray: [2, 5]
    }
});
gpx2.on("loaded", function (evt) {
    map.fitBounds(evt.target.getBounds());


}).addTo(overlay.Hoch_Tirol);

let gpx3 = new L.GPX(`Skitour/TK_02_GrosserGeiger.gpx`, {
    async: true,
    marker_options: {
        startIconUrl: 'icons/skiing.png',
        endIconUrl: 'icons/skiing.png',
    },
    polyline_options: {
        color: "black",
        dashArray: [2, 5]
    }
});
gpx3.on("loaded", function (evt) {

}).addTo(overlay.Skitour);






let gpx4 = new L.GPX("OEAV_Berghuetten.gpx", {
    async: true,
    // marker_options: {
    //     IconUrl: 'icons/hut.png',
    pointToLayer: function (point, latlng) {
        let siteIcon2 = L.icon({
            iconUrl: 'icons/hut.png',
            iconSize: [32, 32]
        });
        let marker = L.marker(latlng, {
            icon: siteIcon2
        });
    }
});

gpx4.on("loaded", function (evt) {
    let marker = L.marker([lat, lng])
    map.fitBounds(evt.target.getBounds());
}).addTo(overlay.Huetten);

//     }
// });
// gpx4.on("loaded", function (evt) {
//     let marker = L.marker([lat,lng])
//     map.fitBounds(evt.target.getBounds());
// }).addTo(overlay.Hütten);







// let myIcon = L.icon({
//     iconUrl: 'icons/hut.png',
//     iconSize: [20, 38],
//     iconAnchor: [0, 0],
//     // popupAnchor: [-3, -76],

// });



let huetten = L.GPX("OEAV_Berghuetten.gpx", {
    async: true,
    marker_options: {
        wptIconUrls: {
            'name': 'icons/hut.png',

        },

    }
})
huetten.on('loaded', function (e) {
    var gpx = e.target;
    // map.fitBounds(gpx.getBounds());
}).addTo(map);

//   https://github.com/mpetazzoni/leaflet-gpx
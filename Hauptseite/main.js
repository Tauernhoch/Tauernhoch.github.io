let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47, 12.5],
    zoom: 9,
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
    Huetten: L.featureGroup(),
    lehre: L.featureGroup()
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
    
    "Bergsteigen": overlay.Großglockner,
    "Skitour Großer Geiger": overlay.Skitour,
    "Unterkünfte": overlay.Huetten,
    "Lehrwege": overlay.lehre,
}).addTo(map);


//Maßstab
L.control.scale({
    imperial: false
}).addTo(map);


let aussengrenze = L.geoJSON(GRENZE).addTo(overlay.borders);
// overlay.borders.addTo(map);


//ebike Routen
let radln = L.geoJSON(BIKE, {
    color: "yellow",
}).addTo(overlay.ebikes);
overlay.ebikes.addTo(map);

//ebike Routen
// let lehr = L.geoJSON(LEHRWEG, {
//     color: "green",
// }).addTo(map);
// // overlay.lehre.addTo(map);


//zu ebikes noch Infos als Marker hinzufügen möglich?

//console.log (EBIKE)


//Großglockner Normalweg


let gpx5 = new L.GPX(`venediger_nordgrat_track.gpx`, {
    async: true,
    marker_options: {
        startIconUrl: 'icons/climbing.png',
        endIconUrl: 'icons/climbing.png'},
        iconSize: [1, 37],
    polyline_options: {
        color: "red",
        dashArray: [2, 5]
    }
});
gpx5.on("loaded", function(evt) {
    // map.fitBounds(evt.target.getBounds());
}).addTo(overlay.Großglockner);



let gpx = new L.GPX(`Glockner.gpx`, {
    async: true,
    marker_options: {
        startIconUrl: 'icons/climbing.png',
        endIconUrl: 'icons/climbing.png',
    },
    polyline_options: {
        color: "red",
        dashArray: [2, 5]
    },
    pointToLayer: function (point, latlng) {
        let siteIcon2 = L.icon({
            iconUrl: 'icons/hut.png',
            iconSize: [32, 32]
        });
        // let marker = L.marker(latlng, {
        //     icon: siteIcon2
        // }).bindPopup("test");
    }
});

// zweite möglichkeit für den Weg
// let gpx6 = new L.GPX("Glockner.gpx", {
//     async: true,
//   //marker_options: {
//   pointToLayer: function (point, latlng) {
//     //    let siteIcon2 = L.icon({
//     //         iconUrl: 'icons/hut.png',
//     //          iconSize: [32, 32]
//     //});
//          let marker = L.marker(latlng, {
//              //icon: siteIcon2
//          });
//      }
//  });

//  gpx6.on("loaded", function (evt) {
//     let marker = L.marker([lat, lng])
//     //map.fitBounds(evt.target.getBounds());
// }).addTo(overlay.Großglockner);




// new L.GPX("Glockner.gpx", {
//     async: true,
//     marker_options: {
//       wptIconUrls: {
//         '': 'icons/hut.png',
//       },
//   shadowUrl: 'http://github.com/mpetazzoni/leaflet-gpx/raw/master/pin-shadow.png'
//     }
//   }).on('loaded', function (e) {
//    let gpx = e.target;
//     //map.fitBounds(gpx.getBounds());
//   }).addTo(overlay.Großglockner);
//   overlay.Großglockner.addTo(map);



//extremer Zoom liegt glaube ich an folgendem Absatz mit den fitBounds und der Control Elevation... 
//ist bisschen blöd, weil ich nen Überblick cool fände, auf der anderen Seite können wirs im Bericht bestimmt auch begründen
gpx.on("loaded", function (evt) {
    map.fitBounds(evt.target.getBounds());
    controlElevation.clear();
    controlElevation.load(`Glockner.gpx`);
}).addTo(overlay.Großglockner);

overlay.Großglockner.addTo(map);

//Elevation Control müssen wir nicht lassen, v.a. weil ich nicht weiß, ob sich das evtl. an- und ausschalten lassen kann, dass des nicht immer da ist
let controlElevation = L.control.elevation({
    theme: "steelblue-theme",
    detached: true, 
    elevationDiv: "#profile",
    followMarker: false
}).addTo(map);








let gpx14 = new L.GPX(`Hoch_Tirol/TK_01_Hoch_Tirol_1.gpx`, {
    async: true,
    marker_options: {


        startIconUrl: 'icons/hiking2.png',
        endIconUrl: 'icons/hiking2.png',
        shadowUrl: null,
        // iconSize: [100, 37],
    },

    polyline_options: {
        color: "black",
        dashArray: [2, 5]
    }
// });
// gpx11.on("loaded", function (evt) {

}).addTo(overlay.Hoch_Tirol);
overlay.Hoch_Tirol.addTo(map);

let gpx13 = new L.GPX(`Hoch_Tirol/TK_01_Hoch_Tirol_2.gpx`, {
    async: true,
    marker_options: {


        startIconUrl: 'icons/hiking2.png',
        endIconUrl: 'icons/hiking2.png',
        shadowUrl: null,
        // iconSize: [100, 37],
    },

    polyline_options: {
        color: "black",
        dashArray: [2, 5]
    }
// });
// gpx11.on("loaded", function (evt) {

}).addTo(overlay.Hoch_Tirol);
overlay.Hoch_Tirol.addTo(map);


//Wanderweg Hoch Tirol
let gpx2 = new L.GPX(`Hoch_Tirol/TK_01_Hoch_Tirol_3.gpx`, {
    async: true,
    marker_options: {


        startIconUrl: 'icons/hiking2.png',
        endIconUrl: 'icons/hiking2.png',
        shadowUrl: null,
        // iconSize: [100, 37],
    },

    polyline_options: {
        color: "black",
        dashArray: [2, 5]
    }


}).addTo(overlay.Hoch_Tirol);
overlay.Hoch_Tirol.addTo(map);


//Wanderweg Hoch Tirol
let gpx22 = new L.GPX(`Hoch_Tirol/TK_01_Hoch_Tirol_4.gpx`, {
    async: true,
    marker_options: {


        startIconUrl: 'icons/hiking2.png',
        endIconUrl: 'icons/hiking2.png',
        shadowUrl: null,
        // iconSize: [100, 37],
    },

    polyline_options: {
        color: "black",
        dashArray: [2, 5]
    }


}).addTo(overlay.Hoch_Tirol);
overlay.Hoch_Tirol.addTo(map);






let gpx12 = new L.GPX(`Hoch_Tirol/TK_01_Hoch_Tirol_5.gpx`, {
    async: true,
    marker_options: {


        startIconUrl: 'icons/hiking2.png',
        endIconUrl: 'icons/hiking2.png',
        shadowUrl: null,
        // iconSize: [100, 37],
    },

    polyline_options: {
        color: "black",
        dashArray: [2, 5]
    }
// });
// gpx11.on("loaded", function (evt) {

}).addTo(overlay.Hoch_Tirol);
overlay.Hoch_Tirol.addTo(map);






let gpx10 = new L.GPX(`Hoch_Tirol/TK_01_Hoch_Tirol_6.gpx`, {
    async: true,
    marker_options: {


        startIconUrl: 'icons/hiking2.png',
        endIconUrl: 'icons/hiking2.png',
        shadowUrl: null,
        // iconSize: [100, 37],
    },

    polyline_options: {
        color: "black",
        dashArray: [2, 5]
    }
});
gpx10.on("loaded", function (evt) {
}).addTo(overlay.Hoch_Tirol);
overlay.Hoch_Tirol.addTo(map);


// let gpx3 = new L.GPX(`Skitour/TK_02_GrosserGeiger.gpx`, {
//     async: true,
//     marker_options: {
//         startIconUrl: 'icons/skiing.png',
//         endIconUrl: 'icons/skiing.png',
//     },
//     polyline_options: {
//         color: "black",
//         dashArray: [2, 5]
//     }
// });
// gpx3.on("loaded", function (evt) {

// }).addTo(overlay.Skitour);






// let gpx4 = new L.GPX("OEAV_Berghuetten.gpx", {
//     async: true,
//     // marker_options: {
//     //     IconUrl: 'icons/hut.png',
//     pointToLayer: function (point, latlng) {
//         // let siteIcon2 = L.icon({
//         //     iconUrl: 'icons/hut.png',
//         //     iconSize: [32, 32]
//         // });
//         let marker = L.marker(latlng, {
//             //icon: siteIcon2
//         });
//     }
// });

// gpx4.on("loaded", function (evt) {
//     let marker = L.marker([lat, lng])
//     //map.fitBounds(evt.target.getBounds());
// }).addTo(overlay.Huetten);



new L.GPX("OEAV_Berghuetten.gpx", {
    async: true,
    marker_options: {
      wptIconUrls: {
        '': 'icons/hut.png',
      },
      shadowUrl: 'http://github.com/mpetazzoni/leaflet-gpx/raw/master/pin-shadow.png'
    }
  }).on('loaded', function (e) {
    var gpx = e.target;
    //map.fitBounds(gpx.getBounds());
  }).addTo(overlay.Huetten);
//   overlay.Huetten.addTo(map);

//   https://github.com/mpetazzoni/leaflet-gpx
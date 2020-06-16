let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47, 12.75],
    zoom: 10,
    layers: [
        startLayer
    ]
});

let hutGroup = L.markerClusterGroup().addTo(map);


let overlay = {
    // hutGroup = L.featureGroup(),
    borders: L.featureGroup(),
    ebikes: L.featureGroup(),
    Hoch_Tirol: L.featureGroup(),
    Huetten: L.featureGroup(),
    Großglockner: L.featureGroup(),

    SIGHT: L.featureGroup()
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
    "Unterkünfte": hutGroup,
    "Nationalpark Hohe Tauern": overlay.borders,
    "E-Bike Routen": overlay.ebikes,
    "Wanderweg Hoch Tirol": overlay.Hoch_Tirol,
    "Bergsteigen": overlay.Großglockner,
    "Unterkünfte": overlay.Huetten,
    "Kirchen und Mühlen": overlay.SIGHT,
}).addTo(map);


//Maßstab
L.control.scale({
    imperial: false
}).addTo(map);


let aussengrenze = L.geoJSON(GRENZE).addTo(overlay.borders);
overlay.borders.addTo(map);


//ebike Routen
let radln = L.geoJSON(BIKE, {
    color: "brown",
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.NAME_DE}</h3>
        <li>Streckenlänge: ${feature.properties.SHAPE_LEN} m</li>  `);

    }
}).addTo(overlay.ebikes);
overlay.ebikes.addTo(map);




let gpx5 = new L.GPX(`venediger_nordgrat_track.gpx`, {
    async: true,
    marker_options: {
        startIconUrl: 'icons/climbing.png',
        endIconUrl: 'icons/climbing.png'
    },
    iconSize: [32, 32],
    polyline_options: {
        color: "red",
        dashArray: [2, 5]
    }
});
gpx5.on("loaded", function (evt) {
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





//extremer Zoom liegt glaube ich an folgendem Absatz mit den fitBounds und der Control Elevation... 
//ist bisschen blöd, weil ich nen Überblick cool fände, auf der anderen Seite können wirs im Bericht bestimmt auch begründen
gpx.on("loaded", function (evt) {
    // map.fitBounds(evt.target.getBounds());
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
         iconSize: [37, 37],
         
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
gpx10.on("loaded", function (evt) {}).addTo(overlay.Hoch_Tirol);
overlay.Hoch_Tirol.addTo(map);



let unterk = L.geoJson(Huetten, {
    pointToLayer: function (point, latlng) {
        let siteIcon = L.icon({
            iconUrl: 'icons/hut2.png',
            iconSize: [32, 32]
        });

        let marker = L.marker(latlng, {
            icon: siteIcon
        });
        marker.bindPopup(`
        <h3>${point.properties.NAME}</h3>
        <li>Seehöhe: ${point.properties.SEEHOEHE} m</li>
        <li>Land: ${point.properties.LAND}</li>
        `);
        return marker;
    }
    // }).addTo(overlay.Huetten);
    // overlay.Huetten.addTo(map);

}).addTo(hutGroup)
// hutGroup.addTo(overlay)

unterk.on("data:loaded", function () {
    hutGroup.addLayer(unterk);
    console.log('data loaded!');
    // map.fitBounds(hutGroup.getBounds());
});


let wf = L.geoJson(SIGHT, {
    pointToLayer: function (point, latlng) {
        let siteIcon = L.icon({
            iconUrl: 'icons/prayer.png',
            iconSize: [32, 32]
        });

        let marker = L.marker(latlng, {
            icon: siteIcon
        });
        marker.bindPopup(`
        <h3>${point.properties.NAME}</h3>
        <li>Seehöhe: ${point.properties.SEEHOEHE} m</li>
        <li>Land: ${point.properties.LAND}</li>
        `);
        return marker;
    }
}).addTo(overlay.SIGHT);
overlay.SIGHT.addTo(map);
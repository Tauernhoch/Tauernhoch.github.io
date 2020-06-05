let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47.17971944, 12.181495],
    zoom: 11,
    layers: [
        startLayer
    ]
});

L.control.layers({
    "BasemapAT": startLayer,
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])


    // ebike
    let sightUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPAZIERPUNKTOGD &srsName=EPSG:4326&outputFormat=json";

    let sights = L.geoJson.ajax(sightUrl, { //Punkte als Marker setzen
        pointToLayer: function (point, latlng) { //definiton der MArker
            let icon = L.icon({
                iconUrl: 'Icons/sight.svg',
                iconSize: [32, 32]
            });
            let marker = L.marker(latlng, {
                icon: icon
            });
    
    
            // name, adresse, kurzbeschreibung und link
            marker.bindPopup(`<h3>${point.properties.NAME}</h3>  
            <p><c>Adresse:</c>${point.properties.ADRESSE}<p>
            <p><c>Kurzbeschreibung:</c>${point.properties.BEMERKUNG}<p>
            <p><a target="links" href="${point.properties.WEITERE_INF}">weiterführende Informationen</a></p>`);
            return marker;
        }
    });
    





}).addTo(map);
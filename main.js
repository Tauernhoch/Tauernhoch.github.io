let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [47.0748663672 , 12.695247219 ],
    zoom: 8,
    layers: [
        startLayer
    ]
});



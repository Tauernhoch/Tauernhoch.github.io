let mapdiv = document.querySelector("#map");

let map = L.map("map", {
    center: [47.0748663672 , 12.695247219 ],
    zoom: 8,
    layers: [
        L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
             maxZoom: 17,
             attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>tributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https:/ntopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
         })
     ]
 }); 



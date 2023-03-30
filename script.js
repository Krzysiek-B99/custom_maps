
async function postData(url = '', data) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: data // body data type must match "Content-Type" header
  });
}

function addMarkerFromDB(x,Title,Desc,Pic) {
  console.log(x)
  const marker = new L.Marker(x, {
  })
  .bindPopup(`<ul class="list-group">
  <li class="list-group-item" id="Title"><b>${Title}</b></li>
  <li class="list-group-item" id="Dsc"><i>${Desc}</i></li>
  <li class="list-group-item" id="Pic"><img src='${Pic}'/></li>
  <li class="list-group-item">${x}</li>
	</ul>
  <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
  editableLayers.addLayer(marker);
  marker.on("popupopen", updatePopup);
}

function addRectangleFromDB(x,Title,Desc,Pic) {

    const rect = new L.Rectangle(x)
    .bindPopup(`<ul class="list-group">
    <li class="list-group-item" id="Title"><b>${Title}</b></li>
    <li class="list-group-item" id="Dsc"><i>${Desc}</i></li>
    <li class="list-group-item" id="Pic"><img src='${Pic}'/></li>
    </ul>
    <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
    editableLayers.addLayer(rect);   
    rect.on("popupopen", updatePopup);  
  }

function addPolylineFromDB(x,Title,Desc,Pic) {

    const polyline = new L.Polyline(x)
    .bindPopup(`<ul class="list-group">
    <li class="list-group-item" id="Title"><b>${Title}</b></li>
    <li class="list-group-item" id="Dsc"><i>${Desc}</i></li>
    <li class="list-group-item" id="Pic"><img src='${Pic}'/></li>
    </ul>
    <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
    editableLayers.addLayer(polyline);
    polyline.on("popupopen", updatePopup);
}

function addPolygoneFromDB(x,Title,Desc,Pic) {

    const polygon = new L.Polygon(x, {
      allowIntersection: false,
    })
    .bindPopup(`<ul class="list-group">
    <li class="list-group-item" id="Title"><b>${Title}</b></li>
    <li class="list-group-item" id="Dsc"><i>${Desc}</i></li>
    <li class="list-group-item" id="Pic"><img src='${Pic}'/></li>
    </ul>
    <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
    editableLayers.addLayer(polygon);
    polygon.on("popupopen", updatePopup);
}

function addCirlceFromDB(x,r,Title,Desc,Pic) {

    const circle = new L.Circle(x, r)
    .bindPopup(`<ul class="list-group">
    <li class="list-group-item" id="Title"><b>${Title}</b></li>
    <li class="list-group-item" id="Dsc"><i>${Desc}</i></li>
    <li class="list-group-item" id="Pic"><img src='${Pic}'/></li>
    <li class="list-group-item">${x}</li>
    <li class="list-group-item">Radius(m): ${r}</li>
    </ul>
    <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
    editableLayers.addLayer(circle);
    circle.on("popupopen", updatePopup);
}

//=====================================================FETCH===========================================

function addObjectsFromSingleMap(obj){
  for (var i = 0; i < obj.points.length; i++) {
    var latlng =([parseFloat(obj.points[i].latitude), parseFloat(obj.points[i].longitude)])
    addMarkerFromDB(latlng,obj.points[i].title,obj.points[i].description,obj.points[i].picture);
    console.log(obj.points[i].picture)
  }
  for (var i = 0; i < obj.rectangles.length; i++) {
    var bounds=[];
    bounds.push([parseFloat(obj.rectangles[i].northEast[0]), parseFloat(obj.rectangles[i].northEast[1])])
    bounds.push([parseFloat(obj.rectangles[i].southWest[0]), parseFloat(obj.rectangles[i].southWest[1])])
      
    addRectangleFromDB(bounds,obj.rectangles[i].title,obj.rectangles[i].description,obj.rectangles[i].picture);
  }
  for (var i = 0; i < obj.polylines.length; i++) {
    var latlng=[];
    for (var j = 0; j < obj.polylines[i].latitudes.length; j++){
      latlng.push([parseFloat(obj.polylines[i].latitudes[j]), parseFloat(obj.polylines[i].longitudes[j])])
      
    }
    addPolylineFromDB(latlng,obj.polylines[i].title,obj.polylines[i].description,obj.polylines[i].picture);
  }
  for (var i = 0; i < obj.circles.length; i++) {
    var latlng =([parseFloat(obj.circles[i].centerLatitude), parseFloat(obj.circles[i].centerLongitude)])
    let radius = parseFloat(obj.circles[i].radius)
    addCirlceFromDB(latlng,radius,obj.circles[i].title,obj.circles[i].description,obj.circles[i].picture);
  }
  for (var i = 0; i < obj.polygones.length; i++) {
    var latlng=[];
    for (var j = 0; j < obj.polygones[i].latitudes.length; j++){
      latlng.push([parseFloat(obj.polygones[i].latitudes[j]), parseFloat(obj.polygones[i].longitudes[j])])
      
    }
    addPolygoneFromDB(latlng,obj.polygones[i].title,obj.polygones[i].description,obj.polygones[i].picture);
  }
  document.getElementById('MapName').value = obj.title;
}

// function provideAllMapsId(res){
//   var mapsIndexes =[]
//   for (var i = 0; i < res.length; i++) {
//     mapsIndexes.push(parseFloat(res[i].id))
//   }
//   document.getElementById("mapList").textContent=mapsIndexes;
// }
  
  async function getData(url) {
    const response = await fetch(url)
    const result = await response.json()
    return result;
  }
  async function provideSingleMapData(id){
    const res = await getData(`http://localhost:8080/map/${id}`)
    addObjectsFromSingleMap(res)
  }
  async function provideAllMapsData(){
    const res = await getData('http://localhost:8080/map')
    provideAllMapsId(res)
  }
provideAllMapsData()

////=====================================================MAP MAKER===========================================

const osmMap=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
const darkMap=L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png")
const topoMap=L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png")
  
const map = L.map("map",{layers:[osmMap]}).setView([50, 20], 12);

let baseLayers = {
  Standard: osmMap,
  Dark: darkMap,
  Topo: topoMap
};
L.control.layers(baseLayers).addTo(map);


////=====================================================CHOOSE MAP BY ID===========================================
function chooseMapById(){
  var chooseForm = document.getElementById('idMapInput').value;
  // map.eachLayer( function(layer) {
  //   if(layer instanceof L.Marker || layer instanceof L.Rectangle || layer instanceof L.Polygon || layer instanceof L.Polyline || layer instanceof L.Circle) {
  //       map.removeLayer(layer);
  //   }
  // });
  provideSingleMapData(chooseForm);
}

//=====================================================DRAW OPTIONS===========================================
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var drawControl = new L.Control.Draw({
  position: 'topleft',
  draw:{
    polygon: {
      allowIntersection: false, 
      drawError: {
          color: '#e1e100', 
          message: '<strong>Oh snap!<strong> you can\'t draw that!'
      },
      shapeOptions: {
          
      }
    },
    circlemarker: false
  },
  edit: {
    featureGroup: editableLayers
         }
  }
);
map.addControl(drawControl);

map.on('draw:created', function (e) {
    var type = e.layerType;
    if (type === 'marker') {
	   addMarkerByCoords(e.layer.getLatLng());
    }
    if (type === 'rectangle') {
       addRectangleByBounds(e.layer.getBounds());
    }
    if (type === 'polyline') {
      addPolylineByCoords(e.layer.getLatLngs());
    }
    if (type === 'polygon') {
     addPolygoneByCoords(e.layer.getLatLngs());
    }
    if (type === 'circle') {
      addCirlceByCoords(e.layer.getLatLng(),e.layer.getRadius());
     }
});
map.on('draw:edited', function (e) {
  var layers = e.layers;
  layers.eachLayer(function (layer) {
    if(layer instanceof L.Marker) {
      dragedMaker(layer);
    }
    if(layer instanceof L.Circle) {
      dragedCircle(layer);
    }
  });
});

//========================================================ADD OBJECTS=================================================

function addMarkerByCoords(x) {

  const marker = new L.Marker(x, {
  })
	.bindPopup(`<ul class="list-group">
  <li class="list-group-item" id="Title"><b>Title</b></li>
  <li class="list-group-item" id="Dsc"><i>Description</i></li>
  <li class="list-group-item" id="Pic"><img src='${ImgForm}'/></li>
  <li class="list-group-item">${x.lat},${x.lng}</li>
	</ul>
  <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
  // .bindPopup(`<ul>
  // <li><button type="button" class="editPopup">edit popup</button></li>
  // <li id="Title">Tytul</li>
  // <li id="Dsc">Opis</li>
	// <li id="Pic"><img src='${ImgForm}'/></li>
  // <li>${x.lat},${x.lng}</li>
	// </ul>`);
  editableLayers.addLayer(marker);
  marker.on("popupopen", updatePopup);
}

function addRectangleByBounds(x) {

    const rect = new L.Rectangle(x)
      .bindPopup(`<ul class="list-group">
      <li class="list-group-item" id="Title"><b>Title</b></li>
      <li class="list-group-item" id="Dsc"><i>Description</i></li>
      <li class="list-group-item" id="Pic"><img src='${ImgForm}'/></li>
      </ul>
      <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
    editableLayers.addLayer(rect);   
    rect.on("popupopen", updatePopup);  
  }

function addPolylineByCoords(x) {

    const polyline = new L.Polyline(x)
      .bindPopup(`<ul class="list-group">
      <li class="list-group-item" id="Title"><b>Title</b></li>
      <li class="list-group-item" id="Dsc"><i>Description</i></li>
      <li class="list-group-item" id="Pic"><img src='${ImgForm}'/></li>
      </ul>
      <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
    editableLayers.addLayer(polyline);
    polyline.on("popupopen", updatePopup);
}

function addPolygoneByCoords(x) {

    const polygon = new L.Polygon(x, {
      allowIntersection: false,
    })
      .bindPopup(`<<ul class="list-group">
      <li class="list-group-item" id="Title"><b>Title</b></li>
      <li class="list-group-item" id="Dsc"><i>Description</i></li>
      <li class="list-group-item" id="Pic"><img src='${ImgForm}'/></li>
      </ul>
      <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
    editableLayers.addLayer(polygon);
    polygon.on("popupopen", updatePopup);
}

function addCirlceByCoords(x,r) {

    const circle = new L.Circle(x, r)
      .bindPopup(`<ul class="list-group">
      <li class="list-group-item" id="Title"><b>Title</b></li>
      <li class="list-group-item" id="Dsc"><i>Description</i></li>
      <li class="list-group-item" id="Pic"><img src='${ImgForm}'/></li>
      <li class="list-group-item">${x}</li>
      <li class="list-group-item">Radius(m): ${r}</li>
      </ul>
      <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
    editableLayers.addLayer(circle);
    circle.on("popupopen", updatePopup);
}

//========================================================UPDATE POPUP=================================================

function updatePopup() {
  const obj = this;  
  const btn = document.querySelector("#editPopup");
  btn.addEventListener("click", function () {
    showForm(obj)
  });
}

function showForm(obj){
  document.getElementById("TitleForm").value = getTitle(obj);
  document.getElementById("DescForm").value = getDesc(obj);
  document.getElementById("ImgForm").value = getPic(obj);
  document.getElementById("popupForm").style.display="block";
  document.getElementById("confirmPopup").onclick = function(){changePopup(obj)};
  map.closePopup()
}

function hidePopupForm(){
  document.getElementById("popupForm").style.display="none";
}

function changePopup(obj){
 let title = document.getElementById('TitleForm').value;
 let desc = document.getElementById('DescForm').value;
 let img = document.getElementById('ImgForm').value;

   if (obj instanceof L.Marker) {
    // obj.bindPopup(`<ul>
    // <li><button type="button" class="editPopup">edit popup</button></li>
    // <li id="Title">${title}</li>
    // <li id="Dsc">${desc}</li>
    // <li id="Pic"><img src='${img}'/></li>
    // <li>${obj.getLatLng()}</li>
    // </ul>`);
    obj.bindPopup(`<ul class="list-group">
  <li class="list-group-item" id="Title"><b>${title}</b></li>
  <li class="list-group-item" id="Dsc"><i>${desc}</i></li>
  <li class="list-group-item" id="Pic"><img src='${img}'></img></li>
  <li class="list-group-item">${obj.getLatLng().lat},${obj.getLatLng().lng}</li>
	</ul>
  <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
   }
   else if (obj instanceof L.Rectangle) {
     obj.bindPopup(`<ul class="list-group">
     <li class="list-group-item" id="Title"><b>${title}</b></li>
     <li class="list-group-item" id="Dsc"><i>${desc}</i></li>
     <li class="list-group-item" id="Pic"><img src='${img}'></img></li>
     </ul>
     <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
   }
   else if (obj instanceof L.Polyline) {
     obj.bindPopup(`<ul class="list-group">
     <li class="list-group-item" id="Title"><b>${title}</b></li>
     <li class="list-group-item" id="Dsc"><i>${desc}</i></li>
     <li class="list-group-item" id="Pic"><img src='${img}'></img></li>
     </ul>
     <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
   }
   else if (obj instanceof L.Polygon) {
     obj.bindPopup(`<ul class="list-group">
     <li class="list-group-item" id="Title"><b>${title}</b></li>
     <li class="list-group-item" id="Dsc"><i>${desc}</i></li>
     <li class="list-group-item" id="Pic"><img src='${img}'></img></li>
     </ul>
     <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
   }
   else if (obj instanceof L.Circle) {
     obj.bindPopup(`<ul class="list-group">
     <li class="list-group-item" id="Title"><b>${title}</b></li>
     <li class="list-group-item" id="Dsc"><i>${desc}</i></li>
     <li class="list-group-item" id="Pic"><img src='${img}'></img></li>
     <li class="list-group-item">${obj.getLatLng()}</li>
     <li class="list-group-item">Radius(m): ${obj.getRadius()}</li>
     </ul>
     <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
   }

 document.getElementById("popupForm").style.display="none";
 map.closePopup()

}
  //==================================================GET DATA FROM POPUP=======================================================


function getTitle(layer){
  let popup = layer.getPopup().getContent()

  let TitleStart = popup.indexOf("b",popup.indexOf("Title"))+2
  let TitleEnd = popup.indexOf("/",popup.indexOf("Title"))-1
  let Title = popup.substring(TitleStart,TitleEnd)
  
    return Title
}
function getDesc(layer){
  let popup = layer.getPopup().getContent()

  let DescStart = popup.indexOf("i",popup.indexOf("Dsc"))+2
  let DescEnd = popup.indexOf("/",popup.indexOf("Dsc"))-1
  let Desc = popup.substring(DescStart,DescEnd)

  return Desc
}
function getPic(layer){
  let popup = layer.getPopup().getContent()

  let PicStart = popup.indexOf("'",popup.indexOf("src"))+1
  let PicEnd = popup.indexOf(">",popup.indexOf("src"))-1
  let Pic = popup.substring(PicStart,PicEnd)

  return Pic
}

  //=========================================================================================================


function dragedMaker(marker) {

  marker.bindPopup(`<ul class="list-group">
  <li class="list-group-item" id="Title"><b>${getTitle(marker)}</b></li>
  <li class="list-group-item" id="Dsc"><i>${getDesc(marker)}</i></li>
  <li class="list-group-item" id="Pic"><img src='${getPic(marker)}'/></li>
  <li class="list-group-item">${marker.getLatLng().toString()}</li>
	</ul>
  <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
}
function dragedCircle(circle) {

  circle.bindPopup(`<ul class="list-group">
  <li class="list-group-item" id="Title"><b>${getTitle(circle)}</b></li>
  <li class="list-group-item" id="Dsc"><i>${getDesc(circle)}</i></li>
  <li class="list-group-item" id="Pic"><img src='${getPic(circle)}'/></li>
  <li class="list-group-item">${circle.getLatLng().toString()}</li>
  <li class="list-group-item">Radius(m): ${circle.getRadius().toString()}</li>
	</ul>
  <button type="button" class="btn btn-primary btn-sm" id="editPopup" >Edit</button>`);
}

function showMapForm(){
  document.getElementById("MapForm").style.display="block";

}
function hideMapForm(){
  document.getElementById("MapForm").style.display="none";
}

function getObjectsData() {

  let points = [];
  let pointsString='';
  let rectangles = [];
  let rectanglesString='';
  let polylines = [];
  let polylinesString='';
  let polygons = [];
  let polygonsString='';
  let circles = [];
  let circlesString='';
  map.eachLayer( function(layer) {
    if(layer instanceof L.Marker) {
      points.push(getTitle(layer),getDesc(layer),getPic(layer),
      layer.getLatLng().lat,layer.getLatLng().lng)
    }
    else if(layer instanceof L.Rectangle) {
      rectangles.push(getTitle(layer),getDesc(layer),getPic(layer),layer.getBounds().getNorthEast().lat,layer.getBounds().getNorthEast().lng,
                                                                   layer.getBounds().getSouthWest().lat,layer.getBounds().getSouthWest().lng)
    }
    else if(layer instanceof L.Polygon) {
      polygons.push(getTitle(layer),getDesc(layer),getPic(layer))
      for(let i=0;i<layer.getLatLngs()[0].length;i++){
        polygons.push(layer.getLatLngs()[0][i].lat,layer.getLatLngs()[0][i].lng)       
      }  
    }
    else if(layer instanceof L.Polyline) {
      polylines.push(getTitle(layer),getDesc(layer),getPic(layer))
      for(let i=0;i<layer.getLatLngs().length;i++){
        polylines.push(layer.getLatLngs()[i].lat,layer.getLatLngs()[i].lng)      
      }    
    }
    
    else if(layer instanceof L.Circle) {
      circles.push(getTitle(layer),getDesc(layer),getPic(layer),layer.getLatLng().lat,layer.getLatLng().lng,layer.getRadius())
    }
  });

  for(let i=0;i<points.length;i+=5){
    pointsString = pointsString +
     `{\"title\":\"${points[i]}\",\"description\":\"${points[i+1]}\",
       \"picture\":\"${points[i+2]}\",\"latitude\":\"${points[i+3]}\",
       \"longitude\":\"${points[i+4]}\"}`
    if(i+5<points.length){
      pointsString = pointsString + ","
    }
  }
  for(let i=0;i<circles.length;i+=6){
    circlesString = circlesString + `{\"title\":\"${circles[i]}\",\"description\":\"${circles[i+1]}\",
                                      \"picture\":\"${circles[i+2]}\",\"centerLatitude\":\"${circles[i+3]}\",
                                      \"centerLongitude\":\"${circles[i+4]}\",\"radius\":\"${circles[i+5]}\"}`
    if(i+6<circles.length){
      circlesString = circlesString + ","
    }
  }
  for(let i=0;i<rectangles.length;i+=7){
    rectanglesString = rectanglesString + `{\"title\":\"${rectangles[i]}\",\"description\":\"${rectangles[i+1]}\",\"picture\":\"${rectangles[i+2]}\",\"northEast\":[${rectangles[i+3]},${rectangles[i+4]}],\"southWest\":[${rectangles[i+5]},${rectangles[i+6]}]}`
    if(i+7<rectangles.length){
      rectanglesString = rectanglesString + ","
    }
  }
  let latitudes = [];
  let longitudes = [];
  let coords = []

  for(let i=0;i<polylines.length;i++){
    if(typeof polylines[i] == 'number'){
        coords.push(i)
    }
  }
  for(let i=0;i<coords.length;i++){
    if(coords[i]==coords[i+1]-1){
      if(i%2==0){
        latitudes.push(polylines[coords[i]])
      }
      else{
        longitudes.push(polylines[coords[i]])
      }
    }
    else{
      longitudes.push(polylines[coords[i]])
      polylinesString = polylinesString +
       `{\"title\":\"${polylines[coords[i]-((latitudes.length)*2+2)]}\",
         \"description\":\"${polylines[coords[i]-((latitudes.length)*2+1)]}\",
         \"picture\":\"${polylines[coords[i]-((latitudes.length)*2)]}\",
         \"latitudes\":[${latitudes}],\"longitudes\":[${longitudes}]}`
      latitudes = []
      longitudes = []
      if(coords[i]<polylines.length-1){
        polylinesString = polylinesString + ","
      }
    }
  }
  
  let latitudesPolygons = [];
  let longitudesPolygons = [];
  let coordsPolygons = []
  for(let i=0;i<polygons.length;i++){
    if(typeof polygons[i] == 'number'){
      coordsPolygons.push(i)
    }
  }
  for(let i=0;i<coordsPolygons.length;i++){
    if(coordsPolygons[i]==coordsPolygons[i+1]-1){
      if(i%2==0){
        latitudesPolygons.push(polygons[coordsPolygons[i]])
      }
      else{
        longitudesPolygons.push(polygons[coordsPolygons[i]])
      }
    }
    else{
      longitudesPolygons.push(polygons[coordsPolygons[i]])
      polygonsString = polygonsString +
       `{\"title\":\"${polygons[coordsPolygons[i]-((latitudesPolygons.length)*2+2)]}\",
         \"description\":\"${polygons[coordsPolygons[i]-((latitudesPolygons.length)*2+1)]}\",
         \"picture\":\"${polygons[coordsPolygons[i]-((latitudesPolygons.length)*2)]}\",
         \"latitudes\":[${latitudesPolygons}],\"longitudes\":[${longitudesPolygons}]}`
         latitudesPolygons = []
         longitudesPolygons = []
      if(coords[i]<polygons.length-1){
        polygonsString = polygonsString + ","
      }
    }
  }
  console.log(polygonsString)
  //console.log(`{\"title\":\"${document.getElementById('MapName').value}\",\"points\":[${pointsString}],\"polylines\":[${polylinesString}],\"polygones\":[${polygonsString}],\"rectangles\":[${rectanglesString}],\"circles\":[${circlesString}]}`)
  JSONFetch =`{\"title\":\"${document.getElementById('MapName').value}\",
              \"email\":\"${document.getElementById('saveInput').value}\",
              \"points\":[${pointsString}],
              \"polylines\":[${polylinesString}],
              \"polygones\":[${polygonsString}],
              \"rectangles\":[${rectanglesString}],
              \"circles\":[${circlesString}]}`                                  
  
  console.log(JSONFetch)
  postData('http://localhost:8080/map',JSONFetch )
  hideMapForm()

}

function zoom2latLng() {
	var inputLat = document.getElementById('lat').value;
	var inputLng = document.getElementById('lng').value;
	var latlng = L.latLng(parseFloat(inputLat),parseFloat(inputLng));

	map.setView(latlng, 18);
};
function addMarkerFromForm() {
	var inputLat = document.getElementById('lat').value;
	var inputLng = document.getElementById('lng').value;
	var latlng = L.latLng(parseFloat(inputLat),parseFloat(inputLng));
	addMarkerByCoords(latlng);
	map.setView(latlng, 15);

};















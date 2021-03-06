
var coordinates = [52.52, 13.41];
var z = 3;
var myMap = L.map("map-id", {
    center: coordinates,
    zoom: z,
    //layers: [baseLayer, resLayer]
});

var baseLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "streets-v9",
    accessToken: API_KEY
}).addTo(myMap);



function plotting_map(coordinates, z) {
    // Adding tile layer


    d3.json("/read_data").then(function (data) {

        var count = Object.keys(data.Name).length
        console.log(count);

        var resMarkers = [];

        for (var i = 0; i < count; i++) {
            var location = [data.Latitude[i], data.Longitude[i]];
            resMarkers.push(
                L.marker(location).bindPopup("<h1>" + data.Name[i] + "<h2>" + data.City[i] + "</h2>" + "</h1>" + "<br>" + "<h3>" + "Cuisine: " + data.Cuisine[i] + "</h3>" + "<h3>" + "Pricing Level: " + data.Price[i] + "</h3>" + "<a href=" + "'" + data.URL[i] + "'" + ">" + "Visit website" + "</a>")
            );
        };



        var resLayer = L.layerGroup(resMarkers).addTo(myMap);

        //var overlayMaps = {
        //   Restaurants: resLayer
        //};

        //Take myMap out and add resLayer to myMap. return center coordinates and zoom in an object 

        var obj = {
            "coordinates": coordinates,
            "zoom": z
        };
        return obj;

    })
};



plotting_map(coordinates, z);



document.body.addEventListener("click", function (e) {
    // e.target was the clicked element

    if (e.target && e.target.nodeName == "A") {
        x = e.target.innerText;
        console.log(x);
        var cdt = [];
        var flag = 0;
        switch (x) {
            case "Los Angeles":
                console.log("Hello");
                cdt = [34.05, -118.24];
                break;
            case "San Francisco":
                console.log("Hello");
                cdt = [37.77, -122.42];
                break;
            case "New York":
                cdt = [40.71, -74.00];
                break;
            case "Chicago":
                cdt = [41.88, -87.63];
                break;
            //case "United Kingdom & Ireland":
            //console.log("Hello");
            //cdt = [33.52, -86.81];
            //break;
            case "Oslo":
                console.log("Hello");
                cdt = [59.91, 10.75];
                break;
            case "Helsinki":
                cdt = [60.17, 24.94];
                break;
            case "Copenhagen":
                cdt = [55.68, 12.57];
                break;
            case "Central & Eastern Europe":
                cdt = [46.06, 14.51];
                flag = 2;
                break;
            case "Rio de Janeiro":
                cdt = [-22.91, -43.71];
                break;
            case "Athens":
                cdt = [37.98, 23.73];
                break;
            case "Bangkok":
                console.log("Hello");
                cdt = [13.75, 100.50];
                break;
            case "Hong Kong":
                cdt = [22.32, 114.17];
                break;
            case "Taipei":
                cdt = [25.03, 121.57];
                break;
            case "Seoul":
                cdt = [37.57, 126.98];
                break;
            case "Singapore":
                cdt = [1.35, 103.82];
                break;
            default:
                cdt = coordinates;
                flag = 1;


        }
        //plotting_map(cdt, 10);
        if (flag == 1) {
            myMap.setView(cdt, 3);
        }
        else if (flag == 2) {
            myMap.setView(cdt, 6);
        }
        else {
            myMap.setView(cdt, 14);
        }



    }

});


var button = d3.select("#enter_cuisine");
button.on("click", runCuisine);

function runCuisine() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#enter_cuisine");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    console.log(inputValue)

    //var filteredData = data.filter(x => x.Cuisine === inputValue);
    //console.log(filteredData);
    
  };
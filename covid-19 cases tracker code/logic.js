// Create a map object
var myMap = L.map("map", {
  center: [30, 0],
  zoom: 2,

});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
}).addTo(myMap);

var jsonFeatures = [];
var json_test = {};
var timer;
var radius;
var radii = [];
var circles = [];

d3.json("data.json", function init(x) {
  console.log(x);

  var totCases = 0;
  var totDeaths = 0;
  var totNewCases = 0;
  var totNewDeaths = 0;
  var totMortRate = 0;

  for ( var i = 0; i < x.length; i++) {
    var Country = x[i].Country;
    var Cases = +x[i].TotalCases;
    var totCases = Cases + totCases;
    var Deaths = +x[i].TotalDeaths;
    var totDeaths = Deaths + totDeaths;
    var NewCases = +x[i].NewCases;
    var totNewCases = NewCases + totNewCases;
    var NewDeaths = +x[i].NewDeaths;
    var totNewDeaths = NewDeaths + totNewDeaths;
    var MortRate = (( +x[i].TotalDeaths / +x[i].TotalCases ) * 100).toFixed(2) + '%';
    var intMortRate = (( +x[i].TotalDeaths / +x[i].TotalCases ));
    var totMortRate = intMortRate + totMortRate;
    

    var coords = [x[i].Latitude, x[i].Longitude]
    
      // Add circles to map


    if (Cases < 10) {
      radius = 500;
    }
    else if (Cases >= 10 && Cases < 50) {
      radius = 700;
    }
    else if (Cases >=50  && Cases < 500) {
      radius = 1500;
    }
    else if (Cases >= 500 && Cases< 5000) {
      radius = 2000;
    }
    else if (Cases >= 5000 && Cases <10000) {
      radius = 3500;
    }

    else if (Cases >= 10000) {
        radius = 5000;
    }

    radii.push(radius);
    console.log(Country, Cases, radius, Deaths, NewCases, NewDeaths, MortRate, coords);
    L.circle(coords, {
    Opacity: 0.40,
    fillOpacity: 0.40,
    color: "white",
    fillColor: "red",
    // Adjust radius
    radius: radius * 100
    }).bindTooltip("<h1>" + Country + "</h1> <hr> <h3>Total Cases: " + Cases + "</h3> <hr> <h3>Mortality Rate: " + MortRate+ "</h3> <hr> <h3>Recent Cases (24h): " + NewCases+ "</h3> <hr><h3>Recent Deaths (24h): " + NewDeaths+ "</h3>").addTo(myMap);
  };
  // d3.json("data_closed_cases.json", function (data){
  //   var data = data
  //   var total_cases = data.map(column => column.TotalCases).reduce(function(a,b){
  //     return a + b
  //   }, 0);
  var weighted_global_mortality = x.map(row=> row.DeathRateXWeight).reduce(function(a,b){
  return a + b}, 0);

  var overallData = {
    "Total COVID-19 Cases: ": totCases.toLocaleString(),
    "Total Deaths from COVID-19: ": totDeaths.toLocaleString(),
    "Total Confirmed Cases [12h]: ": totNewCases.toLocaleString(),
    "Total Confirmed Deaths [12h]: ": totNewDeaths.toLocaleString(),
    "Global Weighted-Average Mortality Rate: ": (weighted_global_mortality * 100).toFixed(3) + "%"
  };
  console.log(overallData);
  var data_location = d3.select("#Global_Data");
  Object.entries(overallData).forEach(([key,value]) =>
    data_location.append('p').html(`<h3>${key}<b><font color="red">${value}</font></b></h3>`));
});

function parsethruJson(json) { 
  for (var k in json) (x => {
  console.log(x[TotalCases])
  });
};




function specifyCountry() {
  d3.json("data.json", function(x) {
    console.log(x);

    for ( var i = 0; i < x.length; i++) {
      var Country = x[i].Country;
      var Cases = +x[i].TotalCases;
      var Deaths = +x[i].TotalDeaths;
      var NewCases = +x[i].NewCases;
      var NewDeaths = +x[i].NewDeaths;
      var Recovered = +x[i].TotalRecovered;
      var MortRate = (( +x[i].TotalDeaths / +x[i].TotalCases) * 100).toFixed(2) + '%';
      var coords = [x[i].Latitude, x[i].Longitude];
      var closedMortRate = ((Deaths / (Deaths + Recovered)) * 100).toFixed(2) + '%';
      var insertedCountry = document.getElementById("country").value;
      // try {
          
      if (insertedCountry == Country)  {
        console.log(Country, Cases, Deaths, NewCases, NewCases, NewDeaths, MortRate,closedMortRate, i);
        var countryData = {
          "Country: ": Country,
          "Total Cases: ": Cases.toLocaleString(),
          "Total Deaths: ": Deaths.toLocaleString(),
          "12h Cases: ": NewCases.toLocaleString(),
          "12h Deaths: ": NewDeaths.toLocaleString(),
          "Current Mortality Rate: ": MortRate,
          "Closed Cases Mortality Rate: ": closedMortRate.toLocaleString()
        };
        console.log(countryData);
        
        $("#Country_Data").empty();

        var data_location = d3.select("#Country_Data");
        Object.entries(countryData).forEach(([key,value]) =>
          data_location.append('p').html(`<h4>${key}<b><font color="red">${value}</font><b></h4>`));
        myMap.flyTo(coords, 5);
      }

    }
    timer = setInterval(function() {returnToCenter()}, 10000);

});}

function returnToCenter() {
  myMap.flyTo([30,0], 2)
  clearInterval(timer);

}

document.getElementById("country")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("filter-btn").click();
    }
});




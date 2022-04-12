// API key from weather API
var APIKey = "901c73df804f3ef17710b144f76aa6c2";

// variable to store city name collected from weather API
var city = "San Diego";

// variable to store current weather data URL and necessary variables
// var cityURL =
//   "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey;

// // fetch API
// fetch(cityURL)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     var latitude = data[0].lat;
//     var longitude = data[0].lon;
//     var coordinatesURL =
//       "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//       latitude +
//       "&lon=" +
//       longitude +
//       "&exclude=hourly,daily" +
//       "&appid=" +
//       APIKey +
//       "&units=imperial";
//     fetch(coordinatesURL)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);

//         var currentTemp = document.getElementById("currentTemp");
//         var currentWind = document.getElementById("currentWind");
//         var currentHumidity = document.getElementById("currentHumidity");
//         var uv = document.getElementById("uv");
//         currentTemp.textContent = data.current.temp;
//         currentWind.textContent = data.current.wind_speed;
//         currentHumidity.textContent = data.current.humidity;
//         uv.textContent = data.current.uvi;
//       });
//   });

var cityInputEl = document.querySelector("#city");
var weatherFormEl = document.querySelector("#weather-form");
var historyButtons = document.querySelector("#history-buttons");

var cities = [];

function renderCities() {
  historyButtons.innerHTML = "";

  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];

    var button = document.createElement("button");
    button.classList.add("history-button");
    button.textContent = city;

    historyButtons.appendChild(button);
  }
}

function init() {
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities) {
    cities = storedCities;
  }

  renderCities();
}

function storeCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityText = cityInputEl.value.trim();

  if (cityText) {
    cityInputEl.value = "";

    var cityURL =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      cityText +
      "&appid=" +
      APIKey;

    // fetch API
    fetch(cityURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        var coordinatesURL =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&exclude=hourly,daily" +
          "&appid=" +
          APIKey +
          "&units=imperial";
        fetch(coordinatesURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);

            var currentTemp = document.getElementById("currentTemp");
            var currentWind = document.getElementById("currentWind");
            var currentHumidity = document.getElementById("currentHumidity");
            var uv = document.getElementById("uv");
            currentTemp.textContent = data.current.temp;
            currentWind.textContent = data.current.wind_speed;
            currentHumidity.textContent = data.current.humidity;
            uv.textContent = data.current.uvi;
          });
      });
  } else {
    alert("Please enter a city");
  }

  if (cityText === "") {
    return;
  }

  cities.push(cityText);

  storeCities();
  renderCities();
};

historyButtons.addEventListener("click", function (event) {
  var element = event.target;

  if (element.matches(".history-button") === true) {
    var city = element.textContent;
    alert(city);
  }
});

weatherFormEl.addEventListener("submit", formSubmitHandler);

var searchBtn = document.getElementById("searchBtn");
var weather = document.getElementById("weather");

searchBtn.addEventListener("click", displayWeather);

function displayWeather() {
  weather.style.display = "flex";
}

init();

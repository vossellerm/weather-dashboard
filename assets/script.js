// // API key from weather API
// var APIKey = "901c73df804f3ef17710b144f76aa6c2";

// // variable to store city name collected from weather API
// var city = "San Diego";

// // variable to store current weather data URL and necessary variables
// var queryURL =
//   "http://api.openweathermap.org/data/2.5/weather?q=" +
//   city +
//   "&appid=" +
//   APIKey;

// // fetch API
// fetch(queryURL)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
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
  } else {
    alert("Please enter a city");
  }

  cities.push(cityText);

  storeCities();
  renderCities();
};

weatherFormEl.addEventListener("submit", formSubmitHandler);

var searchBtn = document.getElementById("searchBtn");
var weather = document.getElementById("weather");

searchBtn.addEventListener("click", displayWeather);

function displayWeather() {
  weather.style.display = "flex";
}

init();

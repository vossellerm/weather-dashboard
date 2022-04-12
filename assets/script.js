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
          "&exclude=hourly" +
          "&appid=" +
          APIKey +
          "&units=imperial";
        fetch(coordinatesURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);

            // current Day
            var city = document.getElementById("cityName");
            var date = new Date();
            var currentDate = document.getElementById("currentDate");
            var currentTemp = document.getElementById("currentTemp");
            var currentWind = document.getElementById("currentWind");
            var currentHumidity = document.getElementById("currentHumidity");
            var uv = document.getElementById("uv");

            city.textContent = cityText;
            currentDate.textContent = moment(
              date,
              "ddd MMM DD YYYY kk:mm:ss zz"
            ).format("(M/D/YYYY)");
            currentTemp.textContent = data.current.temp;
            currentWind.textContent = data.current.wind_speed;
            currentHumidity.textContent = data.current.humidity;
            uv.textContent = data.current.uvi;

            // day 1
            var date1 = document.getElementById("date1");
            var temp1 = document.getElementById("temp1");
            var wind1 = document.getElementById("wind1");
            var humidity1 = document.getElementById("humidity1");

            date1.textContent = moment(data.daily[1].dt, "X").format(
              "M/D/YYYY"
            );
            temp1.textContent = data.daily[1].temp.day;
            wind1.textContent = data.daily[1].wind_speed;
            humidity1.textContent = data.daily[1].humidity;

            // day 2
            var date2 = document.getElementById("date2");
            var temp2 = document.getElementById("temp2");
            var wind2 = document.getElementById("wind2");
            var humidity2 = document.getElementById("humidity2");

            date2.textContent = moment(data.daily[2].dt, "X").format(
              "M/D/YYYY"
            );
            temp2.textContent = data.daily[2].temp.day;
            wind2.textContent = data.daily[2].wind_speed;
            humidity2.textContent = data.daily[2].humidity;

            // day 3
            var date3 = document.getElementById("date3");
            var temp3 = document.getElementById("temp3");
            var wind3 = document.getElementById("wind3");
            var humidity3 = document.getElementById("humidity3");

            date3.textContent = moment(data.daily[3].dt, "X").format(
              "M/D/YYYY"
            );
            temp3.textContent = data.daily[3].temp.day;
            wind3.textContent = data.daily[3].wind_speed;
            humidity3.textContent = data.daily[3].humidity;

            // day 4
            var date4 = document.getElementById("date4");
            var temp4 = document.getElementById("temp4");
            var wind4 = document.getElementById("wind4");
            var humidity4 = document.getElementById("humidity4");

            date4.textContent = moment(data.daily[4].dt, "X").format(
              "M/D/YYYY"
            );
            temp4.textContent = data.daily[4].temp.day;
            wind4.textContent = data.daily[4].wind_speed;
            humidity4.textContent = data.daily[4].humidity;

            // day 5
            var date5 = document.getElementById("date5");
            var temp5 = document.getElementById("temp5");
            var wind5 = document.getElementById("wind5");
            var humidity5 = document.getElementById("humidity5");

            date5.textContent = moment(data.daily[4].dt, "X").format(
              "M/D/YYYY"
            );
            temp5.textContent = data.daily[4].temp.day;
            wind5.textContent = data.daily[4].wind_speed;
            humidity5.textContent = data.daily[4].humidity;
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

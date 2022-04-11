// API key from weather API
var APIKey = "901c73df804f3ef17710b144f76aa6c2";

// variable to store city name collected from weather API
var city = "San Diego";

// variable to store current weather data URL and necessary variables
var queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  APIKey;

// fetch API
fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

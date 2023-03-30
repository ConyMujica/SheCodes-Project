let now = new Date();
let p = document.querySelector("#dayTime");

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

p.innerHTML = `${day} ${hour}:${minutes} `;

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
                    <div class="col-2">
                        <div class="weather-forecast-date">${day}</div>
                        <img src="https://openweathermap.org/img/wn/04d@2x.png" alt="" width="36" />
                        <br>
                        <div class="weather-forecast-temperatures">
                            <span class="weather-forecast-temperature-max">18º</span>
                            <span class="weather-forecast-temperature-min">12º</span>
                        </div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div<`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `97c2f6a3b34509ac62090edc5d18d949`;
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function newSearch(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(newSearch);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "c4ea742bb9bd639a1346b4ed50c2d997";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(newSearch);
}

function searchCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let farenheitElement = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitElement);
}

function convertCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsiusTemperature);

let celsiusTemperature = null;

let searchform = document.querySelector("form");
searchform.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", searchCurrentCity);

search("London");
displayForecast();

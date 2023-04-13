let cityName = document.getElementById("city-name");
let feelsLike = document.getElementById("feels-like");
let currCard = document.querySelector(".current-info");
let detailedInfo = document.querySelector(".detailed-info");
let city = `sevilla`;

async function getCity() {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=81c7026d69634f71bea131013232003&q=${city}&days=7&aqi=no&alerts=no`
  );
  const cityData = await response.json();

  cityName.textContent = `${cityData.location.name}`;
  feelsLike.textContent = cityData.current.condition.text;

  getCurrent(cityData);
}
function getCurrent(cityData) {
  // current temp
  getCurrentTemp(cityData);
  getCurrentIcon(cityData);

  // detailed info
  getCurrentFeelsLike(cityData);
  getCurrentVisibility(cityData);
  getCurrentWindSpd(cityData);
  getCurrentHumidity(cityData);
}
function getCurrentTemp(cityData) {
  // Gets temperature in F for current day
  let curTemp = document.createElement("div");
  curTemp.classList.add("cur-temp");
  currCard.appendChild(curTemp);
  curTemp.textContent = `${cityData.current.temp_f}°`;
}
function getCurrentIcon(cityData) {
  let icon = document.createElement("img");
  icon.classList.add("icon");
  currCard.appendChild(icon);
  icon.src = cityData.current.condition.icon;
}
function getCurrentFeelsLike(cityData) {
  let feelTemp = document.createElement("div");
  detailedInfo.appendChild(feelTemp);
  feelTemp.textContent = `Feels like ${cityData.current.feelslike_f}°F`;
}
function getCurrentVisibility(cityData) {
  let visibility = document.createElement("div");
  detailedInfo.appendChild(visibility);
  visibility.textContent = `Visibility is ${cityData.current.vis_miles} miles`;
}
function getCurrentWindSpd(cityData) {
  let windSpeed = document.createElement("div");
  detailedInfo.appendChild(windSpeed);
  windSpeed.textContent = `Wind ${cityData.current.wind_mph}mph ${cityData.current.wind_dir}`;
}
function getCurrentHumidity(cityData) {
  let humidity = document.createElement("div");
  detailedInfo.appendChild(humidity);
  humidity.textContent = `Humidity ${cityData.current.humidity}%`;
}

getCity();

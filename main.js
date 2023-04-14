let cityName = document.getElementById("city-name");
let feelsLike = document.getElementById("feels-like");
let currCard = document.querySelector(".current-info");
let detailedInfo = document.querySelector(".detailed-info");
const btn = document.getElementById("search-btn");
const input = document.getElementById("search-item");
const form = document.getElementById("form");
let city = `atlanta`;
window.addEventListener("DOMContentLoaded", (e) => {
  getCity();
  btn.addEventListener("click", (e) => {
    city = input.value;
    searchCity(input.value);
    clearForm();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === 13) {
      e.preventDefault();
      console.log("keydown event fired");
      searchCity(input.value);
    }
  });
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchCity(input.value);
  clearForm();
});

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
  clearCurrent();
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
  const curTemp = document.createElement("div");
  curTemp.classList.add("cur-temp");
  currCard.appendChild(curTemp);
  curTemp.textContent = `${cityData.current.temp_f}°`;
}
function getCurrentIcon(cityData) {
  const icon = document.createElement("img");
  icon.classList.add("icon");
  currCard.appendChild(icon);
  icon.src = cityData.current.condition.icon;
}
function getCurrentFeelsLike(cityData) {
  const feelTemp = document.createElement("div");
  detailedInfo.appendChild(feelTemp);
  feelTemp.textContent = `Feels like ${cityData.current.feelslike_f}°F`;
}
function getCurrentVisibility(cityData) {
  const visibility = document.createElement("div");
  detailedInfo.appendChild(visibility);
  visibility.textContent = `Visibility is ${cityData.current.vis_miles} miles`;
}
function getCurrentWindSpd(cityData) {
  const windSpeed = document.createElement("div");
  detailedInfo.appendChild(windSpeed);
  windSpeed.textContent = `Wind ${cityData.current.wind_mph}mph ${cityData.current.wind_dir}`;
}
function getCurrentHumidity(cityData) {
  const humidity = document.createElement("div");
  detailedInfo.appendChild(humidity);
  humidity.textContent = `Humidity ${cityData.current.humidity}%`;
}
function searchCity(search) {
  city = `${search}`;

  getCity();
}
function clearCurrent() {
  currCard.innerHTML = "";
  detailedInfo.innerHTML = "";
  detailedInfo = document.createElement("div"); // create new detailedInfo element
  detailedInfo.classList.add("detailed-info");
  currCard.appendChild(detailedInfo);
}
function clearForm() {
  input.value = "";
}

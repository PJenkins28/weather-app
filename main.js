// Declare global variables
const cityName = document.getElementById("city-name");
const feelsLike = document.getElementById("feels-like");
let currCard = document.querySelector(".current-info");
let detailedInfo = document.querySelector(".detailed-info");
const btn = document.getElementById("search-btn");
const input = document.getElementById("search-item");
const form = document.getElementById("form");
let city = `atlanta`;

// EL when page is rendered that initializes the page with default info for city of Atlanta.
window.addEventListener("DOMContentLoaded", (e) => {
  getCity();
  // EL to allow click on button to search for city
  btn.addEventListener("click", (e) => {
    searchCity(input.value);
    clearForm();
  });

  // EL to allow 'enter' key to search for city
  window.addEventListener("keydown", (e) => {
    if (e.key === 13) {
      e.preventDefault();
      searchCity(input.value);
    }
  });
});

// Prevents form from submitting when typing
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchCity(input.value);
  form.reset();
});

// Call to Weather API
async function getCity() {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=81c7026d69634f71bea131013232003&q=${city}&days=7&aqi=no&alerts=no`
  );
  const cityData = await response.json();

  // Render city-specific elements on page
  displayGreeting(cityData);
  renderCurrent(cityData);
}
// Renders currCard info
function renderCurrent(cityData) {
  clearCurrent();
  getCurrentTemp(cityData);
  getCurrentIcon(cityData);

  // Elements in detailed-info section
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
  // Gets weather icon
  const icon = document.createElement("img");
  icon.classList.add("icon");
  currCard.appendChild(icon);
  icon.src = cityData.current.condition.icon;
}
function getCurrentFeelsLike(cityData) {
  // Gets and formats feels like temp
  const feelTemp = document.createElement("div");
  detailedInfo.appendChild(feelTemp);
  feelTemp.textContent = `Feels like ${cityData.current.feelslike_f}°F`;
}
function getCurrentVisibility(cityData) {
  // Gets and formats visibility info
  const visibility = document.createElement("div");
  detailedInfo.appendChild(visibility);
  visibility.textContent = `Visibility is ${cityData.current.vis_miles} miles`;
}
function getCurrentWindSpd(cityData) {
  // Gets and formats wind speed info
  const windSpeed = document.createElement("div");
  detailedInfo.appendChild(windSpeed);
  windSpeed.textContent = `Wind ${cityData.current.wind_mph}mph ${cityData.current.wind_dir}`;
}
function getCurrentHumidity(cityData) {
  // Gets and formats humidity info
  const humidity = document.createElement("div");
  detailedInfo.appendChild(humidity);
  humidity.textContent = `Humidity ${cityData.current.humidity}%`;
}

// Sets info for H1 greeting for initial and updated city info
function displayGreeting(cityData) {
  cityName.textContent = `${cityData.location.name}`;
  feelsLike.textContent = `${cityData.current.condition.text}`;
}

// Clears currCard when renderCurrent() renders new city info
function clearCurrent() {
  currCard.textContent = "";
  detailedInfo.textContent = "";

  // Create new detailedInfo element which was deleted
  detailedInfo = document.createElement("div");
  detailedInfo.classList.add("detailed-info");
  currCard.appendChild(detailedInfo);
}

// Helper function for event listeners that gather input from the search form
function searchCity(search) {
  city = `${search}`;
  getCity();
}

let cityName = document.getElementById("city-name");
let feelsLike = document.getElementById("feels-like");
let temp = document.getElementById("temp");

async function getCity() {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=81c7026d69634f71bea131013232003&q=atlanta&aqi=no"
  );
  const cityData = await response.json();

  cityName.textContent = `${cityData.location.name}, ${cityData.location.region}`;
  feelsLike.textContent = cityData.current.condition.text;
  temp.textContent = cityData.current.temp_f;
}
getCity();

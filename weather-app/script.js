const cityInput = document.getElementById("cityInput");
const lastCity = localStorage.getItem("lastCity");
const toggleBtn = document.getElementById("toggleMode");

if (lastCity) {
  cityInput.value = lastCity;
  fetchWeather(lastCity);
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function getWeather() {
  const city = cityInput.value.trim();
  if (city) {
    localStorage.setItem("lastCity", city);
    fetchWeather(city);
  }
}

async function fetchWeather(city) {
  const apiKey = "7f376bb7c9dd422fabe65703252006";
  const base = `http://api.weatherapi.com/v1`;
  const currentUrl = `${base}/current.json?key=${apiKey}&q=${city}`;
  const forecastUrl = `${base}/forecast.json?key=${apiKey}&q=${city}&days=3`;

  const proxyCurrent = `https://api.allorigins.win/raw?url=${encodeURIComponent(currentUrl)}`;
  const proxyForecast = `https://api.allorigins.win/raw?url=${encodeURIComponent(forecastUrl)}`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(proxyCurrent),
      fetch(proxyForecast)
    ]);

    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    // Current weather
    const result = `
      <h2>${current.location.name}, ${current.location.region}</h2>
      <p><strong>Temperature:</strong> ${current.current.temp_c}°C (feels like ${current.current.feelslike_c}°C)</p>
      <p><strong>Condition:</strong> ${current.current.condition.text}</p>
      <p><strong>Humidity:</strong> ${current.current.humidity}%</p>
      <p><strong>Wind:</strong> ${current.current.wind_kph} km/h</p>
      <p><strong>Last Updated:</strong> ${current.current.last_updated}</p>
      <img src="${current.current.condition.icon}" alt="icon">
    `;
    document.getElementById("weatherResult").innerHTML = result;

    // 3-Day Forecast
    const forecastHTML = forecast.forecast.forecastday.map(day => `
      <div class="forecast-day">
        <h4>${day.date}</h4>
        <img src="${day.day.condition.icon}" alt="">
        <p>${day.day.condition.text}</p>
        <p><strong>${day.day.avgtemp_c}°C</strong></p>
      </div>
    `).join("");

    document.getElementById("forecastResult").innerHTML = `<div class="forecast">${forecastHTML}</div>`;
  } catch (error) {
    console.error("Error fetching weather:", error);
    document.getElementById("weatherResult").innerHTML = `<p>Network error. Please try again.</p>`;
    document.getElementById("forecastResult").innerHTML = ``;
  }
}

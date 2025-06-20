async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "7f376bb7c9dd422fabe65703252006";
  const originalUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    const data = await response.json();
    console.log(data); // 🔍 Debugging

    if (!data || !data.current || !data.location) {
      document.getElementById("weatherResult").innerHTML = "<p>No weather data found.</p>";
      return;
    }

    const result = `
      <h2>${data.location.name}, ${data.location.region}</h2>
      <p><strong>Temperature:</strong> ${data.current.temp_c}°C (feels like ${data.current.feelslike_c}°C)</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
      <p><strong>Last Updated:</strong> ${data.current.last_updated}</p>
      <img src="${data.current.condition.icon}" alt="weather icon">
    `;

    document.getElementById("weatherResult").innerHTML = result;
  } catch (error) {
    console.error("Error fetching weather:", error);
    document.getElementById("weatherResult").innerHTML = `<p>Network error. Please try again.</p>`;
  }
}

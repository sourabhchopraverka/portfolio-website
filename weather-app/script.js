async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "377b9ac6c413b2efe127e0c36822eb14"; // or your working default key
  const originalUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    const data = await response.json();

    if (data.cod !== 200) {
      document.getElementById("weatherResult").innerHTML = `<p>Error: ${data.message}</p>`;
      return;
    }

    const result = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Condition: ${data.weather[0].description}</p>
    `;
    document.getElementById("weatherResult").innerHTML = result;
  } catch (error) {
    console.error("Proxy or network error:", error);
    document.getElementById("weatherResult").innerHTML = `<p>Network error. Please try again.</p>`;
  }
}

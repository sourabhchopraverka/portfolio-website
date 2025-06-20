async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "7f376bb7c9dd422fabe65703252006";
  const originalUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    const data = await response.json();

    const result = `
      <h2>${data.location.name}, ${data.location.region}</h2>
      <p>Temperature: ${data.current.temp_c}°C</p>
      <p>Condition: ${data.current.condition.text}</p>
      <img src="${data.current.condition.icon}" alt="icon">
    `;
    document.getElementById("weatherResult").innerHTML = result;
  } catch (error) {
    console.error("Error fetching weather:", error);
    document.getElementById("weatherResult").innerHTML = `<p>Network error. Please try again.</p>`;
  }
}

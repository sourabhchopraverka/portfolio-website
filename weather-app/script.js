async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "YOUR_API_KEY_HERE"; // Replace this with your real API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const result = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Condition: ${data.weather[0].description}</p>
    `;
    document.getElementById("weatherResult").innerHTML = result;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>Error: Could not find city</p>`;
  }
}


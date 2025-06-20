async function getWeather() {
  const city = document.getElementById("cityInput").value;

  try {
    const locationUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent('https://www.metaweather.com/api/location/search/?query=' + city)}`;
    const locationResponse = await fetch(locationUrl);
    const locationData = await locationResponse.json();

    if (locationData.length === 0) {
      document.getElementById("weatherResult").innerHTML = `<p>City not found.</p>`;
      return;
    }

    const woeid = locationData[0].woeid;
    const weatherUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent('https://www.metaweather.com/api/location/' + woeid + '/')}`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const today = weatherData.consolidated_weather[0];

    const result = `
      <h2>${weatherData.title}</h2>
      <p>Temperature: ${Math.round(today.the_temp)}°C</p>
      <p>Condition: ${today.weather_state_name}</p>
    `;
    document.getElementById("weatherResult").innerHTML = result;
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("weatherResult").innerHTML = `<p>Network error. Please try again.</p>`;
  }
}

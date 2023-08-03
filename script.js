const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key

async function getWeather() {
  const cityInput = document.getElementById('cityInput');
  const weatherInfo = document.getElementById('weatherInfo');

  if (cityInput.value === '') {
    alert('Please enter a city name.');
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod === '404') {
      weatherInfo.innerHTML = 'City not found';
    } else {
      const weatherDescription = data.weather[0].description;
      const temperatureCelsius = data.main.temp;
      const temperatureFahrenheit = celsiusToFahrenheit(temperatureCelsius);
      const humidity = data.main.humidity;

      weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p>${weatherDescription}</p>
        <p>Temperature: ${temperatureFahrenheit}°F</p>
        <p>Humidity: ${humidity}%</p>
      `;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9/5) + 32);
}

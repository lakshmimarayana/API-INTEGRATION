document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const searchButton = document.getElementById("search-button");
  const weatherDisplay = document.getElementById("weather-display");
  const locationName = document.getElementById("location-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind-speed");
  const errorMessage = document.getElementById("error-message");

  // Replace with your actual OpenWeatherMap API key
  const API_KEY = "77cbbe20459237060421c3a3a8644708";

  searchButton.addEventListener("click", fetchWeatherData);
  cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      fetchWeatherData();
    }
  });

  async function fetchWeatherData() {
    const cityName = cityInput.value.trim();
    if (cityName === "") {
      displayError("Please enter a city name.");
      return;
    }

    // Clear previous data and error
    clearDisplay();
    weatherDisplay.classList.add("hidden"); // Hide display before new data

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found. Please check the spelling.");
        } else if (response.status === 401) {
          throw new Error("Invalid API key. Please check your API key.");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      const data = await response.json();
      displayWeatherData(data);
      weatherDisplay.classList.remove("hidden"); // Show display after data is ready
    } catch (error) {
      displayError(error.message);
      weatherDisplay.classList.remove("hidden"); // Still show, but with error
    }
  }

  function displayWeatherData(data) {
    locationName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = data.main.temp;
    description.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;
    errorMessage.textContent = ""; // Clear any previous errors
  }

  function displayError(message) {
    errorMessage.textContent = message;
    locationName.textContent = "";
    temperature.textContent = "--";
    description.textContent = "--";
    humidity.textContent = "--";
    windSpeed.textContent = "--";
  }

  function clearDisplay() {
    locationName.textContent = "";
    temperature.textContent = "--";
    description.textContent = "--";
    humidity.textContent = "--";
    windSpeed.textContent = "--";
    errorMessage.textContent = "";
  }
});

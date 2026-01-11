document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const humidityDisplay = document.getElementById("humidity");
  const descriptionDisplay = document.getElementById("description");
  const longitudeLatitude = document.getElementById("longitudeLatitude");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "dabb7b8df5cc09a8bad6301d33fa50ad";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    //server may throw error
    //server/database is always in another continent
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
      // console.log(error);
    }
  });

  async function fetchWeatherData(city) {
    //get data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("response", response);
    
    if(!response.ok){
        throw new Error("City Not Found...")
    }

    const data = await response.json()
    return data;
  }

  function displayWeatherData(data) {
    //display data
    console.log(data);
    const {name, main, weather, coord} = data;
    cityNameDisplay.textContent = `City : ${name}`;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    humidityDisplay.textContent = `Humidity : ${main.humidity}` 
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
    longitudeLatitude.textContent = `Coordinates [Longitude : ${coord.lon}, Latitude : ${coord.lat}]`


    //unlock display -> remove hidden class
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add("hidden");


  }

  function showError() {
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.remove("hidden");
  }
});

//  apiKey = 'dabb7b8df5cc09a8bad6301d33fa50ad';
//   apiUrl = 'https://api.openweathermap.org/data/2.5/weather?'

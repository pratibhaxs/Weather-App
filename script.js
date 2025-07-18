document.addEventListener('DOMContentLoaded', function () {
    const cityInput = document.getElementById('city-input');
    const getWeather = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const errorMsg = document.getElementById('error-message');

    const API_KEY = "41ab6de7c9099600f36ddadaaec0068c"

    getWeather.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) {
            return;
        }
        //It may throw an error if the city is not found
        //Server/database is always in another continent so it always takes some time to fetch the data
        //Always wrap the code in try-catch block to handle errors gracefully while making API calls
        try {
            const weatherData = await fetchWeatherData(city)
            displayWeather(weatherData);
        } catch (error) {
            showError();
        }

    })

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log(typeof response);
        console.log("Response", response);

        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json()
        return data;
    }

    function displayWeather(data) {
        console.log(data);
        const { name, main, weather } = data;
        cityName.textContent = name;
        temperature.textContent = `Temperature : ${main.temp}`;
        description.textContent = `Weather : ${weather[0].description}`;

        //unlock the display
        weatherInfo.classList.remove('hidden');
        errorMsg.classList.add('hidden');


    }

    function showError() {
        errorMsg.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
        

    }


});

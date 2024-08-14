// Assign the API Key to a variable
const APIKey = "df9c79446d45e8f51367cc15f887cb31";

// Create other variables from HTML elements
const cityInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const searchHistoryContainer = document.getElementById('search-history');
const currentConditionsContainer = document.getElementById('current-conditions');
const forecastCards = document.querySelector('.forecast-cards');
const searchHistory = JSON.parse(localStorage.getItem('city')) || [];

// Display any search history items that have been saved to local storage
function getHistoryFromStorage() {

    for (let i = 0; i < searchHistory.length; i++) {
        const searchHistoryItem = document.createElement('li');
        searchHistoryItem.setAttribute('class', 'history-item');
        searchHistoryItem.textContent = searchHistory[i];
        const cityName = searchHistory[i];
        searchHistoryItem.addEventListener("click", function () {
            getWeatherData(cityName);
        })
        searchHistoryContainer.append(searchHistoryItem);
    }
}

// Create a new search history list item and save it to local storage
function createSearchHistory() {
    const searchedCity = cityInput.value;

    if (!searchHistory.includes(searchedCity)) {
        searchHistory.push(searchedCity);
    }

    localStorage.setItem("city", JSON.stringify(searchHistory));
    console.log(searchHistory);
    displaySearchedCities();
}


// Display the cities in the search history by creating new list items
function displaySearchedCities() {
    const cityName = cityInput.value.trim();
    const searchedItem = document.createElement('li');
    searchedItem.setAttribute('class', 'history-item');
    searchedItem.textContent = cityName;
    searchedItem.addEventListener("click", function () {
        getWeatherData(cityName);
    })
    searchHistoryContainer.append(searchedItem);
}

function handleSearch(event) {
    event.preventDefault();
    const cityName = cityInput.value.trim();
    getWeatherData(cityName);

}

// A function that calls the data from the API
function getWeatherData(cityName) {

    const requestcurrentConditionsUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${APIKey}`;

    // Retrieve the current weather conditions from the API
    fetch(requestcurrentConditionsUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (weatherData) {
            console.log(weatherData);

            // Locate the elements where the information will be displayed
            const cityName = document.getElementById('city-name');
            const icon = document.getElementById('icon');
            const currentTemp = document.getElementById('current-temp');
            const currentWind = document.getElementById('current-wind');
            const currentHumidity = document.getElementById('current-humidity');

            // Find the current date
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            let currentDate = `(${month}/${day}/${year})`;

            // Retrieving the weather icon
            const weatherIcon = weatherData.weather[0].icon;

            // Fill in the elements with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
            cityName.textContent = weatherData.name + " " + currentDate + " ";
            icon.setAttribute('src', 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png');
            currentTemp.textContent = "Temperature: " + weatherData.main.temp + " °F";
            currentWind.textContent = "Wind: " + weatherData.wind.speed + " MPH";
            currentHumidity.textContent = "Humidity: " + weatherData.main.humidity + "%";

        })

    // Retrieve forecast data from the API
    const requestForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&cnt=5&appid=${APIKey}`;

    fetch(requestForecastUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (forecastData) {
            console.log(forecastData);

            document.getElementById('forecast-card-section').innerHTML = "";

            for (let i = 0; i < forecastData.list.length; i++) {
                // Create the elements where the information will be displayed
                const forecastCard = document.createElement('li');
                forecastCard.setAttribute('class', 'forecast-card');
                const forecastDate = document.createElement('h3');
                const forecastIcon = document.createElement('img');
                const forecastTemp = document.createElement('p');
                const forecastWind = document.createElement('p');
                const forecastHumidity = document.createElement('p');

                // Calculate the date for each
                const date = new Date();
                const day = date.getDate() + i + 1;
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                let currentDate = `(${month}/${day}/${year})`;

                // Find the corresponding weather icon
                const retrievedIcon = forecastData.list[i].weather[0].icon;

                // Fill in the elements with the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
                forecastDate.textContent = currentDate;
                forecastIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + retrievedIcon + '@2x.png');
                forecastTemp.textContent = "Temperature: " + forecastData.list[i].main.temp + " °F";
                forecastWind.textContent = "Wind: " + forecastData.list[i].wind.speed + " MPH";
                forecastHumidity.textContent = "Humidity: " + forecastData.list[i].main.humidity + "%";

                forecastCard.appendChild(forecastDate);
                forecastCard.appendChild(forecastIcon);
                forecastCard.appendChild(forecastTemp);
                forecastCard.appendChild(forecastWind);
                forecastCard.appendChild(forecastHumidity);
                forecastCard.appendChild(forecastHumidity);
                forecastCards.appendChild(forecastCard);
            }
        })
    cityInput.value = "";
}

// // When the page loads, the search history will display
$(document).ready(getHistoryFromStorage);

// When the button is clicked, run the function to create a new entry in the search history list
searchBtn.addEventListener("click", createSearchHistory);

// When the search button is clicked, the weather data will appear on the page
searchBtn.addEventListener("click", handleSearch);
// Assign the API Key to a variable
const APIKey = "df9c79446d45e8f51367cc15f887cb31";

// Create other variables from HTML elements
const cityInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const searchHistoryContainer = document.getElementById('search-history');
const currentConditionsContainer = document.getElementById('current-conditions');
const forecastCards = document.querySelectorAll('.forecast-card');
let searchHistory = JSON.parse(localStorage.getItem('city'));

// A function that calls the data from the API
function getWeatherData() {

    const cityName = cityInput.value.trim();
    console.log(cityName);
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
            let currentDate = `(${day}/${month}/${year})`;

            // Retrieving the weather icon
            const weatherIcon = weatherData.weather[0].icon;

            // Fill in the elements with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
            cityName.textContent = weatherData.name + " " + currentDate + " ";
            icon.setAttribute('src', 'https://openweathermap.org/img/wn/'+weatherIcon+'@2x.png');
            currentTemp.textContent = "Temperature: " + weatherData.main.temp + " °F";
            currentWind.textContent = "Wind: " + weatherData.wind.speed + " MPH";
            currentHumidity.textContent = "Humidity: " + weatherData.main.humidity + "%";

    })

    const requestForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&cnt=5&appid=${APIKey}`;
    
    fetch(requestForecastUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (forecastData) {
            console.log(forecastData);
        
            for (i = 0; i < forecastCards.length; i++) {
                // Locate the elements where the information will be displayed
                const forecastDate = document.getElementById('forecast-date');
                const forecastIcon = document.getElementById('forecast-icon');
                const forecastTemp = document.getElementById('forecast-temp');
                const forecastWind = document.getElementById('forecast-wind');
                const forecastHumidity = document.getElementById('forecast-humidity');

                // Find the weather icon
                const retrievedIcon = forecastData.list[i].weather[0].icon;
                console.log(retrievedIcon);

                // Fill in the elements with the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
                forecastDate.textContent = forecastData.list[i].dt_txt;
                forecastIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + retrievedIcon + '@2x.png');
                forecastTemp.textContent = "Temperature: " + forecastData.list[i].main.temp + " °F";
                forecastWind.textContent = "Wind: " + forecastData.list[i].wind.speed + " MPH";
                forecastHumidity.textContent = "Humidity: " + forecastData.list[i].main.humidity + "%";
            }
        })
}

// When the search button is clicked, the weather data will appear on the page
searchBtn.addEventListener("click", getWeatherData);

// // Display search results on the page
// function displaySearchResults() {
//     JSON.parse(localStorage.getItem('city'));
// }

// $(document).ready(function () {
//     // Store search history in local storage
//     searchBtn.addEventListener("click", function(event) {
//         event.preventDefault();
        
//         const searchedCity = cityInput.value.trim();
//         currentConditions(searchedCity);
//         futureForecast(searchedCity);
        
//         if(!searchHistory.includes(searchedCity)) {
//             searchHistory.push(searchedCity);
//             const historyItem = document.createElement('li');
//             historyItem.setAttribute('class', 'history-item');
//             historyItem.textContent = searchedCity;
//             searchHistory.append(historyItem);
//         }
        
//         localStorage.setItem("city", JSON.stringify(searchHistory));
//         console.log(searchHistory);
//     })
    
//     // When a person clicks a search history listing, the data for that city displays again
//     $('.history-item').on('click', function() {
//         const listItem = $(this).text();
//         currentConditions(listItem);
//         futureForecast(listItem);
//     })
// })
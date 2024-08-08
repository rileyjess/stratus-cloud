// Assign the API Key to a variable
const APIKey = "df9c79446d45e8f51367cc15f887cb31";
const cityInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('submit-btn');
const searchHistoryContainer = document.getElementById('search-history');
const currentConditionsContainer = document.getElementById('current-conditions');
const forecastContainer = document.getElementById('forecast');
let searchHistory = JSON.parse(localStorage.getItem('city'));

// Call data from the API

// Create a card to display current conditions
// with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
function currentConditions(city) {
    const requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (currentConditionsData) {
            console.log(currentConditionsData);

            // Create elements for each of the data points
            const currentConditionsCard = document.createElement('div');
            const cityNameAndDate = document.createElement('h2');
            const currentTemperature = document.createElement('p');
            const currentWindSpeed = document.createElement('p');
            const currentHumidity = document.createElement('p');

            // Find the current date
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            let currentDate = `(${day}/${month}/${year})`;

            // Set text content for each new element based on the data points
            cityNameAndDate.textContent = response.currentConditionsData[i].name + " " + currentDate + " " + response.currentConditionsData[i].weather.icon;
            currentTemperature.textContent = "Temp: " + response.currentConditionsData[i].main.temp + " °F";
            currentWindSpeed.textContent = "Wind: " + response.currentConditionsData[i].wind.speed + " MPH";
            currentHumidity.textContent = "Humidity: " + response.currentConditionsData[i].main.humidity + " %";

            // Append the new elements to the current conditions card
            currentConditionsCard.append(cityNameAndDate);
            currentConditionsCard.append(currentTemperature);
            currentConditionsCard.append(currentWindSpeed);
            currentConditionsCard.append(currentHumidity);

            // Append the card to the right container in the HTML
            currentConditionsContainer.append(currentConditionsCard);
        })
}



// Create a card to display 5-day forecast
// featuring the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
function futureForecast() {
    const requestUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (forecastData) {
            console.log(forecastData);

            const dailyForecasts = document.querySelectorAll(".daily-forecast");
            for (let i = 0; i < dailyForecasts.length; i++) {
                // Create elements for each of the data points
                const forecastDate = document.createElement('p');
                const forecastIcon = document.createElement('p');
                const forecastTemperature = document.createElement('p');
                const forecastWindSpeed = document.createElement('p');
                const forecastHumidity = document.createElement('p');

                // Find the current date
                const date = new Date();
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                let currentDate = `${day}/${month}/${year}`;

                // Set text content for each new element based on the data points
                forecastDate.textContent = currentDate;
                forecastIcon.textContent = response.forecastData[i].weather.icon
                forecastTemperature.textContent = "Temp: " + response.forecastData[i].main.temp + " °F";
                forecastWindSpeed.textContent = "Wind: " + response.forecastData[i].wind.speed + " MPH";
                forecastHumidity.textContent = "Humidity: " + response.forecastData[i].main.humidity + " %";

                // Append the new elements to the forecast divs
                dailyForecasts.append(forecastDate);
                dailyForecasts.append(forecastIcon);
                dailyForecasts.append(forecastTemperature);
                dailyForecasts.append(forecastWindSpeed);
                dailyForecasts.append(forecastHumidity);
            }
        })

}


// Display search results on the page
function displaySearchResults() {
    JSON.parse(localStorage.getItem('city'));
}

$(document).ready(function () {
    // Store search history in local storage
    searchBtn.addEventListener("click", function(event) {
        event.preventDefault();
        
        const searchedCity = cityInput.value.trim();
        currentConditions(searchedCity);
        futureForecast(searchedCity);
        
        if(!searchHistory.includes(searchedCity)) {
            searchHistory.push(searchedCity);
            const historyItem = document.createElement('li');
            historyItem.setAttribute('class', 'history-item');
            historyItem.textContent = searchedCity;
            searchHistory.append(historyItem);
        }
        
        localStorage.setItem("city", JSON.stringify(searchHistory));
        console.log(searchHistory);
    })
    
    // When a person clicks a search history listing, the data for that city displays again
    $('.history-item').on('click', function() {
        const listItem = $(this).text();
        currentConditions(listItem);
        futureForecast(listItem);
    })
})
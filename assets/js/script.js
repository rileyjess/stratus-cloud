// Assign the API Key to a variable
const APIKey = "df9c79446d45e8f51367cc15f887cb31";
const fetchBtn = document.getElementById('submit-btn');
searchHistoryEl = document.getElementById('search-history');
currentConditionsEl = document.getElementById('current-conditions');
forecastEl = document.getElementById('forecast');

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
    })
}


// Create a card to display 5-day forecast
// featuring the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
function futureForecast() {
    const requestUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
}

// Append cards to the dashboard

// Submit event when search button is clicked
fetchBtn.addEventListener('submit', currentConditions);
fetchBtn.addEventListener('submit', futureForecast);

// Store search history in local storage

// Display search results on the page

// When a person clicks a search history listing, the data for that city displays again
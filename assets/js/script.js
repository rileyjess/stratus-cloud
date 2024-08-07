// Assign the API Key to a variable
const APIKey = "df9c79446d45e8f51367cc15f887cb31";
const fetchBtn = document.getElementById('submit-btn');
const searchHistoryContainer = document.getElementById('search-history');
const currentConditionsContainer = document.getElementById('current-conditions');
const forecastContainer = document.getElementById('forecast');
let searchHistory = [];

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

            for (let i = 0; i < currentConditionsData.length; i++) {
                // Create elements for each of the data
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
                cityNameAndDate.textContent = currentConditionsData[i].name + " " + currentDate + " " + currentConditionsData[i].weather, icon;
                currentTemperature.textContent = "Temp: " + currentConditionsData[i].main.temp;
                currentWindSpeed.textContent = "Wind" + currentConditionsData[i].wind.speed;
                currentHumidity.textContent = "Wind: " + currentConditionsData[i].main.humidity;

                // Append the new elements to the current conditions card
                currentConditionsCard.append(cityNameAndDate);
                currentConditionsCard.append(currentTemperature);
                currentConditionsCard.append(currentWindSpeed);
                currentConditionsCard.append(currentHumidity);

                // Append the card to the right container in the HTML
                currentConditionsContainer.append(currentConditionsCard);
            }
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
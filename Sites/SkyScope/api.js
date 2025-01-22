const apikey = 'fca729653a423ebcb34cfa6e4fd01316';
let debugWeatherData = false;

// Elements:
const loadingWrap = document.getElementById('loadingWrap');
const weatherInfoFullWrap = document.getElementById('weatherInfoFullWrap')
const cityNameText = document.getElementById('cityName');
const currentTempText = document.getElementById('currentTempText');
const currentFeelsLikeText = document.getElementById('currentFeelsLikeText');
const currentHumidityText = document.getElementById('currentHumidityText');
const currentConditionsIcon = document.getElementById('currentConditionsIcon');
const currentConditionsDetails = document.getElementById('currentConditionsDetails');
const mainForecastDisplay = document.getElementById('mainForecastDisplay');
const mapSearchInput = document.getElementById('mapSearchInput');
const mapSearchFullWrap = document.getElementById('mapSearchFullWrap');

// Fetch Weather Data:
function LoadWeather(cityName){
    // Current Conditions:
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apikey}`)
    .then(response => response.json())
    .then(data => {

        if(debugWeatherData){console.log(data);}

        if(data.message){
            // Error:
            newNotifia(`An Error Occured! <br> (${data.message})`, {background:'error', closeButton:false, duration:10000});
        }else{
            // No Error:
            loadingWrap.classList.add('hidden');
            weatherInfoFullWrap.classList.remove('hidden');
            // Get City Details:
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            let cityLocation = null;
            // Usage:
            (async () => {
                cityLocation = await FetchCityLocation(lat, lon); // Example: NYC coordinates
                if(debugWeatherData){console.log(cityLocation);} // Logs the result
                if(cityLocation != null){
                    cityNameText.innerText = (`${cityLocation.city}, ${cityLocation.principalSubdivision} ${cityLocation.countryCode}`);
                }else{
                    cityNameText.innerText = (data.name);
                }
            })();
            // Update Current Conditions Wrap:
            mainForecastDisplay.innerHTML = '';
            
            currentTempText.innerText = ('Current Temp: ' + Math.trunc(data.main.temp) + '°');
            currentFeelsLikeText.innerText = ('Feels Like: ' + Math.trunc(data.main.feels_like) + '°');
            currentHumidityText.innerText = ('Humidity: ' + data.main.humidity + '%');
            currentConditionsDetails.innerText = data.weather[0].main;
            currentConditionsIcon.innerText = GetConditionIcon(data.weather[0].main);
            currentConditionsIcon.title = data.weather[0].main;

            // Add to Forecast:
            let newForecastTime = document.createElement('div');
            newForecastTime.classList.add('timeWrap');
            newForecastTime.innerHTML = `
                <p class="weatherTime">Now</p>
                <span class="material-symbols-rounded weatherIcon"> ${GetConditionIcon(data.weather[0].main)} </span>
                <p class="weatherDegree"> ${(Math.trunc(data.main.temp)+ '°')}</p>
            `;
            mainForecastDisplay.appendChild(newForecastTime);

            // Get Remaining Forecast:
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=8&units=imperial&appid=${apikey}`)
            .then(response => response.json())
            .then(data => {

               //const currentTime = Math.floor(Date.now() / 1000);

               if(debugWeatherData){
                    console.info('Forecast:')
                    console.log(data);
                }

                if(data.message){
                    // Error:
                    newNotifia(`An Error Occured! <br> (${data.message})`, {background:'error', closeButton:false, duration:10000});
                }else{
                    // No Error:

                    let ForecastArray = data.list;

                    ForecastArray.forEach((timeData, index) => {
                        let formatedTime = new Date(timeData.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        if(debugWeatherData){console.log(formatedTime);}
                        let tempAtTime = Math.trunc(timeData.main.temp);
                        if(debugWeatherData){console.log(tempAtTime);}
                        let conditionAtTime = timeData.weather[0].main;
                        if(debugWeatherData){console.log(conditionAtTime);}
                        if(debugWeatherData){console.log('---------');}

                        // Add to Forecast:
                        let newForecastTime = document.createElement('div');
                        newForecastTime.classList.add('timeWrap');
                        newForecastTime.innerHTML = `
                            <p class="weatherTime">${formatedTime}</p>
                            <span class="material-symbols-rounded weatherIcon" title="${conditionAtTime}"> ${GetConditionIcon(conditionAtTime)} </span>
                            <p class="weatherDegree"> ${(tempAtTime + '°')}</p>
                        `;
                        mainForecastDisplay.appendChild(newForecastTime);

                        // Check for last item:
                        let isLast = index === ForecastArray.length - 1;
                        if(isLast){
                            newForecastTime.classList.add('finalTimeWrap');
                        }
                    });

                }
            })
            .catch(error => {
                // Forecast Error:
                console.warn('Error:', error);
                newNotifia(`An Error Occured: <br> (${error})`, {background:'error', closeButton:false, duration:10000})
            });

        }
    })
    .catch(error => {
        // Current Conditions Error:
        console.warn('Error:', error);
        newNotifia(`An Error Occured: <br> (${error})`, {background:'error', closeButton:false, duration:10000})
    });
}

// Fetch City Location:
async function FetchCityLocation(lat, lon) {
    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.warn('Error occurred fetching location details!');
        console.error(error);
        return null;
    }
}


// Get Icon for Conditions:
function GetConditionIcon(condition) {
    if (condition === 'Clear') {
        return 'landscape';
    } else if (condition === 'Clouds') {
        return 'cloudy'; 
    } else if (condition === 'Rain') {
        return 'rainy'; 
    } else if (condition === 'Drizzle') {
        return 'rainy'; 
    } else if (condition === 'Thunderstorm') {
        return 'thunderstorm'; 
    } else if (condition === 'Snow') {
        return 'weather_snowy'; 
    } else if (condition === 'Mist') {
        return 'rainy'; 
    } else if (condition === 'Smoke') {
        return 'foggy'; 
    } else if (condition === 'Haze') {
        return 'foggy'; 
    } else if (condition === 'Dust') {
        return 'foggy'; 
    } else if (condition === 'Fog') {
        return 'foggy'; 
    } else if (condition === 'Sand') {
        return 'foggy'; 
    } else if (condition === 'Ash') {
        return 'foggy'; 
    } else if (condition === 'Squall') {
        return 'air';
    } else if (condition === 'Tornado') {
        return 'cyclone'; 
    } else {
        return 'thermostat'; // Default icon for unknown conditions
    }
}

// Search for City:
function SearchCity(){
    let searchValue = mapSearchInput.value.trim()
    if(debugWeatherData){console.info(searchValue);}

    if(searchValue === '' || null){
        newNotifia('Please enter a valid City Name!', {background: 'error', closeButton: false, duration: 5000})
    } else{
        LoadWeather(searchValue);
        HideSearchWrap();
    }

}

// Event Listener for Input Feild:
mapSearchInput.addEventListener('keydown', function(e){
    if (e.key === 'Enter') {
        SearchCity()
    }
})

let SearchVisible = false;

// Show Search:
function ShowSearchWrap(){
    if(!SearchVisible){
        SearchVisible = true;
        mapSearchInput.value = '';
        mapSearchFullWrap.style.opacity = 0;
        mapSearchFullWrap.classList.remove('hidden')
        mapSearchFullWrap.style.display = 'flex';
        setTimeout(() => {
            mapSearchFullWrap.style.opacity = 1;
        }, 50);
    }else{
        HideSearchWrap()
    }
}

// Hide Search:
function HideSearchWrap(){
    if(SearchVisible){
        mapSearchFullWrap.style.opacity = 0;
        setTimeout(() => {
            mapSearchFullWrap.classList.add('hidden')
            SearchVisible = false
        }, 500);
    }
    
}

// Init:
window.onload = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                // console.log(`Latitude: ${lat}, Longitude: ${lon}`);

                if (lat && lon) {
                    // Fetch city details using reverse geocoding API
                    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            if (data.locality) {
                                // console.log(`City: ${data.locality}`);
                                LoadWeather(data.locality);
                            } else {
                                // console.log('City name not found');
                                LoadWeather('New York');
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching city name:', error);
                            LoadWeather('New York');
                        });
                }
            },
            (error) => {
                console.error('Error getting location:', error.message);
                LoadWeather('New York');
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
        LoadWeather('New York');
    }
};


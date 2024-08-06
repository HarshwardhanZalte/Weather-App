const inputCity = document.querySelector('#inputCity');
const search = document.querySelector('#search');
const city = document.querySelector('#cityName');
const address = document.querySelector('#address');
const degC = document.querySelector('#deg-c');
const degF = document.querySelector('#deg-f');
const time = document.querySelector('#time');
const condition = document.querySelector('#condition');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');

const apiKey = 'YOUR_API_KEY';
const defaultCity = 'pune';

function updateWeatherUI(data) {
    city.innerHTML = data.location.name;
    address.innerHTML = `${data.location.region}, ${data.location.country}`;
    degC.innerHTML = `${data.current.temp_c} ºC`;
    degF.innerHTML = `${data.current.temp_f} ºF`;
    time.innerHTML = data.location.localtime;
    condition.innerHTML = data.current.condition.text;
    wind.innerHTML = `${data.current.wind_kph} KM/H`;
    humidity.innerHTML = `${data.current.humidity} %`;
}

function fetchWeather(cityName) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`)
        .then(res => {
            if (!res.ok) throw new Error('City not found');
            return res.json();
        })
        .then(data => updateWeatherUI(data))
        .catch(error => {
            console.error(error.message);
            alert(`${cityName} city not found..!`);
        });
}

search.addEventListener('click', function () {
    const cityName = inputCity.value.trim();
    if (!cityName) {
        alert("Enter City Name.");
        return;
    }
    fetchWeather(cityName);
});

window.addEventListener('load', function () {
    fetchWeather(defaultCity);
});

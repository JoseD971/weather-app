import './style.css';
import fetchWeather from './modules/fetchWeather.js';
import toggleTemp from './modules/toggleTemp.js';
import Magnify from './resources/icons/ui/magnify.svg';
import Cloud from './resources/icons/ui/cloud_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg';
import Rain from './resources/icons/ui/water_drop_24dp_255290_FILL0_wght400_GRAD0_opsz24.svg';
import MapMarker from './resources/icons/ui/map-marker.svg';

document.getElementById('search-icon').src = Magnify;
document.getElementById('map-marker-icon').src = MapMarker;
document.getElementById('cloud-icon').src = Cloud;
document.getElementById('rain-icon').src = Rain;

document.getElementById('search-btn').addEventListener('click', () => {
    let query = document.getElementById('search-query').value;
    search(query);
});
document.getElementById('search-query').addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === 13) {
        let query = document.getElementById('search-query').value;
        search(query);
        event.preventDefault();
    }
});
document.getElementById('switch-temp-btn').addEventListener('click', changeScale);

search('london');

async function search (query) {
    let loader = document.getElementById('loader');
    let screenSaver = document.getElementById('screen-saver');

    loader.style.display = 'block';
    screenSaver.style.display = 'block';
    let info = await fetchWeather(query);
    loader.style.display = 'none';
    screenSaver.style.display = 'none';

    if (info === null) {
        setErrorMsg(true);
        return;
    } else {
        setErrorMsg(false);
    }

    displayWeather(info);
}

function setErrorMsg (show) {
    let msgText;
    (show === true) ? msgText = 'Location not found. Please, try again.' : msgText = '';
    let msgBox = document.getElementById('error-msg');
    msgBox.innerText = msgText;
}

async function displayWeather (info) {
    const moment = require('moment-timezone');
    const location = document.getElementById('location');
    const weathericon = document.getElementById('weather-icon');
    const temp = document.getElementById('temp');
    const tempmetric = document.getElementById('temp-metric');
    const date = document.getElementById('date');
    const dayWeek = document.getElementById('day-week');
    const time = document.getElementById('time');
    const cloudCover = document.getElementById('cover-percent');
    const rain = document.getElementById('rain-percent');

    import(`./resources/icons/weather/${info.icon}.svg`)
    .then((imageModule) => {
        weathericon.setAttribute('src', imageModule.default);
    })
    .catch((error) => {
        console.error("Error loading image:", error);
    });

    location.innerText = info.address;
    temp.innerText = info.temp;
    tempmetric.innerText = ' °C';
    document.getElementById('switch-temp-btn').dataset.metric = 'celsius';
    date.innerText = moment().tz(info.timezone).format('MMM Do, YYYY');
    dayWeek.innerText = moment().tz(info.timezone).format('dddd,');
    time.innerText = moment().tz(info.timezone).format('h:mm a');
    cloudCover.innerText = info.conditions + ' - ' + info.cloudcover + ' %';
    rain.innerText = 'Current: '+ info.precip + ' - Probability: ' + info.precipprob + ' %';
}

function changeScale () {
    let temp = document.getElementById('temp').textContent;
    let metric = document.getElementById('switch-temp-btn').dataset.metric;

    document.getElementById('temp').innerText = parseFloat((toggleTemp.convert(temp, metric)).toFixed(2));
    document.getElementById('switch-temp-btn').dataset.metric = (metric === 'celsius') ? 'fahrenheit': 'celsius';;
    document.getElementById('temp-metric').innerText = (document.getElementById('switch-temp-btn').dataset.metric === 'celsius') ? ' °C' : ' °F';
}
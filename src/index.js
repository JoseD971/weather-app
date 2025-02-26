import './style.css';
import fetchWeather from './modules/fetchWeather.js';
import toggleTemp from './modules/toggleTemp.js';
import Magnify from './resources/icons/ui/magnify.svg';
import Cloud from './resources/icons/ui/cloud_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg';
import Rain from './resources/icons/ui/water_drop_24dp_255290_FILL0_wght400_GRAD0_opsz24.svg';
import MapMarker from './resources/icons/ui/map-marker.svg';
import SunriseIcon from './resources/icons/ui/weather-sunset-up.svg';
import SunsetIcon from './resources/icons/ui/weather-sunset-down.svg';
import FeelslikeIcon from './resources/icons/ui/thermostat_24dp_4B77D1_FILL0_wght400_GRAD0_opsz24.svg';
import UvindexIcon from './resources/icons/ui/sun-wireless-outline.svg';
import WindIcon from './resources/icons/ui/air_24dp_4B77D1_FILL0_wght400_GRAD0_opsz24.svg';
import HumidityIcon from './resources/icons/ui/humidity_mid_24dp_2854C5_FILL0_wght400_GRAD0_opsz24.svg';
import SnowIcon from './resources/icons/ui/ac_unit_24dp_5084C1_FILL0_wght400_GRAD0_opsz24.svg';

document.getElementById('search-icon').src = Magnify;
document.getElementById('map-marker-icon').src = MapMarker;
document.getElementById('cloud-icon').src = Cloud;
document.getElementById('rain-icon').src = Rain;
document.getElementById('sunrise-icon').src = SunriseIcon;
document.getElementById('sunset-icon').src = SunsetIcon;
document.getElementById('feelslike-icon').src = FeelslikeIcon;
document.getElementById('uv-icon').src = UvindexIcon;
document.getElementById('wind-icon').src = WindIcon;
document.getElementById('humidity-icon').src = HumidityIcon;
document.getElementById('snow-icon').src = SnowIcon;

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
    console.log(info);
    //main weather info 
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
    cloudCover.innerText = info.conditions + ' - Cover: ' + info.cloudcover + ' %';
    rain.innerText = 'Current: '+ info.precip + ' - Probability: ' + info.precipprob + ' %';

    //today's highlights
    const desc = document.getElementById('desc');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    const feelslike = document.getElementById('feelslike');
    const uv = document.getElementById('uv');
    const wind = document.getElementById('windspeed');
    const humidity = document.getElementById('humidity');
    const snow = document.getElementById('snow');

    desc.innerText = info.description;
    sunrise.innerText = info.sunrise;
    sunset.innerText = info.sunset;
    feelslike.innerText = info.feelslike + ' °C';
    uv.innerText = info.uv;
    wind.innerText = info.windspeed + ' Km/h';
    humidity.innerText = info.humidity + ' %';
    snow.innerText = info.snow;

    //week forecast
    const days = document.getElementsByClassName('day-box');
    for (let i = 0; i < info.week.length; i++) {
        const weekday = info.week[i];
        days[i].children[0].innerText = moment(weekday.datetime).add(1, 'days').format('ddd');
        import(`./resources/icons/weather/${weekday.icon}.svg`)
        .then((imageModule) => {
            days[i].children[1].setAttribute('src', imageModule.default);
        })
        .catch((error) => {
            console.error("Error loading image:", error);
        });
        days[i].children[2].innerText = weekday.temp + ' °C';
    }
}

function changeScale () {
    let temp = document.getElementById('temp').textContent;
    let metric = document.getElementById('switch-temp-btn').dataset.metric;

    document.getElementById('temp').innerText = parseFloat((toggleTemp.convert(temp, metric)).toFixed(2));
    document.getElementById('switch-temp-btn').dataset.metric = (metric === 'celsius') ? 'fahrenheit': 'celsius';;
    document.getElementById('temp-metric').innerText = (document.getElementById('switch-temp-btn').dataset.metric === 'celsius') ? ' °C' : ' °F';
}
import './style.css';
import fetchWeather from './modules/fetchWeather.js';
import Magnify from './resources/icons/ui/magnify.svg';
import Cloud from './resources/icons/ui/cloud_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg';
import Rain from './resources/icons/ui/water_drop_24dp_255290_FILL0_wght400_GRAD0_opsz24.svg';
import MapMarker from './resources/icons/ui/map-marker.svg';
import ClearDay from './resources/icons/weather/clear-day.svg';

// var weather = await fetchWeather('london');
// console.log(weather);

document.getElementById('search-icon').src = Magnify;
document.getElementById('map-marker-icon').src = MapMarker;
document.getElementById('cloud-icon').src = Cloud;
document.getElementById('rain-icon').src = Rain;
document.getElementById('weather-icon').src = ClearDay;
import './style.css';
import fetchWeather from './modules/fetchWeather.js';
import Magnify from './resources/icons/ui/magnify.svg';
import Cloud from './resources/icons/ui/cloud_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg';
import Rain from './resources/icons/ui/water_drop_24dp_255290_FILL0_wght400_GRAD0_opsz24.svg';
import MapMarker from './resources/icons/ui/map-marker.svg';
import ClearDay from './resources/icons/weather/clear-day.svg';

document.getElementById('search-icon').src = Magnify;
document.getElementById('map-marker-icon').src = MapMarker;
document.getElementById('cloud-icon').src = Cloud;
document.getElementById('rain-icon').src = Rain;
document.getElementById('weather-icon').src = ClearDay;

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

}

function setErrorMsg (show) {
    let msgText;
    (show === true) ? msgText = 'Location not found. Please, try again.' : msgText = '';
    let msgBox = document.getElementById('error-msg');
    msgBox.innerText = msgText;
}

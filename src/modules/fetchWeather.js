async function getWeatherData (query, unit) {

    if(query === '' || query === null || query === undefined) query = 'london';
    if(unit === '' || unit === null || unit === undefined) unit = 'metric';
    const key = 'YHGBZSMDEJV8TMA7YHEFQWVZF';

    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(query)}?unitGroup=${unit}&key=${key}`, {
            mode: 'cors',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        const weatherData = await response.json();
        
        const weather = {
            address: weatherData.resolvedAddress, 
            description: weatherData.description, 
            datetime: weatherData.currentConditions.datetime,
            conditions: weatherData.currentConditions.conditions,
            feelslike: weatherData.currentConditions.feelslike,
            humidity: weatherData.currentConditions.humidity,
            sunrise: weatherData.currentConditions.sunrise,
            sunset: weatherData.currentConditions.sunset,
            uv: weatherData.currentConditions.uvindex,
            temp: weatherData.currentConditions.temp,
            windspeed: weatherData.currentConditions.windspeed,
            precipprob: weatherData.currentConditions.precipprob,
            cloudcover: weatherData.currentConditions.cloudcover,
            snow: weatherData.currentConditions.snow,
            icon: weatherData.currentConditions.icon,
            week: weatherData.days.slice(0, 6),
        };

        return weather;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export default getWeatherData;
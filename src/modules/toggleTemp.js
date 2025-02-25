const toggleTemp = ((() => {
    var _temp;
    var _metric;

    const convert = (temp, metric) => {
        _temp = temp;
        _metric = metric;
        return metric == 'celsius' ? celsiusToFahrenheit() : fahrenheitToCelsius();
    }

    const celsiusToFahrenheit = () => {
        return (_temp * 9 / 5) + 32;
    }

    const fahrenheitToCelsius = () => {
        return (_temp - 32) * 5 / 9;
    }

    return {convert}
})());

export default toggleTemp;
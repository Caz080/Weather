const apiWeather = async () => {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m&wind_speed_unit=ms&temperature_unit=fahrenheit');
    if (!res.ok) {
        throw new Error('Could not retrieve planets');

    }
    return res.json();
}

export default apiWeather;
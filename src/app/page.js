"use client"

import { useEffect, useState } from 'react';
import Weathercard from './Weathercard';
//import routeweather from './api/weather/route';

/*const callapi = async () => {
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&timezone=auto&forecast_days=1&wind_speed_unit=ms&temperature_unit=fahrenheit");
    if (!res.ok) {
        throw new Error('Could not retrieve planets');

    }
    return res.json();
}*/

function page() {

    const [data, setData] = useState(null);
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState({city: "Berlin", state: "State of Berlin"});

    async function getWeather(lat = 52.52, long = 13.42) {
        const res = await fetch(`/api/weather?lat=${lat}&long=${long}`);

        console.log("status", res.status)
        console.log(res.ok);
        const result = await res.json();

        setData(result);
    }

    async function getCity() {
        const res = await fetch(`/api/city?city=${search}`);

        const result = await res.json();

        return result;
    }

    useEffect(() => {
        getWeather();
        console.log("update..")
    }, []);

    if (data == null) {
        return(
        <div className = "base">
            <form onSubmit = {handleSubmit}>
                <input className = "citysearch" value = {search} onChange = {(event) => setSearch(event.target.value)} placeholder = "Enter a city here"></input>
            </form>
            <h1 className = "title">LOADING.......</h1>
            <h1 className = "title">LOADING......</h1>
            <div className = "temps">LOADING.....</div>
        </div>
        )
    }
    console.log(data);
    const temperatures = data.hourly.temperature_2m;
    const cloudy = data.hourly.cloud_cover;
    const day = data.hourly.is_day;
    const rain = data.hourly.rain;
    const snow = data.hourly.snowfall;

    async function handleSubmit(event) {


        event.preventDefault();

        console.log("yo", search);

        const res = await getCity(search);
        if (res.results) {
            const locationData = await res.results[0];
            console.log(locationData);
            setLocation({city: locationData.name, state: locationData.admin1})
            getWeather(locationData.latitude, locationData.longitude);
        }

    }

    return(
        <div className = "base">
            <form onSubmit = {handleSubmit}>
                <input className = "citysearch" value = {search} onChange = {(event) => setSearch(event.target.value)} placeholder = "Enter a city here"></input>
            </form>
            <h1 className = "title">{`${location.city}, ${location.state}`}</h1>
            <h1 className = "title">{data.current.temperature_2m}{data.hourly_units.temperature_2m}</h1>
            <div className = "temps">
                {temperatures.map((temp, i) => (
                    <Weathercard key = {i} data ={[temp, day[i], rain[i], cloudy[i]]}/>
                ))}
            </div>
        </div>
    )
}

export default page;
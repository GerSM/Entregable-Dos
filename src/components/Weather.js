import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';


const Weather = () => {
    const [ weather, setWeather ] = useState({})
    const [ isCelsius, setIsCelsius ] = useState(true)
    const [ valTemp, setValTemp ] = useState()
    const [ valTempFeels, setValTempFeels ] = useState()

 
    useEffect(() => {
        function success(pos) {
        var crd = pos.coords;
        
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=3ba48dce4005d8596f50269fe61fd147`)
            .then(res =>{ 
                setWeather(res.data)
                setValTemp(Math.floor((res.data.main.temp)-273.15))
                setValTempFeels(Math.floor((res.data.main.feels_like)-273.15))
                console.log(res.data)
            })
        }
        
        function error(err) {
        console.warn("El usuario no permitio la localización");
        }
        
        navigator.geolocation.getCurrentPosition(success, error); 
    }, [])


    const changeVariable = () => {
        if (isCelsius){
            setIsCelsius(false)
            setValTemp(Math.floor((valTemp*1.8)+32))
            setValTempFeels(Math.floor((valTemp*1.8)+32))
        }else{
            setIsCelsius(true)
            setValTemp(Math.floor((valTemp-32)*5/9))
            setValTempFeels(Math.floor((valTempFeels-32)*5/9))
        }
    }

    return (
        <div >
            <div className='weather-card'>
                <h2>Weather App</h2>
                <h1>{weather.name}, {weather.sys?.country}</h1>
                <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                <h3>{weather.weather?.[0].description}</h3>
                <h2>{valTemp} {isCelsius ? '°C' : '°F' }</h2>
                <button className='button-change'>
                    <span onClick={changeVariable} >Change °C to °F </span>
                </button>

                <ul className='dates'>
                    <li>
                        <b>Feels like: </b> {valTempFeels} {isCelsius ? '°C' : '°F' }
                    </li>
                    <li>
                        <b>Humidity: </b>{weather.main?.humidity} %
                    </li>
                    <li>
                        <b>Sea level: </b>{weather.main?.sea_level} m
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Weather;
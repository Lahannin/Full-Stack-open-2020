import React, { useState, useEffect } from 'react'
import axios from 'axios'
 
 
const apiKey = 'ADD YOUR APIKEY HERE AFTERWARDS' 
const url = 'http://api.weatherstack.com/current?access_key='
 
const Weather = ({city}) => {

    const [weather, setWeather] = useState({})      
 
    useEffect(() => {
        console.log('effect')
        
        axios
        .get(url+apiKey+'&query='+city)
            .then((response) => {
                setWeather(response.data.current)
        })
        },[city]) 

        console.log(weather)
        

    return (
        <div>
            <h2>Weather in {city}</h2>   
            <p><b>Temperature:</b> {weather.temperature} celcius</p>
            <p><img src={weather.weather_icons} alt="icon" /></p>
            <p><b>Wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
    )

}  


export default Weather









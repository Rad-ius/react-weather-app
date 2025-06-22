import React, { useState, useEffect } from 'react'
import getWeatherData from '../services/getWeatherData'
import getWeatherCondition from '../services/getWeatherCondition'
import getCurrentCityName from '../services/getCurrentCityName'
const CurrentWeather = () => {

    const[weatherData, setWeatherData] = useState("")
    const[conditionCode, setConditionCode] = useState("")
    const[currentCityName, setcurrentCityName] = useState("")

    
    useEffect(()=>{
        const fetchCityName = ()=>{
            const data = getCurrentCityName()
            setcurrentCityName(data)
        }
        fetchCityName()
    },[])
    
    useEffect(()=>{
        const fetchWeatherData = async ()=>{
            const data = await getWeatherData()
            setWeatherData(data)
            setConditionCode(data.current?.weather_code)
        }
        fetchWeatherData()
    },[])


    let currentTemp = weatherData.current?.temperature_2m.toFixed(0);
    const tempUnit = weatherData.current_units?.temperature_2m;
    let weatherCondition = getWeatherCondition(conditionCode)
    const apparentTemp = weatherData.current?.apparent_temperature.toFixed(0)



    return (
        <>
            <div className="current-weather-box">
                <div className="current-location">
                    <h1>{currentCityName}</h1>
                </div>

                <h1>{currentTemp} {tempUnit}</h1>
                <h5>{weatherCondition}</h5>
                <h3>Feels Like : {apparentTemp} </h3>
                
                
                
            </div>
        </>
    )
    }

export default CurrentWeather

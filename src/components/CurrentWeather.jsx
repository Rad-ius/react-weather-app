import React, { useState, useEffect } from 'react'
import getWeatherData from '../services/getWeatherData'
import getWeatherDataByCity from '../services/getWeatherDataByCity'
import '@material/web/textfield/filled-text-field.js';
import '@material/web/button/filled-button.js';

import { fetchSearchForecastData } from '../services/fetchSearchForecastData'

const CurrentWeather = () => {

    const[weatherData, setWeatherData] = useState("")
    const[searchInput, setSearchInput] = useState('')


    // Get Weather Data
    useEffect(() => {
        const fetchInitialWeatherData = async () => {
            try {
                const data = await getWeatherData();
                setWeatherData(data);
            } catch (error) {
                console.error("Error fetching initial weather data:", error);
            }
        };
        fetchInitialWeatherData();
    }, []);


    function handleSeachInput(e){
        e.preventDefault()
        
        if (!searchInput) return;

        const fetchSearchWeatherData = async ()=>{
            try{
                const data = await getWeatherDataByCity(searchInput);
                setWeatherData(data)
                setSearchInput("")
            }
            catch(error){
                console.error(error)
            }
        }
        localStorage.setItem('lastCity', searchInput);
        
        fetchSearchWeatherData()
        
    }


    function handleSearchChange(e){
        setSearchInput((e.target.value.toLowerCase()))
    }

    let currentTemp = weatherData.main?.temp.toFixed(0);
    const tempUnit = weatherData.current_units?.temperature_2m;
    const apparentTemp = weatherData.main?.feels_like.toFixed(0)
    let currentCityName = weatherData.name

    return (
        <>
        <div >
            <form onSubmit={handleSeachInput} id="search-bar">
                <md-filled-text-field 
                placeholder="Search for a city"
                type="text"
                value= {searchInput} 
                onChange={handleSearchChange}
                >
                    <md-icon slot="leading-icon">
                        <span class="material-symbols-outlined">
                        search
                        </span>
                    </md-icon>
                </md-filled-text-field>
                <md-filled-button type="submit">Submit</md-filled-button>
            </form>
    

        
        </div>

            <div className="current-weather-box">
                <div className="current-location">
                    <h1>{currentCityName}</h1>
                </div>

                <h1>{currentTemp} {tempUnit}</h1>
                {/* <h5>{weatherCondition}</h5> */}
                <h3>Feels Like : {apparentTemp} </h3>
                
                
                
            </div>
        </>
    )
    }

export default CurrentWeather

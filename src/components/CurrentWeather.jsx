import React, { useState, useEffect, Fragment } from 'react'
import getWeatherData from '../services/getWeatherData'
import getWeatherDataByCity from '../services/getWeatherDataByCity'
import '@material/web/textfield/filled-text-field.js';
import '@material/web/button/filled-button.js';
import Forecast from './Forecast';
// import fetchCityImage from '../services/fetchCityImage';
import fetchCurrentCityImage from '../services/fetchCurrentCityImage';
import CityImage from './CityImage';
import fetchUserTimeZone from '../services/fetchUserTimeZone';
import '@material/web/progress/circular-progress.js';



const CurrentWeather = () => {


    const[weatherData, setWeatherData] = useState("")
    const[searchInput, setSearchInput] = useState('')
    const[imgData, setImgData] = useState(null)
    const[userTimeZone, setUserTimeZone] = useState("")

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
        const fetchUserTimeZoneData = async () => {
            try{
                const timeData = await fetchUserTimeZone();
                setUserTimeZone(timeData);
                

            }catch (error) {
                console.error("Error fetching user timezone data:", error);
            }
        }
        
        fetchInitialWeatherData();
        fetchUserTimeZoneData()
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
        
        setImgData(searchInput);
        localStorage.setItem('lastCity', searchInput);
        
        fetchSearchWeatherData()
    }


    function handleSearchChange(e){
        setSearchInput((e.target.value.toLowerCase()))
    }



    let currentTemp = weatherData.main?.temp.toFixed(0);
    const apparentTemp = weatherData.main?.feels_like.toFixed(0)
    let currentCityName = weatherData.name
    // const weatherCondition = weatherData?.weather[0]?.main;
    const timeZone = userTimeZone.timeZoneId
    localStorage.setItem("currentCity", currentCityName)

    useEffect(()=>{
        const cityName = weatherData.name;
        if (!cityName) return;
        const fetchInitialImageData = async()=>{
            try{
                const data = await fetchCurrentCityImage(cityName)
                setImgData(data)
            }catch(error){
                console.error(error)
            }
        }
        fetchInitialImageData()
    },[weatherData.name])

    const options = {
        timeZone: timeZone, 
        month: 'long',
        day: 'numeric'
      };

    const date = new Date().toLocaleString("en-US", options)
    return (
        <Fragment className="mdc-typography">
        <div className='wrapper'>
        <div className="weather-conditions">
            <div className="current-weather-box">
            <form onSubmit={handleSeachInput} id="search-bar">
                <md-filled-text-field 
                placeholder="Search for a city"
                type="text"
                id="search-input"
                value= {searchInput} 
                onChange={handleSearchChange}
                >
                    <md-icon slot="leading-icon">
                        <span className="material-symbols-outlined">
                        search
                        </span>
                    </md-icon>
                </md-filled-text-field>
                <md-filled-button type="submit">Submit</md-filled-button>
            </form>
            

            <div className="details-wrapper">
            <div className="weather-details">
                    <img className="condition-icon" src="#" alt="" />
                    <div className="weather-figures">
                    <div className="temp">
                    <h1 className="mdc-typography--headline1">{currentTemp}</h1><h2>°</h2><h1>C</h1>
                    </div>
                    {/* <h5>{weatherCondition}</h5> */}
                    {/* <h3>{weatherCondition} </h3> */}
                    </div>
                    </div>

                    <div className="current-location">
                        <h3>{date}</h3>
                        <h2>{currentCityName}</h2>
                        <h3>Feels Like : {apparentTemp} </h3>
                    </div>
            </div>
                    

            </div>
            

            <div className="city-img">
                {!imgData ? <md-circular-progress four-color indeterminate></md-circular-progress> :<CityImage src={imgData} alt={currentCityName}/> }
            
           
            </div>
            
        </div>
        <div className="forecast-wrapper">
            <div className="forecast-box">
                    <Forecast input={currentCityName}/>
            </div>
        </div>
        
            
            
    

        
        </div>

    
            
        </Fragment>
    )
    }

export default CurrentWeather

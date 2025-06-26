import React, { useState, useEffect } from 'react'
import getForecastData from '../services/getForecastData';
import '@material/web/progress/circular-progress.js';
import { fetchSearchForecastData } from '../services/fetchSearchForecastData';
const Forecast = ({input}) => {
    const[forecastData,setForecastData] = useState(null)
    const[imgData, setImgData] = useState(null)
    

    useEffect(() => {
        const fetchForecastData = async () => {
            try {
                const data = input ? await fetchSearchForecastData(input) : await getForecastData();
                setForecastData(data.list);
                
            } catch (error) {
                console.error("Error fetching Forecast data:", error);
            }
        };
        fetchForecastData();
        
    }, [input]);
    
    if (!forecastData) {
        return <md-circular-progress four-color indeterminate></md-circular-progress>
        ;
    }
    const getDayOfWeek = (timestamp) => {
        // The timestamp from many APIs is in seconds, so we multiply by 1000 for milliseconds
        const date = new Date(timestamp * 1000);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    };

return (
    <>
        <div className="forecast-card">
        <h2>Forecast</h2>
        <div className="forecast-items">
        {forecastData.filter(forecastItem => forecastItem.dt_txt.includes("3:00:00")).map((forecastItem, index)=>{
            return(
                <div className='daily-forecast' key={forecastItem.dt_txt}>
                    <h3 key={forecastItem.dt}>{getDayOfWeek(forecastItem.dt)}</h3>
                    <h4 key={index}> {forecastItem.main.temp.toFixed(0)} °C</h4>
                </div>
            )
        })}
        </div>
        
        </div>
    </>
)
}

export default Forecast

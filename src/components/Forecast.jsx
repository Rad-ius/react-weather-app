import React, { useState, useEffect } from 'react'
import getForecastData from '../services/getForecastData';
import { fetchSearchForecastData } from '../services/fetchSearchForecastData';
const Forecast = ({input}) => {
    const[forecastData,setForecastData] = useState(null)
    

    useEffect(() => {
        const fetchForecastData = async () => {
            try {
                const data = input ? await fetchSearchForecastData(input) : await getForecastData();
                setForecastData(data.list);
                console.log(data.list)
            } catch (error) {
                console.error("Error fetching Forecast data:", error);
            }
        };
        fetchForecastData();
        
    }, [input]);
    
    if (!forecastData) {
        return <div>Loading forecast...</div>;
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
        {forecastData.filter(forecastItem => forecastItem.dt_txt.includes("3:00:00")).map((forecastItem, index)=>{
            return(
                <div className='daily-forecast' key={forecastItem.dt_txt}>
                    <h4 key={forecastItem.dt}>{getDayOfWeek(forecastItem.dt)}</h4>
                    <h4 key={index}> {forecastItem.main.temp.toFixed(0)}</h4>
                </div>
            )
        })}
        </div>
    </>
)
}

export default Forecast

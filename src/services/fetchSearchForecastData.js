const API_key = import.meta.env.VITE_OPEN_API_KEY

let searchInput = localStorage.getItem('lastCity')

export const fetchSearchForecastData = async ()=>{
    try {
        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${API_key}&units=metric`
        );
        const data =  response.json()
        console.log(JSON.stringify(data))
        return data
        
    } catch (error) {
        console.error(error);
    }

}
import getCurrentLocation from "./getCurrentLocation";
const API_key = import.meta.env.VITE_OPEN_API_KEY

const getForecastData = async () => {
    try {
        const { latitude: lat, longitude: lon } = await getCurrentLocation();
        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
        );
        
        const data =  response.json()
        return data
    } catch (error) {
        console.error(error);
    }
};

export default getForecastData;
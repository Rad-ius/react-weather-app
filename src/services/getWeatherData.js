import getCurrentLocation from "./getCurrentLocation";
const getWeatherData = async () => {
    try {
        const { latitude: lat, longitude: lon } = await getCurrentLocation();
        const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code&timezone=auto`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export default getWeatherData;

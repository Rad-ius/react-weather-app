const API_key = import.meta.env.VITE_OPEN_API_KEY

const getWeatherDataByCity = async (cityName) => {
    try {
        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}&units=metric`
        );
        const data =  response.json()
        return data
    } catch (error) {
        console.error(error);
    }
};

export default getWeatherDataByCity;

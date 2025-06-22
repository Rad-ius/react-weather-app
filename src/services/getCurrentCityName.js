
import getCurrentLocation from "./getCurrentLocation";
const getCurrentCityName = async () => {
    try {
        const { latitude: lat, longitude: lon } = await getCurrentLocation();
        const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en
        `
        );
        const data = await response.json();
        return JSON.stringify(data.city).replace(/"/g, '');
        
    } catch (error) {
        console.error(error);
    }
};

export default getCurrentCityName;

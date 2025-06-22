function getWeatherCondition(code) {
        if (code === 0) {
        return "Clear sky";
        } else if (code === 1) {
        return "Mostly clear";
        } else if (code === 2) {
        return "Partly cloudy";
        } else if (code === 3) {
        return "Overcast";
        } else if (code === 61) {
        return "Rain";
        } else if (code === 71) {
        return "Snow";
        } else {
        return "Unknown";
        }
    }

export default getWeatherCondition;

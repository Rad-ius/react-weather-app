import getCurrentLocation from "./getCurrentLocation";
const API_key = import.meta.env.VITE_TIMEZONE_KEY;
const timestamp = Math.floor(Date.now() / 1000);

export default async function fetchUserTimeZone() {
  try {
    const { latitude: lat, longitude: lon } = await getCurrentLocation();

    const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=${timestamp}&key=${API_key}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Failed to fetch from Unsplash API:', error.message);
    return null;
  }
}
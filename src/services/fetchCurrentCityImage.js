const API_key = import.meta.env.VITE_UNSPLASH_API_KEY;


export default async function fetchCurrentCityImage(name) {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${API_key}&query=${name}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data)
    return data.results[0].urls.regular;

  } catch (error) {
    console.error('Failed to fetch from Unsplash API:', error.message);
    return null;
  }
}
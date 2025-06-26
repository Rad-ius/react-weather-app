const API_key = import.meta.env.VITE_UNSPLASH_API_KEY;

export default async function fetchCityImage(searchInput) {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${API_key}&query=${searchInput}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.results[0]?.urls?.raw || null;

  } catch (error) {
    console.error('Failed to fetch from Unsplash API:', error.message);
    return null;
  }
}
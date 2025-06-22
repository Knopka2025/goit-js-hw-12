import axios from 'axios';

const API_KEY = '50846905-dc608c04a9f845ecec04912aa';
const URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {

    const response = await axios.get(URL, {
      params: {
        key: API_KEY,
        q: query,
        per_page: 15,
        page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    const images = response.data.hits;
    const totalHits = response.data.totalHits;
    return { images, totalHits };
  }
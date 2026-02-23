import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54634222-77c9b0f4b64a04c45eba29331';

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    },
  });

  return response.data;
}
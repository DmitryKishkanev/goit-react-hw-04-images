import axios from 'axios';
import { BASE_URL, API_KEY } from 'config';

export const getImages = async (searchQuery, searchPage) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: searchQuery,
      page: searchPage,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return response.data.hits;
};

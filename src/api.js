import axios from 'axios';

const API_KEY = '809327f3dff434e6fb1d84e3adabc471'; // TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrending = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: { api_key: API_KEY },
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch trending movies');
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, query, page },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to search movies');
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: { api_key: API_KEY, append_to_response: 'videos,credits' },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movie details');
  }
};
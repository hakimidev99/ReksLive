import axios from 'axios';

const API_KEY = '669cf58d429534c9657be216521f1741';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const response = await MovieAPI.get('/trending/movie/day');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await MovieAPI.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId: number) => {
  try {
    const res = await MovieAPI.get(`/movie/${movieId}`, {
      params: { append_to_response: 'credits,videos,images' },
    });
    return res.data;
  } catch (error) {
    console.error(`Error fetching details for movie ${movieId}:`, error);
    return null;
  }
};

export default MovieAPI;

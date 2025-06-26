import axios from 'axios';
import { SearchResponse, MovieApiResponse } from '../types/movie';
import { API_KEY, BASE_URL } from '../utils/constants';


const movieApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});


export const searchMovies = async (
  query: string,
  page: number = 1,
  year?: string,
  type?: string
): Promise<SearchResponse> => {
  const params: Record<string, string | number> = {
    s: query,
    page,
  };

  if (year) params.y = year;
  if (type) params.type = type;

  const response = await movieApi.get('', { params });
  return response.data;
};


export const getMovieDetails = async (id: string): Promise<MovieApiResponse> => {
  const response = await movieApi.get('', {
    params: {
      i: id,
    },
  });
  return response.data;
};

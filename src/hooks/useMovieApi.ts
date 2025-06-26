 import { useState } from 'react';
import { searchMovies, getMovieDetails } from '../services/movieApi';

export const useMovieApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchMovies(query, page);
      if (response.Response === 'False') {
        setError(response.Error || 'No movies found');
        return [];
      }
      return response.Search;
    } catch (err) {
      setError('Failed to fetch movies');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getDetails = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMovieDetails(id);
      if (response.Response === 'False') {
        setError(response.Error || 'Movie not found');
        return null;
      }
      return response;
    } catch (err) {
      setError('Failed to fetch movie details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, search, getDetails };
};


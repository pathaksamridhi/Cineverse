import { Movie } from '../types/movie';
import { useLocalStorage } from './useLocalStorage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage<Movie[]>('movie-favorites', []);

  const addToFavorites = (movie: Movie) => {
    if (!favorites.some(m => m.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (movieId: string) => {
    setFavorites(favorites.filter(movie => movie.imdbID !== movieId));
  };

  const isFavorite = (movieId: string) => {
    return favorites.some(movie => movie.imdbID === movieId);
  };

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };
};

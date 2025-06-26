// 🔍 Basic movie info returned in search results
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: 'movie' | 'series' | 'episode';
  Poster: string;
}

// 🎬 Detailed movie info returned for a single movie (by ID)
export interface MovieDetails extends Movie {
  Plot: string;
  Director: string;
  Actors: string;
  Runtime: string;
  Genre: string;
  imdbRating: string;
  Released: string;
}

// 🔁 API response for a search query
export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: 'True' | 'False';
  Error?: string;
}

// 🧾 API response for single movie details
export interface MovieApiResponse extends Partial<MovieDetails> {
  Response: 'True' | 'False';
  Error?: string;
}

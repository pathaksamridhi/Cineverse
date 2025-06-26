import { Grid, Box } from '@mui/material';
import { MovieCard } from './MovieCard';
import { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} justifyContent="center">
        {movies.map((movie) => (
          <Grid
            item
            key={movie.imdbID}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

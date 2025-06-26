import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Card,
  CardMedia,
  Paper,
  Typography,
  IconButton,
  Chip,
  Button,
  Box,
  Skeleton,
  Alert,
} from '@mui/material';
import { Favorite, FavoriteBorder, OpenInNew } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { getMovieDetails } from '../../services/movieApi';
import { MovieApiResponse, MovieDetails as MovieDetailsType } from '../../types/movie';
import { BackButton } from '../common/BackButton';
import { useFavorites } from '../../hooks/useFavorites';
import Grid from '@mui/material/Unstable_Grid2';

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    i18n.on('languageChanged', () => setReady(true));
    setReady(true);
  }, [i18n]);

  useEffect(() => {
    if (id) fetchMovieDetails(id);
  }, [id]);

  const fetchMovieDetails = async (movieId: string) => {
    setLoading(true);
    setError(null);
    try {
      const movieData: MovieApiResponse = await getMovieDetails(movieId);
      if (movieData.Response === 'False') {
        setError(movieData.Error || t('app.error'));
      } else {
        setMovie(movieData as MovieDetailsType);
      }
    } catch (err) {
      setError(t('app.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteClick = () => {
    if (movie) {
      const movieForFavorites = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Type: movie.Type,
        Poster: movie.Poster,
      };
      toggleFavorite(movieForFavorites);
    }
  };

  if (!ready || loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <BackButton />
        <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 2 }} />
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Skeleton variant="rectangular" height={500} />
          </Grid>
          <Grid xs={12} md={8}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={40} />
            <Skeleton variant="text" height={100} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <BackButton />
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!movie) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <BackButton />
      <Grid container spacing={4} alignItems="flex-start" justifyContent="center">
        <Grid xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ width: 300, boxShadow: 6 }}>
            <CardMedia
              component="img"
              image={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.png'}
              alt={movie.Title}
              sx={{ height: 450, objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        <Grid xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h3" component="h1" sx={{ flexGrow: 1 }}>
                {movie.Title}
              </Typography>
              <IconButton
                onClick={handleFavoriteClick}
                color={isFavorite(movie.imdbID) ? 'error' : 'default'}
                size="large"
                sx={{ ml: 2 }}
              >
                {isFavorite(movie.imdbID) ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>
            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip label={movie.Year} />
              {movie.Runtime && <Chip label={movie.Runtime} />}
              {movie.Genre && <Chip label={movie.Genre} />}
              {movie.imdbRating !== 'N/A' && (
                <Chip label={`IMDb: ${movie.imdbRating}`} color="primary" />
              )}
            </Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {t('movie.about')}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {t('movie.plot')}
            </Typography>
            <Typography variant="body1" paragraph>
              {movie.Plot}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {t('movie.director')}
            </Typography>
            <Typography variant="body1" paragraph>
              {movie.Director}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {t('movie.actors')}
            </Typography>
            <Typography variant="body1" paragraph>
              {movie.Actors}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {t('app.released')}{': '}{movie.Released}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<OpenInNew />}
              href={`https://www.imdb.com/title/${movie.imdbID}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 2 }}
            >
              {t('app.viewOnImdb')}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  Grid,
  Chip,
  IconButton,
  Skeleton,
  Alert,
  Button,
  Paper,
} from '@mui/material';
import { Favorite, FavoriteBorder, OpenInNew } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { getMovieDetails } from '../services/movieApi';
import { MovieApiResponse, MovieDetails as MovieDetailsType } from '../types/movie';
import { useFavorites } from '../hooks/useFavorites';
import { BackButton } from '../components/common/BackButton';
import { useTheme } from '@mui/material/styles'; 

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const theme = useTheme(); 

  useEffect(() => {
    if (id) fetchMovieDetails(id);
    
  }, [id]);

  const fetchMovieDetails = async (movieId: string) => {
    setLoading(true);
    setError(null);
    try {
      const movieData: MovieApiResponse = await getMovieDetails(movieId);
      if (movieData.Response === 'False') {
        setError(movieData.Error || 'Movie not found');
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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-start' }}>
          <BackButton />
        </Box>
        <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 2 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={500} />
          </Grid>
          <Grid item xs={12} md={8}>
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
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-start' }}>
          <BackButton />
        </Box>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!movie) return null;

  const genres = movie.Genre ? movie.Genre.split(',').map(g => g.trim()) : [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
     
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-start' }}>
        <BackButton />
      </Box>
     
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 4 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 4,
            background: theme.palette.background.default, 
            maxWidth: 1100,
            width: '100%',
          }}
        >
          
          <Box
            sx={{
              minWidth: { xs: 220, sm: 300, md: 360 },
              maxWidth: { xs: 220, sm: 300, md: 360 },
              flexShrink: 0,
              mb: { xs: 3, md: 0 },
              alignSelf: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Card
              elevation={6}
              sx={{
                borderRadius: 4,
                boxShadow: 6,
                overflow: 'hidden',
                bgcolor: theme.palette.background.paper, 
              }}
            >
              <CardMedia
                component="img"
                image={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.png'}
                alt={movie.Title}
                sx={{
                  width: '100%',
                  height: { xs: 320, sm: 420, md: 520 },
                  objectFit: 'cover',
                }}
              />
            </Card>
          </Box>
          
          <Box sx={{ flex: 1, minWidth: 0 }}>
           
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  flexGrow: 1,
                  fontWeight: 700,
                  textAlign: 'left',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  lineHeight: 1.1,
                  wordBreak: 'break-word',
                  color: theme.palette.text.primary, 
                }}
              >
                {movie.Title}{' '}
                <span style={{ fontWeight: 400, color: theme.palette.text.secondary }}>
                  ({movie.Year})
                </span>
              </Typography>
              <IconButton
                onClick={handleFavoriteClick}
                color={isFavorite(movie.imdbID) ? 'error' : 'default'}
                size="large"
                sx={{ ml: 1 }}
              >
                {isFavorite(movie.imdbID) ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>

            {/* Genres */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              {genres.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  sx={{
                    bgcolor: theme.palette.secondary.main, 
                    color: theme.palette.secondary.contrastText,
                    fontWeight: 500,
                    fontSize: 16,
                    px: 2,
                    borderRadius: 2,
                  }}
                />
              ))}
            </Box>

            {/* IMDb Button */}
            <Button
              variant="contained"
              sx={{
                background: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                fontWeight: 600,
                borderRadius: 2,
                px: 3,
                mb: 3,
                boxShadow: 2,
                textAlign: 'left',
                '&:hover': {
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.contrastText,
                },
              }}
              startIcon={<OpenInNew />}
              href={`https://www.imdb.com/title/${movie.imdbID}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              IMDb
            </Button>

            {/* About Section */}
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, textAlign: 'left', color: theme.palette.text.primary }}>
              {t('movie.about')}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 3, textAlign: 'left', color: theme.palette.text.primary }}>
              {movie.Plot}
            </Typography>

            {/* Director */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, textAlign: 'left', color: theme.palette.text.primary }}>
              {t('movie.director')}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 2, textAlign: 'left', color: theme.palette.text.primary }}>
              {movie.Director}
            </Typography>

            {/* Actors */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, textAlign: 'left', color: theme.palette.text.primary }}>
              {t('movie.actors')}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 2, textAlign: 'left', color: theme.palette.text.primary }}>
              {movie.Actors}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

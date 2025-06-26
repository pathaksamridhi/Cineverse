import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { Favorite, FavoriteBorder, Info } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Movie } from '../../types/movie';
import { useFavorites } from '../../hooks/useFavorites';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleDetailsClick = () => navigate(`/movie/${movie.imdbID}`);
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    toggleFavorite(movie);
  };

  return (
    <Card
      sx={{
        width: 240,            
        height: 420,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.03)' },
        bgcolor: '#3D2B1F',
        color: 'white',
        position: 'relative',
      }}
      onClick={handleDetailsClick}
    >
      {/* Poster image with favorite button overlay */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="320"
          image={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.png'}
          alt={movie.Title}
          sx={{ objectFit: 'cover' }}
        />
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          {isFavorite(movie.imdbID) ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </Box>

      {/* Movie title and year */}
      <CardContent sx={{ flexGrow: 1, p: 2, pb: 0 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: 1.2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '2.4rem',
            textAlign: 'center',
            color: 'white',
          }}
        >
          {movie.Title}
        </Typography>
        <Typography
          variant="body2"
          color="grey.400"
          sx={{ textAlign: 'center', mb: 1 }}
        >
          {t('movie.year')}: {movie.Year}
        </Typography>
      </CardContent>

      {/* Info button */}
      <CardActions sx={{ justifyContent: 'center', pb: 1 }}>
        <IconButton onClick={handleDetailsClick} color="primary">
          <Info />
        </IconButton>
      </CardActions>
    </Card>
  );
};

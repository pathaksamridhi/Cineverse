import { Box, Typography, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MovieGrid } from '../components/movie/MovieGrid';
import { useFavorites } from '../hooks/useFavorites';
import { BackButton } from '../components/common/BackButton';
import { useTheme } from '@mui/material/styles'; 

export const Favorites: React.FC = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const theme = useTheme(); 

  if (favorites.length === 0) {
    return (
      <Box
        sx={{
          width: '100%',
          px: 4,
          py: 4,
          position: 'relative',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* 🔙 Back Button */}
        <Box sx={{ position: 'absolute', top: 10, left: 16 }}>
          <BackButton />
        </Box>

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mt: 6,
            color: theme.palette.text.primary, 
          }}
        >
          {t('app.favorites')}
        </Typography>
        <Alert severity="info">
          {t('app.noFavoritesMessage', {
            defaultValue: 'No favorite movies yet. Start adding movies to your favorites!',
          })}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        px: 4,
        py: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.default, 
      }}
    >
      {/* 🔙 Back Button */}
      <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
        <BackButton />
      </Box>

      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mt: 6,
          color: theme.palette.text.primary, 
        }}
      >
        {t('app.favorites')} ({favorites.length})
      </Typography>
      <MovieGrid movies={favorites} />
    </Box>
  );
};

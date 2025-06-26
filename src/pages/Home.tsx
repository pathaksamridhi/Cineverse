import {
  Box,
  Typography,
  useTheme,
  Button
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '64px',                 
        bottom: '48px',              
        left: 0,
        right: 0,
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        textAlign: 'center',
      }}
    >
      <Box sx={{ maxWidth: 600 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: theme.palette.text.primary, // Changed to text.primary for better visibility
            mb: 2,
          }}
        >
          {t('app.title')}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: theme.palette.text.secondary, // Use secondary for subtext
          }}
        >
          {t('app.welcomeMessage')} 
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/search')}
          sx={{
            fontWeight: 600,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark, // Darker on hover
            }
          }}
        >
          {t('app.startSearching')} 
        </Button>
      </Box>
    </Box>
  );
};

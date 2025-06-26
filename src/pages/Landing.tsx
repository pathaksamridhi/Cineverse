import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: '#E3DAC9', // Beige background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          background: '#FDE7EF', // Pink card
          borderRadius: 3,
          boxShadow: 4,
          px: { xs: 2, sm: 8 },
          py: { xs: 4, sm: 6 },
          minWidth: { xs: '90%', sm: 400 },
          maxWidth: 480,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: '#7C4D3F',
            mb: 2,
            letterSpacing: 1,
          }}
        >
          MovieSync
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: '#7C4D3F',
            mb: 4,
            fontWeight: 500,
          }}
        >
          Search, Save & Streamline your favourite movies!
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: '#7C4D3F',
              borderColor: '#7C4D3F',
              fontWeight: 600,
              px: 4,
              minWidth: 120,
              '&:hover': { borderColor: '#BCAAA4', background: '#F5E1DA' },
            }}
            onClick={() => navigate('/signin')}
          >
            SIGN IN
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: '#7C4D3F',
              color: '#fff',
              fontWeight: 600,
              px: 4,
              minWidth: 180,
              boxShadow: 2,
              '&:hover': { background: '#5D4037' },
            }}
            onClick={() => navigate('/search')}
          >
            START SEARCHING
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const JustSearch: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#E3DAC9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        variant="contained"
        size="large"
        sx={{
          background: '#3D2B1F',
          color: '#fff',
          fontWeight: 700,
          px: 4,
          py: 2,
          fontSize: '1.2rem',
          borderRadius: 2,
          '&:hover': { background: '#6d4c41' },
        }}
        onClick={() => navigate('/search')}
      >
        SEARCH MOVIES
      </Button>
    </Box>
  );
};

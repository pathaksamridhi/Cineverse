import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        backgroundColor: '#927064',
        
        borderTop: 1,
        borderColor: 'divider',
        width: '100vw',
        position: 'fixed',
        left: 0,
        bottom: 0,
        textAlign: 'center',
        zIndex: 1300,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {t('app.title')} © {new Date().getFullYear()}
      </Typography>
      <Box
  sx={{
    position: 'fixed',
    bottom: 5,
    left: 0,
    width: '100%',
    textAlign: 'center',
    background: '#', // or your dark brown
    color: '#fff',          // <-- This makes text white
    py: 1,
    fontWeight: 500,
    zIndex: 10,
  }}
>
  <Typography variant="body1" sx={{ color: '#fff' }}>
  
  </Typography>
</Box>

    </Box>
  );
};

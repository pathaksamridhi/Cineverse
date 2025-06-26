import { Button, useTheme } from '@mui/material'; 
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';

interface BackButtonProps {
  label?: string;
  variant?: 'text' | 'outlined' | 'contained';
  sx?: object;
}

export const BackButton: React.FC<BackButtonProps> = ({
  label,
  variant = 'outlined',
  sx = {},
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme(); 

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/'); 
    }
  };

  return (
    <Button
      startIcon={<ArrowBack />}
      onClick={handleBack}
      variant={variant}
      color="inherit"
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        
        color: theme.palette.text.primary,
        borderColor: variant === 'outlined' ? theme.palette.divider : undefined,
        backgroundColor: variant === 'contained' ? theme.palette.background.paper : undefined,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        ...sx,
      }}
    >
      {label || t('app.back')}
    </Button>
  );
};

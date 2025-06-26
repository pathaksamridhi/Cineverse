import { createTheme } from '@mui/material/styles';
import { useState, useMemo } from 'react';

export const useAppTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#6D4C41',
            contrastText: '#fff',
          },
          secondary: {
            main: '#FFD54F', 
            contrastText: darkMode ? '#222' : '#3D2B1F',
          },
          background: {
            default: darkMode ? '#181818' : '#F5F5DC', 
            paper: darkMode ? '#232323' : '#fff',
          },
          text: {
            primary: darkMode ? '#fff' : '#3D2B1F',
            secondary: darkMode ? '#FFD54F' : '#6D4C41', 
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: darkMode ? '#181818' : '#F5F5DC',
                color: darkMode ? '#fff' : '#3D2B1F',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: darkMode ? '#232323' : '#6D4C41',
                color: '#fff',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              contained: {
                borderRadius: 8,
                fontWeight: 600,
              },
              containedPrimary: {
                backgroundColor: darkMode ? '#8D6E63' : '#6D4C41',
                color: '#fff',
                '&:hover': {
                  backgroundColor: darkMode ? '#A1887F' : '#4E342E',
                },
              },
              containedSecondary: {
                backgroundColor: '#FFD54F',
                color: darkMode ? '#222' : '#3D2B1F',
                '&:hover': {
                  backgroundColor: '#FFB300',
                  color: darkMode ? '#000' : '#fff',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: darkMode ? '#232323' : '#fff',
              },
            },
          },
        },
      }),
    [darkMode]
  );

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return { theme, toggleTheme, darkMode };
};

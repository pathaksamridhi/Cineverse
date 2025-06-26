import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useAppTheme } from './theme/theme';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';
import { MovieDetails } from './pages/MovieDetails';
import { Favorites } from './pages/Favorites';
import './i18n/config';

function App() {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout onThemeToggle={toggleTheme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import {
  Typography,
  Grid,
  Box,
  Pagination,
  Alert,
  TextField,
  Button,
  InputAdornment,
  Paper,
  Container,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { MovieCard } from '../components/movie/MovieCard';
import { searchMovies } from '../services/movieApi';
import { Movie } from '../types/movie';
import { BackButton } from '../components/common/BackButton';

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [year, setYear] = useState(searchParams.get('year') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setError(null); // Clear any previous error
  }, [searchQuery, year, type, page]);

  useEffect(() => {
    if (!searchQuery.trim()) return;
    handleSearch(searchQuery, page, year, type);
  }, [searchQuery, year, type, page]);

  const handleSearch = async (
    query: string,
    currentPage: number,
    selectedYear?: string,
    selectedType?: string
  ) => {
    setLoading(true);
    try {
      const res = await searchMovies(query, currentPage, selectedYear, selectedType);
      if (res.Response === 'True') {
        setMovies(res.Search);
        setTotalPages(Math.ceil(parseInt(res.totalResults) / 10));
        setError(null);
      } else {
        setMovies([]);
const fallbackError = res.Error || 'Unknown error';
const errorKey = `errors.${fallbackError}`;
setError(t(errorKey, fallbackError));

      }
    } catch {
      setMovies([]);
      setError(t('app.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError(t('errors.Search query cannot be empty.', 'Please enter a search term.'));
      return;
    }
    setSearchParams({
      q: searchQuery,
      year,
      type,
      page: '1',
    });
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setSearchParams({
      q: searchQuery,
      year,
      type,
      page: value.toString(),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 60,
          left: 0,
          width: '100%',
          height: '300px',
          backgroundColor: theme.palette.background.default,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`,
          px: 2,
        }}
      >
        <Box sx={{ position: 'absolute', top: 44, left: 128 }}>
          <BackButton />
        </Box>

        <Typography variant="h4" fontWeight="bold" sx={{ color: theme.palette.text.primary, mb: 1 }}>
          {t('app.searchPageTitle')} 🕵️‍♂️
        </Typography>

        <Paper
          component="form"
          onSubmit={handleFormSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            width: { xs: '100%', sm: 700 },
            boxShadow: 3,
            background: theme.palette.background.paper,
            border: `2px solid ${theme.palette.divider}`,
            borderRadius: 3,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <TextField
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setError(null);
            }}
            placeholder={t('app.searchPlaceholder')}
            sx={{
              minWidth: 200,
              background: theme.palette.background.paper,
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                color: theme.palette.text.primary,
              },
              '& .MuiInputLabel-root': {
                color: theme.palette.text.secondary,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
            }}
          />

          <Select
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setPage(1);
              setError(null);
            }}
            displayEmpty
            sx={{
              minWidth: 120,
              background: theme.palette.background.paper,
              borderRadius: 2,
              '& .MuiSelect-select': {
                color: theme.palette.text.primary,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.divider,
              },
            }}
          >
            <MenuItem value="">{t('filter.allYears')}</MenuItem>
            {Array.from({ length: 30 }, (_, i) => 2025 - i).map((y) => (
              <MenuItem key={y} value={y.toString()}>
                {y}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
              setError(null);
            }}
            displayEmpty
            sx={{
              minWidth: 120,
              background: theme.palette.background.paper,
              borderRadius: 2,
              '& .MuiSelect-select': {
                color: theme.palette.text.primary,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.divider,
              },
            }}
          >
            <MenuItem value="">{t('filter.allTypes')}</MenuItem>
            <MenuItem value="movie">{t('filter.movie')}</MenuItem>
            <MenuItem value="series">{t('filter.series')}</MenuItem>
            <MenuItem value="episode">{t('filter.episode')}</MenuItem>
          </Select>

          <IconButton
            onClick={() => {
              setYear('');
              setType('');
              setSearchParams({ q: searchQuery });
              setError(null);
            }}
          >
            <ClearIcon sx={{ color: theme.palette.text.secondary }} />
          </IconButton>

          <Button
            type="submit"
            variant="contained"
            sx={{
              px: 4,
              height: '56px',
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': {
                background: theme.palette.primary.dark,
              },
            }}
          >
            {t('app.search')}
          </Button>
        </Paper>

        {!loading && error && (
          <Alert
            severity="error"
            sx={{
              mt: 2,
              textAlign: 'center',
              width: { xs: '90%', sm: 700 },
            }}
          >
            {error}
          </Alert>
        )}
      </Box>

      <Container maxWidth="lg" sx={{ pt: '320px', pb: 6 }}>
        {searchQuery && !error && movies.length > 0 && (
          <>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: theme.palette.text.primary, mb: 3, textAlign: 'center' }}
            >
              {t('app.searchResults', { query: searchQuery })}
            </Typography>

            <Grid container spacing={3}>
              {movies.map((movie) => (
                <Grid item xs={12} sm={6} md={3} key={movie.imdbID}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: theme.palette.text.primary,
                    },
                    '& .Mui-selected': {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};

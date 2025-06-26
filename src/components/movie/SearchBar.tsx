 import {
  TextField,
  Button,
  Paper,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError(t('app.searchError'));
      return;
    }
    setError('');
    onSearch(query.trim());
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        width: '100%',
        maxWidth: 600,
        display: 'flex',
        gap: 2,
      }}
    >
      <TextField
        fullWidth
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (error) setError('');
        }}
        placeholder={t('app.searchPlaceholder')}
        error={!!error}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
      >
        {t('app.search')}
      </Button>
    </Paper>
  );
};

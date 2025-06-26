import { Select, MenuItem, FormControl } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { supportedLngs } from '../../i18n/config';

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  return (
    <FormControl size="small" sx={{ minWidth: 100, mr: 2 }}>
      <Select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        variant="outlined"
        displayEmpty
        sx={{
          color: 'white',
          fontWeight: 500,
          height: 40,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '& .MuiSelect-icon': { color: 'white' },
        }}
        inputProps={{ 'aria-label': 'Language' }}
      >
        <MenuItem disabled value="">
          {t('app.language')}
        </MenuItem>
        {Object.entries(supportedLngs).map(([code, name]) => (
          <MenuItem key={code} value={code}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

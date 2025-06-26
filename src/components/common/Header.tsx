import { AppBar, Toolbar, Typography } from '@mui/material';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onThemeToggle: () => void;
}

export const Header = ({ onThemeToggle }: HeaderProps) => {
  const { t } = useTranslation();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {t('app.title')}
        </Typography>
        <LanguageSwitcher />
        <ThemeToggle onToggle={onThemeToggle} />
      </Toolbar>
    </AppBar>
  );
};

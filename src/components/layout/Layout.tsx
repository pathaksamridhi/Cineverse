import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Search,
  Favorite,
  Close,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Footer } from '../common/Footer';
import { useTranslation } from 'react-i18next';

const DRAWER_WIDTH = 250;
const MINI_DRAWER_WIDTH = 64;
const BROWN = '#8D6E63';

interface LayoutProps {
  children: React.ReactNode;
  onThemeToggle: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onThemeToggle }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDesktopDrawerOpen, setIsDesktopDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    { text: t('app.home'), icon: <Home />, path: '/' },
    { text: t('app.search'), icon: <Search />, path: '/search' },
    { text: t('app.favorites'), icon: <Favorite />, path: '/favorites' },
  ];

  const currentDrawerWidth = isMobile
    ? DRAWER_WIDTH
    : isDesktopDrawerOpen
    ? DRAWER_WIDTH
    : MINI_DRAWER_WIDTH;

  const drawer = (
    <Box sx={{ width: currentDrawerWidth, overflow: 'hidden' }}>
      {!isMobile && (
        <Box sx={{
          display: 'flex',
          justifyContent: isDesktopDrawerOpen ? 'space-between' : 'center',
          alignItems: 'center',
          p: 1,
          minHeight: 64
        }}>
          {isDesktopDrawerOpen && (
            <Typography variant="h6" component="div" sx={{ fontSize: '1rem', color: '#fff' }}>
              {t('app.title')}
            </Typography>
          )}
          <IconButton onClick={() => setIsDesktopDrawerOpen(!isDesktopDrawerOpen)} sx={{ color: '#fff' }}>
            {isDesktopDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
      )}
      {isMobile && (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ color: '#fff' }}>
            {t('app.title')}
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#fff' }}>
            <Close />
          </IconButton>
        </Box>
      )}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Tooltip title={!isDesktopDrawerOpen && !isMobile ? item.text : ''} placement="right">
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={() => isMobile && setDrawerOpen(false)}
                sx={{
                  minHeight: 48,
                  justifyContent: isDesktopDrawerOpen || isMobile ? 'initial' : 'center',
                  px: 2.5,
                  color: '#fff',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255,255,255,0.08)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isDesktopDrawerOpen || isMobile ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#fff', 
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {(isDesktopDrawerOpen || isMobile) && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ color: '#fff', fontWeight: 500 }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: BROWN }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
            {t('app.title')}
          </Typography>
          <LanguageSwitcher />
          <ThemeToggle onToggle={onThemeToggle} />
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? drawerOpen : true}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: currentDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: currentDrawerWidth,
            boxSizing: 'border-box',
            backgroundColor: BROWN, 
            color: '#fff',         
            borderRight: 'none',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Toolbar />
        {drawer}
      </Drawer>

      {/* Main Layout Wrapper */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minHeight: '100vh',
          ml: { md: `${currentDrawerWidth}px`, xs: 0 },
          width: { md: `calc(100% - ${currentDrawerWidth}px)`, xs: '100%' },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            pb: '56px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Container maxWidth="xl" sx={{ textAlign: 'center' }}>
            {children}
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

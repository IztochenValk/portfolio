import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Sun, Moon } from 'lucide-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    },
    primary: {
      main: '#007bff'
    },
    secondary: {
      main: '#6c757d'
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    },
    primary: {
      main: '#0d6efd'
    },
    secondary: {
      main: '#495057'
    }
  }
});

const ThemeSwitcher = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <IconButton onClick={toggleTheme}>
          {darkMode ? <Sun color="#f5f5f5" /> : <Moon color="#121212" />}
        </IconButton>
      </Box>
      {children}
    </ThemeProvider>
  );
};

export default ThemeSwitcher;

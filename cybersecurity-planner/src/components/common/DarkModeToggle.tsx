import React from 'react';
import { useThemeContext } from '@/context/ThemeContext';

const DarkModeToggle = () => {
  const { toggleTheme, darkMode } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'relative',
        right: '20px',
        background: 'transparent',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: darkMode ? '#facc15' : '#1e293b',
      }}
      title='Toggle dark mode'
    >
    {darkMode ? '🌙' : '☀️'}
  </button>
  );
};

export default DarkModeToggle;

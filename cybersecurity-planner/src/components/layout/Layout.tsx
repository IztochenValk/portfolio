import React from "react";
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { useThemeContext } from "@context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const drawerWidth = 240;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { darkMode, toggleTheme } = useThemeContext();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap>
            Configurator
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            {darkMode ? <Sun /> : <Moon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

// App.js
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import AddIcon from '@mui/icons-material/Add';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,

  Button,
  Container,
  Box,
  Fab,
} from "@mui/material";
import DialogCom from "../../component/Dialog";
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((open) => !open);
  };
  const toggleTheme = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
  
        <AppBar position="static" color="secondary">
          <Toolbar sx={{displayL:"flex" , justifyContent:"space-between"}}>
            <Typography variant="h6">My App</Typography>
            <IconButton color="inherit" onClick={toggleTheme}>
              <Brightness6Icon />
            </IconButton>
          </Toolbar>
        </AppBar>
      
    {  open&& <DialogCom />}
  
        <Box position="fixed" bottom={16} right={16} color="secondary">
        <Fab color="success" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </Box>
  
    </ThemeProvider>
  );
};

export default App;

// App.js
import  { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness6Icon from "@mui/icons-material/Brightness6";

import {
  AppBar,
  Toolbar,
  
  IconButton,
  Card,


  

} from "@mui/material";
import MenuBarCom from "../../component/Menu";
import TaskDialogCom from "../../component/TaskDialogCom";


const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  
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
  
      <Card>
      <AppBar position="static" color="secondary">
          <Toolbar sx={{displayL:"flex" , justifyContent:"space-between"}}>
          <MenuBarCom />
            <IconButton color="inherit" onClick={toggleTheme}>
              <Brightness6Icon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Card>
      
    
  <TaskDialogCom />
    
    </ThemeProvider>
  );
};

export default App;

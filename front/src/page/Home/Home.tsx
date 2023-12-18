// App.js
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import { useAppContext } from "../../context/AppContext";

import {
  AppBar,
  Toolbar,
  IconButton,
  Card,
  Box,
  CardContent,
  CardActions,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import MenuBarCom from "../../component/Menu";
import TaskDialogCom from "../../component/TaskDialogCom";
import { Navigate } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";

const Home = () => {
  const { user, tasks, getTasks } = useAppContext();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      getTasks();
    };
    fetchTasks();
  });
  const toggleTheme = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <>
      {user ? (
        <ThemeProvider theme={theme}>
          <Card color="secondary">
            <AppBar position="static" color="secondary">
              <Toolbar
                sx={{ displayL: "flex", justifyContent: "space-between" }}
              >
                <MenuBarCom />
                <IconButton color="inherit" onClick={toggleTheme}>
                  <Brightness6Icon />
                </IconButton>
              </Toolbar>
            </AppBar>
            {tasks.length < 0 ? (
              <Typography variant="h3" color="initial">
                {" "}
                There Is No Tasks{" "}
              </Typography>
            ) : (
              <Box
                display="flex"
                mx="auto"
                my="30px"
                color=""
                width="90%"
                minHeight="80vh"
                gap="20px"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
              >
                <Card
                  variant="outlined"
                  sx={{ height: "240px", width: "260px" }}
                >
                  <CardContent>
                    <Typography >
                      Play Footbool
                    </Typography>
                    <Accordion
                      sx={{
                        marginTop: "20px",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-label="Expand"
                        aria-controls="-content"
                        id="-header"
                      >
                        <Typography sx={{textTransform:"capitalize"}}>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Deserunt reiciendis 
                        
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails></AccordionDetails>
                    </Accordion>
                  </CardContent>
                  <CardActions sx={{display:"flex" ,justifyContent:"space-between"}}>
                    <Button variant="text" color="primary" size="small">
                      Learn more
                    </Button>
                    <Button variant="text" color="primary" size="small">
                      Learn more
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            )}
          </Card>

          <TaskDialogCom />
        </ThemeProvider>
      ) : (
        <Navigate to="/register" />
      )}
    </>
  );
};

export default Home;

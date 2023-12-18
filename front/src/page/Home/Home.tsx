// App.js
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import { useAppContext } from "../../context/AppContext";
import DeleteIcon from "@mui/icons-material/Delete";
import SystemSecurityUpdateGoodTwoToneIcon from "@mui/icons-material/SystemSecurityUpdateGoodTwoTone";
import { motion ,AnimatePresence } from "framer-motion";
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
  Checkbox,
  Tabs,
  Tab,
} from "@mui/material";
import MenuBarCom from "../../component/Menu";
import TaskDialogCom from "../../component/TaskDialogCom";
import { Navigate } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";

const Home = () => {
  const [tabValue, SetTabValue] = useState(0);



  const { user, tasks, getTasks ,filterTasks} = useAppContext();
  const handleTabValue = (event: React.SyntheticEvent, newValue: number) => {
  
    SetTabValue(newValue);

    filterTasks(event.target.firstChild.textContent)
  };
  const [darkMode, setDarkMode] = useState(false);
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: .9,
        staggerChildren: 0.9
      }
    }
  };
  useEffect(() => {
    const fetchTasks = async () => {
      getTasks();
    };
    fetchTasks();
    console.log(tasks);
  }, []);
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
                sx={{
                  displayL: "flex",
                  justifyContent: "space-between",
                  minHeight: "80",
                }}
              >
                <MenuBarCom />
                <IconButton color="inherit" onClick={toggleTheme}>
                  <Brightness6Icon />
                </IconButton>
              </Toolbar>
            </AppBar>
            {tasks.length === 0 ? (
              <Card
                sx={{
                  padding: "20px",
                  margin: "100px auto",
                }}
              >
                <Typography variant="h4" color="success">
                  {" "}
                  There Is No Tasks{" "}
                </Typography>
                
              </Card>
            ) : (
              <>
                <Tabs
                  sx={{
                    margin: "10px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                  variant="scrollable"
                  scrollButtons="auto"
                  value={tabValue}
                  onChange={handleTabValue}
                
                >
                  <Tab  label="ALL" />
                  <Tab label="Sport" />
                  <Tab label="Completed" />
                  <Tab label="onProgress" />
                  <Tab label="Eductional" />
                  <Tab label="Work" />
                
                </Tabs>

                <AnimatePresence>
                  AnimatePresence<Box
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
                  {tasks.map((task) => {
                    return (
                      <motion.div
                      key={task.id}
                      variants={container}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    
                      
                      >
                          <Card
                  
                        variant="outlined"
                        sx={{
                          minHeight: "150px",
                          width: "260px",
                          position: "relative",
                        }}
                      >
                        <CardContent>
                          <Typography
                            sx={{ margin: "10px", textTransform: "capitalize" }}
                          >
                            {task.description}
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
                              <Typography
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  textTransform: "capitalize",
                                  fontSize: "14px",
                                }}
                              >
                                {task.title}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{ padding: "5px", overflow: "hidden" }}
                            >
                              {task.catogrey}
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Sed minus corrupti numquam neque mollitia
                              illo praesentium nesciunt itaque incidunt dolorem
                              tenetur, hic perferendis animi sunt? Odit
                              reiciendis eum esse! Odit.
                            </AccordionDetails>
                          </Accordion>
                        </CardContent>
                        <CardActions
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            endIcon={<SystemSecurityUpdateGoodTwoToneIcon />}
                          >
                            Update
                          </Button>
                        </CardActions>
                        <div
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "0",
                          }}
                        >
                          <Checkbox defaultChecked:false color="secondary" />
                        </div>
                      </Card>
                      </motion.div>
                    );
                  })}
                </Box>
                </AnimatePresence>
              </>
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

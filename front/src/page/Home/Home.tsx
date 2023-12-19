// App.js
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import { useAppContext } from "../../context/AppContext";
import DeleteIcon from "@mui/icons-material/Delete";
import SystemSecurityUpdateGoodTwoToneIcon from "@mui/icons-material/SystemSecurityUpdateGoodTwoTone";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

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
  MenuItem,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  Select,
  DialogActions,
} from "@mui/material";
import MenuBarCom from "../../component/Menu";
import TaskDialogCom from "../../component/TaskDialogCom";
import { Navigate } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const {
    user,
    tasks,
    getTasks,
    filterTasks,
    handleToggleComplete,
    deleteTask,
    updateTask,
  } = useAppContext();
  const [taskId, setTaskId] = useState();
  const [tabValue, SetTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    category: "Sport", // Set the default category here
  });
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.9,
        staggerChildren: 0.9,
      },
    },
  };
  const toggleComplete = (id) => {
    handleToggleComplete(id);
  };
  const delTask = async (taskId, userId) => {
    await deleteTask(taskId, userId);
  };
  function update__Task(id, title, description, catorgry) {
    setTaskDetails({
      title: title,
      description: description,
      category: catorgry,
      // Set the default category here
    });
    setOpen(true);
  }
  useEffect(() => {
    const fetchTasks = async () => {
      getTasks();
    };
    fetchTasks();
    console.log(tasks);
  }, []);
  console.log(tasks);

  const toggleTheme = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });


  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;

    if (id === "category") {
      setTaskDetails((prevDetails) => ({
        ...prevDetails,
        [id]: value,
      }));
    } else {
      setTaskDetails((prevDetails) => ({
        ...prevDetails,
        [id]: value,
      }));
    }
  };
  const handleSave = async () => {
    // Add logic to save the task with taskDetails
    console.log("Saving Task:", taskDetails);

    // Reset taskDetails
    setTaskDetails({
      title: "",
      description: "",
      category: "", // Set the default category here
    });
    try {
      const userId = JSON.parse(localStorage.getItem("userData")).id;
      await updateTask(taskId, userId, taskDetails);
      // Close the dialog

      toast.success("🦄 Task Updated Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleTabValue = (event: React.SyntheticEvent, newValue: number) => {
    SetTabValue(newValue);

    filterTasks(event.target.firstChild.textContent);
  };


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
                  <Tab label="ALL" />
                  <Tab label="Sport" />
                  <Tab label="Completed" />
                  <Tab label="onProgress" />
                  <Tab label="Eductional" />
                  <Tab label="Work" />
                </Tabs>

                <AnimatePresence>
                  AnimatePresence
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
                                sx={{
                                  margin: "10px",
                                  textTransform: "capitalize",
                                }}
                              >
                                {task.category}
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
                                  {task.description}
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
                                onClick={() => {
                                  const id = JSON.parse(
                                    localStorage.getItem("userData")
                                  ).id;
                                  delTask(task.id, id);
                                }}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="contained"
                                color="success"
                                endIcon={
                                  <SystemSecurityUpdateGoodTwoToneIcon />
                                }
                                onClick={() => {
                                  setTaskId(task.id);
                                  update__Task(
                                    task.id,
                                    task.title,
                                    task.description,
                                    task.category
                                  );
                                }}
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
                              <Checkbox
                                defaultChecked={task.complete}
                                color="secondary"
                                onChange={() => {
                                  toggleComplete(task.id);
                                  console.log(task.complete);
                                }}
                              />
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={taskDetails.title}
            onChange={handleChange}
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={taskDetails.description}
            onChange={handleChange}
          />
          <Select
            sx={{
              width: "100%",
            }}
            labelId="category-label"
            id="category"
            value={taskDetails.category}
            onChange={(e) => {
              setTaskDetails((pre) => {
                return { ...pre, category: e.target.value };
              });
            }}
            label="Category"
          >
            <MenuItem value="Sport">Sport</MenuItem>
            <MenuItem value="Eductional">Educational</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Update Task
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Home;

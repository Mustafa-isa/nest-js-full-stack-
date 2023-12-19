import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function TaskDialogCom() {
  const [open, setOpen] = useState(false);
  const { addTask, getTasks } = useAppContext();

  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    category: "Sport", // Set the default category here
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
    addTask({
      title: taskDetails.title,
      category: taskDetails.category,
      description: taskDetails.description,
      id: JSON.parse(localStorage.getItem("userData")).id,
      
    });

    // Close the dialog
    await getTasks();
    toast.success("🦄 Task Added Successfully", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    handleClose();
  };

  return (
    <>
      <Box position="fixed" bottom={16} right={16} color="secondary">
        <Fab color="success" onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
      </Box>
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
            Save Task
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
}

export default TaskDialogCom;

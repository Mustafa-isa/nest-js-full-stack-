import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

import { useState } from "react";


function TaskDialogCom() {
  const [open, setOpen] = useState(false);


  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    category: '',
  });
  



  const handleClose = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSave = () => {

    setTaskDetails({
      title: '',
      description: '',
      category: '',
    });

    // Close the dialog
    handleClose();
  };
  return (
    <>
    
    <Box position="fixed" bottom={16} right={16} color="secondary">
        <Fab color="success" onClick={()=> setOpen(true)}>
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
          <TextField
            id="category"
            label="Category"
            variant="outlined"
            fullWidth
            margin="normal"
            value={taskDetails.category}
            onChange={handleChange}
          />
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
    </>
  )
}

export default TaskDialogCom
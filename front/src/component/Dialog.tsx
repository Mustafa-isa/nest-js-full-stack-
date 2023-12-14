import  { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

function DialogCom() {
  const [open, setOpen] = useState(true);
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
    category: '',
  });



  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSave = () => {
    // Perform actions with task details (e.g., save to database, update UI, etc.)

    // Reset task details
    setTaskDetails({
      title: '',
      description: '',
      category: '',
    });

    // Close the dialog
    handleClose();
  };

  return (
    <div>
      {/* Button to open the task dialog */}
    

      {/* Task creation dialog */}
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
    </div>
  );
}

export default DialogCom;

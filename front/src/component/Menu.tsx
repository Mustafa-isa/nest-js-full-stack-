import { Avatar, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import "./componentStyle.css";
import { deepOrange } from "@mui/material/colors";
import { useAppContext } from "../context/AppContext";

import React, { useEffect, useState } from "react";

function MenuBarCom() {
  const { logout, tasks } = useAppContext();
  const [tasksInfo, setTasksInfo] = useState({
    onprogressTasks: "",
    tasksCompleted: "",
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenue = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const onprogress = tasks.filter((el) => el.complete == false).length;
    const completed = tasks.filter((el) => el.complete == true).length;
    console.log(completed ,onprogress)
    setTasksInfo({
      onprogressTasks: onprogress,
      tasksCompleted: completed,
    });
  }, tasks);
  return (
    <>
      <Box>
        <IconButton onClick={handleMenuClick} color="inherit">
          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenue}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              logout();
              handleCloseMenue();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        sx={{ transition: "All 2s ease in" }}
      >
        <AppBar sx={{ position: "relative" }} color="secondary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Profile
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText
              primary="Tasks On Progress"
              secondary={
                tasksInfo.onprogressTasks
                  ? tasksInfo.onprogressTasks
                  : "Nothing"
              }
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Tasks Completed"
              secondary={
                tasksInfo.tasksCompleted ? tasksInfo.tasksCompleted : "Nothing"
              }
            />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}

export default MenuBarCom;

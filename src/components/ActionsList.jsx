import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Popover from "@mui/material/Popover";
const ActionsList = ({ open }) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton>
          <DeleteIcon />
        </IconButton>
        <Typography>Delete Template</Typography>
      </Box>
    </>
  );
};
export default ActionsList;
// /            <IconButton>
// {value === "Edit Template" ? <EditIcon /> : <DeleteIcon />}
//</IconButton>

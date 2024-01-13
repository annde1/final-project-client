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
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
const ActionsList = ({ onDelete, templateId, onEdit, onStartWorkout }) => {
  return (
    <>
      <Box sx={{ paddingRight: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{ marginRight: 1 }}
            onClick={() => {
              onDelete(templateId);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Delete{" "}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            sx={{ marginRight: 1 }}
            onClick={() => {
              onEdit(templateId);
            }}
          >
            <EditIcon />
          </IconButton>
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Edit{" "}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            sx={{ marginRight: 1 }}
            onClick={() => {
              onStartWorkout(templateId);
            }}
          >
            <PlayCircleFilledWhiteIcon />
          </IconButton>
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Start{" "}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default ActionsList;

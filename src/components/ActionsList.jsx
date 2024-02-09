import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
const ActionsList = ({
  onDelete,
  templateId,
  onEdit,
  onStartWorkout,
  onPreview,
}) => {
  return (
    <>
      <Box sx={{ paddingRight: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            sx={{ marginRight: 1 }}
            onClick={() => {
              onPreview(templateId);
            }}
          >
            <PreviewIcon />
          </IconButton>
          <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Preview{" "}
          </Typography>
        </Box>
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

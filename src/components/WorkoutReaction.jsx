import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
const WorkoutReaction = () => {
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}
      >
        <IconButton>
          <ThumbUpOffAltIcon />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    </>
  );
};
export default WorkoutReaction;

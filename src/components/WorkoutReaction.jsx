import ThumbUpIcon from "@mui/icons-material/ThumbUp";
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
          <ThumbUpIcon />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Box>
    </>
  );
};
export default WorkoutReaction;

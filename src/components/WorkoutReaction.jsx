import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
const WorkoutReaction = ({
  onDeleteWorkout,
  workoutId,
  onLikeWorkout,
  isLiked,
  userId,
}) => {
  const userData = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );
  const [like, setLike] = useState(isLiked);

  const isOwner = userData === userId;
  const handleLikeWorkout = async () => {
    try {
      await onLikeWorkout(workoutId);
      setLike((prevIsLiked) => !prevIsLiked);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}
      >
        <IconButton
          onClick={() => {
            handleLikeWorkout();
          }}
        >
          <ThumbUpOffAltIcon
            style={{
              color: like ? "#1876D2" : "",
            }}
          />
        </IconButton>
        {isOwner && (
          <IconButton
            onClick={() => {
              onDeleteWorkout(workoutId);
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        )}
      </Box>
    </>
  );
};
export default WorkoutReaction;

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { errorToast, infoToast } from "../../../service/toastify-service";
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
      const updatedLikeStatus = !like;
      const toastMessage = updatedLikeStatus
        ? "You liked the workout"
        : "You unliked the workout";

      infoToast(toastMessage);
    } catch (err) {
      // console.log(err);
      errorToast("Something went wrong. Failed to update like status.");
    }
  };
  const handleDeleteWorkout = async (_id) => {
    onDeleteWorkout(_id);
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
              handleDeleteWorkout(workoutId);
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

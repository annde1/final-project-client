import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WorkoutUserDetails from "./WorkoutUserDetails";
import WorkoutDetails from "./WorkoutDetails";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import WorkoutCardExercise from "./WorkoutCardExercise";
import Button from "@mui/material/Button";
import WorkoutReaction from "./WorkoutReaction";
import { calculateTimePassed } from "../../../service/workout-service";
import { convertMsToHoursAndMinutes } from "../../../service/workout-service";
import "../../../styles/styles.css";
const WorkoutCard = ({
  userData,
  workout,
  onDeleteWorkout,
  onLikeWorkout,
  isLiked,
}) => {
  const [visibleExercises, setVisibleExercises] = useState(3);
  const [showMessage, setShowMessage] = useState(false);
  const exercises = workout.template.exercises;
  const createdAt = calculateTimePassed(workout.createdAt);
  const duration = convertMsToHoursAndMinutes(workout.duration);
  const workoutVolume = workout.volume;
  const numOfLikes = workout.likes.length;

  const handleShowMoreExercises = () => {
    if (visibleExercises < exercises.length) {
      setVisibleExercises((previous) =>
        Math.min(previous + 3, exercises.length)
      );
    } else {
      setShowMessage(true);
    }
    console.log("showMessage:", showMessage);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: 8,
        }}
      >
        <WorkoutUserDetails
          userName={userData.userName}
          createdAt={createdAt}
          image={userData.image}
        />
        <Typography
          style={{
            fontFamily: "Montserrat, sans-serif",
            marginTop: "1rem",
            fontWeight: "bold",
          }}
        >
          {workout.title}
        </Typography>
        <WorkoutDetails duration={duration} volume={workoutVolume} />
        <Divider light sx={{ marginTop: 3, marginBottom: 3, width: "100%" }} />
        <Typography
          sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: "2rem" }}
          variant="subtitle2"
        >
          Workout
        </Typography>
        {exercises.slice(0, visibleExercises).map((exercise) => (
          <WorkoutCardExercise
            key={exercise._id}
            name={exercise.name}
            sets={exercise.sets.length + 1}
          />
        ))}
        {!showMessage && (
          <Button
            variant="text"
            sx={{
              alignSelf: "center",
              color: "#0B0D12",
              fontFamily: "Montserrat, sans-serif",
              marginBottom: "2rem",
            }}
            onClick={handleShowMoreExercises}
          >
            See more exercises
          </Button>
        )}
        {showMessage && (
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              alignSelf: "center",
              marginBottom: "2rem",
              fontWeight: "bold",
            }}
          >
            No more exercises left!
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "2rem",
            width: "100%",
          }}
        >
          <Typography
            sx={{ fontFamily: "Montserrat, sans-serif", fontWeight: "bold" }}
            variant="subtitle2"
          >
            {numOfLikes} {numOfLikes === 1 ? "like" : "likes"}
          </Typography>
        </Box>
        <Divider light sx={{ marginTop: 1, marginBottom: 1, width: "100%" }} />
        <WorkoutReaction
          onDeleteWorkout={onDeleteWorkout}
          onLikeWorkout={onLikeWorkout}
          workoutId={workout._id}
          isLiked={isLiked}
          userId={workout.userId}
        />
        <Divider light sx={{ marginTop: 1, marginBottom: 3, width: "100%" }} />
      </Box>
    </>
  );
};
export default WorkoutCard;

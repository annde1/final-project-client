import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import UserDetails from "./UserDetails";
import WorkoutDetails from "./WorkoutDetails";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import WorkoutExercise from "./WorkoutExercise";
import Button from "@mui/material/Button";
import WorkoutReaction from "./WorkoutReaction";

const Workout = () => {
  const [workoutExercises, setWorkoutExercises] = useState([
    { name: "Barbell Back Squat", sets: 5 },
    { name: "Sumo Deadlift", sets: 5 },
    { name: "Bench Press", sets: 5 },
  ]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <UserDetails />
        <Typography
          style={{
            fontFamily: "Montserrat, sans-serif",
            marginTop: "1rem",
            fontWeight: "bold",
          }}
        >
          Barbel 5x5
        </Typography>
        <WorkoutDetails />
        <Divider light sx={{ marginTop: 3, marginBottom: 3, width: "100%" }} />
        <Typography
          sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: "2rem" }}
          variant="subtitle2"
        >
          Workout
        </Typography>
        {workoutExercises.map((exercise) => (
          <WorkoutExercise name={exercise.name} sets={exercise.sets} />
        ))}
        <Button
          variant="text"
          sx={{
            alignSelf: "center",
            color: "#0B0D12",
            fontFamily: "Montserrat, sans-serif",
            marginBottom: "2rem",
          }}
        >
          See more exercises
        </Button>
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
            sx={{ fontFamily: "Montserrat, sans-serif" }}
            variant="subtitle2"
          >
            0 likes
          </Typography>
          <Typography
            sx={{ fontFamily: "Montserrat, sans-serif" }}
            variant="subtitle2"
          >
            0 comments
          </Typography>
        </Box>
        <WorkoutReaction />
      </Box>
    </>
  );
};
export default Workout;

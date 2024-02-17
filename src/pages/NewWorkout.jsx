import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useState } from "react";
import "../styles/styles.css";
import WorkoutTimer from "../components/Timer";
import WorkoutCardData from "../components/appContent/workout/WorkoutCardData";
import ModalComponent from "../components/Modal";
import WorkoutExercisesList from "../components/appContent/workout/WorkoutExercisesList";

const NewWorkout = () => {
  const [templateName, setTemplateName] = useState("");
  const [workoutDetails, setWorkoutDetails] = useState({
    volume: 0,
    sets: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleAddVolume = (newVolume) => {
    setWorkoutDetails((previous) => ({
      sets: previous.sets + 1,
      volume: previous.volume + newVolume,
    }));
  };

  const handleRemoveVolume = (newVolume) => {
    setWorkoutDetails((previous) => ({
      sets: previous.sets - 1,
      volume: previous.volume - newVolume,
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleUpdateTemplateName = (templateName) => {
    setTemplateName(templateName);
  };

  const handleFinishLoading = (isFinished) => {
    setIsLoading(isFinished);
  };
  return (
    <Box sx={{ height: "100%" }}>
      <Typography sx={{ fontFamily: "Montserrat, sans-serif" }} variant="h4">
        New Workout
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <WorkoutTimer />
              <WorkoutCardData
                volume={workoutDetails.volume}
                sets={workoutDetails.sets}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                marginTop: 5,
                fontWeight: "bold",
              }}
              variant="h5"
            >
              {templateName}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <WorkoutExercisesList
              onAddVolume={handleAddVolume}
              onRemoveVolume={handleRemoveVolume}
              onFinishLoading={handleFinishLoading}
              onUpdateTemplateName={handleUpdateTemplateName}
              isLoading={isLoading}
              templateName={templateName}
              onShowModal={handleShowModal}
              workoutDetails={workoutDetails}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            {showModal && (
              <ModalComponent
                open={showModal}
                onCloseModal={handleCloseModal}
                templateName={templateName}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default NewWorkout;

import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import ExericseList from "../components/ExerciseList";
import { useState } from "react";
import TemplateContent from "../components/templateContent";
import Button from "@mui/material/Button";
import TemplateItem from "../components/templateContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import "../styles/styles.css";
import exercises from "../service/exercises";
import { normalizeTemplateData } from "../service/normalize-template-data";
import { validateTemplate } from "../validation/template-validation";
import axios from "axios";
import { useParams } from "react-router-dom";
import Workout from "../components/Workout";
import WorkoutTimer from "../components/Timer";
import WorkoutData from "../components/WorkoutData";
import WorkoutItem from "../components/WorkoutItem";
const NewWorkout = () => {
  const [exercises, setExercises] = useState({});
  const [templateName, setTemplateName] = useState("");
  const [workoutDetails, setWorkoutDetails] = useState({
    volume: 0,
    sets: 0,
  });
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const { id: _id } = useParams();

  //TODO: a spinner, only after the template has been fetched display the button

  //TODO: when volume is 0 and user clicks finish workout then show a modal that this workout has no values

  //TODO: Add a button to discard workout. When user will click on it it will redirect him to my templates page
  useEffect(() => {
    const fetchTemplateData = async (_id) => {
      try {
        const { data } = await axios.get(`/templates/${_id}`);
        setExercises(data.templateDetails.exercises);
        setTemplateName(data.templateDetails.name);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTemplateData(_id);
  }, [_id]);

  //Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
      if (seconds === 59) {
        setSeconds(0);
        setMinutes((previous) => previous + 1);

        if (minutes === 59) {
          setMinutes(0);
          setHours((previous) => previous + 1);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [minutes, seconds, hours]);

  useEffect(() => {
    console.log(exercises);
  }, [exercises]);
  const handleAddWeight = (exerIndex, setIndex, weight) => {
    setExercises((prev) => {
      //Copy of exercises array
      const currentExercises = [...prev];
      const currentExercise = currentExercises[exerIndex];
      //Copy of sets array
      const currentSets = currentExercise.sets;
      //Update weight in sets array
      //make reps copy
      const currentSet = currentSets[setIndex];
      currentSets[setIndex] = {
        ...currentSet,
        weight: weight,
      };

      //update sets in exercises array
      currentExercises[exerIndex] = {
        ...currentExercise,
        sets: currentSets,
      };

      return currentExercises;
    });
  };
  //Handler for updating reps:
  const handleAddRep = (exerIndex, setIndex, reps) => {
    setExercises((previous) => {
      //copy of exercises array
      const currentExercises = [...previous];
      //copy of sets array
      const currentSets = [...currentExercises[exerIndex].sets];

      //update sets:
      currentSets[setIndex] = {
        ...currentSets[setIndex],
        reps: reps,
      };

      //update exercises  array with updated sets
      currentExercises[exerIndex] = {
        ...currentExercises[exerIndex],
        sets: currentSets,
      };
      return currentExercises;
    });
  };

  const handleAddVolume = (newVolume) => {
    setWorkoutDetails((previous) => ({
      ...previous,
      volume: previous.volume + newVolume,
    }));
  };

  //TODO: handler for finishing workout. POST request to "/wourkouts"
  const handleSubmitWorkout = async () => {
    //TODO: workout normalization and validation function
    //TODO: Joi workout validation
    try {
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Typography sx={{ fontFamily: "Montserrat, sans-serif" }} variant="h4">
        New Workout
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <WorkoutTimer seconds={seconds} minutes={minutes} hours={hours} />
              <WorkoutData />
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {exercises.length > 0 &&
                  exercises.map((exercise, index) => (
                    <WorkoutItem
                      key={index}
                      exercise={exercise}
                      onAddWeight={handleAddWeight}
                      exerciseIndex={index}
                      onAddReps={handleAddRep}
                      onAddVolume={handleAddVolume}
                    />
                  ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              variant="contained"
              className="customFont"
              style={{ backgroundColor: "#0B0D12", marginTop: "3rem" }}
            >
              Finish Workout
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default NewWorkout;

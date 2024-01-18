import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import "../styles/styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import WorkoutTimer from "../components/Timer";
import WorkoutData from "../components/WorkoutData";
import WorkoutItem from "../components/WorkoutItem";
import { normalizeWorkout } from "../service/normalize-workout";
import validateWorkout from "../validation/workout-validation";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import CircularProgress from "@mui/material/CircularProgress";
import { useRef } from "react";
import ModalComponent from "../components/Modal";
import { normalizeTemplateData } from "../service/normalize-template-data";
const NewWorkout = () => {
  const [exercises, setExercises] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [workoutDetails, setWorkoutDetails] = useState({
    volume: 0,
    sets: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const startedAt = useRef(null); //useRef so the Date won't change between re-renders
  //TODO: when volume is 0 and user clicks finish workout then show a modal that this workout has no values
  //TODO: if the set doesnt have checked status don't update the state

  useEffect(() => {
    startedAt.current = new Date();
    console.log(startedAt.current);
  }, []);

  useEffect(() => {
    const fetchTemplateData = async (_id) => {
      try {
        const { data } = await axios.get(`/templates/${_id}`);
        const exercises = data.templateDetails.exercises.map(
          ({ sets, name }) => ({
            sets: sets.map(({ _id, ...rest }) => rest),
            name,
          })
        );
        console.log(data);
        setExercises(exercises);
        setTemplateName(data.templateDetails?.name);
        setIsLoading(false);
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

  const handleSubmitWorkout = async () => {
    try {
      if (workoutDetails.volume === 0) {
        setShowModal(true);
        return;
      }
      const normalizedData = normalizeWorkout({
        title: templateName,
        startedAt: startedAt.current,
        template: {
          name: templateName,
          exercises: exercises,
        },
        volume: workoutDetails.volume,
      });
      console.log("NORMALIZED", normalizedData);

      const errors = validateWorkout(normalizedData);
      if (errors) {
        return;
      }

      const { data } = await axios.post("/workouts", normalizedData);
      console.log(data);
      const template = normalizeTemplateData({
        name: templateName,
        exercises: exercises,
      });
      await axios.put(`/templates/${_id}`, template);
      navigate(ROUTES.MYWORKOUTS);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDiscardWorkout = () => {
    navigate(ROUTES.MYTEMPLATES);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
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
              <WorkoutTimer seconds={seconds} minutes={minutes} hours={hours} />
              <WorkoutData
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
                      onRemoveVolume={handleRemoveVolume}
                    />
                  ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button
                  size="small"
                  variant="contained"
                  className="customFont"
                  style={{ backgroundColor: "#0B0D12", marginTop: "3rem" }}
                  onClick={handleSubmitWorkout}
                >
                  Finish Workout
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  className="customFont"
                  style={{ backgroundColor: "#0B0D12", marginTop: "3rem" }}
                  onClick={handleDiscardWorkout}
                >
                  Discard Workout
                </Button>
              </Box>
            )}
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
    </>
  );
};
export default NewWorkout;

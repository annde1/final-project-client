import { List, Box } from "@mui/material";
import WorkoutExerciseItem from "./WorkoutExerciseItem";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import { normalizeWorkout } from "../../../service/normalize-workout";
import { normalizeTemplateData } from "../../../service/normalize-template-data";
import validateWorkout from "../../../validation/workout-validation";
const WorkoutExercisesList = ({
  onUpdateTemplateName,
  onFinishLoading,
  onAddVolume,
  onRemoveVolume,
  isLoading,
  templateName,
  onShowModal,
  workoutDetails,
}) => {
  const [exercises, setExercises] = useState([]);
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const startedAt = useRef(null);

  useEffect(() => {
    startedAt.current = new Date();
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
        onUpdateTemplateName(data.templateDetails?.name);
        onFinishLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTemplateData(_id);
  }, [_id, onUpdateTemplateName, onFinishLoading]);

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
  const handleSubmitWorkout = async () => {
    try {
      if (workoutDetails.volume === 0) {
        onShowModal();
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
      //Post new workout
      const { data } = await axios.post("/workouts", normalizedData);
      console.log(data);
      const template = normalizeTemplateData({
        name: templateName,
        exercises: exercises,
      });

      //Update template
      await axios.put(`/templates/${_id}`, template);
      navigate(ROUTES.MYWORKOUTS);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDiscardWorkout = () => {
    navigate(ROUTES.MYTEMPLATES);
  };
  return (
    <>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {exercises.length > 0 &&
            exercises.map((exercise, index) => (
              <WorkoutExerciseItem
                key={index}
                exercise={exercise}
                onAddWeight={handleAddWeight}
                exerciseIndex={index}
                onAddReps={handleAddRep}
                onAddVolume={onAddVolume}
                onRemoveVolume={onRemoveVolume}
              />
            ))}
        </Box>
      </List>
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
    </>
  );
};
export default WorkoutExercisesList;

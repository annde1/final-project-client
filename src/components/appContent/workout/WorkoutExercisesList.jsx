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
import { useCallback } from "react";
import { successToast, errorToast } from "../../../service/toastify-service";
import { validateTemplate } from "../../../validation/template-validation";
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
  const [errors, setErrros] = useState({});

  //Add current property to ref when the component mounts
  useEffect(() => {
    startedAt.current = new Date();
  }, []);

  const fetchTemplateData = useCallback(
    async (_id) => {
      try {
        const { data } = await axios.get(`/templates/${_id}`);
        const exercises = data.templateDetails.exercises.map(
          ({ sets, name }) => ({
            sets: sets.map(({ _id, ...rest }) => ({
              ...rest,
              done: false, // Add the done property to every set
            })),
            name,
          })
        );
        setExercises(exercises);
        onUpdateTemplateName(data.templateDetails?.name);
        onFinishLoading(false);
      } catch (err) {
        // console.log(err);
        errorToast("Something went wrong. Could not fetch template data.");
      }
    },
    [onFinishLoading, onUpdateTemplateName]
  );

  useEffect(() => {
    if (isLoading) {
      fetchTemplateData(_id);
    }
  }, [_id, fetchTemplateData, isLoading]);

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

  const handleDoneSet = (isDone, exerciseIndex, setIndex) => {
    setExercises((prev) => {
      const updatedExercises = [...prev];
      const updatedSets = [...updatedExercises[exerciseIndex].sets];

      updatedSets[setIndex] = {
        ...updatedSets[setIndex],
        done: isDone,
      };

      updatedExercises[exerciseIndex] = {
        ...updatedExercises[exerciseIndex],
        sets: updatedSets,
      };

      return updatedExercises;
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

      const errors = validateWorkout(normalizedData);
      if (errors) {
        return;
      }
      //Post new workout
      await axios.post("/workouts", normalizedData);

      //Normalize data
      const template = normalizeTemplateData({
        name: templateName,
        exercises: exercises,
      });
      //Validate data
      const templateErrors = validateTemplate(template);

      if (templateErrors) {
        setErrros(templateErrors);
        return;
      }
      //Create form data
      const fd = new FormData();
      fd.append("data", JSON.stringify(template));

      //Update template
      await axios.put(`/templates/${_id}`, fd);

      successToast("Workout created");
      navigate(ROUTES.MYWORKOUTS);
    } catch (err) {
      // console.log(err);
      errorToast("Something went wrong. Could not create the workout.");
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
                onDone={handleDoneSet}
                errors={errors}
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

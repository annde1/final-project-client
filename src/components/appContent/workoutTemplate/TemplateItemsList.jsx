import { useState, useEffect } from "react";
import ExericseList from "../../ExerciseList";
import TemplateItem from "./TemplateItem";
import { Divider, Button, TextField, CircularProgress } from "@mui/material";
import { Box, Alert } from "@mui/material";
import { normalizeTemplateData } from "../../../service/normalize-template-data";
import { validateTemplate } from "../../../validation/template-validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import { useParams } from "react-router-dom";
const TemplateItemsList = ({ isEdit }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [templateName, setTemplateName] = useState("");
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id: _id } = useParams();

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        if (isEdit) {
          const { data } = await axios.get(`/templates/${_id}`);
          setTemplateName(data.templateDetails.name);
          const exercises = data.templateDetails.exercises.map(
            ({ sets, name }) => ({
              sets: sets.map(({ _id, ...rest }) => rest),
              name,
            })
          );
          setExercises(exercises);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTemplateData();
  }, [_id, isEdit]);

  const createDefaultSet = () => {
    return { weight: "", reps: "" };
  };

  const handleAddTemplateName = (e) => {
    setTemplateName(e.target.value);
  };
  const handleExercise = (exerciseName) => {
    setSelectedExercise(exerciseName);
  };
  const handleAddExercise = (exercise) => {
    setExercises((prev) => [
      ...prev,
      {
        name: exercise,
        sets: [createDefaultSet()],
      },
    ]);
  };
  const handleAddSet = (exerIndex) => {
    setExercises((prev) => {
      //Copy of exercises array
      const currentExercises = [...prev];
      const currentExercise = currentExercises[exerIndex];
      //Copy of sets array
      const currentSets = [...currentExercise.sets, createDefaultSet()];
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

  const handleDeleteExercise = (exerciseIndex) => {
    setExercises((prevExercises) => {
      //Copy
      const updatedExercises = [...prevExercises];
      //Remove 1 exercise at exerciseIndex
      updatedExercises.splice(exerciseIndex, 1);
      return updatedExercises;
    });
  };

  const handleCreateTemplate = async (e) => {
    try {
      e.preventDefault();
      const templateData = normalizeTemplateData({
        name: templateName,
        exercises: exercises,
      });
      const errors = validateTemplate(templateData);
      if (errors) {
        setErrors(errors);
        return;
      }
      const { data } = await axios.post("/templates", templateData);
      console.log(data);
      navigate(ROUTES.MYTEMPLATES);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditTemplate = async (e) => {
    try {
      e.preventDefault();
      const templateData = normalizeTemplateData({
        name: templateName,
        exercises: exercises,
      });

      const errors = validateTemplate(templateData);
      if (errors) return;

      const { data } = await axios.put(`/templates/${_id}`, templateData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <>
        {isLoading && isEdit ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {" "}
            <TextField
              autoComplete="template-title"
              name="templateTitle"
              required
              fullWidth
              id="templateTitle"
              label={templateName}
              autoFocus
              value={templateName}
              onChange={handleAddTemplateName}
              className="customFont"
            />
            {errors && errors.name && (
              <Alert severity="error">{errors.name}.</Alert>
            )}
            <ExericseList
              onExerciseChange={handleExercise}
              selectedExercise={selectedExercise}
              onAddExercise={handleAddExercise}
            />
            {exercises.map((exercise, index) => (
              <TemplateItem
                key={exercise.name}
                selectedExercise={selectedExercise}
                name={exercise.name}
                onAddWeight={handleAddWeight}
                onAddReps={handleAddRep}
                onAddSet={handleAddSet}
                exerciseIndex={index}
                exercise={exercise}
                onDeleteExercise={handleDeleteExercise}
                errors={errors}
              />
            ))}
            <Divider light sx={{ marginTop: 3, marginBottom: 3 }} />
          </>
        )}

        {exercises.length > 0 && !isEdit && (
          <Button
            variant="contained"
            className="customFont"
            style={{ backgroundColor: "#0B0D12", marginBottom: "3rem" }}
            onClick={handleCreateTemplate}
          >
            Save Template
          </Button>
        )}
        {exercises.length > 0 && isEdit && (
          <Button
            variant="contained"
            className="customFont"
            style={{ backgroundColor: "#0B0D12", marginBottom: "3rem" }}
            onClick={handleEditTemplate}
          >
            Edit Template
          </Button>
        )}
      </>
    </>
  );
};
export default TemplateItemsList;

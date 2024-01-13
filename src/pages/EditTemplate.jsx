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
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/styles.css";
import exercises from "../service/exercises";
import { normalizeTemplateData } from "../service/normalize-template-data";
import { validateTemplate } from "../validation/template-validation";
import axios from "axios";
import { useParams } from "react-router-dom";
const EditTemplatePage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [templateName, setTemplateName] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id: _id } = useParams();
  console.log(_id);
  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const { data } = await axios.get(`/templates/${_id}`);
        console.log(data);
        console.log(data.templateDetails);
        setTemplateName(data.templateDetails.name);
        const exercises = data.templateDetails.exercises.map(
          ({ sets, name }) => ({
            sets: sets.map(({ _id, ...rest }) => rest),
            name,
          })
        );
        console.log(exercises);
        setExercises(exercises);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTemplateData();
  }, [_id]);
  useEffect(() => {
    console.log(templateName);
    console.log(exercises);
  }, [templateName, exercises]);

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

  const createDefaultSet = () => {
    return { weight: "", reps: "" };
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
  return (
    <>
      <Typography variant="h4" sx={{ fontFamily: "Montserrat, sans-serif" }}>
        Edit Template
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                autoComplete="template-title"
                name="templateTitle"
                required
                fullWidth
                id="templateTitle"
                label={templateName}
                autoFocus
                className="customFont"
              />
              <ExericseList
                onExerciseChange={handleExercise}
                selectedExercise={selectedExercise}
                onAddExercise={handleAddExercise}
              />

              {exercises.map((exercise, index) => (
                <TemplateItem
                  key={index}
                  selectedExercise={selectedExercise}
                  name={exercise.name}
                  onAddWeight={handleAddWeight}
                  onAddReps={handleAddRep}
                  onAddSet={handleAddSet}
                  exerciseIndex={index}
                  exercise={exercise}
                />
              ))}
            </Box>
            <Divider light sx={{ marginTop: 3, marginBottom: 3 }} />
            {exercises.length > 0 && (
              <Button
                variant="contained"
                className="customFont"
                style={{ backgroundColor: "#0B0D12" }}
                onClick={handleEditTemplate}
              >
                Save Template
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default EditTemplatePage;

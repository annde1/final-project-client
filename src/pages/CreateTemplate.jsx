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
const CreateTemplatePage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [templateName, setTemplateName] = useState(null);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    console.log(exercises);
  }, [exercises]);
  const handleExercise = (exerciseName) => {
    setSelectedExercise(exerciseName);
  };

  const createDefaultSet = () => {
    return { weight: "", reps: "" };
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

  const handleAddExercise = (exercise) => {
    setExercises((prev) => [
      ...prev,
      {
        name: exercise,
        sets: [createDefaultSet()],
      },
    ]);
  };
  //add exerise name
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

  const handleTemplateName = (e) => {
    setTemplateName(e.target.value);
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
        return;
      }
      const { data } = await axios.post("/templates", templateData);
      console.log(data);

      //TODO: redirect to my templates
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        Create Template
      </Typography>

      <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
        <Grid container spacing={2}>
          {/* Left Grid for Form */}
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
                label="Template Title"
                autoFocus
                className="customFont"
                value={templateName}
                onChange={handleTemplateName}
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
                onClick={handleCreateTemplate}
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

export default CreateTemplatePage;

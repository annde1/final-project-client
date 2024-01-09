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

import "../styles/styles.css";

const CreateTemplatePage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [templateName, setTemplateName] = useState(null);
  const [exercises, setExercises] = useState([]);

  const handleExercise = (exerciseName) => {
    setSelectedExercise(exerciseName);
  };
  const handleAddExercise = (exercise) => {
    setExercises((prev) => [...prev, exercise]);
  };
  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        {templateName ? "Barbel 5X5" : "Create Template"}
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
                  name={exercise}
                />
              ))}
            </Box>
            <Divider light sx={{ marginTop: 3, marginBottom: 3 }} />
            {exercises.length > 0 && (
              <Button
                variant="contained"
                className="customFont"
                style={{ backgroundColor: "#0B0D12" }}
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

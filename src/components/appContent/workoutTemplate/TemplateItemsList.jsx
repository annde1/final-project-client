import { useState, useEffect } from "react";
import ExericseList from "./ExerciseList";
import TemplateItem from "./TemplateItem";
import { Divider, Button, TextField, CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box, Alert } from "@mui/material";
import { normalizeTemplateData } from "../../../service/normalize-template-data";
import { validateTemplate } from "../../../validation/template-validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import { useParams } from "react-router-dom";
import { successToast, errorToast } from "../../../service/toastify-service";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
const TemplateItemsList = ({ isEdit, onTemplateLengthChange }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [templateImage, setTemplateImage] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id: _id } = useParams();
  const maxLength = 300;

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        if (isEdit) {
          const { data } = await axios.get(`/templates/${_id}`);
          setTemplateName(data.templateDetails.name);
          setTemplateDescription(data.templateDetails.description);
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
        // console.log(err);
        errorToast("Something went wrong. Could not fetch the template data.");
      }
    };
    fetchTemplateData();
  }, [_id, isEdit, onTemplateLengthChange]);

  const createDefaultSet = () => {
    return { weight: "", reps: "" };
  };
  const handleAddTemplateDescription = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setTemplateDescription(newValue);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setTemplateImage(file);
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
      const formData = {
        name: templateName,
        exercises: exercises,
        description: templateDescription,
      };

      const templateData = normalizeTemplateData(formData);
      const errors = validateTemplate(templateData);

      if (errors) {
        setErrors(errors);
        return;
      }

      const fd = new FormData();
      fd.append("data", JSON.stringify(templateData));
      fd.append("file", templateImage);

      await axios.post("/templates", fd);
      successToast("Template created successfully");
      navigate(ROUTES.MYTEMPLATES);
    } catch (err) {
      if (err.response.status === 403) {
        errorToast(`${err.response.data.message}`);
      } else {
        errorToast("Something went wrong. Could not create template.");
      }
    }
  };

  const handleEditTemplate = async (e) => {
    try {
      e.preventDefault();
      //Temporary variable for storing nesesary data
      const formData = {
        name: templateName,
        exercises: exercises,
        description: templateDescription,
      };

      //Normalize
      const templateData = normalizeTemplateData(formData);

      const errors = validateTemplate(templateData);
      if (errors) {
        setErrors(errors);
        return;
      }
      const fd = new FormData();
      fd.append("data", JSON.stringify(templateData));
      fd.append("file", templateImage);

      await axios.put(`/templates/${_id}`, fd);

      successToast("Template Updated Successfully!");
      navigate(ROUTES.MYTEMPLATES);
    } catch (err) {
      // console.log(err);
      errorToast("Something went wrong. Could not edit the template.");
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
              fullWidth
              id="templateTitle"
              label={
                <Typography style={{ fontFamily: "Montserrat" }}>
                  {templateName ? templateName : "Template Name *"}
                </Typography>
              }
              autoFocus
              value={templateName}
              onChange={handleAddTemplateName}
              className="customFont"
              sx={{ mb: 3 }}
            />
            {errors && errors.name && (
              <Alert
                severity="error"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  marginBottom: "1.5rem",
                }}
              >
                {errors.name}
              </Alert>
            )}
            <TextField
              fullWidth
              id="my-textfield"
              label={
                <Typography style={{ fontFamily: "Montserrat" }}>
                  Template Description
                </Typography>
              }
              multiline
              maxLength={300}
              value={templateDescription}
              onChange={handleAddTemplateDescription}
              helperText={
                templateDescription.length >= maxLength
                  ? `Maximum ${maxLength} characters allowed`
                  : ""
              }
              FormHelperTextProps={{
                sx: {
                  color:
                    templateDescription.length >= maxLength ? "red" : "inherit",
                  fontFamily: "Montserrat",
                },
              }}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <InputLabel htmlFor="file-input" sx={{ alignSelf: "flex-start" }}>
                <Typography
                  style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
                >
                  Template Image
                </Typography>
              </InputLabel>
              <OutlinedInput
                fullWidth
                type="file"
                id="file"
                label={
                  <Typography
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "0.8rem",
                    }}
                  >
                    Profile Image
                  </Typography>
                }
                name="file"
                sx={{ fontFamily: "Montserrat" }}
                onChange={handleImageChange}
              />
            </Box>
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
            style={{ backgroundColor: "#0B0D12" }}
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

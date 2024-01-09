import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import exercises from "../service/exercises";
import Button from "@mui/material/Button";
import "../styles/styles.css";

const ExericseList = ({
  onExerciseChange,
  selectedExercise,
  onAddExercise,
}) => {
  const handleExerciseChange = (e) => {
    const selected = e.target.value;
    onExerciseChange(selected);
  };

  const handleAddExercise = () => {
    onAddExercise(selectedExercise);
  };
  return (
    <Box sx={{ minWidth: 120, marginTop: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Exercise</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Select Exercise"
          onChange={handleExerciseChange}
        >
          {exercises.map((exercise) => (
            <MenuItem key={exercise.name} value={exercise.name}>
              {exercise.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedExercise && (
        <Button
          className="customFont"
          variant="contained"
          style={{
            alignSelf: "flex-end",
            marginTop: "1.5rem",
            backgroundColor: "#0B0D12",
          }}
          onClick={handleAddExercise}
        >
          Add Exericse
        </Button>
      )}
    </Box>
  );
};
export default ExericseList;

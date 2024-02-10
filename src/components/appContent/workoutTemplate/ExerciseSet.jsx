import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "../../../styles/styles.css";
import Alert from "@mui/material/Alert";

import { useEffect } from "react";
const ExerciseSet = ({
  onAddReps,
  onAddWeight,
  exerciseIndex,
  setIndex,
  exercise,
  errors,
}) => {
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  const handleAddReps = (e) => {
    const reps = e.target.value;
    onAddReps(exerciseIndex, setIndex, reps);
  };

  const handleAddWeight = (e) => {
    const weight = e.target.value;
    onAddWeight(exerciseIndex, setIndex, weight);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "2rem",
      }}
    >
      <Box>
        <Typography className="customFont" sx={{ fontSize: "28px" }}>
          {setIndex + 1}
        </Typography>
      </Box>
      <Box>
        <TextField
          required
          id={`weight-${setIndex}`}
          name="kg"
          autoComplete="kg"
          onChange={handleAddWeight}
          value={exercise.sets[setIndex].weight}
        />
        {errors && errors.weight && (
          <Alert severity="error">{errors.weight}</Alert>
        )}
      </Box>
      <Box>
        <TextField
          required
          id={`reps-${setIndex}`}
          name="reps"
          autoComplete="reps"
          onChange={handleAddReps}
          value={exercise.sets[setIndex].reps}
        />
        {errors && errors.reps && <Alert severity="error">{errors.reps}</Alert>}
      </Box>
    </Box>
  );
};
export default ExerciseSet;
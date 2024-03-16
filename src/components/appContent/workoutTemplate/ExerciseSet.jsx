import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "../../../styles/styles.css";
import Alert from "@mui/material/Alert";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
const ExerciseSet = ({
  onAddReps,
  onAddWeight,
  exerciseIndex,
  setIndex,
  exercise,
  errors,
}) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [repsError, setRepsError] = useState(false);
  const [weightError, setWeightError] = useState(false);
  const handleAddReps = (e) => {
    const reps = e.target.value;
    //check is isNaN and setError
    if (isNaN(reps)) {
      setRepsError(true);
    }
    onAddReps(exerciseIndex, setIndex, reps);
  };

  const handleAddWeight = (e) => {
    const weight = e.target.value;
    if (isNaN(weight)) {
      setWeightError(true);
    }
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
          size="small"
          sx={isSmallScreen ? { width: 80 } : null}
        />
        {exercise.sets[setIndex].weight === "" && errors && errors.weight && (
          <Alert severity="error">{errors.weight}</Alert>
        )}
        {weightError && <Alert severity="error">Weight must be a number</Alert>}
      </Box>
      <Box>
        <TextField
          required
          id={`reps-${setIndex}`}
          name="reps"
          autoComplete="reps"
          onChange={handleAddReps}
          value={exercise.sets[setIndex].reps}
          size="small"
          sx={isSmallScreen ? { width: 80 } : null}
        />
        {exercise.sets[setIndex].reps === "" && errors && errors.reps && (
          <Alert severity="error">{errors.reps}</Alert>
        )}
        {repsError && <Alert severity="error">Reps must be a number</Alert>}
      </Box>
    </Box>
  );
};

export default ExerciseSet;

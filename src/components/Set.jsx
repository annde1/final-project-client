import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "../styles/styles.css";
import { useEffect } from "react";
const Set = ({ onAddReps, onAddWeight, exerciseIndex, setIndex, exercise }) => {
  const handleAddReps = (e) => {
    const reps = e.target.value;
    onAddReps(exerciseIndex, setIndex, reps);
  };

  const handleAddWeight = (e) => {
    const weight = e.target.value;
    onAddWeight(exerciseIndex, setIndex, weight);
  };
  useEffect(() => {
    console.log("SET");
    console.log(exercise);
    console.log(exercise.sets);
    console.log(exercise.sets[setIndex]);
  }, [exercise, setIndex]);
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
      </Box>
    </Box>
  );
};
export default Set;

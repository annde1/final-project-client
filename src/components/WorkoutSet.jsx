import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "../styles/styles.css";
import { useEffect } from "react";
const WorkoutSet = () => {
  return (
    <>
      <Box>
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
              {index + 1}
            </Typography>
          </Box>
          <Box>
            <TextField
              required
              id={`weight-${index}`}
              name="kg"
              autoComplete="kg"
              onChange={handleAddWeight}
              value={exercise.sets[index].weight}
            />
          </Box>
          <Box>
            <TextField
              required
              id={`reps-${index}`}
              name="reps"
              autoComplete="reps"
              onChange={handleAddReps}
              value={exercise.sets[index].reps}
            />
          </Box>
          <Checkbox color="success" sx={{ alignSelf: "center" }} />
        </Box>
      </Box>
    </>
  );
};
export default WorkoutSet;

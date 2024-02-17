import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "../../../styles/styles.css";
import Alert from "@mui/material/Alert";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
const ExerciseSet = ({
  onAddReps,
  onAddWeight,
  exerciseIndex,
  setIndex,
  exercise,
  errors,
}) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const CustomTextField = styled(TextField)({
    [isSmallScreen && "& input"]: {
      width: 80,
    },
  });
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
        <CustomTextField
          required
          id={`weight-${setIndex}`}
          name="kg"
          autoComplete="kg"
          onChange={handleAddWeight}
          value={exercise.sets[setIndex].weight}
          size="small"
        />
        {errors && errors.weight && (
          <Alert
            severity="error"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {errors.weight}
          </Alert>
        )}
      </Box>
      <Box>
        <CustomTextField
          required
          id={`reps-${setIndex}`}
          name="reps"
          autoComplete="reps"
          onChange={handleAddReps}
          value={exercise.sets[setIndex].reps}
          size="small"
        />
        {errors && errors.reps && (
          <Alert
            severity="error"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {errors.reps}
          </Alert>
        )}
      </Box>
    </Box>
  );
};
export default ExerciseSet;

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../../../styles/styles.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";

const WorkoutExerciseItem = ({
  exercise,
  onAddWeight,
  onAddReps,
  exerciseIndex,
  onAddVolume,
  onDone,
}) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const CustomTextField = styled(TextField)({
    [isSmallScreen && "& input"]: {
      width: 80,
    },
  });

  const handleAddReps = (e, setIndex) => {
    const reps = e.target.value;
    onAddReps(exerciseIndex, setIndex, reps);
  };

  const handleAddWeight = (e, setIndex) => {
    const weight = e.target.value;
    onAddWeight(exerciseIndex, setIndex, weight);
  };

  const handleDoneSet = (checked, exerciseIndex, setIndex) => {
    const total = exercise.sets.reduce((acc, set, index) => {
      if (index === setIndex) {
        return acc + Number(set.weight) * Number(set.reps);
      }
      return acc;
    }, 0);
    if (checked) {
      onDone(checked, exerciseIndex, setIndex);
      onAddVolume(total);
    }
  };
  return (
    <Container>
      <Container>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Typography
            variant="h6"
            className="customFont"
            sx={{ fontWeight: "bold" }}
          >
            {exercise.name}
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",

            marginTop: "2rem",
          }}
        >
          <Typography className="customFont">SET</Typography>
          <Typography className="customFont" sx={{ ml: 5 }}>
            KG
          </Typography>
          <Typography className="customFont" sx={{ ml: 10 }}>
            REPS
          </Typography>
          <Typography className="customFont">&#x2713;</Typography>
        </Box>
        {exercise.sets.map((_, index) => (
          <Box key={index}>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: "1rem",
              }}
            >
              <Box>
                <Typography className="customFont" sx={{ fontSize: "25px" }}>
                  {index + 1}
                </Typography>
              </Box>
              <Box>
                <CustomTextField
                  required
                  id={`weight-${index}`}
                  name="kg"
                  autoComplete="kg"
                  onChange={(e) => {
                    handleAddWeight(e, index);
                  }}
                  placeholder={exercise.sets[index].weight}
                  value={exercise.sets[index].weight}
                  size="small"
                />
              </Box>
              <Box>
                <CustomTextField
                  required
                  id={`reps-${index}`}
                  name="reps"
                  autoComplete="reps"
                  onChange={(e) => {
                    handleAddReps(e, index);
                  }}
                  placeholder={exercise.sets[index].reps}
                  value={exercise.sets[index].reps}
                  size="small"
                />
              </Box>
              <Checkbox
                color="success"
                sx={{ alignSelf: "center" }}
                onChange={(e) => {
                  handleDoneSet(e.target.checked, exerciseIndex, index);
                }}
              />
            </Box>
          </Box>
        ))}
      </Container>
    </Container>
  );
};
export default WorkoutExerciseItem;

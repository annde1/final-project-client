import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../styles/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";

const WorkoutItem = ({
  exercise,
  onAddWeight,
  onAddReps,
  exerciseIndex,
  onAddVolume,
  onRemoveVolume,
}) => {
  const handleAddReps = (e, setIndex) => {
    const reps = e.target.value;
    onAddReps(exerciseIndex, setIndex, reps);
  };

  const handleAddWeight = (e, setIndex) => {
    const weight = e.target.value;
    onAddWeight(exerciseIndex, setIndex, weight);
  };

  const handleAddDetails = (setIndex, checked) => {
    const total = exercise.sets.reduce((acc, set, index) => {
      if (index === setIndex) {
        console.log("Weight", set.weight);
        console.log("Reps", set.reps);

        return acc + Number(set.weight) * Number(set.reps);
      }
      return acc;
    }, 0);
    if (checked) {
      //TODO: if checked then update the state of reps and weight
      onAddVolume(total);
    } else {
      onRemoveVolume(total);
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
          <IconButton>
            <MoreVertIcon />
          </IconButton>
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
          <Typography className="customFont">KG</Typography>
          <Typography className="customFont">REPS</Typography>
          <Typography
            className="customFont"
            sx={{ paddingRight: 2, fontSize: "1.3rem" }}
          >
            &#x2713;
          </Typography>
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
                <TextField
                  required
                  id={`weight-${index}`}
                  name="kg"
                  autoComplete="kg"
                  onChange={(e) => {
                    handleAddWeight(e, index);
                  }}
                  value={exercise.sets[index].weight}
                  size="small"
                />
              </Box>
              <Box>
                <TextField
                  required
                  id={`reps-${index}`}
                  name="reps"
                  autoComplete="reps"
                  onChange={(e) => {
                    handleAddReps(e, index);
                  }}
                  value={exercise.sets[index].reps}
                  size="small"
                />
              </Box>
              <Checkbox
                color="success"
                sx={{ alignSelf: "center" }}
                onChange={(e) => {
                  handleAddDetails(index, e.target.checked);
                }}
              />
            </Box>
          </Box>
        ))}
      </Container>
    </Container>
  );
};
export default WorkoutItem;

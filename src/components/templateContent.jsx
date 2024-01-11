import Container from "@mui/material/Container";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../styles/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Set from "./Set";
import Button from "@mui/material/Button";

const TemplateItem = ({
  selectedExercise,
  name,
  onAddWeight,
  onAddReps,
  exerciseIndex,
  exercise,
  onAddSet,
}) => {
  const handleShowModal = () => {};
  const handleAddSet = () => {
    console.log("Adding set");
    onAddSet(exerciseIndex);
  };
  return (
    <Container>
      {selectedExercise ? (
        <Container>
          <Box
            style={{
              display: "flex",
              flexDirection: "Row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "4rem",
            }}
          >
            <Typography variant="h5" className="customFont">
              {name}
            </Typography>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <Typography className="customFont">SET</Typography>
            <Typography className="customFont">KG</Typography>
            <Typography className="customFont">REPS</Typography>
          </Box>
          {exercise.sets.map((_, index) => (
            <Set
              key={`${exerciseIndex}-${index}`}
              onAddReps={onAddReps}
              onAddWeight={onAddWeight}
              exerciseIndex={exerciseIndex}
              setIndex={index}
            />
          ))}
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "2rem",
            }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "#0B0D12" }}
              onClick={handleAddSet}
            >
              Add Set
            </Button>
          </Box>
        </Container>
      ) : (
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4rem",
          }}
        >
          <IconButton onClick={handleShowModal}>
            <FitnessCenterIcon />
          </IconButton>

          <Typography className="customFont">No Exercises</Typography>
          <Typography className="customFont">
            So far you don't have any exercises
          </Typography>
        </Container>
      )}
    </Container>
  );
};
export default TemplateItem;

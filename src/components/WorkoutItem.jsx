import Container from "@mui/material/Container";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../styles/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
const WorkoutItem = ({
  exercise,
  onAddWeight,
  onAddReps,
  exerciseIndex,
  onAddVolume,
}) => {
  const handleAddReps = (e, setIndex) => {
    const reps = e.target.value;
    onAddReps(exerciseIndex, setIndex, reps);
  };

  const handleAddWeight = (e, setIndex) => {
    const weight = e.target.value;
    onAddWeight(exerciseIndex, setIndex, weight);
  };

  return (
    <Container>
      <Container>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Typography
            variant="h5"
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
            justifyContent: "space-between",
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
                  onChange={(e) => {
                    handleAddWeight(e, index);
                  }}
                  value={exercise.sets[index].weight}
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
                />
              </Box>
              <Checkbox color="success" sx={{ alignSelf: "center" }} />
            </Box>
          </Box>
        ))}
      </Container>
    </Container>
  );
};
export default WorkoutItem;

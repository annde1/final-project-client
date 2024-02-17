import Container from "@mui/material/Container";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../../../styles/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import ExerciseSet from "./ExerciseSet";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Popover } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TemplateItem = ({
  name,
  onAddWeight,
  onAddReps,
  exerciseIndex,
  exercise,
  onAddSet,
  onDeleteExercise,
  errors,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleShowModal = () => {};
  const handleAddSet = () => {
    onAddSet(exerciseIndex);
  };
  const handleShowList = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseList = () => {
    setAnchorEl(null);
  };

  const handleDeleteExercise = () => {
    onDeleteExercise(exerciseIndex);
  };
  return (
    <Container>
      {exercise ? (
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
            <IconButton onClick={handleShowList}>
              <MoreVertIcon />
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleCloseList}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {open && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton onClick={handleDeleteExercise}>
                    <DeleteIcon />
                  </IconButton>
                  <Typography
                    variant="body1"
                    className="customFont"
                    sx={{ mr: 2 }}
                  >
                    Delete
                  </Typography>
                </Box>
              )}
            </Popover>
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
            <ExerciseSet
              key={`${exerciseIndex}-${index}`}
              onAddReps={onAddReps}
              onAddWeight={onAddWeight}
              exerciseIndex={exerciseIndex}
              setIndex={index}
              exercise={exercise}
              errors={errors}
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
              className="customFont"
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

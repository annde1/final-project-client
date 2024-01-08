import Container from "@mui/material/Container";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../styles/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Set from "./Set";
import Button from "@mui/material/Button";
import { useState } from "react";

const TemplateContent = ({ selectedExercise }) => {
  const [numberOfSets, setNumberOfSets] = useState(1);
  const handleShowModal = () => {
    console.log("hello");
  };
  const handleAddSet = () => {
    setNumberOfSets((prev) => prev + 1);
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
              {selectedExercise}
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
          {[...Array(numberOfSets)].map((_, index) => (
            <Set key={index} />
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
export default TemplateContent;

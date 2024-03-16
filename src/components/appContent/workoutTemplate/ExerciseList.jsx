import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import "../../../styles/styles.css";
import { useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { errorToast } from "../../../service/toastify-service";
const ExericseList = ({
  onExerciseChange,
  selectedExercise,
  onAddExercise,
}) => {
  const [exercises, setExercises] = React.useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const { data } = await axios.get("/exercises");
        setExercises(data.exercises);
      } catch (err) {
        // console.log(err);
        errorToast("Something went worng. Could not fetch the exercises.");
      }
    };
    fetchExercises();
  }, []);

  const handleExerciseChange = (e) => {
    const selected = e.target.value;
    onExerciseChange(selected);
  };

  const handleAddExercise = () => {
    onAddExercise(selectedExercise);
  };
  return (
    <Box sx={{ minWidth: 120, marginTop: 3 }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{ fontFamily: "Montserrat" }}
        >
          Select Exercise
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={!selectedExercise ? "" : selectedExercise}
          style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
          onChange={handleExerciseChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {exercises.map((exercise) => (
            <MenuItem
              key={uuidv4()}
              value={exercise.name}
              sx={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {exercise.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedExercise && (
        <Button
          className="customFont"
          variant="contained"
          style={{
            alignSelf: "flex-end",
            marginTop: "1.5rem",
            backgroundColor: "#0B0D12",
          }}
          onClick={handleAddExercise}
        >
          Add Exericse
        </Button>
      )}
    </Box>
  );
};
export default ExericseList;

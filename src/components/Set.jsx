import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const Set = ({ onAddReps, onAddWeight, exerciseIndex, setIndex }) => {
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
        <FormControl>
          <Select labelId="demo-simple-select-label" id="demo-simple-select">
            <MenuItem value={"Warm up"}>Warm up</MenuItem>
            <MenuItem value={"Normal"}>Normal</MenuItem>
            <MenuItem value="Failure">Failure</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <TextField
          required
          id={`weight-${setIndex}`}
          name="kg"
          autoComplete="kg"
          onChange={handleAddWeight}
        />
      </Box>
      <Box>
        <TextField
          required
          id={`reps-${setIndex}`}
          name="kreps"
          autoComplete="reps"
          onChange={handleAddReps}
        />
      </Box>
    </Box>
  );
};
export default Set;

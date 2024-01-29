import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const WorkoutCardExercise = ({ name, sets }) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <Avatar
          alt="Travis Howard"
          src="https://static.thenounproject.com/png/2216254-200.png"
          sx={{ marginRight: "1rem", height: "25px", width: "25px" }}
        />
        <Typography sx={{ fontFamily: "Montserrat" }} variant="subtitle2">
          {sets} sets {name}
        </Typography>
      </Box>
    </>
  );
};
export default WorkoutCardExercise;

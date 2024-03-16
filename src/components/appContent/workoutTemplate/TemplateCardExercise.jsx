import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
const TemplateCardExercise = ({ exerciseName, sets }) => {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textAlign: "left",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "bold",
          mt: 2,
        }}
      >
        {exerciseName}
      </Typography>
      {sets.map((set, index) => (
        <>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              mt: 3,
            }}
            key={uuidv4()}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {index + 1}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {set.weight} kg
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {set.reps} reps
            </Typography>
          </Box>
        </>
      ))}
    </>
  );
};
export default TemplateCardExercise;

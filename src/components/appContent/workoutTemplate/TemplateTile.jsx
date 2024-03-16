import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

const TemplateTile = ({ name, exercises }) => {
  return (
    <>
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
            mb: 2,
            textAlign: "left",
            fontWeight: "bold",
          }}
        >
          {name}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        {exercises.map((exercise) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Avatar
              alt="Travis Howard"
              src="https://static.thenounproject.com/png/2216254-200.png"
              sx={{ marginRight: "1rem", height: "25px", width: "25px" }}
            />
            <Typography sx={{ fontFamily: "Montserrat" }} variant="subtitle2">
              {exercise.sets.length} sets {exercise.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};
export default TemplateTile;

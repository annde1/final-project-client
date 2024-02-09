import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import "../../../styles/styles.css";
const WorkoutDetails = ({ duration, volume, records }) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", marginTop: "1.5rem" }}>
        <Box sx={{ marginRight: "3rem" }}>
          <Typography className="customFont" variant="subtitle2">
            Duration
          </Typography>
          <Typography
            className="customFont"
            variant="subtitle2"
            sx={{ fontWeight: "bold" }}
          >
            {duration.hours}h {duration.minutes}min
          </Typography>
        </Box>
        <Box sx={{ marginRight: "3rem" }}>
          <Typography className="customFont" variant="subtitle2">
            Volume
          </Typography>
          <Typography
            className="customFont"
            variant="subtitle2"
            sx={{ fontWeight: "bold" }}
          >
            {volume} kg
          </Typography>
        </Box>
        <Box sx={{ marginRight: "3rem" }}>
          <Typography className="customFont" variant="subtitle2">
            Records
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <Typography
              className="customFont"
              variant="subtitle2"
              sx={{ fontWeight: "bold" }}
            >
              {records}
            </Typography>
            <EmojiEventsIcon
              sx={{
                color: "#F8BA00",
                height: "18px",
                width: "18px",
                alignSelf: "center",
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default WorkoutDetails;

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const WorkoutUserDetails = ({ userName, createdAt, image, alt }) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Avatar
          sx={{ width: "60px", height: "60px", marginRight: "2rem" }}
          src={image}
          alt={alt}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {userName}
            </Typography>
          </Box>

          <Typography
            variant="subtitle2"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {createdAt}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default WorkoutUserDetails;

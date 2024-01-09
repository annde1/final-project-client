import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const UserDetails = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Avatar sx={{ width: "60px", height: "60px", marginRight: "2rem" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            annad
          </Typography>
          <Typography
            variant="subtitle2"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            6 hours ago
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default UserDetails;

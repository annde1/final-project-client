import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const UserDetails = ({ userName, createdAt, image }) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Avatar
          sx={{ width: "60px", height: "60px", marginRight: "2rem" }}
          src="https://i.pravatar.cc/48?u"
        />
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
            {userName}
          </Typography>
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
export default UserDetails;

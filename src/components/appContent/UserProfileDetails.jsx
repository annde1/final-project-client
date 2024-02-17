import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../../styles/styles.css";
const UserProfileDetails = ({
  firstName,
  lastName,
  userName,
  email,
  userType,
  age,
  weight,
  height,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            Full name:
          </Typography>
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
          >
            {firstName} {lastName}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            Username:
          </Typography>
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
          >
            {userName}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            Email:
          </Typography>
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
          >
            {email}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            Account:
          </Typography>
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
          >
            {userType ? "Premium" : "Regular"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            Age:
          </Typography>
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
          >
            {age}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            Weight:
          </Typography>
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
          >
            {weight}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            Height:
          </Typography>
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
          >
            {height}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default UserProfileDetails;

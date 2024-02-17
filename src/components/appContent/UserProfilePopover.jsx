import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import "../../styles/styles.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
const UserProfilePopover = ({ anchorEl, onClosePopover, onShowModal }) => {
  const navigate = useNavigate();
  const handleRedirectWorkouts = () => {
    navigate(ROUTES.MYWORKOUTS);
  };

  const handleRedirectEditProfile = () => {
    navigate(ROUTES.EDITPROFILE);
  };
  const handleShowModal = () => {
    onShowModal();
  };

  return (
    <>
      {" "}
      <Popover
        id="menu"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          onClosePopover();
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            <IconButton
              aria-label="Edit Profile"
              onClick={handleRedirectEditProfile}
            >
              <EditIcon />
            </IconButton>
            <Typography
              variant="body2"
              className="customFont"
              color="text.secondary"
            >
              Edit Profile
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            <IconButton aria-label="Edit Profile" onClick={handleShowModal}>
              <DeleteIcon />
            </IconButton>
            <Typography
              variant="body2"
              className="customFont"
              color="text.secondary"
            >
              Delete Profile
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            <IconButton
              aria-label="My Workouts"
              onClick={handleRedirectWorkouts}
            >
              <FitnessCenterIcon />
            </IconButton>
            <Typography
              variant="body2"
              className="customFont"
              color="text.secondary"
              sx={{ mr: 2 }}
            >
              My Workouts
            </Typography>
          </Box>
        </Box>
      </Popover>
    </>
  );
};
export default UserProfilePopover;

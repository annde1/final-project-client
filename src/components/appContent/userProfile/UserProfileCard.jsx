import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../../../styles/styles.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UserProfileDetails from "./UserProfileDetails";
import UserProfilePopover from "./UserProfilePopover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";

const UserProfileCard = ({
  img,
  firstName,
  lastName,
  userName,
  workouts,
  followers,
  following,
  email,
  userType,
  age,
  height,
  weight,
  userId,
  onCalculateBmi,
  onShowModal,
  onShowPremiumModal,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const userData = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleCalcBmi = () => {
    onCalculateBmi(height, weight);
  };

  const handleRedirectSocial = () => {
    //If user is not viewing his own profile disable the redirect
    if (userData !== userId) return;
    navigate(ROUTES.SOCIAL);
  };
  const handleRedirectMyWorkouts = () => {
    //If user is not viewing his own profile disable the redirect

    if (userData !== userId) return;
    navigate(ROUTES.MYWORKOUTS);
  };

  return (
    <Card sx={{ mt: 6, mb: 5, bgcolor: "#F6F8FA" }}>
      <CardHeader
        action={
          userData === userId ? (
            <div>
              <IconButton
                aria-label="settings"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handlePopoverOpen}
              >
                <MoreVertIcon />
              </IconButton>
              <UserProfilePopover
                userId={userId}
                anchorEl={anchorEl}
                onClosePopover={handlePopoverClose}
                onShowModal={onShowModal}
                onShowPremiumModal={onShowPremiumModal}
              />
            </div>
          ) : null
        }
        title={`${firstName} ${lastName}`}
        subheader={userName}
        classes={{
          root: "customFont",
          title: "customFont",
          subheader: "customFont",
        }}
        sx={{ mt: 2 }}
      />

      <CardMedia
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Avatar
          style={{
            width: "120px",
            height: "120px",
            marginTop: "1rem",
            marginBottom: "1rem",
            border: "1px solid black",
          }}
          src={img}
        />
      </CardMedia>
      <CardContent>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            className="customFont"
            color="text.secondary"
            sx={{
              cursor: "pointer",
            }}
            onClick={handleRedirectMyWorkouts}
          >
            Workouts {workouts.length}
          </Typography>
          <Typography
            variant="subtitle2"
            className="customFont"
            sx={{ cursor: "pointer" }}
            color="text.secondary"
            onClick={handleRedirectSocial}
          >
            Following {following}
          </Typography>
          <Typography
            variant="subtitle2"
            className="customFont"
            sx={{ cursor: "pointer" }}
            color="text.secondary"
            onClick={handleRedirectSocial}
          >
            Followers {followers}
          </Typography>
        </Box>
      </CardContent>
      <CardContent>
        <UserProfileDetails
          firstName={firstName}
          lastName={lastName}
          userName={userName}
          userType={userType}
          age={age}
          weight={weight}
          height={height}
          email={email}
        />
        {userData === userId && (
          <Button
            size="small"
            variant="contained"
            onClick={handleCalcBmi}
            sx={{
              marginTop: 3,
              fontFamily: "Montserrat, sans-serif",

              backgroundColor: "#0B0D12",
              "&:hover": {
                backgroundColor: "#393A3E",
              },
            }}
          >
            Calculate BMI
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
export default UserProfileCard;

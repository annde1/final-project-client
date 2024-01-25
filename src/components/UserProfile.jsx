import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";

import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import "../styles/styles.css";

const UserProfile = ({ userData, workouts }) => {
  const navigate = useNavigate();
  const followers =
    userData.followers?.length > 0 ? userData.followers?.length : 0;
  const following =
    userData.following?.length > 0 ? userData.following?.length : 0;

  const handleRedirectWorkouts = () => {
    navigate(ROUTES.MYWORKOUTS);
  };
  const handleRedirectSocial = () => {
    navigate(ROUTES.SOCIAL);
  };
  return (
    <Container>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <Avatar
          style={{ width: "100px", height: "100px", marginBottom: "1rem" }}
          src={userData.image?.url}
        ></Avatar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography className="customFont">{userData.userName}</Typography>
          {userData.isPremium && (
            <FaCrown style={{ color: "#D5C289", marginLeft: "0.5rem" }} />
          )}
        </Box>

        <Typography
          className="customFont"
          variant="subtitle2"
          sx={{ fontWeight: "bold" }}
        >
          {userData.name?.firstName}
        </Typography>
      </Box>

      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="subtitle2"
          className="customFont"
          sx={{
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={handleRedirectWorkouts}
        >
          Workouts {workouts.length}
        </Typography>
        <Typography
          variant="subtitle2"
          className="customFont"
          sx={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={handleRedirectSocial}
        >
          Following {following}
        </Typography>
        <Typography
          variant="subtitle2"
          className="customFont"
          sx={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={handleRedirectSocial}
        >
          Followers {followers}
        </Typography>
      </Box>
    </Container>
  );
};
export { UserProfile };

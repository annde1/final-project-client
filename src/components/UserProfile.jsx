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
import "../styles/styles.css";

const UserProfile = () => {
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
        ></Avatar>
        <Typography className="customFont">annad</Typography>
        <Typography className="customFont">Anna</Typography>
      </Box>

      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" className="customFont">
          Workouts {153}
        </Typography>
        <Typography variant="body2" className="customFont">
          Followers {0}
        </Typography>
        <Typography variant="body2" className="customFont">
          Following {0}
        </Typography>
      </Box>
    </Container>
  );
};
export { UserProfile };

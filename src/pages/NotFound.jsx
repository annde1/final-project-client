import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { Grid, Container } from "@mui/material";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const NotFound = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(ROUTES.FEEDS);
  };
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ marginTop: 6 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                mb: 4,
              }}
            >
              Page Not Found!
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                mb: 4,
              }}
            >
              404
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                textAlign: "center",
              }}
            >
              The page you were looking for doesn't exist. You may have
              misstyped the address or the page may have moved
            </Typography>
            <Button
              variant="text"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                color: "#252525",
                mt: 4,
              }}
              onClick={handleRedirect}
            >
              <ArrowForwardIcon sx={{ mr: 1 }} />
              Go To Home Page
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default NotFound;

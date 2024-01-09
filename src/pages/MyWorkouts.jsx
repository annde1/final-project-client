import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Workout from "../components/Workout";

const MyWorkoutsPage = () => {
  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        My Workouts
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: "3rem" }}>
        <Grid container spacing={2} justifyContent="center">
          {/*map*/}
          <Grid item xs={8} md={8}>
            <Workout />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default MyWorkoutsPage;

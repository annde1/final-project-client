import { UserProfile } from "../components/UserProfile";
import Typography from "@mui/material/Typography";

import CssBaseline from "@mui/material/CssBaseline";
import { Box, Grid, Container } from "@mui/material";

const MyProfilePage = () => {
  //TODO fetch user Data by id (take from redux) and display wowrkouts, height, weight, age
  //TODO add a button to calculate BMI and siplay modal with user bmi
  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        My Profile
      </Typography>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <UserProfile />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
export default MyProfilePage;

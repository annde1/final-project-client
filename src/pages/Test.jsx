import { Box, Grid, Container, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import ManageAccount from "../components/SocialTabs";
const Test = () => {
  return (
    <>
      <Typography variant="h4" sx={{ fontFamily: "Montserrat, sans-serif" }}>
        Account Settings
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <ManageAccount />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Test;

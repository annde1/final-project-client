import Typography from "@mui/material/Typography";
import { Grid, Container, Box } from "@mui/material";
import SocialTabs from "../components/appContent/social/SocialTabs";
const SocialPage = () => {
  return (
    <Box sx={{ height: "100vh" }}>
      <Typography variant="h4" sx={{ fontFamily: "Montserrat, sans-serif" }}>
        Social
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <SocialTabs />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default SocialPage;

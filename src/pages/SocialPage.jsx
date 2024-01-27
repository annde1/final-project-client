import Typography from "@mui/material/Typography";
import { Grid, Container } from "@mui/material";
import SocialTabs from "../components/SocialTabs";
const SocialPage = () => {
  return (
    <>
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
    </>
  );
};
export default SocialPage;

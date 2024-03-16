import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import "../styles/styles.css";
import AboutSlider from "../components/appContent/sliders/AboutSlider";
const AboutPage = () => {
  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        About Zen Fit
      </Typography>
      <Container component="main" sx={{ marginTop: 4, width: "80%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            ></Box>
          </Grid>
        </Grid>
        <AboutSlider />
      </Container>
    </>
  );
};
export default AboutPage;

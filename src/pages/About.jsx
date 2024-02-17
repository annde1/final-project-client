import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import "../styles/styles.css";
import AboutCardGrid from "../components/appContent/about/AboutCardGrid";
const AboutPage = () => {
  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        About Zen Fit
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* <Typography
                variant="body1"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  textAlign: "center",
                }}
              >
                Welcome to Zen Fit, your ultimate gym companion for a mindful
                fitness journey! Zen Fit is not just a fitness app, it's a
                personalized fitness experience designed to empower you in your
                pursuit of a healthier lifestyle.
              </Typography> */}
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  textAlign: "center",
                  marginTop: "3rem",
                  marginBottom: "2rem",
                }}
              >
                Key Features
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <AboutCardGrid />
      </Container>
    </>
  );
};
export default AboutPage;

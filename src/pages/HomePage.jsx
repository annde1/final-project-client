import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useState } from "react";
import ImageListComponent from "../components/ImageList";
const HomePage = () => {
  return (
    <>
      <Box sx={{ height: "100vh", pb: 6 }}>
        <Typography
          variant="h4"
          sx={{ fontFamily: "Montserrat, sans-serif", mb: 4 }}
        >
          Home
        </Typography>
        <Container component="main" maxWidth="md">
          <Box
            sx={{
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ImageListComponent />
          </Box>
        </Container>

        {/* <img
        src="assets/images/barbell.jpg"
        alt="Barbell"
        style={{ width: "100%", height: "22rem" }}
      ></img> */}
      </Box>
    </>
  );
};
export default HomePage;

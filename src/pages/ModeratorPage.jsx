import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";
import ModeratorTabs from "../components/appContent/moderator/ModeratorTabs";
const ModeratorPage = () => {
  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        Moderator Page
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ModeratorTabs />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default ModeratorPage;

import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useState } from "react";
import Template from "../components/Template";
const MyTemplatesPage = () => {
  const [userTemplates, setUserTemplates] = useState([
    "Dumbbells",
    "Barbell 5x5",
    "Accessories",
  ]);
  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        My Templates
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  marginBottom: "2rem",
                }}
              >
                My Templates (3)
              </Typography>
              {userTemplates.map((template) => (
                <Template name={template} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default MyTemplatesPage;

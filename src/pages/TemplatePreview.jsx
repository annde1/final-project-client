import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useState } from "react";
import TemplatePreviewList from "../components/appContent/workoutTemplate/TemplatePreviewList";

const TemplatePreview = () => {
  const [templateName, setTemplateName] = useState("");

  const handleTemplateName = (name) => {
    setTemplateName(name);
  };
  return (
    <>
      <Box></Box>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        {templateName}
      </Typography>
      <Typography
        variant="body1"
        style={{ fontFamily: "Montserrat, sans-serif", marginTop: "1rem" }}
      >
        Template Details
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TemplatePreviewList onChangeTemplateName={handleTemplateName} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default TemplatePreview;

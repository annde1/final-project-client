import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useState } from "react";
import TemplateItemsList from "../components/appContent/workoutTemplate/TemplateItemsList";

const EditTemplatePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [templateName, setTemplateName] = useState(null);

  const handleTemplateName = (name) => {
    setTemplateName(name);
  };
  const handleIsLoading = () => {
    setIsLoading(false);
  };
  return (
    <>
      <Typography variant="h4" sx={{ fontFamily: "Montserrat, sans-serif" }}>
        Edit Template
      </Typography>
      <Container component="main" maxWidth="md" sx={{ marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            {isLoading}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TemplateItemsList
                templateName={templateName}
                isEdit={true}
                onTemplateNameChange={handleTemplateName}
                onIsLoadingChange={handleIsLoading}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default EditTemplatePage;

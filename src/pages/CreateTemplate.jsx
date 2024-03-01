import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/styles.css";
import axios from "axios";
import { useSelector } from "react-redux";
import TemplateMessage from "../components/appContent/workoutTemplate/TemplateMessage";
import TemplateItemsList from "../components/appContent/workoutTemplate/TemplateItemsList";
const CreateTemplatePage = () => {
  const [numTemplates, setNumTemplates] = useState(0);
  const [templatesLength, setTemplatesLength] = useState(0);
  const isPremium = useSelector(
    (store) => store.authenticationSlice.userData?.isPremium
  );
  useEffect(() => {
    //Fetch templates of the user to check how many templates he owns
    const fetchUserTemplates = async () => {
      try {
        const { data } = await axios.get("/templates/my-templates");
        setNumTemplates(data.templates.length);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchUserTemplates();
  }, []);

  const handleTemplatesLength = (value) => {
    setTemplatesLength(value);
  };

  return (
    <>
      <Box sx={{ height: templatesLength > 0 ? "100%" : "100vh" }}>
        <Typography
          variant="h4"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Create Template
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
                {!isPremium && numTemplates >= 3 ? (
                  <TemplateMessage />
                ) : (
                  <>
                    <TemplateItemsList
                      onTemplateLengthChange={handleTemplatesLength}
                    />
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CreateTemplatePage;

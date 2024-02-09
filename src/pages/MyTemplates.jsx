import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Template from "../components/appContent/workoutTemplate/Template";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ROUTES } from "../routes/routes";
import CircularProgress from "@mui/material/CircularProgress";
const MyTemplatesPage = () => {
  const [userTemplates, setUserTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserTemplates = async () => {
      try {
        const { data } = await axios.get("/templates/my-templates");
        setUserTemplates(data.templates);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserTemplates();
  }, []);
  const handleDeleteTemplate = async (_id) => {
    try {
      await axios.delete(`/templates/${_id}`);
      setUserTemplates((current) =>
        current.filter((template) => template._id !== _id)
      );
      console.log("TEMPLATE DELETED");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditTemplate = (_id) => {
    navigate(`${ROUTES.EDITTEMPLATE}/${_id}`);
  };

  const handleStartWorkout = (_id) => {
    navigate(`${ROUTES.STARTWORKOUT}/${_id}`);
  };

  const handlePreviewTemplate = (_id) => {
    navigate(`${ROUTES.TEMPLATEPREVIEW}/${_id}`);
  };
  return (
    <Box sx={{ height: "100vh" }}>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        My Templates
      </Typography>
      <Container maxWidth="md" sx={{ marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {isLoading && (
                <Grid item xs={12} md={12}>
                  <CircularProgress color="inherit" />
                  <Typography
                    variant="body2"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Fetching Templates
                  </Typography>
                </Grid>
              )}
              <Typography
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  marginBottom: "2rem",
                }}
              >
                My Templates ({userTemplates.length})
              </Typography>

              {userTemplates.map((template, index) => (
                <Template
                  name={template.name}
                  key={index}
                  templateId={template._id}
                  onDelete={handleDeleteTemplate}
                  onEdit={handleEditTemplate}
                  onStartWorkout={handleStartWorkout}
                  onPreviewTemplate={handlePreviewTemplate}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default MyTemplatesPage;

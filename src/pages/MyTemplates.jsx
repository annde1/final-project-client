import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Template from "../components/appContent/workoutTemplate/Template";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ROUTES } from "../routes/routes";
import CircularProgress from "@mui/material/CircularProgress";
import { errorToast } from "../service/toastify-service";
import ToggleComponent from "../components/ToggleComponent";
import TemplateCard from "../components/TemplateCard";
import TemplateModal from "../components/TemplateModal";

const MyTemplatesPage = () => {
  const [userTemplates, setUserTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [displayMode, setDisplayMode] = useState("list");
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const getUserTemplates = async () => {
      try {
        const { data } = await axios.get("/templates/my-templates");
        setUserTemplates(data.templates);
        setIsLoading(false);
      } catch (err) {
        errorToast("Something went wrong. Could not fetch the templates.");
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
      setShowModal(false);
    } catch (err) {
      console.log(err);
      errorToast("Something went wrong. Could not delete the template.");
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

  const handleDisplayMode = (mode) => {
    setDisplayMode(mode);
  };

  const handleOpenModal = (templateId) => {
    setShowModal(true);
    setSelectedTemplate(templateId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Box sx={{ height: displayMode === "card" ? "100%" : "100vh" }}>
      <Typography
        variant="h4"
        style={{ fontFamily: "Montserrat, sans-serif", marginBottom: "2rem" }}
      >
        My Templates
      </Typography>
      {isLoading ? (
        <Grid item xs={12} md={12}>
          <CircularProgress color="inherit" />
          <Typography
            variant="h6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Fetching Templates
          </Typography>
        </Grid>
      ) : userTemplates.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ fontFamily: "Montserrat, sans-serif" }}
        >
          You don't have any templates
        </Typography>
      ) : (
        <>
          <Box sx={{ position: "absolute", top: 130, right: 130 }}>
            <ToggleComponent
              onDisplayModeChange={handleDisplayMode}
              view={displayMode}
            />
          </Box>
          {showModal && (
            <TemplateModal
              open={showModal}
              onCloseModal={handleCloseModal}
              onDeleteTemplate={handleDeleteTemplate}
              selectedTemplate={selectedTemplate}
            />
          )}
          {displayMode === "list" && (
            <Container maxWidth="md" sx={{ marginTop: 5 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
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
          )}
          {displayMode === "card" && (
            <Container maxWidth="lg" sx={{ marginTop: 5, width: "80%", pb: 7 }}>
              <Grid container spacing={2}>
                {userTemplates.map((template) => (
                  <Grid item xs={12} md={4} key={template._id}>
                    <TemplateCard
                      templateName={template.name}
                      exercises={template.exercises}
                      templateId={template._id}
                      onEditTemplate={handleEditTemplate}
                      onDeleteTemplate={handleDeleteTemplate}
                      onStartWorkout={handleStartWorkout}
                      onShowModal={handleOpenModal}
                      onCloseModal={handleCloseModal}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
          )}
        </>
      )}
    </Box>
  );
};

export default MyTemplatesPage;

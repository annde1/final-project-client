import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import TemplateCard from "../components/appContent/workoutTemplate/TemplateCard";
import Search from "../components/top-navigation/Search";
import SearchIconWrapper from "../components/appContent/ui/SearchIconWrapper";
import StyledInputBase from "../components/appContent/ui/StyledInputBase";
import SearchIcon from "@mui/icons-material/Search";
import Slider from "../components/appContent/sliders/Slider";
import CircularProgress from "@mui/material/CircularProgress";
import AlertComponent from "../components/appContent/ui/AlertComponent";
import SliderBottom from "../components/appContent/sliders/SliderBottom";
import { errorToast } from "../service/toastify-service";
const HomePage = () => {
  const [templates, setTemplates] = useState([]);
  const [originalTemplates, setOriginalTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [templateSearch, setTemplateSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  useEffect(() => {
    const fetchRandomWorkouts = async () => {
      try {
        if (isLoading) {
          const { data } = await axios.get("/templates/random-templates");
          setIsLoading(false);
          setTemplates(data.templates);
          setOriginalTemplates(data.templates);
        }
      } catch (err) {
        errorToast(
          "Something went wrong. Could not fetch templates of the day."
        );
        // console.log(err);
      }
    };
    fetchRandomWorkouts();
  }, [isLoading]);

  const handleTemplateSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTemplates = searchTerm
      ? originalTemplates.filter((template) =>
          template.name.toLowerCase().includes(searchTerm)
        )
      : originalTemplates;

    if (filteredTemplates.length === 0) {
      setSearchError(`No templates found with the name: ${searchTerm}`);
    }
    setTemplateSearch(searchTerm);
    setTemplates(filteredTemplates);
  };

  const handleCloseAlert = () => {
    setSearchError(null);
  };
  return (
    <>
      <Box sx={{ pb: 6 }}>
        <Typography
          variant="h4"
          sx={{ fontFamily: "Montserrat, sans-serif", mb: 3 }}
        >
          Home Page
        </Typography>

        <Container
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "83%",
          }}
        >
          <Slider />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Template..."
              inputProps={{ "aria-label": "search" }}
              value={templateSearch}
              onChange={handleTemplateSearch}
            />
          </Search>
          {searchError && (
            <AlertComponent
              userNameError={searchError}
              onCloseAlert={handleCloseAlert}
            />
          )}
          <Typography
            variant="h5"
            sx={{ fontFamily: "Montserrat, sans-serif", mb: 5, mt: 8 }}
          >
            Templates Of The Day
          </Typography>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <CircularProgress color="inherit" />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {templates.map((template) => (
                <Grid item xs={12} md={4} key={template._id}>
                  <TemplateCard
                    templateName={template.name}
                    exercises={template.exercises}
                    templateImage={template.image}
                    templateDescription={template.description}
                    templateId={template._id}
                    userId={template.userId}
                    isHomePage={true}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          <SliderBottom />
        </Container>
      </Box>
    </>
  );
};
export default HomePage;

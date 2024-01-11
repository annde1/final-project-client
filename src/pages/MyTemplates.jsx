import Typography from "@mui/material/Typography";
import { Box, Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Template from "../components/Template";
import { useSelector } from "react-redux";
import axios from "axios";
const MyTemplatesPage = () => {
  const [userTemplates, setUserTemplates] = useState([]);
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  useEffect(() => {
    const getUserTemplates = async () => {
      try {
        const { data } = await axios.get("/templates/my-templates");
        console.log(data);
        console.log(data.templates);
        setUserTemplates(data.templates);
      } catch (err) {
        console.log(err);
      }
    };
    getUserTemplates();
  }, []);
  const handleDeleteTemplate = () => {
    //api call
    //filter
  };
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
                My Templates ({userTemplates.length})
              </Typography>
              {userTemplates.map((template, index) => (
                <Template name={template.name} key={index} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default MyTemplatesPage;

import Typography from "@mui/material/Typography";
import Exercise from "../components/Exercise";
import ExericseList from "../components/ExerciseList";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import TextField from "@mui/material/TextField";
const CreateTemplateForm = () => {
  const handleSubmit = () => {};
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Template Title"
                  autoFocus
                  className="customFont"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Weight"
                  label="Weight"
                  type="number"
                  id="weight"
                  autoComplete="new-weight"
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  labelId="account-type-label"
                  id="account-type"
                  fullWidth
                  name="Account Type"
                  label="Account Type"
                  onChange={handleSubmit}
                >
                  <MenuItem value="trainee">Trainee</MenuItem>
                  <MenuItem value="trainer">Trainer</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

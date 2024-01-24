import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "../styles/styles.css";
import validateRegistration from "../validation/userRegisterValidation";
import normalizeUserData from "../service/nomralizeUserData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
const RegisterPage = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    isPremium: false,
    userType: "",
  });
  const navigate = useNavigate();
  const handleInputsChange = (event) => {
    setInputs((current) => ({
      ...current,
      [event.target.id]: event.target.value,
    }));
  };
  const handleCheckboxChange = (e) => {
    setInputs((current) => ({
      ...current,
      isPremium: e.target.checked,
    }));
  };
  const handleSelectChange = (e) => {
    setInputs((current) => ({
      ...current,
      userType: e.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      //Validate user data
      const errors = validateRegistration(inputs);
      console.log(errors);
      //if error return early
      if (errors) return;
      const userData = normalizeUserData(inputs);
      console.log(userData);
      console.log(axios.defaults.baseURL);
      const response = await axios.post("/users", userData);
      console.log(response);
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        Register Page
      </Typography>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
                  label="First Name"
                  autoFocus
                  className="customFont"
                  value={inputs.firstName}
                  onChange={handleInputsChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={inputs.lastName}
                  onChange={handleInputsChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  autoComplete="user-name"
                  value={inputs.userName}
                  onChange={handleInputsChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={inputs.email}
                  onChange={handleInputsChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={inputs.password}
                  onChange={handleInputsChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="Age"
                  label="Age"
                  type="number"
                  id="age"
                  value={inputs.age}
                  onChange={handleInputsChange}
                  autoComplete="new-age"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="Height"
                  label="Height"
                  type="number"
                  id="height"
                  autoComplete="new-height"
                  value={inputs.height}
                  onChange={handleInputsChange}
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
                  value={inputs.weight}
                  onChange={handleInputsChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  labelId="account-type-label"
                  id="userType"
                  fullWidth
                  name="Account Type"
                  label="Account Type"
                  value={inputs.userType}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="trainee">Trainee</MenuItem>
                  <MenuItem value="trainer">Trainer</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      onChange={handleCheckboxChange}
                      value={inputs.isPremium}
                    />
                  }
                  label="Premium Account"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#0B0D12" }}
              className="customFont"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default RegisterPage;

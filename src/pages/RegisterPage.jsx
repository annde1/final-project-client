import * as React from "react";
import { Button, TextField, Link, Grid } from "@mui/material";
import { Box, Checkbox, Alert } from "@mui/material";
import { Typography, Container, FormControlLabel } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import "../styles/styles.css";
import validateRegistration from "../validation/userRegisterValidation";
import normalizeUserData from "../service/nomralizeUserData";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
const RegisterPage = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    url: "",
    alt: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    isPremium: false,
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      //Validate user data
      const errors = validateRegistration(inputs);
      if (errors) {
        setErrors(errors);
        return;
      }
      const userData = normalizeUserData(inputs);
      await axios.post("/users", userData);
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
                {errors && errors.firstName && (
                  <Alert severity="error">{errors.firstName}</Alert>
                )}
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
                {errors && errors.lastName && (
                  <Alert severity="error">{errors.lastName}</Alert>
                )}
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
                {errors && errors.userName && (
                  <Alert severity="error">{errors.userName}</Alert>
                )}
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
                {errors && errors.email && (
                  <Alert severity="error">{errors.email}</Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="url"
                  label="Profile Image Url"
                  name="profile"
                  autoComplete="profile"
                  value={inputs.url}
                  onChange={handleInputsChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="alt"
                  label="Profile Image Alt"
                  name="profile"
                  autoComplete="profile"
                  value={inputs.alt}
                  onChange={handleInputsChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={inputs.password}
                  onChange={handleInputsChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleTogglePasswordVisibility}
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors && errors.password && (
                  <Alert severity="error">{errors.password}</Alert>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
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

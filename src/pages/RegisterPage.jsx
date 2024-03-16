import * as React from "react";
import { Button, TextField, Link, Grid } from "@mui/material";
import { Box, Checkbox, Alert } from "@mui/material";
import { Typography, Container, FormControlLabel } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import "../styles/styles.css";
import validateRegistration from "../validation/userRegisterValidation";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { successToast, errorToast } from "../service/toastify-service";
import { constructFormData } from "../service/form-data-service";
import { getToken } from "../service/login-service";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

const RegisterPage = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    file: null,
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setInputs((current) => ({ ...current, file: file }));
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

      const formData = constructFormData(inputs);
      await axios.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      successToast("Registration was successfull. Redirecting to login.");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      // console.log(err);
      if (err.response.data.message === "Duplicate Key") {
        errorToast("Email or username is already in use.");
      } else {
        errorToast("Something went wrong. Could not register");
      }
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
            pb: 6,
          }}
        >
          <Box noValidate sx={{ mt: 1 }}>
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              action=""
              method="post"
              id="form"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label={
                      <Typography
                        style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
                      >
                        First Name *
                      </Typography>
                    }
                    autoFocus
                    className="customFont"
                    value={inputs.firstName}
                    onChange={handleInputsChange}
                  />

                  {errors && errors.firstName && (
                    <Alert
                      severity="error"
                      sx={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {errors.firstName}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label={
                      <Typography
                        style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
                      >
                        Last Name *
                      </Typography>
                    }
                    name="lastName"
                    autoComplete="family-name"
                    value={inputs.lastName}
                    onChange={handleInputsChange}
                  />
                  {errors && errors.lastName && (
                    <Alert
                      severity="error"
                      sx={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {errors.lastName}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    id="userName"
                    label={
                      <Typography
                        style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
                      >
                        User Name *
                      </Typography>
                    }
                    name="userName"
                    autoComplete="user-name"
                    value={inputs.userName}
                    onChange={handleInputsChange}
                  />
                  {errors && errors.userName && (
                    <Alert
                      severity="error"
                      sx={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {errors.userName}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label={
                      <Typography
                        style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
                      >
                        Email Address *
                      </Typography>
                    }
                    name="email"
                    autoComplete="email"
                    value={inputs.email}
                    onChange={handleInputsChange}
                  />
                  {errors && errors.email && (
                    <Alert
                      severity="error"
                      sx={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {errors.email}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <InputLabel
                      htmlFor="file-input"
                      sx={{ alignSelf: "flex-start" }}
                    >
                      <Typography
                        style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
                      >
                        Profile Image
                      </Typography>
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      type="file"
                      id="file"
                      label={
                        <Typography
                          style={{
                            fontFamily: "Montserrat",
                            fontSize: "0.8rem",
                          }}
                        >
                          Profile Image
                        </Typography>
                      }
                      name="file"
                      onChange={handleImageChange}
                      sx={{ fontFamily: "Montserrat" }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="alt"
                    label={
                      <Typography
                        style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
                      >
                        Profile Image Alt
                      </Typography>
                    }
                    name="profile"
                    autoComplete="profile"
                    value={inputs.alt}
                    onChange={handleInputsChange}
                  />
                  {errors && errors.image?.alt && (
                    <Alert
                      severity="error"
                      sx={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {errors.image?.alt}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label={
                      <Typography
                        style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
                      >
                        Password *
                      </Typography>
                    }
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
                    <Alert
                      severity="error"
                      sx={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {errors.password}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="Age"
                    label={
                      <Typography
                        style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
                      >
                        Age
                      </Typography>
                    }
                    type="number"
                    id="age"
                    value={inputs.age}
                    onChange={handleInputsChange}
                    autoComplete="new-age"
                  />
                  {errors && errors.age && (
                    <Alert
                      severity="error"
                      sx={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {errors.age}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="Height"
                    label={
                      <Typography
                        style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
                      >
                        Height
                      </Typography>
                    }
                    type="number"
                    id="height"
                    autoComplete="new-height"
                    value={inputs.height}
                    onChange={handleInputsChange}
                  />
                  {errors && errors.height && (
                    <Alert
                      severity="error"
                      sx={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {errors.height}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="Weight"
                    label={
                      <Typography
                        style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
                      >
                        Weight
                      </Typography>
                    }
                    type="number"
                    id="weight"
                    autoComplete="new-weight"
                    value={inputs.weight}
                    onChange={handleInputsChange}
                  />
                  {errors && errors.weight && (
                    <Alert
                      severity="error"
                      sx={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {errors.weight}
                    </Alert>
                  )}
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
                    label={
                      <Typography
                        style={{ fontFamily: "Montserrat", fontSize: "0.9rem" }}
                      >
                        Premium Account
                      </Typography>
                    }
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
                  <Link
                    href="#"
                    variant="body2"
                    sx={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "#0B0D12",
                    }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default RegisterPage;

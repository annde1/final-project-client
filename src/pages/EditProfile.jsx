import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import validateEditProfile from "../validation/edit-profile-validation";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { errorToast, successToast } from "../service/toastify-service";
import Alert from "@mui/material/Alert";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { constructEditProfileData } from "../service/form-data-service";

import normalizeEditProfileData from "../service/normalize-edit-profile";

const EditProfilePage = () => {
  const [alt, setAlt] = useState("");
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    file: null,
    age: "",
    height: "",
    weight: "",
  });
  const [errors, setErrors] = useState({});
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`/users/${userId}`);
        setInputs(data.userData);
        setAlt(data.userData?.image?.alt || "");
      } catch (err) {
        // console.log(err);
        errorToast("Something went wrong. Could not fetch user data.");
      }
    };
    fetchUserData();
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setInputs((current) => ({ ...current, file: file }));
  };

  const handleInputsChange = (event) => {
    setInputs((current) => ({
      ...current,
      [event.target.id]: event.target.value,
    }));
  };

  const handleEditProfile = async (e) => {
    try {
      e.preventDefault();

      const data = { ...inputs, alt: alt };
      const normalized = normalizeEditProfileData(data);
      const errors = validateEditProfile(normalized);

      if (errors) {
        setErrors(errors);
        return;
      }
      const formData = constructEditProfileData(data);
      await axios.put(`/users/${userId}`, formData);
      successToast("Profile edited successfully!");
      navigate(ROUTES.FEEDS);
    } catch (err) {
      // console.log(err);
      errorToast("Something went wrong. Could not edit the profile.");
    }
  };
  return (
    <>
      <Box>
        <Typography
          variant="h4"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Edit Profile
        </Typography>

        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name *"
                  autoFocus
                  className="customFont"
                  value={inputs.firstName}
                  onChange={handleInputsChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.8rem",
                    },
                    "& .MuiFormHelperText-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.7rem",
                    },
                  }}
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
                  label="Last Name *"
                  name="lastName"
                  autoComplete="family-name"
                  value={inputs.lastName}
                  onChange={handleInputsChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.8rem",
                    },
                    "& .MuiFormHelperText-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.7rem",
                    },
                  }}
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
                  value={inputs.userName}
                  label="Username *"
                  name="userName"
                  autoComplete="user-name"
                  onChange={handleInputsChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.8rem",
                    },
                    "& .MuiFormHelperText-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.7rem",
                    },
                  }}
                />
                {errors && errors.userName && (
                  <Alert
                    severity="error"
                    sx={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {errors.userName}{" "}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address *"
                  name="email"
                  autoComplete="email"
                  value={inputs.email}
                  onChange={handleInputsChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.8rem",
                    },
                    "& .MuiFormHelperText-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.7rem",
                    },
                  }}
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
                      style={{ fontFamily: "Montserrat", fontSize: "0.6rem" }}
                    >
                      Profile Image
                    </Typography>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    type="file"
                    id="file"
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
                  label="Profile Image Alt"
                  name="profile"
                  value={alt}
                  autoComplete="profile"
                  onChange={(e) => setAlt(e.target.value)}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.8rem",
                    },
                    "& .MuiFormHelperText-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.7rem",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="Age"
                  label="Age"
                  type="number"
                  id="age"
                  value={inputs.age}
                  autoComplete="new-age"
                  inputProps={{ min: 0 }}
                  onChange={handleInputsChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.8rem",
                    },
                    "& .MuiFormHelperText-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.7rem",
                    },
                  }}
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
                  label="Height"
                  type="number"
                  id="height"
                  value={inputs.height}
                  autoComplete="new-height"
                  inputProps={{ min: 0 }}
                  onChange={handleInputsChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.8rem",
                    },
                    "& .MuiFormHelperText-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.7rem",
                    },
                  }}
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
                  label="Weight"
                  type="number"
                  id="weight"
                  value={inputs.weight}
                  autoComplete="new-weight"
                  inputProps={{ min: 0 }}
                  onChange={handleInputsChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.8rem",
                    },
                    "& .MuiFormHelperText-root": {
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.7rem",
                    },
                  }}
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#0B0D12" }}
              className="customFont"
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default EditProfilePage;

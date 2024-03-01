import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import validateEditProfile from "../validation/edit-profile-validation";
import "../styles/styles.css";
import normalizeEditProfile from "../service/normalize-edit-profile";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { errorToast, successToast } from "../service/toastify-service";
import Alert from "@mui/material/Alert";

const EditProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    // url: "",
    // alt: "",
    password: "",
    age: "",
    height: "",
    weight: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = useState({});
  const userId = useSelector(
    (store) => store.authenticationSlice.userData?._id
  );

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`/users/${userId}`);
        setUserData(data.userData);
        setUrl(data.userData?.image?.url || "");
        setAlt(data.userData?.image?.alt || "");
      } catch (err) {
        // console.log(err);
        errorToast("Something went wrong. Could not fetch user data.");
      }
    };
    fetchUserData();
  }, [userId]);

  const handleInputsChange = (event) => {
    setInputs((current) => ({
      ...current,
      [event.target.id]: event.target.value,
    }));
  };

  const handleEditProfile = async (e) => {
    try {
      e.preventDefault();
      const normalized = normalizeEditProfile({
        ...inputs,
        url: url,
        alt: alt,
      });
      const errors = validateEditProfile(normalized);
      if (errors) {
        setErrors(errors);
        return;
      }

      await axios.put(`/users/${userId}`, normalized);
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
                  helperText={
                    <Typography
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "0.7rem",
                      }}
                    >
                      {userData.name?.firstName}
                    </Typography>
                  }
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
                  helperText={
                    <Typography
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "0.7rem",
                      }}
                    >
                      {userData.name?.lastName}
                    </Typography>
                  }
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
                  value={inputs.userName}
                  label={
                    <Typography
                      style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
                    >
                      Username *
                    </Typography>
                  }
                  name="userName"
                  autoComplete="user-name"
                  helperText={
                    <Typography
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "0.7rem",
                      }}
                    >
                      {userData.userName}
                    </Typography>
                  }
                  onChange={handleInputsChange}
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
                  helperText={
                    <Typography
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "0.7rem",
                      }}
                    >
                      {userData.email}
                    </Typography>
                  }
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
                <TextField
                  fullWidth
                  id="url"
                  label={
                    <Typography
                      style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
                    >
                      Profile Image Url
                    </Typography>
                  }
                  name="profile"
                  value={url}
                  autoComplete="profile"
                  onChange={(e) => setUrl(e.target.value)}
                />
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
                  value={alt}
                  autoComplete="profile"
                  onChange={(e) => setAlt(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label={
                    <Typography
                      style={{ fontFamily: "Montserrat", fontSize: "0.8rem" }}
                    >
                      Password *
                    </Typography>
                  }
                  fullWidth
                  value={inputs.password}
                  onChange={handleInputsChange}
                  type={showPassword ? "text" : "password"}
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
                  autoComplete="new-age"
                  inputProps={{ min: 0 }}
                  helperText={
                    <Typography
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "0.7rem",
                      }}
                    >
                      {userData.age} years
                    </Typography>
                  }
                  onChange={handleInputsChange}
                />
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
                  value={inputs.height}
                  autoComplete="new-height"
                  inputProps={{ min: 0 }}
                  helperText={
                    <Typography
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "0.7rem",
                      }}
                    >
                      {userData.height} cm
                    </Typography>
                  }
                  onChange={handleInputsChange}
                />
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
                  value={inputs.weight}
                  autoComplete="new-weight"
                  inputProps={{ min: 0 }}
                  helperText={
                    <Typography
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "0.7rem",
                      }}
                    >
                      {userData.weight} kg
                    </Typography>
                  }
                  onChange={handleInputsChange}
                />
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

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
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
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
const EditProfilePage = () => {
  const [userData, setUserData] = useState({});
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
  });
  const [showPassword, setShowPassword] = React.useState(false);
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
        console.log(data);
        setUserData(data.userData);
      } catch (err) {
        console.log(err);
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
      const errors = validateEditProfile(inputs);
      if (errors) {
        return;
      }
      const normalized = normalizeEditProfile(inputs);
      await axios.put(`/users/${userId}`, normalized);
      navigate(ROUTES.FEEDS);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Typography variant="h4" style={{ fontFamily: "Montserrat, sans-serif" }}>
        Edit Profile
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
                helperText={userData.name?.firstName}
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
                helperText={userData.name?.lastName}
                onChange={handleInputsChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="userName"
                value={inputs.userName}
                label="User Name"
                name="userName"
                autoComplete="user-name"
                helperText={userData.userName}
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
                helperText={userData.email}
                onChange={handleInputsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="url"
                label="Profile Image Url"
                name="profile"
                value={inputs.url}
                autoComplete="profile"
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
                value={inputs.alt}
                autoComplete="profile"
                onChange={handleInputsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                label="Password"
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
                autoComplete="new-age"
                inputProps={{ min: 0 }}
                helperText={`${userData.age} years`}
                onChange={handleInputsChange}
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
                value={inputs.height}
                autoComplete="new-height"
                inputProps={{ min: 0 }}
                helperText={`${userData.height} cm`}
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
                value={inputs.weight}
                autoComplete="new-weight"
                inputProps={{ min: 0 }}
                helperText={`${userData.weight} kg`}
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
    </>
  );
};
export default EditProfilePage;

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Grid, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
const ProfileSettingsTab = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontFamily: "Montserrat, sans-serif", mb: 2 }}
        >
          Your details
        </Typography>
        <TextField
          autoComplete="given-name"
          name="firstName"
          required
          id="firstName"
          label="First Name"
          autoFocus
          className="customFont"
          sx={{ width: "70%", mb: 2 }}
        />
        <TextField
          autoComplete="given-name"
          name="lastName"
          required
          id="lastName"
          label="Last Name"
          autoFocus
          className="customFont"
          sx={{ width: "70%", mb: 2 }}
        />
        <TextField
          autoComplete="given-name"
          name="userName"
          required
          id="userName"
          label="User Name"
          autoFocus
          className="customFont"
          sx={{ width: "70%", mb: 2 }}
        />
        <TextField
          autoComplete="given-name"
          name="email"
          required
          id="email"
          label="Email Address"
          autoFocus
          className="customFont"
          sx={{ width: "70%", mb: 2 }}
        />
        <TextField
          required
          id="url"
          label="Profile Image Url"
          name="profile"
          autoComplete="profile"
          sx={{ width: "70%", mb: 2 }}
        />
        <TextField
          required
          id="alt"
          label="Profile Image Alt"
          name="profile"
          autoComplete="profile"
          sx={{ width: "70%", mb: 2 }}
        />
        <Button variant="outlined">Edit Profile</Button>
      </Box>
    </>
  );
};
export default ProfileSettingsTab;

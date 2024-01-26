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
const ChangePasswordTab = ({
  showCurrentPassword,
  onShowCurrPassword,
  showNewPassword,
  onShowNewPassword,
}) => {
  const handleToggleCurrPassword = () => {};
  const handleToggleNewPassword = () => {};
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography className="customFont">Change password</Typography>
        <TextField
          id="password"
          label="Current Password"
          type={showCurrentPassword ? "text" : "password"}
          sx={{ width: "70%", mb: 2, mt: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleToggleCurrPassword}
                  aria-label="toggle password visibility"
                >
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="newPassword"
          label="New Password"
          type={showNewPassword ? "text" : "password"}
          sx={{ width: "70%", mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleToggleNewPassword}
                  aria-label="toggle password visibility"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="outlined">Change</Button>
      </Box>
    </>
  );
};
export default ChangePasswordTab;

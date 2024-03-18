import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import "../styles/styles.css";
import axios from "axios";
import { useState } from "react";
import validateUserLogin from "../validation/user-login-validation";
import { storeToken } from "../service/login-service";
import useAutoLogin from "../hooks/useAutoLogin";
import { ROUTES } from "../routes/routes";
import { successToast } from "../service/toastify-service";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const LoginPage = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const autoLogin = useAutoLogin();
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleInputsChange = (e) => {
    setInputs((current) => ({
      ...current,
      [e.target.id]: e.target.value,
    }));
  };
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };
  const handleUserLogin = async (e) => {
    try {
      e.preventDefault();
      const errors = validateUserLogin(inputs);
      if (errors) {
        setErrors(errors);
        return;
      }
      const { data } = await axios.post("/users/login", inputs);
      //store token
      storeToken(data.token.token, rememberMe);
      await autoLogin(true);
      successToast("You've been logged in successfully");

      navigate(ROUTES.FEEDS, { replace: true });
    } catch (err) {
      if (err.response.status === 401) {
        setError(err.response.data.message);
      }
    }
  };
  return (
    <>
      <Box sx={{ height: "100vh" }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" className="customFont">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
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
                autoFocus
                value={inputs.email}
                onChange={handleInputsChange}
              />
              {errors && errors.email && (
                <Alert severity="error" className="customFont">
                  {errors.email}
                </Alert>
              )}
              <TextField
                margin="normal"
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
                value={inputs.password}
                onChange={handleInputsChange}
                autoComplete="current-password"
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
              {error && (
                <Alert severity="error" className="customFont">
                  {error}
                </Alert>
              )}
              {errors && errors.password && (
                <Alert severity="error" className="customFont">
                  {errors.password}
                </Alert>
              )}
              <FormControlLabel
                control={<Checkbox value={rememberMe} color="primary" />}
                label={
                  <Typography
                    style={{ fontFamily: "Montserrat", fontSize: "0.9rem" }}
                  >
                    Remember Me
                  </Typography>
                }
                style={{ fontFamily: "Montserrat" }}
                onChange={handleRememberMe}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#0B0D12",
                  "&:hover": {
                    backgroundColor: "#393A3E",
                  },
                }}
                className="customFont"
                onClick={handleUserLogin}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    component="button"
                    variant="body2"
                    className="customFont"
                    style={{ color: "#0B0D12", textDecoration: "none" }}
                    onClick={() => {
                      navigate(ROUTES.REGISTER);
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default LoginPage;

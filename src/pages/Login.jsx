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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../styles/styles.css";
import axios from "axios";
import { useState } from "react";
import validateUserLogin from "../validation/user-login-validation";
import { storeToken } from "../service/login-service";
import useAutoLogin from "../hooks/useAutoLogin";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { successToast } from "../service/toastify-service";
const defaultTheme = createTheme();
const LoginPage = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState([]);
  const autoLogin = useAutoLogin();
  const navigate = useNavigate();
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
        console.log(errors);
        return;
      }
      const { data } = await axios.post("/users/login", inputs);
      //store token
      storeToken(data.token.token, rememberMe);

      autoLogin(true);
      // successToast("You've been logged in successfully");
      //??? Why it doesn't redirect
      console.log("before navigate");
      navigate(ROUTES.FEEDS);
      console.log("after navigate");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
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
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={inputs.email}
              onChange={handleInputsChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={inputs.password}
              onChange={handleInputsChange}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value={rememberMe} color="primary" />}
              label="Remember me"
              style={{ fontFamily: "Montserrat" }}
              onChange={handleRememberMe}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#0B0D12" }}
              className="customFont"
              onClick={handleUserLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  className="customFont"
                  style={{ color: "#0B0D12" }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  className="customFont"
                  style={{ color: "#0B0D12" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default LoginPage;
